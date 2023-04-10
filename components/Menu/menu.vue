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
                type: String
            },
            // the text color of the menu
            textColor: {
                type: String
            },
            // the text color of the active menu
            activeTextColor: {
                type: String
            },
            // the background color of the active menu
            activeBackgroundColor: {
                type: String
            },
            activeBackgroundImage: {
                type: String
            },
            // If you hover the menu, the text color of the menu
            hoverTextColor: {
                type: String
            },
            // If you hover the menu, the background color of the menu
            hoverBackgroundColor: {
                type: String
            },
            // the name list of the open submenu
            defaultOpeneds: {
                type: Array,
                default() {
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
                openedSubList: this.defaultOpeneds || [],
                activeItem: this.selectedMenu
            };
        },
        provide() {
            return {
                menu: this
            };
        },
        computed: {
            isHorizontalMode() {
                return this.mode === 'horizontal';
            },
            isVerticalMode() {
                return this.mode === 'vertical';
            },
            classNameObj() {
                return {
                    'kd-menu': true,
                    'kd-menu-horizontal': this.isHorizontalMode,
                    'kd-menu-collapse': this.collapse
                };
            }
        },
        watch: {
            selectedMenu(v) {
                this.activeItem = v;
            },
            activeItem(v) {
                if (v !== this.selectedMenu) {
                    this.$emit('update:selectedMenu', v);
                }
            },
            defaultOpeneds(v) {
                this.openedSubList = v;
            },
            collapse(v) {
                if (v) this.openedSubList = [];
            }
        },
        created() {
            this.$on('clickSelectedItem', this.clickSelectedItem);
            this.$on('changeSelectedItem', this.changeSelectedItem);
            this.$on('toggleSubOpened', this.toggleSubOpened);
        },
        beforeDestroy() {
            this.$off('clickSelectedItem', this.clickSelectedItem);
            this.$off('changeSelectedItem', this.changeSelectedItem);
            this.$off('toggleSubOpened', this.toggleSubOpened);
        },
        methods: {
            addSubOpened(subName) {
                if (this.accordion) {
                    this.openedSubList = [subName];
                } else if (!this.openedSubList.includes(subName)) {
                    this.openedSubList.push(subName);
                }
            },
            toggleSubOpened(subName) {
                const index = this.openedSubList.findIndex(i => i === subName);
                if (index > -1) {
                    this.openedSubList.splice(index, 1);
                    this.$emit('close', subName);
                } else {
                    this.addSubOpened(subName);
                    this.$emit('open', subName);
                }
            },
            changeSelectedItem(item) {
                this.activeItem = item;
            },
            clickSelectedItem(item) {
                this.activeItem = item;
            }
        }
    };
</script>
