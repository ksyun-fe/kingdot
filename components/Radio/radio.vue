<template>
    <label
            :class="['kd-radio',{'kd-radio-checked': checked,'kd-radio-disabled':disabled}]"
    >
        <span
                class="kd-radio-wrapper"
                @click="clickSelf"
        >
            <input
                    ref="input"
                    type="radio"
                    class="kd-radio-input"
                    :value="radioValue"
                    :name="name"
                    :disabled="disabled"
                    tabindex="-1"
            >
        </span>
        <span class="kd-radio-text">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'Radio',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String
            },
            trueValue: {
                type: [Boolean, String, Number],
                default: ''
            },
            value: {
                type: [Boolean, String, Number],
                default: ''
            }
        },
        data() {
            return {
                radioValue: ''
            };
        },
        computed: {
            checked() {
                return this.trueValue === this.radioValue;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v, r) {
                    this.radioValue = v;
                }
            },
            radioValue(v, r) {
                this.$emit('input', v);
            }
        },
        methods: {
            clickSelf() {
                if (this.disabled) return;
                this.$emit('input', this.trueValue);
                this.$emit('change', this.trueValue);
            }
        }
    };
</script>
