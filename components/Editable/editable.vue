<template>
    <div
            class="kd-editable"
            :class="['kd-editable-'+size]"
    >
        <div
                v-if="!editStatus"
                :title="value"
                class="kd-editable-txt"
        >
            <slot>{{ value }}</slot>
        </div>
        <div v-else>
            <kd-input
                    ref="input"
                    v-model="inputValue"
                    :class="['kd-editable-input', { 'kd-editable-invalid': invalid }]"
                    :placeholder="placeholder"
                    :size="size"
                    @blur="_onBlur($event)"
                    @focus="_onFocus($event)"
                    @keydown="_onKeydown($event)"
                    @enter="_onKeydown($event)"
            />
        </div>
        <kd-button
                v-show="!editStatus && !disabled"
                :class="{
                    'kd-editable-icon': true,
                    'kd-editable-hover': hover,
                    'kd-editable-icon-follow': follow
                }"
                type="text"
                :authid="authid"
                @click="_edit"
        >
            <slot name="icon">
                <i class="edit-icon kd-icon-edit"></i>
            </slot>
        </kd-button>
    </div>
</template>
<script>
    export default {
        name: 'KdEditable',
        props: {
            value: {
                type: [String, Number]
            },
            editing: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            authid: {
                type: String,
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            validate: {
                type: [Function, RegExp, String],
                default: undefined
            },
            hover: {
                type: Boolean,
                default: false
            },
            follow: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            }
        },
        data() {
            return {
                editStatus: this.editing,
                inputValue: this.value,
                innerValue: '',
                invalid: false
            };
        },
        watch: {
            innerValue(v) {
                if (v == this.value) return;
                this.$emit('input', v);
            },
            value(v) {
                this.innerValue = v;
            }
        },
        created() {
            this.innerValue = this.value;
        },
        methods: {
            _edit() {
                this.editStatus = true;
                this.$nextTick(() => {
                    this.inputValue = this.value;
                    const input = this.$refs.input;
                    if (input.$refs.input.select) {
                        input.$refs.input.select();
                        input.$refs.input.focus();
                    } else if (input.$refs.input.setSelectionRange) {
                        input.$refs.input.focus();
                        input.$refs.input.setSelectionRange(0, input.value.length);
                    }
                });
            },
            _onFocus(e) {
                this.$emit('focus', e);
            },
            _onBlur(e) {
                if (this.validate === undefined) {
                    this.innerValue = e.target.value;
                    this.editStatus = false;
                    this.$emit('change', e, e.target.value, this.value);
                } else {
                    this._validate(e.target.value);
                    if (!this.invalid) {
                        this.$emit('change', e, e.target.value, this.value);
                    }
                }
            },
            _onKeydown(e) {
                switch (e.keyCode) {
                    case 27: // esc
                        this._validate(e.target.value);
                        break;
                    case 13: // enter
                        this._validate(e.target.value);
                        break;
                    default:
                        break;
                }
            },
            // 验证
            _validate(value) {
                const validate = this.validate;
                if (validate === undefined) {
                    this.editStatus = false;
                    return;
                }
                let valid;
                if (typeof validate === 'function') {
                    valid = validate.call(this, value);
                } else if (validate instanceof RegExp) {
                    valid = validate.test(value);
                } else if (typeof validate === 'string') {
                    valid = new RegExp(validate).test(value);
                }

                if (!valid) {
                    this.invalid = true;
                    this.$emit('error', value);
                } else {
                    this.invalid = false;
                    this.editStatus = false;
                }
            }
        }
    };
</script>
