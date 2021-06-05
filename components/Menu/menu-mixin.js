export default {
    inject: ['menu'],
    computed: {
        paddingStyle() {
            if (this.menu.mode === 'horizontal') return {};

            let padding = 24;
            let parent = this.$parent;
            if (this.menu.collapse) {
                padding = 24;
            } else {
                while (parent && parent.$options.componentName !== 'KdMenu') {
                    if (parent.$options.componentName === 'KdSubmenu') {
                        padding += 24;
                    }
                    parent = parent.$parent;
                }
            }
            return {paddingLeft: padding + 'px'};
        }
    }
};
