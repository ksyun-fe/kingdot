<template>
    <div
            :id="id"
            :class="'kd-inner-content ' + (isDrag ? 'kd-inner-content-draging' : '')"
            @click="clickConetnt"
    >
        <slot></slot>
        <div
                v-show="is_show_mask"
                class="kd-inner-mask"
                :style="'width:'+mask_width+'left:'+mask_left+'height:'+mask_height+'top:'+mask_top"
        >
        </div>
    </div>
</template>

<script>
    export default {
        name: 'KdSelection',
        props: {
            value: {
                type: Array
            },
            // 不触发选择框的元素classname
            noTriggerClass: {
                type: Array
            },
            // 选择框选中的元素classname
            selectClass: {
                type: String,
                require: true
            }
        },
        data() {
            return {
                id: 'block_content_' + new Date().getTime(),
                content: null,
                start_x: 0,
                start_y: 0,
                end_x: 0,
                end_y: 0,
                box_screen_top: 0,
                box_screen_left: 0,
                is_show_mask: false,
                isDrag: false,
                selectData: []
            };
        },
        computed: {
            mask_width() {
                return `${Math.abs(this.end_x - this.start_x)}px;`;
            },
            mask_height() {
                return `${Math.abs(this.end_y - this.start_y) + document.documentElement.scrollTop}px;`;
            },
            mask_left() {
                return `${Math.min(this.start_x, this.end_x) - this.box_screen_left}px;`;
            },
            mask_top() {
                return `${Math.min(this.start_y, this.end_y) - this.box_screen_top}px;`;
            }
        },
        mounted() {
            const content = document.querySelector('#' + this.id);

            this.box_screen_left = content.getBoundingClientRect().left;
            this.box_screen_top = content.getBoundingClientRect().top + document.documentElement.scrollTop;
            this.content = content;
            content.addEventListener('mousedown', this.handleMouseDown);
        },
        methods: {
            clickConetnt(ev) {
                ev.stopPropagation();
                this.selectData = [];
            },
            eventHasNoSelectClass(target) {
                let returnFlag = false;
                this.noTriggerClass.forEach(item => {
                    if (target.className.indexOf(item) >= 0) {
                        returnFlag = true;
                    }
                });
                return returnFlag;
            },
            handleMouseDown(event) {
                const target = event.target;
                if (target.tagName === 'SPAN' || this.eventHasNoSelectClass(target)) return false;
                this.selectData = [];
                this.isDrag = true;
                this.start_x = event.clientX;
                this.start_y = event.clientY;

                this.content.addEventListener('mousemove', this.handleMouseMove);
                this.content.addEventListener('mouseup', this.handleMouseUp);
            },
            handleMouseMove(event) {
                this.is_show_mask = true;
                this.end_x = event.clientX;
                this.end_y = event.clientY;
            },
            handleMouseUp() {
                this.is_show_mask = false;
                this.isDrag = false;
                this.content.removeEventListener('mousemove', this.handleMouseMove);
                this.content.removeEventListener('mouseup', this.handleMouseUp);
                this.handleDomSelect();
                this.resSetXY();
                this.$emit('select', this.selectData);
            },
            handleDomSelect() {
                const domMask = this.content.querySelector('.kd-inner-mask');
                const rectSelect = domMask.getClientRects()[0];
                const selectDoms = this.content.querySelectorAll('.' + this.selectClass);
                selectDoms.forEach((node, index) => {
                    const rects = node.getClientRects()[0];
                    if (this.collide(rects, rectSelect) === true) {
                        this.selectData.push(this.value[index]);
                    }
                });
            },
            collide(rect1, rect2) {
                if (!rect1 || !rect2) return false;
                const maxX = Math.max(rect1.x + rect1.width, rect2.x + rect2.width);
                const maxY = Math.max(
                    rect1.y + rect1.height,
                    rect2.y + rect2.height
                );
                const minX = Math.min(rect1.x, rect2.x);
                const minY = Math.min(rect1.y, rect2.y);
                if (
                    maxX - minX <= rect1.width + rect2.width &&
                    maxY - minY <= rect1.height + rect2.height
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            resSetXY() {
                this.start_x = 0;
                this.start_y = 0;
                this.end_x = 0;
                this.end_y = 0;
            }

        }
    };
</script>

<style scoped>
    .kd-inner-content {
        display: flex;
        overflow: hidden;
        position: relative;
    }

    .kd-inner-content .kd-inner-mask {
        position: absolute;
        background: #409eff;
        opacity: 0.4;
    }
    .kd-inner-content-draging{
        user-select: none
    }
</style>
