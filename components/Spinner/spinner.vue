<template>
    <div
            :class="[
                'kd-spinner-' + size,
                {
                    'kd-spinner-right': buttonPosition,
                    'kd-spinner-disabled': disabled,
                }
            ]"
            class="kd-spinner"
    >
        <i
                :class="minusStyles"
                class="kd-spinner-btn"
                @click="minusNum"
        ></i>
        <i
                :class="addStyles"
                class="kdicon kd-spinner-btn"
                @click="addNum"
        ></i>
        <kd-input
                ref="input"
                v-model="inputValue"
                :class="[`kd-spinner-${buttonPosition?buttonPosition +'-': ''}input`]"
                :disabled="disabled"
                class="kd-spinner-input"
                :placeholder="placeholder"
                :size="size || 'default'"
                @blur="handleBlur"
                @focus="handleFocus"
                @keydown.up="addNum"
                @keydown.down="minusNum"
        />
    </div>
</template>
<script>
    import KdInput from '../Input/index';
    export default {
        name: 'KdSpinner',
        components: {
            KdInput
        },
        props: {
            value: {
                type: [Number, String],
                default: 0
            },
            min: {
                type: Number
            },
            max: {
                type: Number
            },
            step: {
                type: Number,
                default: null
            },
            precision: {
                type: Number,
                default: null
            },
            buttonPosition: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: 'default'
            },
            inputStep: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                inputValue: null,
                isMax: false,
                isMin: false
            };
        },
        computed: {
            addStyles() {
                const pos = this.buttonPosition;
                const disabled = this.disabled;
                const isMax = this.isMax;
                const styles = [
                    `kd-spinner-${pos ? pos + '-' : ''}add`,
                    pos ? 'kd-icon-arrow-up-solid' : 'kd-icon-plus-solid',
                    {
                        'kd-spinner-disabled-btn': disabled || isMax
                    }
                ];
                return styles;
            },
            minusStyles() {
                const pos = this.buttonPosition;
                const disabled = this.disabled;
                const isMin = this.isMin;
                const styles = [
                    `kd-spinner-${pos ? pos + '-' : ''}minus`,
                    pos ? 'kd-icon-arrow-down' : 'kd-icon-minus-solid',
                    {
                        'kd-spinner-disabled-btn': disabled || isMin
                    }
                ];
                return styles;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    this.valueFilter(Number(v));
                }
            },
            min: {
                immediate: false,
                handler(v) {
                    if (v == undefined) return;
                    if (v > this.value) {
                        this.isMin = true;
                    }
                    if (v < this.value || v === this.value) {
                        this.isMin = this.value === v || this.value < this.min;
                    }
                }
            },
            max: {
                immediate: false,
                handler(v) {
                    if (v == undefined) return;
                    if (v < this.value) {
                        this.isMax = true;
                    }
                    if (v > this.value || v === this.value) {
                        this.isMax = this.value === v || this.value > this.max;
                    }
                }
            }
        },
        methods: {
            valueFilter(v) {
                let value = v;
                //  小数点
                if (this.precision !== null) {
                    value = this.addPoint(value);
                }
                this.isMax = v === this.max || v > this.max;
                this.isMin = v === this.min || v < this.min;
                this.inputValue = value;
            },
            // 增加
            addNum() {
                let value = Number(this.inputValue);
                const max = this.max;
                const min = this.min;
                if (value === this.max || this.disabled) return;
                if (this.step === null) {
                    value += 1;
                } else {
                    value = (value * 10 + this.step * 10) / 10;
                }
                if (value > max && max !== null) {
                    value = max;
                }
                if (value < min && value != undefined) {
                    value = min;
                }
                this.$emit('input', value);
                this.$emit('change', value, this.value);
            },
            //  减小
            minusNum() {
                let value = Number(this.inputValue);
                const min = this.min;
                const max = this.max;
                if (value === this.min || this.disabled) return;
                if (this.step === null) {
                    value -= 1;
                } else {
                    value = (value * 10 - this.step * 10) / 10;
                }
                if (value < min && min !== null) {
                    value = min;
                }
                if (value > max && min != undefined) {
                    value = max;
                }
                this.$emit('input', value);
                this.$emit('change', value, this.value);
            },
            handleChange(v) {
                let newv = Number(v);
                if (v === '' || isNaN(newv)) return;

                if (newv < this.min && this.min !== null) {
                    newv = this.min;
                }
                if (newv > this.max && this.max !== null) {
                    newv = this.max;
                }

                this.valueFilter(newv);
                // 小数点转换number,会导致值为整数
                this.inputValue = newv;
                this.$emit('input', newv);
                this.$emit('change', newv, this.value);
            },
            handleBlur(e) {
                const step = this.step;
                let value = Number(this.inputValue);
                if (isNaN(value)) {
                    this.valueFilter(this.value);
                    return;
                }
                // 去掉input输入时即刻变化，改为失焦
                if (value < this.min && this.min !== null) {
                    value = this.min;
                }
                if (value > this.max && this.max !== null) {
                    value = this.max;
                }
                this.valueFilter(value);
                this.inputValue = value;

                // 输入精准
                if (this.inputStep && step !== null) {
                    const num = value / step;
                    // 四舍五入取两位小数
                    const pow = Math.pow(10, this.precision);
                    value = Math.floor(Math.round(num) * pow) / pow * step;
                }
                if (this.precision !== null) {
                    this.inputValue = this.addPoint(value);
                }
                // this.$emit('input', this.inputValue);
                this.$emit('input', value);
                this.$emit('change', value, this.value);
                this.$emit('blur', e);
            },
            addPoint(value) {
                return value.toFixed(this.precision);
            },
            handleFocus(e) {
                this.$emit('focus', e);
            },
            focus() {
                this.$refs.input.focus();
            },
            blur() {
                this.$refs.input.blur();
            },
            select() {
                this.$refs.input.select();
            }
        }
    };
</script>
