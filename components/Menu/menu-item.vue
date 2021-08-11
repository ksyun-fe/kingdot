<template>
    <li
            :class="itemClassNameObj"
            :style="[paddingStyle,itemStyleObj]"
            @mouseover="hover = true"
            @mouseout="hover = false"
            @click="clickItemHandler"
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
                hover: false
            };
        },
        computed: {
            // 是否被选中
            selectedFlag() {
                return this.name === this.menu.selectedMenu && !this.disabled;
            },
            itemClassNameObj() {
                return [
                    'kd-menu-item',
                    this.disabled ? 'kd-menu-item-disabled' : '',
                    this.menu.mode === 'horizontal' ? 'kd-menu-item-horizontal' : 'kd-menu-item-vertical',
                    this.selectedFlag ? 'kd-menu-item-active' : ''
                ];
            },
            itemStyleObj() {
                if (this.disabled) {
                    return {
                        'cursor': 'not-allowed',
                        'backgroundColor': this.menu.backgroundColor,
                        'color': this.menu.textColor
                    };
                }
                return {
                    'backgroundColor': this.selectedFlag ? this.menu.activeBackgroundColor : (this.hover ? this.menu.hoverBackgroundColor : this.menu.backgroundColor),
                    'color': this.selectedFlag ? this.menu.activeTextColor : (this.hover ? this.menu.hoverTextColor : this.menu.textColor),
                    'cursor': this.disabled ? 'not-allowed' : 'pointer'
                };
            }
        },
        watch: {
            // selectedFlag(v) {
            //     if (!v) return;
            //     this.$parent.isActiveFun();
            //     if (this.$parent.$options.componentName === 'KdSubmenu') {
            //         this.isActive = false;
            //         this.$parent.isActiveFun();
            //     } else {
            //         this.isActive = true;
            //     }
            // }
        },
        created() {
        },
        mounted() {

        },
        beforeDestroy() {
        },
        methods: {
            clickItemHandler() {
                if (this.selectedFlag || this.disabled) return;
                this.menu.$emit('update:selectedMenu', this.name);
                // this.menu.changSelectedMenu(this.name);
            }
        }
    };
</script>
