<template>
    <li
            :class="itemClassNameObj"
            :style="[paddingStyle,itemStyleObj]"
            @mouseover="hover = true"
            @mouseout="hover = false"
    >
        <slot></slot>
    </li>
</template>

<script>
    import Menu from './menu-mixin';
    export default {
        name: 'KdMenuItem',
        componentName: 'KdMenuItem',
        mixins: [Menu],
        props: {
            index: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        inject: ['menu'],
        data() {
            return {
                itemClassNameObj: [
                    'kd-menu-item',
                    this.disabled ? 'kd-menu-item-disabled' : '',
                    this.menu.mode === 'horizontal' ? 'kd-menu-item-horizontal' : 'kd-menu-item-vertical'
                ],
                itemStyleObj: {
                    'backgroundColor': this.menu.backgroundColor,
                    'color': this.menu.textColor,
                    'cursor': this.disabled ? 'not-allowed' : 'pointer'
                },
                hover: false
            };
        },
        computed: {
        },
        watch: {
            hover(v) {
                if (this.disabled) return;
                this.itemStyleObj.backgroundColor === v ? this.menu.hoverBackgroundColor : this.menu.backgroundColor;
                this.itemStyleObj.color === v ? this.menu.hoverTextColor : this.menu.textColor;
            }
        },
        mounted() {

        },
        beforeDestroy() {
        },
        methods: {

        }
    };
</script>
