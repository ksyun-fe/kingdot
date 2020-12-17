<template>
    <button
            class="kd-btn"
            :class="allClassList"
            :type="nativeType"
            @click="handleClick"
    >
        <!-- 加载中 -->
        <i
                v-if="loading"
                class="kd-btn-loading-icon kd-icon-loading1"
                :class="{ 'kd-icon-left': $slots.default }"
        >
        </i>
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
                default: ''
            }
        },
        data() {
            return {
                isActive: false
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
                        'kd-btn-disabled': this.disabled,
                        'kd-btn-hollow': this.hollow,
                        'kd-btn-loading': this.loading
                    }
                ];
                return allClassAry;
            }
        },
        methods: {
            //  点击事件
            handleClick(e) {
                if (!this.disabled && !this.loading) {
                    this.$emit('click', e);
                }
                if (this.$parent.$options._componentTag === 'kd-button-group') {
                    this.$parent.emit(this.value, this.isActive);
                }
            },
            active() {
                this.isActive = true;
            }
        }
    };
</script>
