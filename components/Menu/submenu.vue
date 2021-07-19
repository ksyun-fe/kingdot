<template>
    <li
            :class="classNameList"
    >
        <div
                :class="classNameObj"
                :style="[paddingStyle,styleObj]"
                @mouseover="hover = true"
                @mouseout="hover = false"
                @click="clickSubMenu"
        >
            <slot name="title"></slot>
            <i
                    v-show="!menu.collapse"
                    class="kd-submenu-icon-arrow kd-icon-caret-bottom"
            ></i>
        </div>
        <kd-transition
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
    </li>
</template>

<script>
    // import { EventBus } from './eventBus.js';
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
            }
        },
        inject: ['menu'],
        data() {
            return {
                hover: false,
                classNameObj: [
                    'kd-submenu-title',
                    'kd-menu-item',
                    this.disabled ? 'kd-submenu-disabled' : '',
                    this.active ? 'kd-submenu-active' : '',
                    this.menu.mode === 'horizontal' ? 'kd-submenu-title-horizontal' : 'kd-submenu-title-vertical'
                ],
                isActive: false,
                isOpened: false,
                defaultOpenedsList: []
            };
        },
        computed: {
            classNameList() {
                return {
                    'kd-submenu': true,
                    'kd-submenu-opened': this.isOpened
                };
            },
            // 折叠收起菜单状态下高亮
            highlight() {
                return (this.isActive) && !this.disabled && this.menu.collapse;
            },
            styleObj() {
                return {
                    'backgroundColor': this.highlight ? this.menu.activeBackgroundColor : (this.hover ? this.menu.hoverBackgroundColor : this.menu.backgroundColor),
                    'color': this.highlight ? this.menu.activeTextColor : (this.hover ? this.menu.hoverTextColor : this.menu.textColor),
                    'cursor': this.disabled ? 'not-allowed' : 'pointer'
                };
            }
        },
        watch: {
            'menu.collapse'(v) {
                if (v) {
                    this.isOpened = false;
                }
            }
        },
        created() {
            this.defaultOpenedsList = this.menu.defaultOpeneds;
            this.isOpened = this.defaultOpenedsList.includes(this.name);
        },
        mounted() {
        },
        methods: {
            isActiveFun() {
                if (this.$parent.$options.componentName === 'KdSubmenu') {
                    this.isActive = false;
                    this.$parent.isActiveFun();
                } else {
                    this.isActive = true;
                }
            },
            clickSubMenu() {
                if (!this.$children.length || this.disabled) return;
                this.isOpened = !this.isOpened;
                this.menu.toggleItemValue(this.name);
            }
        }
    };
</script>
