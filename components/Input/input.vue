<template>
    <div
            :class="[
                type === 'textarea' ? 'kd-textarea' : 'kd-input',
                'kd-input-' + size,
                {
                    'kd-input-disabled': disabled,
                    'kd-input-group': $slots.prepend || $slots.append,
                    'kd-with-prefix': $slots.prefix,
                    'kd-with-suffix': $slots.suffix || success || warning || error || clearable,
                    'kd-input-fluid': fluid,
                    ['kd-input-status-' + (status === 'error' ? 'err' : status)]: success || warning || error,
                    'kd-textarea-show-count': showCount,
                    'kd-is-exceed': isExceed,
                    'kd-textarea-resize-vertical': type === 'textarea' && resize === 'vertical'
                }
            ]"
            :style="{width: parseInt(width) + 'px'}"
    >
        <div
                v-if="$slots.prepend"
                class="kd-input-prepend"
        >
            <slot name="prepend"></slot>
        </div>
        <div class="kd-input-wrapper">
            <div
                    v-if="$slots.prefix"
                    class="kd-input-prefix"
            >
                <slot name="prefix"></slot>
            </div>
            <input
                    v-if="type !== 'textarea'"
                    ref="input"
                    v-model="innerValue"
                    v-bind="$attrs"
                    class="kd-input-inner"
                    :type="type"
                    :readonly="readonly"
                    :disabled="disabled"
                    :tabindex="tabindex"
                    :maxlength="maxlength"
                    @focus="focusHandler"
                    @change="changeHandler"
                    @blur="blurHandler"
                    @keydown="keydownHandler"
                    @keyup="keyupHandler"
            />
            <textarea
                    v-else
                    ref="textarea"
                    v-model="innerValue"
                    v-bind="$attrs"
                    class="kd-input-inner"
                    :type="type"
                    :readonly="readonly"
                    :disabled="disabled"
                    :rows="rows"
                    :maxlength="maxlength"
                    :style="textareaStyle"
                    :tabindex="tabindex"
                    @focus="focusHandler"
                    @change="changeHandler"
                    @blur="blurHandler"
                    @keydown="keydownHandler"
                    @keyup="keyupHandler"
            ></textarea>
            <div
                    v-if="$slots.suffix || clearable || success || warning || error"
                    class="kd-input-suffix"
            >
                <slot name="suffix"></slot>
                <i
                        v-if="success || warning || error"
                        :class="{
                            'kd-icon-success-solid': success,
                            'kd-icon-warning-solid': warning,
                            'kd-icon-error-solid': error
                        }"
                >
                </i>
                <i
                        v-else-if="showClearable"
                        class="kd-icon-error-solid kd-input-clearable"
                        :class="{'kd-input-show': value}"
                        @click.stop="clear"
                >
                </i>
            </div>
            <span
                    v-if="isShowCount"
                    class="kd-textarea-count"
            >
                {{ textLength }}/{{ limit }}
            </span>
        </div>
        <div
                v-if="$slots.append"
                class="kd-input-append"
        >
            <slot name="append"></slot>
        </div>

    </div>
</template>
<script type="text/javascript">
    export default {
        name: 'KdInput',
        inheritAttrs: false,
        props: {
            tabindex: {
                type: String
            },
            value: {
                type: [Number, String]
            },
            width: {
                type: [Number, String]
            },
            type: {
                type: String,
                default: 'text'
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
                type: String
            },
            clearable: {
                type: Boolean,
                default: false
            },
            fluid: {
                type: Boolean,
                default: false
            },
            resize: {
                type: String
            },
            rows: {
                type: [Number, String],
                default: 3
            },
            showCount: {
                type: Boolean,
                default: false
            },
            lengthLimit: {
                type: Boolean,
                default: false
            },
            maxVerticalResizeHeight: {
                type: [Number, String],
                default: 200
            }
        },
        data() {
            return {
                innerValue: '',
                maxlength: '',
                currentTextareaStyle: {}
            };
        },
        computed: {
            textareaStyle() {
                return Object.assign({}, this.currentTextareaStyle, {
                    resize: this.resize,
                    width: parseInt(this.width) + 'px'
                }, this.resize === 'vertical' ? {
                    maxHeight: this.maxVerticalResizeHeight + 'px'
                } : {});
            },
            success() {
                return this.status === 'success';
            },
            error() {
                return this.status === 'error';
            },
            warning() {
                return this.status === 'warning';
            },
            showClearable: function () {
                return this.clearable && !this.readonly && !this.disabled && this.innerValue && (this.type !== 'textarea');
            },
            isShowCount() {
                return this.showCount && this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.disabled && !this.readonly;
            },
            textLength() {
                if (typeof this.value === 'number') {
                    return String(this.value).length;
                }
                return (this.value || '').length;
            },
            limit() {
                return this.$attrs.maxlength;
            },
            isExceed() {
                return this.$attrs.maxlength && (this.type === 'text' || this.type === 'textarea') && !this.disabled && !this.readonly && (this.textLength > this.limit);
            }
        },
        watch: {
            value(v) {
                this.innerValue = v;
            },
            innerValue: function (v) {
                if (v === this.value) return;
                this.$emit('input', v);
            }
        },
        created() {
            this.innerValue = this.value;
            if (this.$attrs.maxlength) {
                this.maxlength = this.$attrs.maxlength;
            } else if (this.lengthLimit) {
                this.maxlength = 512;
            }
        },
        methods: {
            getInputElem() {
                return this.$refs.input || this.$refs.textarea;
            },
            focus() {
                this.getInputElem().focus();
            },
            blur() {
                this.getInputElem().blur();
            },
            select() {
                this.getInputElem().select();
            },
            focusHandler(event) {
                this.$emit('focus', event);
            },
            changeHandler(event) {
                this.$emit('change', event.target.value);
            },
            blurHandler(event) {
                this.innerValue = this.value;
                this.$emit('blur', event);
            },
            clear() {
                this.$emit('input', '');
                this.$emit('change', '');
                this.$emit('clear');
            },
            keydownHandler(e) {
                if (e.code === 'Enter') {
                    this.$emit('enter', e);
                } else {
                    this.$emit('keydown', e);
                }
            },
            keyupHandler(e) {
                this.$emit('keyup', e);
            }
        }
    };
</script>
