<template>
    <li
            :class="classNameList"
    >
        <div
                v-if="!isPopperMode"
                :class="classNameObj"
                :style="[paddingStyle, styleObj]"
                @mouseover="hover = true"
                @mouseout="hover = false"
                @click="clickSubMenu"
        >
            <div class="kd-submenu-title-content">
                <slot name="title"></slot>
            </div>
            <i
                    v-show="!menu.collapse"
                    class="kd-submenu-icon-arrow kd-icon-caret-bottom"
            ></i>
        </div>
        <kd-transition
                v-if="!isPopperMode"
                type="collapse"
        >
            <ul
                    v-show="isOpened"
                    :class="{
                        'kd-submenu-item': true,
                    }"
            >
                <slot></slot>
            </ul>
        </kd-transition>
        <kd-tooltip
                v-else
                v-model="toolTipValue"
                :placement="menu.isHorizontalMode && $parent.$options.componentName === 'KdMenu' ? 'bottom' : 'right-start'"
                :contentClass="contentClass"
                :trigger="trigger"
                :showArrow="false"
                :widthLimit="false"
                :popperParentToTooltip="true"
                :popperMixins="tooltipContentMixins"
                :popperModifiers="popperModifiers"
        >
            <div
                    :class="classNameObj"
                    :style="[paddingStyle, styleObj]"
                    @mouseover="hover = true"
                    @mouseout="hover = false"
                    @click="clickSubMenu"
            >
                <div class="kd-submenu-title-content">
                    <slot name="title"></slot>
                </div>
                <i
                        v-show="!menu.collapse"
                        class="kd-submenu-icon-arrow kd-icon-caret-bottom"
                ></i>
            </div>
            <template slot="content">
                <ul
                        :class="{
                            'kd-submenu-popper-content': true,
                        }"
                >
                    <slot></slot>
                </ul>
            </template>
        </kd-tooltip>
    </li>
</template>

<script>
    import Menu from './menu-mixin';
    export default {
        name: 'KdSubmenu',
        componentName: 'KdSubmenu',
        mixins: [Menu],
        props: {
            name: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            trigger: {
                type: String,
                default() {
                    return 'click';
                }
            },
            popperClass: {
                type: String,
                default() {
                    return '';
                }
            },
            popperAppendToBody: {
                type: Boolean,
                default() {
                    return false;
                }
            }
        },
        data() {
            return {
                hover: false,
                toolTipValue: false,
                menuItemList: new Set()
            };
        },
        computed: {
            isPopperMode() {
                return this.menu.isHorizontalMode || this.popperAppendToBody;
            },
            classNameObj() {
                return {
                    'kd-submenu-title': true,
                    'kd-menu-item': true,
                    'kd-submenu-popper-title': this.isPopperMode,
                    'kd-submenu-disabled': this.disabled,
                    'kd-submenu-title-horizontal': this.$parent.$options.componentName === 'KdMenu' && this.$parent.isHorizontalMode,
                    'kd-submenu-horizontal': this.menu.isHorizontalMode,
                    'kd-submenu-title-vertical': this.$parent.$options.componentName === 'KdMenu' && this.$parent.isVerticalMode
                };
            },
            classNameList() {
                return {
                    'kd-submenu': true,
                    'kd-submenu-active': this.isActive && this.isPopperMode,
                    'kd-submenu-opened': this.isOpened
                };
            },
            // 折叠收起菜单状态下高亮
            highlight() {
                return !this.disabled && this.menu.collapse;
            },
            styleObj() {
                const style = {};
                style.backgroundColor = this.menu.backgroundColor;
                style.color = this.menu.textColor;
                if (this.isActive && this.isPopperMode && (this.menu.activeBackgroundColor || this.menu.activeBackgroundImage)) {
                    style.backgroundColor = this.menu.activeBackgroundColor;
                    style.backgroundImage = this.menu.activeBackgroundImage;
                    style.color = this.menu.activeTextColor;
                }
                if (this.hover && this.menu.hoverBackgroundColor) {
                    style.backgroundColor = this.menu.hoverBackgroundColor;
                    style.color = this.menu.hoverTextColor;
                }
                return style;
                // return {
                //     'backgroundColor': this.highlight ? this.menu.activeBackgroundColor : (this.hover ? this.menu.hoverBackgroundColor : this.menu.backgroundColor),
                //     'color': this.highlight ? this.menu.activeTextColor : (this.hover ? this.menu.hoverTextColor : this.menu.textColor),
                //     'cursor': this.disabled ? 'not-allowed' : 'pointer'
                // };
            },
            isActive() {
                return this.menuItemList.has(this.menu.activeItem);
            },
            isOpened() {
                return this.menu.openedSubList.includes(this.name);
            },
            tooltipContentMixins() {
                const menu = this.menu;
                const subMenu = this;

                return [{
                    provide() {
                        return {
                            menu,
                            subMenu
                        };
                    }
                }];
            },
            contentClass() {
                let className = 'kd-submenu-tooltip-content';
                if (this.menu.isHorizontalMode) {
                    className += ' kd-submenu-popper-horizontal';
                }
                if (this.popperClass) {
                    className += ' ' + this.popperClass;
                }
                return className;
            },
            popperModifiers() {
                return [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -8]
                        }
                    }
                ];
            }
        },
        methods: {
            clickSubMenu() {
                if (this.disabled) return;
                this.menu.$emit('toggleSubOpened', this.name);
            },
            addMenuItem(itemName) {
                this.menuItemList.add(itemName);
            },
            removeMenuItem(itemName) {
                this.menuItemList.delete(itemName);
            },
            hidePopper() {
                this.toolTipValue = false;
                this.subMenu && this.subMenu.hidePopper();
                this.hover = false;
            }
        }
    };
</script>
