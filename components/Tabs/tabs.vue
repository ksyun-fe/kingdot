<template>
    <div
            :class="[
                mainClass,
                { 'kd-tabs-default': type === 'default'}
            ]"
    >
        <div
                ref="tabs"
                class="kd-tabs-main-move"
                :class="{
                    'kd-tabs-show-control': showControl,
                    'kd-addabble-box': addable
                }"
        >
            <div
                    class="kd-control right"
                    :class="{ 'kd-move-disable-right': movedisabledRight }"
                    @click="moveLeft"
            >
                <i class="kd-icon-arrow-right kd-control-icon"></i>
            </div>

            <div
                    class="kd-control left"
                    :class="{ 'kd-move-disable-left': movedisabledLeft }"
                    @click="moveRight"
            >
                <i class="kd-icon-arrow-left kd-control-icon"></i>
            </div>

            <div
                    class="kd-tabs-content"
                    :style="{ 'margin-left': marginLeft + 'px' }"
            >
                <slot></slot>
                <div
                        v-if="type === 'default'"
                        class="kd-move-bar"
                        :style="{
                            width: activeWidth + 'px',
                            left: activeMarginLeft + 'px',
                        }"
                ></div>
                <div
                        v-if="type === 'vertical'"
                        class="kd-move-vertical"
                        :style="{
                            'margin-top': marginTop + 'px',
                            height:activeHeight+'px'
                        }"
                ></div>
            </div>
        </div>

        <div
                v-if="addable"
                class="kd-add-tab"
                @click="addTab"
        >
            <slot name="addable">
                <i class="kd-icon-plus"></i>
            </slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'KdTabs',
        props: {
            value: {
                type: [String, Number],
                default: ''
            },
            type: {
                type: String,
                default: 'default'
            },
            closable: {
                type: Boolean,
                default: false
            },
            // large default small
            size: {
                type: String,
                default: 'default'
            },
            tabClickMove: {
                type: Boolean,
                default: false
            },
            addable: {
                type: Boolean,
                default: false
            },
            // 点击是否移动到最前面
            handleTabMove: {
                type: Boolean,
                default: false
            },
            // 左右移动距离
            movingDistance: {
                type: [String, Number],
                default: null
            }
        },
        data() {
            var mainClass = {
                'kd-tabs': true,
                [`kd-tabs-${this.type}`]: this.type !== 'default',
                [`kd-tabs-${this.size}`]: this.size !== 'default'
            };
            return {
                mainClass: mainClass,
                flag: false,
                movedisabledRight: false,
                movedisabledLeft: false,
                innerValue: this.value,
                marginLeft: 0,
                activeMarginLeft: '',
                marginTop: '',
                activeWidth: '',
                showControl: false,
                regionWidth: 0,
                contentWidth: 0,
                singleWidth: '',
                activeHeight: ''
            };
        },
        watch: {
            marginLeft(newValue) {
                newValue === 0
                    ? (this.movedisabledLeft = true)
                    : (this.movedisabledLeft = false);
                newValue === -(this.contentWidth - this.regionWidth)
                    ? (this.movedisabledRight = true)
                    : (this.movedisabledRight = false);
            }
        },
        updated() {
            this.Recapture();
        },
        methods: {
            Recapture() {
                this.contentWidth = this.$refs.tabs.querySelector(
                    '.kd-tabs-content'
                ).scrollWidth;
                this.regionWidth = this.$refs.tabs.clientWidth;
                this.showControl = this.regionWidth < this.contentWidth;
                if (!this.showControl) {
                    this.marginLeft = 0;
                }
            },
            setMoveBarPosition({marginLeft = '', marginTop = '', width = 0, height = 0}) {
                this.marginTop = marginTop;
                this.activeMarginLeft = marginLeft;
                this.activeWidth = width;
                this.activeHeight = height;
            },
            tabsActive({ val = '', marginLeft = '', marginTop = '', width = 0, height = 0}) {
                this.innerValue = val;
                this.setMoveBarPosition({marginLeft, marginTop, width, height});
                this.$emit('click', val);
                this.$emit('input', val);
            },

            tabHandelMove({ marginLeft = '', event = '' }) {
                this.marginLeft = this.marginLeft - marginLeft + 20;
            },
            moveLeft() {
                this.calculateTravelDistance();
                if (
                    this.marginLeft - this.singleWidth + this.contentWidth <
                    this.regionWidth
                ) {
                    this.marginLeft = -(this.contentWidth - this.regionWidth);
                } else {
                    this.marginLeft -= this.singleWidth;
                }
            },
            moveRight() {
                this.calculateTravelDistance();
                if (this.marginLeft + this.singleWidth > 0) {
                    this.marginLeft = 0;
                } else {
                    this.marginLeft += this.singleWidth;
                }
            },
            calculateTravelDistance() {
                let distance = '';
                this.movingDistance
                    ? (distance = this.movingDistance)
                    : (distance = this.$refs.tabs.clientWidth);
                this.singleWidth = distance;
            },
            close(v) {
                this.$emit('close', v);
                this.$nextTick(() => {
                    this.Recapture();
                    if (this.showControl) {
                        this.marginLeft = -(this.contentWidth - this.regionWidth);
                    }
                });
            },
            addTab(v) {
                this.$emit('addTab');
                this.$nextTick(() => {
                    this.Recapture();
                    if (this.showControl) {
                        this.marginLeft = -(this.contentWidth - this.regionWidth);
                    }
                });
            }
        }
    };
</script>
