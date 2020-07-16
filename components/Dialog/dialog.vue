<template>
    <div
            v-transfer-dom
            class="kd-dialog-container"
            :data-transfer="transfer"
    >
        <transition name="kd-dialog-mask">
            <div
                    v-if="visible && modal"
                    class="kd-dialog-mask"
                    @click="handleModalClick"
            ></div>
        </transition>
        <transition
                name="kd-dialog-fade"
                @after-enter="afterEnter"
                @after-leave="afterLeave"
        >
            <div
                    v-if="visible"
                    class="kd-dialog-wrapper"
            >
                <div
                        class="kd-dialog"
                        :style="[
                            style,
                            { transform: `translate(${marginLeftUnit},${marginTopUnit})` },
                        ]"
                >
                    <div
                            :class="[
                                'kd-dialog-header',
                                {
                                    'kd-dialog-center': center,
                                    'kd-dialog-header-backgroundColor': showTitle,
                                },
                            ]"
                            @mousedown="mousedown($event)"
                    >
                        <slot
                                v-if="showTitle"
                                name="title"
                        >
                            <span class="kd-dialog-title">{{ title }}</span>
                        </slot>
                        <i
                                v-if="showClose"
                                class="kd-dialog-icon kdicon iconguanbi"
                                @click.stop="close"
                        ></i>
                        <div
                                v-if="showTitle"
                                class="kd-dialog-line"
                        ></div>
                    </div>
                    <div
                            v-if="type == 'default'"
                            class="kd-dialog-body"
                            :style="bodyStyle"
                    >
                        <slot>我是内容区域</slot>
                    </div>
                    <div
                            v-if="type == 'message'"
                            class="kd-dialog-body"
                    >
                        <slot>
                            <span
                                    v-if="icon"
                                    class="kd-icon-section"
                            >
                                <i
                                        :class="['kd-dialog-icon-size-message', 'kdicon', icon]"
                                        :style="{ color: iconColor }"
                                ></i>
                            </span>
                            <p
                                    v-if="iconTitle != ''"
                                    class="kd-dialog-icon-title"
                            >
                                {{ iconTitle }}
                            </p>
                            <p
                                    v-if="additionalTips != ''"
                                    class="kd-dialog-message"
                            >
                                {{ additionalTips }}
                            </p>
                            <p class="kd-dialog-confirm-title">{{ confirmTitle }}</p>
                            <p class="kd-dialog-confirm-tips">{{ confirmTips }}</p>
                        </slot>
                    </div>
                    <div
                            v-if="type == 'tips'"
                            class="kd-dialog-body kd-dialog-tips-body"
                    >
                        <slot>
                            <span
                                    v-if="icon"
                                    class="kd-icon-section kd-dailog-tips-icon"
                            >
                                <i
                                        :class="['kd-dialog-icon-size-tips', 'kdicon', icon]"
                                        :style="{ color: iconColor }"
                                ></i>
                            </span>
                            <span class="kd-dialog-tips-title">{{ tipsTitle }}</span>
                            <p class="kd-dialog-tips-message">{{ tipsMessage }}</p>
                        </slot>
                    </div>
                    <div
                            :class="{
                                'kd-dialog-footer': true,
                                'kd-dialog-footer-height': !showFooter,
                                'kd-dialog-center': center,
                            }"
                    >
                        <div
                                v-if="showFooter"
                                class="kd-dialog-line"
                        ></div>
                        <slot
                                v-if="showFooter"
                                name="footer"
                        >
                            <button
                                    class="kd-dialog-btn kd-dialog-btn-default"
                                    @click="close(true)"
                            >
                                {{ cancelText }}
                            </button>
                            <button
                                    class="kd-dialog-btn"
                                    :class="{
                                        'kd-dialog-btn-disabled': disableOk,
                                        'kd-dialog-btn-primary': !disableOk,
                                    }"
                                    type="primary"
                                    :disabled="disableOk || this.selfDisableOk"
                                    @click="_ok"
                            >
                                <i
                                        v-if="this.selfDisableOk"
                                        class="kd-dialog-btn-loading"
                                        :class="{ 'kd-dialog-btn-loading-disabled': disableOk }"
                                ></i>
                                {{ okText }}
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import transferDom from './transfer-dom.js';
    import { mouseDragBegin, animationFrame } from './utils.js';
    export default {
        name: 'Dialog',
        directives: { transferDom },
        props: {
            // Dialog 的标题，也可通过具名 slot （见下表）传入
            title: {
                type: String,
                default: '标题'
            },
            // modal    是否需要遮罩层
            modal: {
                type: Boolean,
                default: true
            },
            // 是否需要头部
            showTitle: {
                type: Boolean,
                default: true
            },
            // 是否需要底部
            showFooter: {
                type: Boolean,
                default: true
            },
            // show-close    是否显示关闭按钮
            showClose: {
                type: Boolean,
                default: true
            },
            // dialog 类型
            type: {
                type: String,
                default: 'default' // default,message,tips
            },
            // additionalTips 附加提示  type为message
            additionalTips: {
                type: String,
                default: ''
            },
            // dialog message
            message: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: '' // success,failed,warning,info
            },
            iconTitle: {
                type: String,
                default: ''
            },
            iconColor: {
                type: String,
                default: ''
            },
            // 二次确认标题
            confirmTitle: {
                type: String,
                default: ''
            },
            // 二次确认提示文字
            confirmTips: {
                type: String,
                default: ''
            },
            // tipsTitle  type为tips
            tipsTitle: {
                type: String,
                default: ''
            },
            tipsMessage: {
                type: String,
                default: ''
            },
            // width    Dialog 的宽度
            width: {
                type: [Number, String],
                default: 480
            },
            height: {
                type: [Number, String],
                default: ''
            },
            isScroll: {
                type: Boolean,
                default: false
            },
            // center    是否对头部和底部采用居中布局
            center: {
                type: Boolean,
                default: false
            },
            //
            value: {
                type: Boolean,
                default: false
            },
            // 点击遮罩层关闭dialog
            clickModalToClose: {
                type: Boolean,
                default: false
            },
            ok: {
                type: Function,
                default: undefined
            },
            cancel: {
                type: Function,
                default: undefined
            },
            cancelText: {
                type: String,
                default: '取消'
            },
            okText: {
                type: String,
                default: '确认'
            },
            // 确认按钮是否禁用
            disableOk: {
                type: Boolean,
                default: false,
                required: false
            },
            transfer: {
                type: Boolean,
                default() {
                    return !this.$IVIEW || this.$IVIEW.transfer === ''
                        ? true
                        : this.$IVIEW.transfer;
                }
            }
        },

        data() {
            return {
                visible: this.value,
                mask: this.modal,
                selfDisableOk: true,
                closed: false,
                marginTop: 0,
                marginLeft: 0,
                originData: { marginTop: 0, marginLeft: 0 }
            };
        },

        computed: {
            style() {
                const style = {};
                if (this.width) {
                    style.width = this.width + 'px';
                }
                return style;
            },
            bodyStyle() {
                const style = {};
                if (this.height) {
                    style['max-height'] = this.height + 'px';
                    if (this.isScroll) {
                        style['overflow-y'] = 'scroll';
                    } else {
                        style.overflow = 'hidden';
                    }
                }
                return style;
            },
            marginTopUnit() {
                return this.marginTop + 'px';
            },
            marginLeftUnit() {
                return this.marginLeft + 'px';
            }
        },

        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                    this.visible = newValue;
                    this.marginTop = 0;
                    this.marginLeft = 0;
                    this.originData = { marginTop: 0, marginLeft: 0 };
                }
            },
            visible(newValue) {
                this.$emit('input', newValue);
            }
        },
        // 销毁前移除dom
        destroyed() {
            // if appendToBody is true, remove DOM node after destroy
            if (this.appendToBody && this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        },

        methods: {
            _ok() {
                if (this.disableOk) return;
                const callback = this.ok;
                if (typeof callback === 'function') {
                    callback.call(this, this);
                } else {
                    this.visible = false;
                    this.mask = false;
                    this.$emit('ok');
                }
            },
            // 关闭Dialog
            close(flag) {
                const callback = this.cancel;
                if (typeof callback === 'function' && flag) {
                    callback.call(this, this);
                } else {
                    this.visible = false;
                    this.mask = false;
                    this.$emit('cancel');
                }
            },
            // 展示和隐藏加载图标
            hideLoading() {
                this.selfDisableOk = false;
            },
            showLoading() {
                this.selfDisableOk = true;
            },
            // 点击遮罩层关闭对话框
            handleModalClick() {
                if (!this.clickModalToClose) return;
                this.close();
            },
            afterEnter() {
                this.$emit('opened');
            },
            afterLeave() {
                this.$emit('closed');
            },

            drag(startPoint, endPoint) {
                animationFrame(() => {
                    this.marginTop = endPoint.y - startPoint.y + this.originData.marginTop;
                    this.marginLeft =
                        endPoint.x - startPoint.x + this.originData.marginLeft;
                });
            },
            dragEnd(startPoint, endPoint) {
                animationFrame(() => {
                    this.originData = {
                        marginTop: this.marginTop,
                        marginLeft: this.marginLeft
                    };
                });
            },
            mousedown(e) {
                mouseDragBegin(e, this.drag, this.dragEnd, { top: 50 });
            }
        }
    };
</script>
<style lang="">
/* @import "./dialog.css"; */
</style>
