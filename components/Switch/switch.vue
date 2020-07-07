<template>
    <div
            class="kd-switch"
            :class="{
                'kd-switch-checked': switchValue === activeValue,
                'kd-switch-disabled': disabled,
                [`kd-switch-${size}`]: true
            }"
            :style="switchStyle"
            @click.prevent="toggle"
    >
        <input
                ref="input"
                class="kd-switch-input"
                type="checkbox"
                :name="name"
                :disabled="disabled"
                @change="handleChange"
        >
        <div
                v-if="switchValue === activeValue"
                class="kd-switch-active"
                :style="textStyle"
        >
            <slot name="activeText">
                {{ activeText }}
            </slot>
        </div>
        <div
                v-if="switchValue === inactiveValue"
                class="kd-switch-inactive"
                :style="textStyle"
        >
            <slot name="inactiveText">
                {{ inactiveText }}
            </slot>
        </div>
        <div
                class="kd-switch-round"
                :class="{'checked': switchValue === activeValue}"
                :style="roundStyle"
        ></div>
    </div>
</template>
<script>

    export default {
        name: 'KdSwitch',
        props: {
            value: {
                type: [Boolean, Number, String],
                default: false
            },
            name: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            width: {
                type: [Number, String],
                default: 0
            },
            height: {
                type: [Number, String],
                default: 0
            },
            activeValue: {
                type: [Boolean, String, Number],
                default: true
            },
            inactiveValue: {
                type: [Boolean, String, Number],
                default: false
            },
            activeText: {
                type: String,
                default: ''
            },
            inactiveText: {
                type: String,
                default: ''
            },
            fontSize: {
                type: [String, Number],
                default: 12
            },
            size: {
                type: String,
                validate(v) {
                    return ['large', 'default', 'small', 'mini'].includes(v);
                },
                default() {
                    return 'default';
                }
            }
        },
        data() {
            return {
                switchValue: false
            };
        },
        computed: {
            textStyle() {
                const style = {};
                if (this.width) {
                    style.width = `${this.width}px`;
                }
                if (this.height) {
                    style.height = `${this.height}px`;
                    style.lineHeight = `${this.height}px`;
                    if (this.switchValue === this.activeValue) {
                        style.paddingLeft = `${this.height / 3}px`;
                        style.paddingRight = `${this.height}px`;
                    } else {
                        style.paddingLeft = `${this.height}px`;
                        style.paddingRight = `${this.height / 3}px`;
                    }
                }
                if (this.fontSize) {
                    style.fontSize = `${this.fontSize}px`;
                }
                return style;
            },
            switchStyle() {
                const switchStyle = {};
                if (this.width) {
                    switchStyle.width = `${this.width}px`;
                }
                if (this.height) {
                    switchStyle.height = `${this.height}px`;
                    switchStyle.borderRadius = `${this.height / 2}px`;
                }
                return switchStyle;
            },
            roundStyle() {
                const roundStyle = {};
                if (this.height) {
                    roundStyle.width = `${this.height - 4}px`;
                    roundStyle.height = `${this.height - 4}px`;
                    roundStyle.borderRadius = `${(this.height - 4) / 2}px`;
                }
                if (this.switchValue === this.activeValue) {
                    roundStyle.marginLeft = `-${this.height - 4}px`;
                }
                return roundStyle;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if (v !== this.switchValue) {
                        this.switchValue = v === this.activeValue ? this.activeValue : this.inactiveValue;
                    }
                }
            }
        },
        methods: {
            toggle() {
                if (!this.disabled) {
                    this.handleChange();
                }
                // !this.disabled && this.handleChange();
            },
            handleChange(e) {
                this.switchValue = this.switchValue === this.activeValue ? this.inactiveValue : this.activeValue;
                this.$emit('input', this.switchValue);
                this.$emit('change', this.switchValue);
            }
        }
    };
</script>
