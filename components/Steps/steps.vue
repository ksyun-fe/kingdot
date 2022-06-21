<template>
    <div
            id="kd-steps"
            ref="kdSteps"
            :class="allClassList"
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
                default: 'right'
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
            },
            finishedStyle: {
                type: String,
                default: 'icon' // icon number
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
            allClassList() {
                const allClassAry = [
                    'kd-steps-container',
                    this.direction ? `kd-steps-${this.direction}` : ''
                ];
                return allClassAry;
            },
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
            },
            children(steps) {
                steps.forEach((child, index) => {
                    child.index = index + 1;
                });
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
            getChildWidth() {
                const childNum = this.children.length;
                const precent = 100;
                const lastChildWidth = precent / childNum + '%';
                const parent = this;
                const childrenList = Array.from(parent.children);
                const lastChild = childrenList[childNum - 1];
                if (childNum === 2) {
                    childrenList[0].$el.style['flex-basis'] = 90 + '%';
                }
                if (this.type === 'default' && this.direction === 'vertical') {
                    const headH = lastChild.$refs.stepHead.clientHeight;
                    const mainElement = lastChild.$refs.stepMain;
                    lastChild.$el.style['max-height'] = lastChildWidth;
                    if (!mainElement) {
                        lastChild.$el.style.height = headH + 'px';
                    } else {
                        if (!lastChild.$refs.stepDesc && lastChild.$refs.stepTitle) {
                            lastChild.$el.style.height = headH + 'px';
                        }
                    }
                } else if (this.type === 'default' && this.direction === 'horizontal') {
                    lastChild.$el.style['max-width'] = lastChildWidth;
                    childrenList.forEach((item, index) => {
                        const stepHead = item.$refs.stepHead;
                        const headWidth = stepHead ? isIe() ? stepHead.clientWidth : stepHead.offsetWidth : 0;
                        const mainElement = item.$refs.stepMain;
                        const stepTitle = mainElement ? item.$refs.stepTitle : null;
                        const titleWidth = stepTitle ? isIe() ? stepTitle.clientWidth : stepTitle.offsetWidth : 0;
                        const stepDesc = mainElement ? item.$refs.stepDesc : null;
                        if (!stepDesc && stepTitle) {
                            item.$refs.stepMain.style.width = titleWidth + headWidth + 'px';
                        }
                        if (index === childrenList.length - 1) {
                            if (!mainElement) {
                                item.$el.style.width = headWidth + 'px';
                            }
                        }
                    });
                }
                if (this.type === 'simple') {
                    lastChild.$el.style['flex-basis'] = lastChildWidth;
                }
            }
        }
    };
</script>

