<template>
    <div
            :class="[
                type === 'textarea' ? 'kd-textarea' : 'kd-input',
                'kd-input-' + size,
                {
                    'kd-input-disabled': disabled,
                    'kd-input-group': $slots.prepend || $slots.append,
                    'kd-with-prefix': $slots.prefix,
                    'kd-with-suffix': $slots.suffix
                }
            ]"
            :style="{width: `${width}px`}"
    >
        <div
                v-if="$slots.prepend"
                class="kd-prepend"
        >
            <slot name="prepend"></slot>
        </div>
        <div class="kd-wrapper">
            <div
                    v-if="$slots.prefix"
                    class="kd-prefix"
            >
                <slot name="prefix"></slot>
            </div>
            <input
                    v-if="type !== 'textarea'"
                    ref="input"
                    v-model="innerValue"
                    v-bind="$attrs"
                    class="kd-inner"
                    :type="type"
                    :readonly="readonly"
                    :disabled="disabled"
                    @focus="focusHandler"
                    @change="changeHandler"
                    @compositionstart="compositionStartHandler"
                    @compositionend="compositionEndHandler"
                    @blur="blurHandler"
            />
            <textarea
                    v-else
                    ref="textarea"
                    v-model="innerValue"
                    class="kd-inner kd-textarea"
                    :type="type"
                    v-bind="$attrs"
                    :readonly="readonly"
                    :disabled="disabled"
                    :style="textareaStyle"
                    @focus="focusHandler"
                    @change="changeHandler"
                    @blur="blurHandler"
            ></textarea>
            <div
                    v-if="$slots.suffix"
                    class="kd-suffix"
            >
                <slot name="suffix"></slot>
            </div>
        </div>
        <div
                v-if="$slots.append"
                class="kd-append"
        >
            <slot name="append"></slot>
        </div>

    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'Input',
        inheritAttrs: false,
        props: {
            value: {
                type: [Number, String],
                default: ''
            },
            width: {
                type: [Number, String]
            },
            type: {
                type: String,
                default: 'input'
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: 'default'
            },
            status: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                classObj: {
                    'kd-group': this.$slots.prepend || this.$slots.append,
                    'kd-disabled': this.disabled,
                    'kd-input-default': this.size === 'default',
                    'kd-mini-input': this.size === 'mini',
                    'kd-small-input': this.size === 'small',
                    'kd-large-input': this.size === 'large',
                    'kd-input-success': this.stau
                },
                innerValue: '',
                isComposing: false,
                currentTextareaStyle: {}
            };
        },
        computed: {
            textareaStyle() {
                return Object.assign({}, this.currentTextareaStyle, {resize: this.resize});
            }
        },
        watch: {
            innerValue: function (v) {
                if (v === this.value) return;
                this.$emit('input', v);
            },
            value(v, v2) {
                console.log(v, v2);
                this.innerValue = v;
                this.$emit('change', v);
            }
        },
        created() {
            this.innerValue = this.value;
        },
        methods: {
            focusHandler(event) {
                this.$emit('focus', event);
            },
            compositionStartHandler() {
                this.isComposing = true;
            },
            compositionEndHandler() {
                this.isComposing = true;
            },
            changeHandler(event) {
                this.$emit('change', event.target.value);
            },
            blurHandler(event) {
                this.$emit('blur', event);
            }

        }
    };
</script>
