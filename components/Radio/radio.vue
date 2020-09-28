<template>
    <label
            :class="[
                'kd-radio',
                {
                    'kd-radio-checked': checked,
                    'kd-radio-disabled': disabled,
                    'kd-radio-type': showType
                }
            ]"
    >
        <!-- 按钮 -->
        <span class="kd-radio-wrapper">
            <input
                    ref="input"
                    type="radio"
                    class="kd-radio-input"
                    :value="radioValue"
                    :disabled="disabled"
                    tabindex="-1"
                    @click="clickSelf"
            >
        </span>
        <!-- text -->
        <span class="kd-radio-text">
            <slot></slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'KdRadio',
        props: {
            // 排列类型
            type: {
                type: String,
                default: 'horizontal'
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 正确的值
            trueValue: {
                type: [Boolean, String, Number],
                default: true
            },
            // 传入的值
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
            // 是否已选择
            checked() {
                return this.trueValue === this.radioValue;
            },
            // 展示类型
            showType() {
                return this.type === 'vertical';
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
            // 点击事件
            clickSelf() {
                if (this.disabled) return;
                this.$emit('input', this.trueValue);
                this.$emit('change', this.trueValue);
            }
        }
    };
</script>
