<template>
    <div>
    <!-- 圆形 -->

    <!-- 圆形组 -->

    <!-- 文本段落 -->

    <!-- 方形 -->

    <!-- 表格 -->
    </div>
</template>

<script>
    export default {
        name: 'KdSkeleton',
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
            }
        },
        data() {
            return {};
        },
        computed: {},
        watch: {},
        methods: {}
    };
</script>
