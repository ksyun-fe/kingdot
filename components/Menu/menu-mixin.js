export default {
    inject: ['menu'],
    computed: {
        paddingStyle() {
            let padding = 24;
            let parent = this.$parent;
            if (parent.$options.componentName === 'KdMenu' && parent.isHorizontalMode) return {};
            if (!this.menu.collapse && !(parent.$options.componentName === 'KdSubmenu' && parent.isPopperMode)) {
                while (parent && parent.$options.componentName !== 'KdMenu') {
                    if (parent.$options.componentName === 'KdSubmenu' && parent.isPopperMode) {
                        break;
                    }
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
