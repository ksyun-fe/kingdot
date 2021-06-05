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
            selectedIndex: {
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
                default: '#fff'
            },
            // If you hover the menu, the background color of the menu
            hoverBackgroundColor: {
                type: String,
                default: '#557dfc'
            }
        },
        data() {
            return {
                classNameObj: {
                    'kd-menu': true,
                    'kd-menu-horizontal': this.mode === 'horizontal'
                }
            };
        },
        provide() {
            return {
                menu: this
            };
        },
        computed: {

        },
        watch: {

        },
        created() {
        },
        methods: {

        }
    };
</script>
