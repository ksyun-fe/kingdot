<template>
    <div
            ref="wrap"
            :class="{
                'kd-draggable': true,
                'kd-draggable-horizontal': horizontal,
                'kd-draggable-vertical': vertical,
            }"
            :style="wrapStyle"
    >
        <div
                v-if="horizontal"
                ref="dragHorizontalEle"
                class="kd-drag-horizontal"
                :class="['kd-drag-horizontal-' + dragDirection]"
                @mousedown="dragEleMousedown"
        >
            <slot
                    name="drag-horizontal-ele"
            >

            </slot>
        </div>
        <div
                v-if="vertical"
                ref="dragVerticalEle"
                class="kd-drag-vertical"
                :class="['kd-drag-vertical-' + dragDirection]"
                @mousedown="dragEleMousedown"
        >
            <slot
                    name="drag-vertical-ele"
            >

            </slot>
        </div>

        <div class="kd-draggable-content">
            <div class="kd-draggable-content-main">
                <slot name="content"></slot>
            </div>
        </div>

    </div>
</template>
<script>

    import {
        addEvent,
        delEvent,
        _requestAnimationFrame
    } from './util.js';

    export default {
        name: 'KdDraggablePanel',
        components: {
        },
        props: {
            width: {
                type: [String, Number]
            },
            height: {
                type: [String, Number]
            },
            maxHeight: {
                type: [String, Number]
            },
            minHeight: {
                type: [String, Number],
                default() {
                    return 0;
                }
            },
            maxWidth: {
                type: [String, Number]
            },
            minWidth: {
                type: [String, Number],
                default() {
                    return 0;
                }
            },
            horizontal: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            vertical: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            moveDirection: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                heightValue: this.minHeight,
                widthValue: this.minWidth,
                showMax: false,
                startPos: null,
                stopPos: null
            };
        },
        computed: {
            wrapStyle() {
                const style = {};
                const height = this.checkHeight(this.heightValue);
                const width = this.checkWidth(this.widthValue);
                this.$emit('update:height', this.logMax ? '100%' : height);
                this.$emit('update:width', this.logMax ? '100%' : width);
                if (this.horizontal) {
                    style.width = this.showMax ? '100%' : width + 'px';
                    style.height = height ? height + 'px' : '100%';
                }
                if (this.vertical) {
                    style.width = width ? width + 'px' : '100%';
                    style.height = this.showMax ? '100%' : height + 'px';
                }
                return style;
            },
            dragDirection() {
                return !this.moveDirection ? this.horizontal ? 'right' : this.vertical ? 'top' : '' : this.moveDirection;
            }
        },
        watch: {
            width: {
                immediate: true,
                handler(v) {
                    if (v != undefined) {
                        this.widthValue = this.checkWidth(+v);
                    }
                }
            },
            height: {
                immediate: true,
                handler(v) {
                    if (v != undefined) {
                        this.heightValue = this.checkHeight(+v);
                    }
                }
            }
        },
        beforeDestroy() {
            delEvent(document, 'mousemove', this.documentMouseMove);
            delEvent(document, 'mouseup', this.documentMouseUp);
        },
        methods: {
            resizeMax() {
                this.showMax = true;
            },
            resizeMin() {
                this.showMax = false;
                this.heightValue = this.minHeight;
            },
            dragEleMousedown(e) {
                this.startPos = e;
                addEvent(document, 'mouseup', this.documentMouseUp);
                addEvent(document, 'mousemove', this.documentMouseMove);
            },
            documentMouseMove(e) {
                this.stopPos = e;
                if (this.showMax) {
                    this.showMax = false;
                    if (this.vertical) {
                        this.heightValue = this.$refs.wrap.parentNode.offsetHeight;
                    }
                    if (this.horizontal) {
                        this.widthValue = this.$refs.wrap.parentNode.offsetWidth;
                    }
                }
                _requestAnimationFrame(this.changeSize);
            },
            changeSize() {
                if (this.horizontal) {
                    this.changeWidth();
                }
                if (this.vertical) {
                    this.changeHeight();
                }
                // this.startPos = this.stopPos;
                this.$nextTick(() => {
                    this.$emit('layoutResize');
                });
            },
            changeWidth() {
                // debugger;
                const $wrap = this.$refs.wrap;
                const $dragHorizontalEle = this.$refs.dragHorizontalEle;
                if (!($wrap && $dragHorizontalEle)) return;
                if (!(this.startPos && this.stopPos)) return;

                const dragEleOffsetX = this.startPos.offsetX;
                const stopClientX = this.stopPos && this.stopPos.clientX;
                const {left, right} = $wrap.getBoundingClientRect() || {};
                if (this.dragDirection == 'right') {
                    const dragEleClientRect = $dragHorizontalEle.getBoundingClientRect() || {};
                    const dragEleWidth = dragEleClientRect.right - dragEleClientRect.left;
                    this.widthValue = (stopClientX - left) + (dragEleWidth - dragEleOffsetX);
                    this.widthValue = this.checkWidth(this.widthValue);
                } else {
                    this.widthValue = right - stopClientX;
                    this.widthValue = this.checkWidth(this.widthValue);
                }
            },
            checkWidth(w) {
                if (w < this.minWidth) {
                    w = +this.minWidth;
                }
                if (this.maxWidth && w > this.maxWidth) {
                    w = +this.maxWidth;
                }
                return w;
            },
            checkHeight(h) {
                if (h < this.minHeight) {
                    h = +this.minHeight;
                }
                if (this.maxHeight && h > this.maxHeight) {
                    h = +this.maxHeight;
                }
                return h;
            },
            changeHeight() {
                const $wrap = this.$refs.wrap;
                if (!$wrap) return;
                if (!(this.startPos && this.stopPos)) return;

                const dragEleOffsetY = this.startPos.offsetY;

                const stopClientY = this.stopPos && this.stopPos.clientY;
                const {top, bottom} = $wrap.getBoundingClientRect() || {};
                if (this.dragDirection == 'bottom') {
                    this.heightValue = stopClientY - top;
                    this.heightValue = this.checkHeight(this.heightValue);
                } else {
                    const height = bottom - top;
                    this.heightValue = (top - stopClientY + height) + dragEleOffsetY;
                    this.heightValue = this.checkHeight(this.heightValue);
                }
            },
            documentMouseUp() {
                this.startPos = null;
                delEvent(document, 'mousemove', this.documentMouseMove);
                delEvent(document, 'mouseup', this.documentMouseUp);
            }
        }

    };

</script>
