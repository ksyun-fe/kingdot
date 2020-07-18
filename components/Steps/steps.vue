<template>
    <div
            id="kd-steps"
            ref="kdSteps"
            class="kd-steps-container"
            :class="{ 'kd-steps-container-vertical': orientation == 'vertical' }"
            :style="stepsStyle"
    >
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'Steps',
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
                default: 'level' // (level,vertical),vertical,父元素一定要设置高度
            },
            width: {
                type: [Number, String]
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
                orientation: this.direction
            };
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
                if (this.type != 'default') {
                    this.orientation = 'level';
                }
            },
            stepsStyle() {
                const style = {};
                if (this.width) {
                    style.width = Number(this.width) + 'px';
                    window.getComputedStyle(this.$el).width = this.width + 'px';
                }
                return style;
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
                const parent = this.$el;
                if (this.type == 'default' && this.direction == 'vertical') {
                    Array.from(parent.children)[childNum - 1].style[
                        'max-height'
                    ] = lastChildWidth;
                } else {
                    Array.from(parent.children)[childNum - 1].style[
                        'max-width'
                    ] = lastChildWidth;
                }
                if (this.type == 'simple') {
                    Array.from(parent.children)[childNum - 1].style[
                        'flex-basis'
                    ] = lastChildWidth;
                }
            }
        }
    };
</script>

