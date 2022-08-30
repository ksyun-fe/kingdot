import Vue from 'vue';
import Popper from './popper.js';
import nextZIndex from '../../../src/utils/zIndex.js';

export default {
    mixins: [Popper],
    props: {
        value: {
            type: Boolean,
            default: false
        },
        trigger: {
            type: String,
            default: 'hover',
            validator(v) {
                return ['hover', 'focus', 'click'].indexOf(v) !== -1;
            }
        },
        mouseEnterDelay: {
            type: Number,
            default: 0
        },
        mouseLeaveDelay: {
            type: Number,
            default: 0
        },
        effect: {
            type: String,
            default: 'light',
            validator(v) {
                return ['dark', 'light'].indexOf(v) !== -1;
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        canHover: {
            type: Boolean,
            default: false
        },
        showArrow: {
            type: Boolean,
            default: true
        },
        always: {
            type: Boolean,
            default: false
        },
        widthLimit: {
            type: Boolean,
            default: true
        },
        contentClass: {
            type: String,
            default: ''
        },
        popperParentToTooltip: {
            type: Boolean,
            default: false
        },
        popperMixins: {
            type: [Array],
            default() {
                return [];
            }
        },
        mouseLeaveClosePopper: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {};
    },
    watch: {
        showArrow: {
            immediate: true,
            handler(value) {
                this.visibleArrow = value;
            }
        },
        disabled: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.visible = false;
                }
            }
        },
        value: {
            immediate: true,
            handler(value) {
                if (this.visible === value) return;
                this.$nextTick(() => {
                    if (value) {
                        this.showDirect();
                    } else {
                        this.closePopper();
                    }
                });
            }
        },
        always: {
            immediate: true,
            handler(value) {
                if (value) {
                    this.visible = true;
                    this.showPopper();
                }
            }
        }
    },
    beforeCreate() {
        const mixins = this.$options.propsData.popperMixins || this.$options.props.popperMixins.default() || [];
        this.popperVM = new Vue({
            mixins: mixins,
            data: { vnode: '' },
            render() {
                return this.vnode;
            }
        }).$mount();
        if (this.$options.propsData.popperParentToTooltip) {
            this.popperVM.$parent = this;
        }
    },
    render(h) {
        this.popperVM.vnode = (
            <div v-show={this.visible} ref='popper' class={this.popperCls} style={{ zIndex: nextZIndex() }} onClick={this.popperClick}>
                <div class={['kd-tooltip-content', this.contentClass, {'kd-tooltip-limit': this.widthLimit}]}>
                    <kd-tooltip-content {...this}></kd-tooltip-content>
                </div>
            </div>
        );
        if (!this.$slots.default || !this.$slots.default.length) return this.$slots.default;
        return this.$slots.default[0];
    },
    mounted() {
        if (this.$slots.default && this.$slots.default.length > 0) {
            this.reference = this.$slots.default[0].elm;
            if (this.trigger === 'click') {
                this.reference.addEventListener('click', this.toggle);
                document.addEventListener('click', this.clickDocument);
            } else if (this.trigger === 'focus') {
                let flag = false;
                // 元素中包含input／textarea优先使用focus和blur事件，其他使用mouse事件
                if (this.reference.nodeName === 'INPUT' ||
                    this.reference.nodeName === 'TEXTAREA') {
                    this.reference.addEventListener('focus', this.showPopper);
                    this.reference.addEventListener('blur', this.closePopper);
                    flag = true;
                } else if (this.reference.children.length > 0) {
                    flag = Array.from(this.reference.children).some((node) => {
                        if (node.nodeName === 'INPUT' || node.nodeName === 'TEXTAREA') {
                            node.addEventListener('focus', this.showPopper);
                            node.addEventListener('blur', this.closePopper);
                            return true;
                        }
                        return false;
                    });
                }
                if (!flag) {
                    this.reference.addEventListener('mousedown', this.showPopper);
                    this.reference.addEventListener('mouseup', this.closePopper);
                    // 处理鼠标一直按下直到移出点击区域时浮层没关闭的情况
                    this.reference.addEventListener('blur', this.closePopper);
                    this.reference.addEventListener('mouseout', this.closePopper);
                }
            } else {
                this.reference.addEventListener('mouseenter', (e) => {
                    e.stopPropagation();
                    this.showPopper(e);
                });
                this.reference.addEventListener('mouseleave', (e) => {
                    e.stopPropagation();
                    this.closePopper();
                });
                this.reference.addEventListener('mousemove', (e) => {
                    e.stopPropagation();
                });
            }
            this.$nextTick(() => {
                this.popper = this.$refs.popper;
                if (this.popper && this.trigger === 'hover' && this.canHover) {
                    this.popper.addEventListener('mouseenter', () => {
                        clearTimeout(this.timeout);
                    });
                    this.popper.addEventListener('mouseleave', this.closePopper);
                }
            });
        }
    },
    computed: {
        popperCls() {
            const theme = ['dark', 'light'].includes(this.effect) ? this.effect : 'light';
            return ['kd-tooltip', `kd-tooltip-${theme}`].concat(this.placementCls);
        },
        currentMouseEnterDelay() {
            return this.mouseEnterDelay * 1000;
        },
        currentMouseLeaveDelay() {
            return this.mouseLeaveDelay * 1000;
        }
    },
    destroyed() {
        document.removeEventListener('click', this.clickDocument);
    },
    methods: {
        popperClick(e) {
            e.stopPropagation();
        },
        toggle() {
            return this.visible ? this.closePopper() : this.showPopper();
        },
        showDirect() {
            if (this.visible) return;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const hasContent = !!(this.$slots.content || this.content);
                this.visible = hasContent;
                this.$emit('input', this.visible);
            }, this.currentMouseEnterDelay);
        },
        showPopper() {
            if (this.visible) return;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                const hasContent = !!(this.$slots.content || this.content);
                this.visible = !this.disabled && hasContent;
                if (this.mouseLeaveClosePopper) {
                    document.addEventListener('mousemove', this.closePopper, false);
                }
                this.$emit('input', this.visible);
            }, this.currentMouseEnterDelay);
        },
        closePopper() {
            if (!this.visible) return;
            if (this.always) return;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.visible = false;
                if (this.mouseLeaveClosePopper) {
                    document.removeEventListener('mousemove', this.closePopper);
                }
                this.$emit('input', this.visible);
            }, this.currentMouseLeaveDelay);
        },
        clickDocument(e) {
            if (!this.visible ||
                !this.$el ||
                !this.reference ||
                !this.popper ||
                this.$el.contains(e.target) ||
                this.reference.contains(e.target) ||
                this.popper.contains(e.target)) return;
            this.closePopper();
        }
    }
};
