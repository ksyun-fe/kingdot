const directives = {
    bind(el, binding) { // el为绑定的元素，binding为绑定给指令的对象
        let width = ''; let height = '';
        function isReize() {
            const style = document.defaultView.getComputedStyle(el);
            if (width !== style.width || height !== style.height) {
                binding.value({width: style.width, height: style.height});  // 关键(这传入的是函数,所以执行此函数)
            }
            width = style.width;
            height = style.height;
        }
        el.__vueSetInterval__ = setInterval(isReize, 300);
    },
    unbind(el) {
        clearInterval(el.__vueSetInterval__);
    }
};

export default directives;
