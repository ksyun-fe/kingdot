<template>
    <li
            class="kd-submenu"
    >
        <div
                :class="classNameObj"
                :style="[paddingStyle,styleObj]"
                @mouseover="hover = true"
                @mouseout="hover = false"
        >
            <slot name="title"></slot>
            <i class="kd-submenu-icon-arrow kd-icon-caret-bottom"></i>
        </div>
        <ul class="kd-submenu-item">
            <slot></slot>
        </ul>
    </li>
</template>

<script>
    import Menu from './menu-mixin';
    export default {
        name: 'KdSubmenu',
        componentName: 'KdSubmenu',
        mixins: [Menu],
        props: {
            index: {
                type: String
            },
            // required: true
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
                styleObj: {
                    'backgroundColor': this.menu.backgroundColor,
                    'color': this.menu.textColor,
                    'cursor': this.disabled ? 'not-allowed' : 'pointer'
                }
            };
        },
        computed: {

        },
        watch: {
            hover(v) {
                if (this.disabled) return;
                this.styleObj.backgroundColor === v ? this.menu.hoverBackgroundColor : this.menu.backgroundColor;
                this.styleObj.color === v ? this.menu.hoverTextColor : this.menu.textColor;
            }
        },
        methods: {

        }
    };
</script>
