<template>
    <ul
            :class="classNameObj"
            :style="{
                backgroundColor: backgroundColor
            }"
    >
        <slot></slot>
    </ul>
</template>

<script>
    export default {
        name: 'KdMenu',
        componentName: 'KdMenu',
        props: {
            // horizontal、vertical
            mode: {
                type: String,
                default: 'vertical'
            },
            selectedMenu: {
                type: String,
                default: ''
            },
            // collapse the menu[仅支持vertical模式]
            collapse: {
                type: Boolean,
                default: false
            },
            // the background color of the menu
            backgroundColor: {
                type: String,
                default: '#fff'
            },
            // the text color of the menu
            textColor: {
                type: String,
                default: '#778088'
            },
            // the text color of the active menu
            activeTextColor: {
                type: String,
                default: '#fff'
            },
            // the background color of the active menu
            activeBackgroundColor: {
                type: String,
                default: '#557dfc'
            },
            // If you hover the menu, the text color of the menu
            hoverTextColor: {
                type: String,
                default: '#557dfc'
            },
            // If you hover the menu, the background color of the menu
            hoverBackgroundColor: {
                type: String,
                default: '#fff'
            },
            // the name list of the open submenu
            defaultOpeneds: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            // accordion mode
            accordion: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                defaultOpenedsList: []
            };
        },
        provide() {
            return {
                menu: this
            };
        },
        computed: {
            classNameObj() {
                return {
                    'kd-menu': true,
                    'kd-menu-horizontal': this.mode === 'horizontal',
                    'kd-menu-collapse': this.collapse
                };
            }
        },
        watch: {
            defaultOpeneds(v) {
                this.defaultOpenedsList = v;
            },
            collapse(v) {
                if (v) this.defaultOpenedsList = [];
            }
        },
        created() {
            // this.$on('toggleItemValue', this.changeValue);
        },
        methods: {
            toggleItemValue(item) {
                if (!this.accordion || this.mode === 'horizontal') return;
                this.$children.forEach(v => {
                    if (v.$options.componentName === 'KdSubmenu' && v.name !== item) {
                        v._data.isOpened = false;
                    }
                });
            },
            changSelectedMenu(v) {
                // console.log(v);
            }
        }
    };
</script>
