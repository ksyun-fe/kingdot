<template>
    <button
            class="kd-btn"
            :class="allClassList"
            :type="nativeType"
            @click="handleClick"
    >
        <!-- 加载中 -->
        <span
                v-if="loading"
                class="kd-btn-loading-icon"
                :class="{ 'kd-icon-left': $slots.default }"
        >
            <svg
                    viewBox="0 0 120 120"
            >
                <circle
                        cx="60"
                        cy="60"
                        class="kd-spin-circle"
                        r="57"
                ></circle>
            </svg>
        </span>
        <!-- 传入icon -->
        <i
                v-if="icon"
                :class="icon"
        />
        <!-- 默认按钮 -->
        <span
                v-if="$slots.default"
                :class="{'kd-icon-right': icon && $slots.default[0].text }"
        >
            <slot/>
        </span>
    </button>
</template>

<script>
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
                default: ''
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
            }
        },
        data() {
            return {
                isActive: false,
                disabledStatus: this.disabled,
                authAbled: true,
                delayDisable: false
            };
        },
        computed: {
            // 所有样式类
            allClassList() {
                const allClassAry = [
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
            }
        },
        watch: {
            disabled: {
                immediate: true,
                handler(v) {
                    this.checkAuth();
                    this.disabledStatus = v;
                }
            },
            authid() {
                this.checkAuth();
            }
        },
        mounted() {
            this.initActive();
        },
        methods: {
            checkAuth() {
                if (!this.authid || this.disabled) return;
                if (this.$KD && this.$KD.getEnabledStatus && this.$KD.getEnabledStatus(this.authid)) {
                    this.authAbled = true;
                } else {
                    this.authAbled = false;
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
                }
            },
            //  点击事件
            handleClick(e) {
                if (this.disabled || this.loading) {
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
        }
    };
</script>
