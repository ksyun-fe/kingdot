<template>
    <div
            v-transfer-dom
            class="kd-dialog-container"
            :data-transfer="transfer"
    >
        <!-- 遮罩层 -->
        <transition name="kd-dialog-mask">
            <div
                    v-if="visible && modal"
                    class="kd-dialog-mask"
                    @click="handleModalClick"
            ></div>
        </transition>
        <transition
                name="kd-dialog-fade"
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
                        :class="`kd-dialog-${type}`"
                >
                    <!-- dialog header部分 -->
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
                        <!-- 标题 -->
                        <slot
                                v-if="showTitle"
                                name="title"
                        >
                            <span class="kd-dialog-title">{{ title }}</span>
                        </slot>
                        <!-- 关闭按钮 -->
                        <i
                                v-if="showClose"
                                class="kd-dialog-icon kd-icon-close"
                                @click.stop="close"
                        ></i>
                        <div
                                v-if="showTitle"
                                class="kd-dialog-line"
                        ></div>
                    </div>
                    <!-- 常规内容区域 -->
                    <div
                            v-if="type == 'default'"
                            class="kd-dialog-body"
                            :style="bodyStyle"
                    >
                        <slot>我是内容区域</slot>
                    </div>
                    <!-- 二次确认类内容区域 -->
                    <div
                            v-if="type == 'confirm'"
                            class="kd-dialog-body"
                    >
                        <slot>
                            <span
                                    v-if="icon"
                                    class="kd-icon-section"
                            >
                                <i
                                        :class="['kd-dialog-icon-size-confirm', iconObj]"
                                        :style="{ color: iconColorObj }"
                                ></i>
                            </span>
                            <p class="kd-dialog-confirm-title">{{ confirmTitle }}</p>
                            <p class="kd-dialog-confirm-tips">{{ confirmTips }}</p>
                        </slot>
                    </div>
                    <!-- 提示类内容区域 -->
                    <div
                            v-if="type == 'tips'"
                            class="kd-dialog-body kd-dialog-tips-body"
                            :class="{ 'kd-dialog-tips-body-center': tipsIsCenter }"
                    >
                        <slot>
                            <span
                                    v-if="icon"
                                    class="kd-icon-section kd-dailog-tips-icon"
                            >
                                <i
                                        :class="[
                                            'kd-dialog-icon-size-tips',
                                            iconObj,
                                            { 'kd-dialog-icon-size-tips-center': tipsIsCenter },
                                        ]"
                                        :style="{ color: iconColorObj }"
                                ></i>
                            </span>
                            <span
                                    class="kd-dialog-tips-title"
                                    :class="{ 'kd-dialog-tips-title-center': tipsIsCenter }"
                            >{{ tipsTitle }}</span>
                            <p
                                    class="kd-dialog-tips-message"
                                    :class="{ 'kd-dialog-tips-message-center': tipsIsCenter }"
                            >
                                {{ tipsMessage }}
                            </p>
                        </slot>
                    </div>
                    <!-- dialog footer部分 -->
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
                            <kd-button
                                    class="kd-dialog-btn"
                                    @click="close(true)"
                            >
                                {{ cancelText }}
                            </kd-button>
                            <kd-button
                                    class="kd-dialog-btn"
                                    type="primary"
                                    :disabled="disableOk || selfDisableOk"
                                    :loading="selfDisableOk"
                                    @click="_ok"
                            >
                                <span>{{ okText }}</span>
                            </kd-button>
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
            // v-model绑定，控制dialog显示与隐藏
            value: {
                type: Boolean,
                default: false
            },
            // Dialog 的标题，也可通过具名 slot
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
            // 是否显示关闭按钮
            showClose: {
                type: Boolean,
                default: true
            },
            // dialog 类型
            type: {
                type: String,
                default: 'default' // default,confirm,tips
            },
            // icon类型
            icon: {
                type: String,
                default: '' // success,failed,warning,info
            },
            // 二次确认标题 type:confirm
            confirmTitle: {
                type: String,
                default: ''
            },
            // 二次确认提示文字 type:confirm
            confirmTips: {
                type: String,
                default: ''
            },
            // tipsTitle  type为tips
            tipsTitle: {
                type: String,
                default: '成功'
            },
            tipsMessage: {
                type: String,
                default: ''
            },
            tipsIsCenter: {
                type: Boolean,
                default: false
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
                default: false
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
                selfDisableOk: false,
                closed: false,
                marginTop: 0,
                marginLeft: 0,
                originData: { marginTop: 0, marginLeft: 0 },
                iconColor_obj: {
                    success: '#38C482',
                    failed: '#EF4E76',
                    warning: '#FF9A42',
                    info: '#547DFC'
                }
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
            },
            iconObj() {
                return {
                    'kd-icon-success-solid': this.icon === 'success',
                    'kd-icon-error-solid': this.icon === 'failed',
                    'kd-icon-warning-solid': this.icon === 'warning',
                    'kd-icon-message-solid': this.icon === 'info'
                };
            },
            iconColorObj() {
                return this.iconColor_obj[this.icon];
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

        created() {
        },
        // 销毁前移除dom
        destroyed() {
            // if appendToBody is true, remove DOM node after destroy
            if (this.appendToBody && this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        },
        methods: {
            // 确认按钮的回调，默认关闭dialogue
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
            // 取消按钮回调 关闭Dialog
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
            // dialog可以移动相关计算
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
