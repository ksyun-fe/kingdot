import Lang from 'src/mixin/lang.js';
export default {
    name: 'KdButton',
    mixins: [Lang],
    props: {
        value: {
            type: [Number, String]
        },
        type: {
            type: String,
            default: 'default'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'middle'
        },
        shape: {
            type: String,
            default: ''
        },
        hollow: {
            type: Boolean,
            default: false
        },
        split: {
            type: Boolean,
            default: false
        },
        nativeType: {
            type: String,
            default: 'button'
        },
        authid: {
            type: String,
            default: ''
        },
        clickDelay: {
            type: Boolean,
            default: false
        },
        delayTime: {
            type: Number,
            default: 3000
        },
        href: {
            type: String,
            default: 'javascript:;'
        },
        target: {
            type: String,
            default: '_self'
        }
    },
    data() {
        return {
            isActive: false,
            disabledStatus: this.disabled,
            authAbled: true,
            delayDisable: false,
            link: 'javascript:;',
            linkTarget: '_self',
            isShow: true
        };
    },
    computed: {
        // 所有样式类
        allClassList() {
            const allClassAry = [
                'kd-btn',
                `kd-btn-${this.type}`,
                this.shape ? `kd-btn-${this.shape}` : '',
                this.size ? `kd-btn-${this.size}` : '',
                {
                    'kd-btn-active': this.isActive,
                    'kd-btn-split': this.split,
                    'kd-btn-disabled': this.disabledStatus || !this.authAbled,
                    'kd-btn-hollow': this.hollow,
                    'kd-btn-loading': this.loading
                }
            ];
            return allClassAry;
        },
        enableStatus() {
            if (this.authid) {
                return this.$KD && this.$KD.getEnabledStatus ? this.$KD.getEnabledStatus(this.authid) : true;
            } else {
                return true;
            }
        },
        btnShowStatus() {
            return this.$KD && this.$KD.setBtnEnableType ? this.$KD.setBtnEnableType() === 'disabled' : true;
        }
    },
    watch: {
        disabled: {
            immediate: true,
            handler(v) {
                this.checkAuth();
                this.handleHerf();
                this.disabledStatus = v;
            }
        },
        authid() {
            this.$nextTick(() => {
                this.checkAuth();
            });
        },
        href: {
            immediate: true,
            handler(v) {
                this.link = v;
                this.handleHerf();
            }
        },
        target: {
            immediate: true,
            handler(v) {
                this.linkTarget = v;
                this.handleHerf();
            }
        }
    },
    mounted() {
        this.initActive();
    },
    methods: {
        checkAuth() {
            if (!this.authid) return;
            if (this.enableStatus) {
                this.isShow = true;
                this.authAbled = !this.disabled;
            } else {
                if (this.btnShowStatus) {
                    this.authAbled = false;
                    this.isShow = true;
                } else {
                    this.isShow = false;
                }
            }
        },
        handleHerf() {
            if (!this.authAbled || this.disabled) {
                this.link = 'javascript:;';
                this.linkTarget = '_self';
                this.disabledStatus = true;
            } else {
                this.linkTarget = this.target;
                if (this.$KD && this.$KD.setButtonLink) {
                    this.link = this.$KD.setButtonLink(this.href);
                }
            }
        },
        initActive() {
            const parent = this.$parent;
            if (!parent) return;
            if (parent.$options._componentTag === 'kd-button-group') {
                if (parent.checkType === 'radio') {
                    if (parent.value === this.value) this.isActive = true;
                } else if (parent.checkType === 'checkbox') {
                    parent.value.forEach(item => {
                        if (item === this.value) this.isActive = true;
                    });
                }
                if (parent.disabledStatus) this.disabledStatus = true;
            }
        },
        //  点击事件
        handleClick(e) {
            if (!this.authAbled || this.disabled || this.loading) {
                return;
            }
            this.$emit('click', e);
            if (this.clickDelay) {
                this.disabledStatus = true;
                window.setTimeout(() => {
                    this.disabledStatus = false;
                }, this.delayTime);
            }
            const parent = this.$parent;
            if (!parent) return;
            if (parent.$options._componentTag === 'kd-button-group') {
                this.$parent.emit(this.value, this.isActive);
            }
        },
        active() {
            this.isActive = true;
        }
    },
    render(h, ctx) {
        if (this.isShow) {
            if (this.type !== 'text') {
                return (
                    <button
                        class={ this.allClassList }
                        type={ this.nativeType }
                        onClick={ this.handleClick }
                    >
                        {
                            this.loading
                                ? <span
                                    class={ ['kd-btn-loading-icon', {'kd-icon-left': this.$slots.default}] }
                                >
                                    <svg viewBox='0 0 120 120'>
                                        <circle
                                            cx='60'
                                            cy='60'
                                            class='kd-spin-circle'
                                            r='57'
                                        ></circle>
                                    </svg>
                                </span> : ''
                        }
                        { this.icon ? <i class={ this.icon }/> : '' }
                        { this.$slots.default
                            ? <span class={ [{'kd-icon-right': this.icon && this.$slots.default[0].text}] }>{ this.$slots.default }</span>
                            : '' }
                    </button>
                );
            } else {
                return (
                    <a
                        href={ this.link }
                        class={ this.allClassList }
                        target={ this.linkTarget }
                        onClick={ this.handleClick }
                    >{ this.$slots.default }</a>
                );
            }
        }
    }
};
