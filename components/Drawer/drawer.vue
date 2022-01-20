<template>
    <div
            v-transfer-dom
            class="kd-drawer"
            :data-transfer="true"
            :style="kdDrawerStyles"
    >
        <!-- 遮罩 -->
        <transition name="mask">
            <div
                    v-if="flag && mask"
                    class="kd-drawer-overlay"
                    @click="cancelCloseMask(maskClosable)"
            ></div>
        </transition>
        <!-- //滑块 -->
        <transition
                :name="MainName"
        >
            <div
                    v-if="flag"
                    class="kd-drawer-main"
                    :style="MainStyles"
            >
                <header
                        v-if="showHeader"
                        class="kd-drawer-title"
                >
                    <div class="kd-drawer-txt">
                        <slot name="header">{{ title }}</slot>
                    </div>

                    <span
                            class="kd-drawer-close-icon kd-icon-close"
                            @click="cancelClose"
                    ></span>
                </header>

                <section class="kd-drawer-body">
                    <slot>主内容</slot>
                </section>

                <section
                        v-if="showFooter"
                        class="kd-drawer-footer"
                >
                    <slot name="footer">
                        <div
                                class="kd-defult-footerbtn"
                        >
                            <kd-button
                                    class="kd-drawer-closbutton"
                                    @click="cancelClose"
                            >{{ cancelText }}</kd-button>

                            <kd-button
                                    type="primary"
                                    class="kd-drawer-truebutton"
                                    @click="running"
                            >{{ okText }}</kd-button>
                        </div>
                    </slot>
                </section>
            </div>
        </transition>
    </div>
</template>

<script>
    import transferDom from './transfer-dom.js';
    import nextZIndex from '../../src/utils/zIndex.js';
    export default {
        name: 'KdDrawer',
        directives: {
            transferDom
        },
        props: {
            // 是否显示抽屉
            value: {
                type: Boolean,
                default: false
            },
            // 是否显示header
            showHeader: {
                type: Boolean,
                default: true
            },
            // 是否显示footer
            showFooter: {
                type: Boolean,
                default: true
            },
            // 标题
            title: {
                type: String,
                default: '这里是标题'
            },
            // 修改取消按钮文字
            cancelText: {
                type: String,
                default: '取消'
            },
            // 修改确认按钮文字
            okText: {
                type: String,
                default: '确定'
            },
            // 是否显 示遮罩
            mask: {
                type: Boolean,
                default: true
            },
            // 点击遮罩关闭抽屉
            maskClosable: {
                type: Boolean,
                default: false
            },
            // 抽屉宽度，默认480px，最大为800px
            width: {
                type: [String, Number],
                default: '480'
            },
            height: {
                type: [String, Number],
                default: '300'
            },
            // 抽屉弹出位置（left，right，top ，bottom）
            position: {
                type: String,
                validator(v) {
                    return ['left', 'right', 'top', 'bottom'].includes(v);
                },
                default: 'right'
            },
            // 确认执行事件
            ok: {
                type: Function,
                default: undefined
            },
            // 关闭抽屉回调
            cancel: {
                type: Function,
                default: undefined
            },
            // 可视区上侧弹出位置
            top: {
                type: [String, Number],
                default: 0
            },
            // 可视区下侧弹出位置
            bottom: {
                type: [String, Number],
                default: 0
            },
            // 可视区左侧弹出位置
            left: {
                type: [String, Number],
                default: 0
            },
            // 可视区右侧弹出位置
            right: {
                type: [String, Number],
                default: 0
            }
        },
        data() {
            return {
                flag: false,
                visible: this.value,
                MainName: ''
            };
        },
        computed: {
            showMask() {
                return this.mask;
            },
            MainStyles() {
                const style = {};
                if (this.mask) {
                    style.border = '1px solid #e5e5e5';
                }
                switch (this.position) {
                    default:
                        style.width = `${this.width}px`;
                        style.right = `calc(-1 * (100% - ${this.width}px )`;
                        if (this.top || this.bottom) {
                            style.top = this.top + 'px';
                            style.marginBottom = this.bottom + 'px';
                            style.height = `calc(100vh - ${this.top + this.bottom}px)`;
                        }
                        break;
                    case 'left':
                        style.width = `${this.width}px`;
                        if (this.top || this.bottom) {
                            style.top = this.top + 'px';
                            style.marginBottom = this.bottom + 'px';
                            style.height = `calc(100vh - ${this.top + this.bottom}px)`;
                        }
                        break;
                    case 'top':
                        style.width = '100%';
                        style.height = `${this.height}px`;
                        style.top = 0;
                        break;
                    case 'bottom':
                        style.width = '100%';
                        style.height = `${this.height}px`;
                        style.bottom = 0;
                        break;
                }
                this.MainNameFun();
                return style;
            },
            kdDrawerStyles() {
                const style = {};
                switch (this.position) {
                    default:
                        style.width = `calc(100% - ${this.right}px)`;
                        break;
                    case 'left':
                        style.width = `calc(100% - ${this.left}px)`;
                        style.left = `${this.left}px`;
                        break;
                }
                return style;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                    this.flag = newValue;
                }
            },
            flag(newValue) {
                if (newValue) {
                    this.$el.style.zIndex = nextZIndex();
                }
                this.$emit('input', newValue);
            }
        },
        methods: {
            MainNameFun() {
                const name = `main-${this.position}`;
                this.MainName = name;
            },
            cancelCloseMask(value) {
                if (value) {
                    if (typeof this.cancel === 'function') {
                        this.cancel(this);
                    } else {
                        this.flag = false;
                        this.$emit('cancel');
                    }
                }
            },
            cancelClose() {
                if (typeof this.cancel === 'function') {
                    this.cancel(this);
                } else {
                    this.flag = false;
                    this.$emit('cancel');
                }
            },
            running() {
                if (typeof this.ok === 'function') {
                    this.ok(this);
                } else {
                    this.flag = false;
                    this.$emit('ok');
                }
            }
        }

    };
</script>
