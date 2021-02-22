<template>
    <div
            a:transition="c-fade"
            :class="[
                {
                    'kd-spin': true,
                    [`kd-spin-${size}`]: size !== 'default',
                    'kd-spin-overlay': overlay,
                    'kd-spin-local': isLocal
                },
            ]"
            :style="[
                {
                    'zIndex': zIndex,
                    'backgroundColor': overlay ? background : ''
                }
            ]"
    >
        <div
                :class="[
                    {
                        'kd-spin-wrapper': overlay
                    }
                ]"
        >
            <!-- spinner -->
            <div
                    v-if="spinner && typeof(spinner) == 'boolean'"
                    class="kd-spin-defined"
            >
                <slot></slot>
            </div>
            <div
                    class="kd-spin-animation"
            >
                <svg
                        v-if="!spinner && typeof(spinner) == 'boolean'"
                        viewBox="0 0 120 120"
                >
                    <circle
                            cx="60"
                            cy="60"
                            class="kd-spin-circle"
                            r="57"
                    ></circle>
                </svg>
                <i
                        v-else
                        :class="[spinner,'kd-spin-roate']"
                ></i>
            </div>
            <!-- text -->
            <div
                    v-if="text != ''"
                    class="kd-spin-text"
            >
                {{ text }}
            </div>
        </div>
    </div>
</template>

<script>
    import zIndex from 'src/utils/zIndex.js';
    export default {
        name: 'KdSpin',
        props: {
            // 展示文案
            text: {
                type: String,
                default: ''
            },
            // 尺寸
            size: {
                type: String,
                default: 'default'
            },
            // 遮罩层
            overlay: {
                type: Boolean,
                default: true
            },
            // 颜色
            background: {
                type: String,
                default: 'rgba(255, 255, 255, .5)'
            },
            // 自定义加载图标
            spinner: {
                type: [Boolean, String],
                default: false
            },
            // 局部
            isLocal: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                zIndex: 0
            };
        },
        created() {
            this.zIndex = zIndex();
        }
    };
</script>
