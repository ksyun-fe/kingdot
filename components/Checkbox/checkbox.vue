<template>
    <label
            :class="{
                'kd-checkbox': true,
                'is-checked': isChecked,
                'is-disabled': disabled,
                'is-indeterminate': indeterminate
            }"
    >
        <span
                class="kd-checkbox-wrap"
        >
            <input
                    type="checkbox"
                    class="kd-checkbox-input"
                    v-model="model"
                    :name="name"
                    :indeterminate="indeterminate"
                    :disabled="disabled"
                    :true-value="trueValue"
                    :false-value="falseValue"
                    @change="change"
            >
        </span>
        <span
                class="kd-checkbox-text"
        ><slot>{{label}}</slot></span>
    </label>
</template>

<script>
    export default {
        name: 'Checkbox',
        props: {
            value: [String, Number, Boolean, Array],
            name: String,
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
            label: String
        },
        computed: {
            isChecked() {
                if (Array.isArray(this.value)) {
                    return this.value.includes(this.trueValue);
                } else {
                    return this.value === this.trueValue;
                }
            }
        },
        watch: {
            value: {
                immediate: true,
                handler() {
                    this.model = this.isChecked ? this.trueValue : this.falseValue;
                }
            }
        },
        data() {
            return {
                model: true
            };
        },
        methods: {

            change() {
                let index;
                let value = this.value;

                if (this.disabled)  return;

                if (this.isChecked) {
                    if (Array.isArray(value)) {
                        index = value.findIndex(i => i === this.trueValue);
                        ~index && value.splice(index, 1);
                    } else {
                        value = this.falseValue;
                    }
                } else {
                    if (Array.isArray(value)) {
                        value.push(this.trueValue);
                    } else {
                        value = this.trueValue;
                    }
                }

                this.$emit('input', value);
                this.$emit('change', value, value === this.trueValue);
            }
        }
    };
</script>
