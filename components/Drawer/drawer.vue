<template>
    <div
            v-transfer-dom
            class="kd-drawer"
            :data-transfer="true"
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
        <transition :name="MainName">
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
            top: {
                type: [String, Number],
                default: '0'
            },
            bottom: {
                type: [String, Number],
                default: '0'
            }
        },
        data() {
            return {
                flag: false,
                visible: this.value
            };
        },
        computed: {
            MainName() {
                const name = `main-${this.position}`;
                return name;
            },
            showMask() {
                return this.mask;
            },
            MainStyles() {
                const style = {};
                if (this.mask) {
                    style.border = '1px solid #e5e5e5';
                }
                if (this.position === 'right') {
                    style.width = `${this.width}px`;
                    style.right = 0;
                    style.top = this.top + 'px';
                    style.bottom = this.bottom + 'px';
                    style.height = `calc(100vh - ${this.top - 0 + this.bottom - 0}px)`;
                } else if (this.position === 'left') {
                    style.width = `${this.width}px`;
                    style.top = this.top + 'px';
                    style.marginBottom = this.bottom + 'px';
                    style.height = `calc(100vh - ${this.top - 0 + this.bottom - 0}px)`;
                } else if (this.position === 'top') {
                    style.width = '100%';
                    style.height = `${this.height}px`;
                    style.top = 0;
                } else if (this.position === 'bottom') {
                    style.width = '100%';
                    style.height = `${this.height}px`;
                    style.bottom = 0;
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
