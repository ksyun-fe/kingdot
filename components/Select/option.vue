<template>
    <li
            v-show="optionShow"
            class="kd-option"
            :class="{'kd-option-active': active,'kd-option-disabled': disabled}"
            @click.stop="optionClick"
    >
        <i
                v-if="active && activeIcon"
                class="kd-option-icon kd-icon-success"
        />
        <slot>
            {{ label }}
        </slot>
    </li>
</template>
<script>
    export default {
        name: 'KdOption',
        // inject: ['select'],
        props: {
            scope: {
                type: Object,
                default() {
                    return {};
                }
            },
            value: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            activeIcon: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                optionShow: true,
                labelText: ''
                // active: false
            };
        },
        computed: {
            active() {
                //  初始化是否为选择状态
                const parent = this.getParent('kd-select-dropdown');
                if (parent.multiple) {
                    return parent.value.some(item => {
                        return item === this.value;
                    });
                } else {
                    return parent.value === this.value;
                }
            }
        },
        mounted() {
            const defaultSlot = this.$slots.default;
            if (defaultSlot) {
                this.labelText = defaultSlot[0].text;
            }
        },
        methods: {
            optionClick() {
                if (this.disabled) {
                    return;
                }
                const data = {
                    scope: {
                        value: this.value,
                        label: this.label || this.labelText
                    },
                    active: this.active
                };
                this.dispatch('kd-select-dropdown', 'setValue', data);
            },
            getParent(componentName) {
                let parent = this.$parent || this.$root;
                let name = parent.$options._componentTag;
                while (parent && (!name || name !== componentName)) {
                    parent = parent.$parent;
                    if (parent) {
                        name = parent.$options._componentTag;
                    }
                }
                return parent;
            },
            dispatch(componentName, eventName, params) {
                const parent = this.getParent(componentName);
                if (parent) {
                    parent[eventName](params);
                }
            },
            isShow({value, method}) {
                if (method) {
                    this.optionShow = method(value, {
                        value: this.value,
                        label: this.label || this.labelText
                    });
                } else {
                    this.optionShow = this.label.indexOf(value) > -1;
                }
                return this.optionShow;
            },
            emitLabel() {
                return this.labelText;
            }
        }
    };
</script>
