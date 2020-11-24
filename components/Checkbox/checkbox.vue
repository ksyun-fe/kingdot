<template>
    <label
            :class="{
                'kd-checkbox': true,
                'kd-is-checked': isChecked,
                'kd-is-disabled': disabled,
                'kd-is-indeterminate': indeterminate
            }"
    >
        <span
                class="kd-checkbox-wrap"
        >
            <input
                    v-model="model"
                    type="checkbox"
                    :name="name"
                    :indeterminate="indeterminate"
                    :disabled="disabled"
                    :true-value="trueValue"
                    :false-value="falseValue"
                    class="kd-checkbox-input"
                    @change="change"
            >
        </span>
        <span
                class="kd-checkbox-text"
        >
            <slot>{{ label }}</slot>
        </span>
    </label>
</template>

<script>
    export default {
        name: 'KdCheckbox',
        props: {
            value: {
                type: [String, Number, Boolean, Array]
            },
            name: {
                type: String
            },
            trueValue: {
                type: [String, Number, Boolean],
                default: true
            },
            falseValue: {
                type: [String, Number, Boolean],
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            indeterminate: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            }
        },
        data() {
            return {
                model: true
            };
        },
        computed: {
            isChecked() {
                return this.model === this.trueValue;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    let isChecked = false;
                    if (Array.isArray(v)) {
                        isChecked = v.includes(this.trueValue);
                    } else {
                        isChecked = v === this.trueValue;
                    }
                    this.model = isChecked ? this.trueValue : this.falseValue;
                }
            }
        },
        methods: {

            change() {
                let index, value;

                if (this.disabled) return;

                value = Array.isArray(this.value) ? [...this.value] : this.value;

                if (this.isChecked) {
                    if (Array.isArray(value) && !value.includes(this.trueValue)) {
                        value.push(this.trueValue);
                    } else {
                        value = this.trueValue;
                    }
                } else {
                    if (Array.isArray(value)) {
                        index = value.findIndex(i => i === this.trueValue);
                        if (~index) {
                            value.splice(index, 1);
                        }
                    } else {
                        value = this.falseValue;
                    }
                }

                this.$emit('input', value);
                this.$emit('change', value);
            }
        }
    };
</script>
