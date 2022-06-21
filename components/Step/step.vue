<template>
    <div
            :class="allClassList"
            :style="handleFlex"
    >
        <span
                v-if="!isLast()"
                :id="'kd-step-line' + index"
                class="kd-step-line"
                :class="{
                    'kd-step-line-active': index < activeIndex,
                }"
                :style="stepLineStyle"
        ></span>
        <div class="kd-step-wrap">
            <div class="kd-step-container">
                <div
                        ref="stepHead"
                        class="kd-step-head"
                        :style="handleSimpleFlex"
                        @click="_click"
                >
                    <!-- head部分 -->
                    <slot name="head">
                        <!-- default、simple类型 -->
                        <span
                                v-if="type !== 'spot'"
                                class="kd-step-index kd-step-index-default"
                                :class="[
                                    {
                                        'kd-step-index-active': index == activeIndex,
                                        'kd-step-index-icon': icon != '',
                                        'kd-step-cursor':isClick,
                                    },
                                    _status != '' ? customStatusClass : '',
                                ]"
                        >
                            <i
                                    v-if="icon != ''"
                                    :class="[
                                        'kd-step-icon',
                                        'kdicon',
                                        icon,
                                        {
                                            'kd-step-icon-active': index == activeIndex,
                                            'kd-step-icon-done': index < activeIndex,
                                        },
                                    ]"
                            ></i>
                            <i
                                    v-if="icon == '' && (_status == 'wrong' || (_status == 'finished' && finishedStyle=='icon'))"
                                    :class="iconObj"
                            ></i>
                            <span v-else-if="icon == '' || finishedStyle=='number'">{{ index }}</span>
                        </span>
                        <!-- spot类型 -->
                        <span
                                v-if="type == 'spot'"
                                :class="{ 'kd-step-spot-line': index == activeIndex, 'kd-step-cursor':isClick,}"
                        >
                            <span
                                    v-if="type == 'spot'"
                                    class="kd-step-index-spot kd-step-spot-default"
                                    :class="{
                                        'kd-step-spot-active': index == activeIndex,
                                        'kd-step-spot-done': index < activeIndex,
                                    }"
                            ></span>
                        </span>
                    </slot>
                </div>
                <!-- 标题和描述 -->
                <div
                        v-if="title != ''||description != ''"
                        ref="stepMain"
                        class="kd-step-main"
                        :class="[`kd-step-main-${size}`, `kd-step-main-${position}`]"
                >
                    <span
                            v-if="title != ''"
                            ref="stepTitle"
                            class="kd-step-title"
                            :class="{
                                'kd-step-title-active': index == activeIndex,
                                'kd-step-cursor':isClick,
                                'kd-step-title-spot-active':index == activeIndex && type == 'spot'
                            }"
                            @click="_click"
                    >{{ title }}</span>
                    <p
                            v-if="description != ''"
                            ref="stepDesc"
                            class="kd-step-description"
                            :class="{
                                'kd-step-desc-notitle': title == '',
                                'kd-step-desc-active': index == activeIndex,
                            }"
                    >
                        {{ description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'KdStep',
        components: {},
        props: {
            title: {
                type: String,
                default: ''
            },
            description: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            status: {
                type: String,
                default: ''
            },
            onclick: {
                type: Function,
                default: undefined
            }
        },
        data() {
            return {
                index: 0,
                size: this.$parent.size,
                direction: 'horizontal',
                type: '',
                isClick: this.$parent.isClick
            };
        },
        computed: {
            finishedStyle() {
                return this.$parent.finishedStyle;
            },
            activeIndex() {
                return this.$parent.stepIndex;
            },
            _status() {
                return this.getStatus();
            },
            position() {
                let position = this.$parent.position;
                if (this.direction == 'vertical') {
                    position = 'right';
                }
                if (this.type == 'spot') {
                    position = 'bottom';
                }
                if (this.type == 'simple') {
                    position = 'right';
                }
                return position;
            },
            customStatusClass() {
                return 'kd-step-custom-status-' + this._status;
            },
            handleSimpleFlex() {
                const style = {};
                if (this.type === 'simple') {
                    if (this.title !== '') {
                        style.flex = '30% 0 0 ';
                    } else {
                        style.flex = '50% 0 0';
                    }
                }
                return style;
            },
            iconObj() {
                return {
                    'kd-icon-success': this._status === 'finished',
                    'kd-icon-error': this._status === 'wrong'
                };
            },
            stepLineStyle() {
                if (this.type === 'simple') return;
                const style = {};
                const headW = this.$refs.stepHead.clientWidth;
                const headH = this.$refs.stepHead.clientHeight;
                if (this.type === 'spot') {
                    let diff = 0; const spotLineLH = this.$el.children[0].children[0].children[0].offsetHeight;
                    diff = spotLineLH % 2 === 0 ? 4 : 5;
                    const _tranlateY = Math.round(((spotLineLH + diff) / 2) * 100) / 100;
                    style.transform = `translate(6px, ${_tranlateY}px)`;
                    style.width = '100%';
                } else if (this.$parent.direction === 'horizontal') {
                    const _tranlateY = Math.ceil((headH) / 2);
                    if (this.$parent.position === 'right') {
                        const titleW = this.$refs.stepTitle ? this.$refs.stepTitle.clientWidth : 0;
                        const _tranlateX = headW + titleW;
                        style.transform = `translate(${_tranlateX}px, ${_tranlateY}px)`;
                        style.width = `calc(100% - ${_tranlateX}px)`;
                    } else {
                        const _tranlateX = headW;
                        style.transform = `translate(${_tranlateX}px, ${_tranlateY}px)`;
                        style.width = `calc(100% - ${_tranlateX}px)`;
                    }
                } else if (this.$parent.direction !== 'horizontal') {
                    const _tranlateX = Math.ceil((headW + 2) / 2);
                    style.transform = `translate(${_tranlateX}px, ${headH}px)`;
                    style.height = `calc(100% - ${headH}px)`;
                }
                return style;
            },
            handleFlex() {
                const style = {};
                if (this.title === '') {
                    if (!this.isLast()) {
                        // debugger;
                        if (this.$parent.children.length === 2) {
                            style['flex-basis'] = 98 + '%';
                        } else {
                            const flex = 100 / (this.$parent.children.length - 1);
                            style['flex-basis'] = flex + '%';
                        }
                    }
                }
                return style;
            },
            allClassList() {
                return [
                    'kd-step',
                    `kd-step-type-${this.type}`,
                    `kd-step-size-${this.size}`
                ];
            }
        },
        watch: {},
        created() {
            this.$parent.children.push(this);
            // this.position = this.getPosition();
            this.direction = this.$parent.orientation;
            this.type = this.getType();
        },
        beforeDestroy() {
            const steps = this.$parent.children;
            const index = steps.indexOf(this);
            if (index >= 0) {
                steps.splice(index, 1);
            }
        },
        methods: {
            _click() {
                if (!this.isClick) return;
                const callback = this.onclick;
                if (typeof callback === 'function') {
                    callback.call(this, this);
                } else {
                    if (this.index - this.activeIndex > 1) return;
                    this.$parent.stepIndex = this.index;
                    this.$emit('onclick');
                }
            },
            getStatus() {
                let status;
                const parentFinishStatus = this.$parent.finishStatus;
                const parentCurrentStatus = this.$parent.currentStatus;
                if (this.index < this.activeIndex) {
                    status =
                        this.status !== ''
                            ? this.status
                            : parentFinishStatus !== ''
                                ? parentFinishStatus
                                : '';
                } else if (this.index === this.activeIndex) {
                    status =
                        this.status !== ''
                            ? this.status
                            : parentCurrentStatus !== ''
                                ? parentCurrentStatus
                                : '';
                } else {
                    status = this.status;
                }
                return status == 'error' ? 'wrong' : status;
                // return status;
            },
            getType() {
                const v = this.$parent.type;
                if (v === 'spot') {
                    this.direction = 'horizontal';
                    this.size = 'small';
                    this.status = '';
                } else if (v === 'simple') {
                    this.description = '';
                    this.size = 'small';
                    this.direction = 'horizontal';
                }
                return this.$parent.type;
            },
            isLast() {
                const parent = this.$parent;
                return parent.children[parent.children.length - 1] === this;
            }
        }
    };
</script>
