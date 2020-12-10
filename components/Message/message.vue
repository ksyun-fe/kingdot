<template>
    <transition
            name="kd-message-fade"
            @after-leave="transitionAfterLeave"
    >
        <div
                v-show="isShow"
                :class="[
                    'kd-message',
                    fixed ? `kd-message-fixed` : '',
                    type ? `kd-message-${type}` : '',
                    center ? `kd-message-center` : '',
                    customClass
                ]"
                :style="style"
                @mouseover="mouseover"
                @mouseout="mouseout"
        >
            <div :class="['kd-message-wrap']">
                <i
                        v-if="!hideIcon"
                        :class="[
                            'kdicon',
                            'kd-message-icon',
                            typeClass
                        ]"
                ></i>
                <slot>
                    <div
                            v-if="dangerouslyUseHTMLString"
                            class="kd-message-content"
                            v-html="content"
                    ></div>
                    <div
                            v-else
                            class="kd-message-content"
                    >{{ content }}</div>
                </slot>
            </div>

            <i
                    v-if="closable"
                    class="kdicon kd-icon-close kd-message-close"
                    @click="close"
            ></i>
        </div>
    </transition>
</template>

<script>

    const messageTypes = ['success', 'warning', 'info', 'error'];
    const messageTypeIcon = {
        success: 'kd-icon-success-circle',
        warning: 'kd-icon-warning-solid',
        info: 'kd-icon-message-solid',
        error: 'kd-icon-error-solid'
    };

    export default {
        name: 'KdMessage',
        props: {
            width: {
                type: [String, Number],
                default() {
                    return 400;
                }
            },
            fixed: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            center: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            customClass: {
                type: String,
                default() {
                    return '';
                }
            },
            iconClass: {
                type: String
            },
            content: {
                type: String,
                default() {
                    return '';
                }
            },
            duration: {
                type: Number,
                default() {
                    return 0;
                }
            },
            type: {
                type: String,
                validator(value) {
                    return !value || messageTypes.indexOf(value) !== -1;
                },
                default() {
                    return '';
                }
            },
            hideIcon: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            closable: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            dangerouslyUseHTMLString: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            onClose: {
                type: Function
            }
        },
        data() {
            return {
                isShow: true
            };
        },
        computed: {
            typeClass() {
                return this.iconClass || messageTypeIcon[this.type] || '';
            },
            style() {
                const style = {};
                if (this.width === 'auto') {
                    style.width = this.width;
                } else if (this.width != null) {
                    style.width = this.width + 'px';
                }
                return style;
            }
        },
        mounted() {
            this.startTimer();
        },
        beforeDestroy() {
            this.clearTimer();
        },
        methods: {
            close() {
                this.isShow = false;

                if (this.onClose) {
                    this.onClose(this);
                }

                this.$emit('close', this);
            },
            mouseover() {
                this.$emit('mouseover');
            },
            mouseout() {
                this.$emit('mouseout');
            },
            startTimer() {
                this.timer && this.clearTimer();
                if (this.duration > 0) {
                    this.timer = setTimeout(() => {
                        this.close();
                    }, this.duration);
                }
            },
            clearTimer() {
                clearTimeout(this.timer);
                this.timer = null;
            },
            transitionAfterLeave() {
                this.$destroy();
                this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
            }
        }
    };
</script>
