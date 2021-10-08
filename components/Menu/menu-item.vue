<template>
    <li
            :class="itemClassNameObj"
            :style="[paddingStyle,itemStyleObj]"
            @mouseover="hover = true"
            @mouseout="hover = false"
            @click="clickItemHandler"
    >
        <kd-tooltip
                v-if="showTooltip"
                v-model="toolTipValue"
                placement="right-start"
                trigger="hover"
                :content="tips"
                :widthLimit="false"
        >
            <slot>{{ tips }}</slot>
        </kd-tooltip>
        <slot v-else>{{ tips }}</slot>
    </li>
</template>

<script>
    import Menu from './menu-mixin';
    export default {
        name: 'KdMenuItem',
        componentName: 'KdMenuItem',
        mixins: [Menu],
        props: {
            name: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            tips: {
                type: String,
                default: ''
            }
        },
        inject: {
            subMenu: {
                default: null
            }
        },
        data() {
            return {
                hover: false,
                toolTipValue: false
            };
        },
        computed: {
            showTooltip() {
                return this.menu.collapse && !(this.subMenu && this.subMenu.isPopperMode);
            },
            // 是否被选中
            isActive() {
                return this.name === this.menu.activeItem && !this.disabled;
            },
            isHorizontal() {
                return this.$parent.$options.componentName === 'KdMenu' && this.$parent.isHorizontalMode;
            },
            itemClassNameObj() {
                return {
                    'kd-menu-item': true,
                    'kd-menu-item-popper': !!this.subMenu,
                    'kd-menu-item-disabled': this.disabled,
                    'kd-menu-item-horizontal': this.menu.isHorizontalMode,
                    'kd-menu-item-title-horizontal': this.isHorizontal,
                    'kd-menu-item-vertical': this.menu.isVerticalMode,
                    'kd-menu-item-active': this.isActive
                };
            },
            itemStyleObj() {
                const style = {};
                style.backgroundColor = this.menu.backgroundColor;
                style.color = this.menu.textColor;
                if (this.isActive && (this.menu.activeBackgroundColor || this.menu.activeBackgroundImage)) {
                    style.backgroundColor = this.menu.activeBackgroundColor;
                    style.backgroundImage = this.menu.activeBackgroundImage;
                    style.color = this.menu.activeTextColor;
                }
                if (this.hover && this.menu.hoverBackgroundColor) {
                    style.backgroundColor = this.menu.hoverBackgroundColor;
                    style.color = this.menu.hoverTextColor;
                }
                return style;
                // if (this.disabled) {
                //     return {
                //         'cursor': 'not-allowed',
                //         'backgroundColor': this.menu.backgroundColor,
                //         'color': this.menu.textColor
                //     };
                // }
                // return {
                //     'backgroundColor': this.isActive ? this.menu.activeBackgroundColor : (this.hover ? this.menu.hoverBackgroundColor : this.menu.backgroundColor),
                //     'color': this.isActive ? this.menu.activeTextColor : (this.hover ? this.menu.hoverTextColor : this.menu.textColor),
                //     'cursor': this.disabled ? 'not-allowed' : 'pointer'
                // };
            }
        },
        created() {
            this.toggleMenuItem(true);
        },
        beforeDestroy() {
            this.toggleMenuItem();
        },
        methods: {
            toggleMenuItem(flag) {
                let parent = this.$parent;
                while (parent && parent.$options.componentName !== 'KdMenu') {
                    if (parent.$options.componentName === 'KdSubmenu') {
                        if (flag) {
                            parent.addMenuItem(this.name);
                        } else {
                            parent.removeMenuItem(this.name);
                        }
                    }
                    parent = parent.$parent;
                }
            },
            clickItemHandler() {
                if (this.isActive || this.disabled) return;
                this.menu.$emit('changeSelectedItem', this.name);
                this.subMenu && this.subMenu.hidePopper();
                this.hover = false;
            }
        }
    };
</script>
