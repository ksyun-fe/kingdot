<template>
    <div>
        <template v-if="visible">
            <div :class="['kd-skeleton-box', active ? 'kd-skeleton-box-active' : '']">
                <slot name="skeleton">
                    <kd-skeleton-item class="kd-skeleton-item-first"/>
                    <kd-skeleton-item
                            v-for="item in rows"
                            :key="item"
                            :class="(item==rows&&item>1)?'kd-skeleton-item-last':''"
                    />
                </slot>
            </div>
        </template>
        <!-- 真实dom展示位置 -->
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
    import kdSkeletonItem from '../SkeletonItem/skeletonItem.vue';
    export default {
        name: 'KdSkeleton',
        components: {
            kdSkeletonItem
        },
        props: {
            // 是否开启动画
            active: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            // 是否显示骨架层
            value: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            // 默认类型展示文本行数
            rows: {
                type: Number,
                default() {
                    return 3;
                }
            },
            // 条纹占位符的高度
            rowsHeight: {
                type: Number,
                default() {
                    return 40;
                }
            }
        },
        data() {
            return {
                visible: true
            };
        },
        computed: {},
        watch: {
            value: {
                immediate: true,
                handler(newValue) {
                    this.visible = newValue;
                }
            }
        },
        methods: {}
    };
</script>
