<template>
    <div
            :class="[`kd_skeleton_item_${itemType}`,'kd_skeleton_item']"
            :style="MainStyles"
    >
        <svg
                v-if="itemType=='img'"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                :style="ImageSkeletonStyle"
        >
            <path
                    d="M 64 896 V 128 h 896 v 768 H 64 Z m 64 -128 l 192 -192 l 116.352 116.352 L 640 448 l 256 307.2 V 192 H 128 v 576 Z m 224 -480 a 96 96 0 1 1 -0.064 192.064 A 96 96 0 0 1 352 288 Z"
                    class="kd_skeleton_item_img_path"
            ></path>
        </svg>
    </div>
</template>

<script>
    // import nextZIndex from '../../src/utils/zIndex.js';
    export default {
        name: 'KdSkeletonItem',
        props: {
            // 占位形状 img， button，round，square,p
            type: {
                type: String,
                default() {
                    return 'p';
                }
            },
            // item宽度
            width: {
                type: [Number, String],
                default() {
                    return '';
                }
            },
            // item高度
            height: {
                type: [Number, String],
                default() {
                    return '';
                }
            }
        },
        data() {
            return {
                itemType: this.type
            };
        },
        computed: {
            MainStyles() {
                const style = {};
                if (this.width)style.width = `${this.width}px`;
                if (this.height)style.height = `${this.height}px`;
                if (this.type === 'img')style.position = `relative`;
                return style;
            },
            ImageSkeletonStyle() {
                const style = {};
                if (this.type === 'img') {
                    style.zIndex = '50';
                    style.position = `absolute`;
                }
                return style;
            }
        },
        watch: {},
        methods: {}
    };
</script>
