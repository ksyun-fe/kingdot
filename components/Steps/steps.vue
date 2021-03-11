<template>
    <div
            id="kd-steps"
            ref="kdSteps"
            class="kd-steps-container"
            :class="{ 'kd-steps-container-vertical': orientation === 'vertical' }"
            :style="stepsStyle"
    >
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
    import { isIe } from '../../src/utils/utils.js';
    export default {
        name: 'KdSteps',
        components: {},
        props: {
            value: {
                type: [String, Number],
                default: 1
            },
            type: {
                type: String,
                default: 'default' // default，simple,spot若为simple，description/direction/space失效
            },
            position: {
                type: String,
                default: 'left'
            },
            size: {
                type: String,
                default: 'default'
            },
            direction: {
                type: String,
                default: 'horizontal' // (horizontal,vertical),vertical,父元素一定要设置高度
            },
            width: {
                type: [String, Number]
            },
            isClick: {
                type: Boolean,
                default: false
            },
            finishStatus: {
                type: String,
                default: 'finished' // error,wait,finished,active
            },
            currentStatus: {
                type: String,
                default: 'active' // error,wait,finished,active
            }
        },
        data() {
            return {
                stepIndex: this.value,
                children: [],
                orientation: this.direction,
                spotLineLH: ''
            };
        },
        computed: {
            stepsStyle() {
                const style = {};
                if (this.width) {
                    style.width = this.width + 'px';
                }
                return style;
            }
        },
        watch: {
            value(v) {
                this.stepIndex = v;
            },
            direction(v) {
                this.orientation = v;
            }
        },
        created() {
            this.resetDirection();
        },
        mounted() {
            this.getChildWidth();
        },
        methods: {
            resetDirection() {
                if (this.type !== 'default') {
                    this.orientation = 'horizontal';
                }
            },
            getChildrenIndex(child) {
                if (child) {
                    this.children.push(child);
                }
                return this.children.length;
            },
            getChildWidth() {
                const childNum = this.children.length;
                const precent = 100;
                const lastChildWidth = precent / childNum + '%';
                const leftStyle = (precent / childNum) + 5 + '%';
                const parent = this.$el;
                if (this.type === 'default' && this.direction === 'vertical') {
                    Array.from(parent.children)[childNum - 1].style[
                        'max-height'
                    ] = lastChildWidth;
                } else {
                    Array.from(parent.children)[childNum - 1].style[
                        'max-width'
                    ] = lastChildWidth;
                    Array.from(parent.children).forEach(item => {
                        const headWidth = isIe() ? item.children[0].children[0].children[0].clientWidth : item.children[0].children[0].children[0].offsetWidth;
                        const firstChild = item.children[0].children[0].children[1].children[0];
                        const titleWidth = firstChild ? isIe() ? firstChild.clientWidth : firstChild.offsetWidth : 0;
                        const secondChild = item.children[0].children[0].children[1].children[1];
                        if (!secondChild && firstChild) {
                            item.children[0].children[0].children[1].style.width = titleWidth + headWidth + 'px';
                        }
                    });
                }
                if (this.type === 'simple') {
                    Array.from(parent.children)[childNum - 1].style[
                        'flex-basis'
                    ] = lastChildWidth;
                    Array.from(parent.children).forEach(item => {
                        const head = item.children[0].children[0].children[0].children[0];
                        if (head && head.className === 'kd-step-head') {
                            item.children[0].children[0].children[0].style.left = leftStyle;
                        }
                    });
                }
                if (this.type === 'spot') {
                    Array.from(parent.children).forEach(item => {
                        const headHeight = isIe() ? item.children[0].children[0].children[0].clientHeight : item.children[0].children[0].children[0].offsetHeight;
                        this.spotLineLH = headHeight;
                        const firstChild = item.children[0].children[0].children[1].children[0];
                        const secondChild = item.children[0].children[0].children[1].children[1];
                        const titleHeight = firstChild ? isIe() ? firstChild.clientHeight : firstChild.offsetHeight : 0;
                        const descHeight = secondChild ? isIe() ? secondChild.clientHeight : secondChild.offsetHeight : 0;
                        if (firstChild && secondChild) {
                            item.children[0].children[0].children[1].style.height = titleHeight + descHeight + 'px';
                            item.children[0].children[0].style.height = headHeight + titleHeight + descHeight + 'px';
                        } else if (firstChild && !secondChild) {
                            item.children[0].children[0].children[1].style.height = titleHeight + 'px';
                            item.children[0].children[0].style.height = headHeight + titleHeight + 'px';
                        } else {
                            item.children[0].children[0].children[1].style.height = 'auto';
                            item.children[0].children[0].style.height = headHeight + 'px';
                        }
                    });
                }
            }
        }
    };
</script>

