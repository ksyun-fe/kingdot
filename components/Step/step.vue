<template>
    <div
            class="kd-step"
            :class="`kd-step-${type}`"
    >
        <span
                v-if="!isLast() && type != 'simple'"
                :id="'kd-step-line' + index"
                class="kd-step-line"
                :class="{
                    'kd-step-line-active': index < activeIndex,
                    'kd-step-line-vertical': direction == 'vertical',
                    'kd-step-line-vertical-small':direction == 'vertical'&&size=='small',
                    'kd-step-line-spot': type == 'spot',
                }"
        ></span>
        <div class="kd-step-wrap">
            <div class="kd-step-container">
                <div
                        class="kd-step-head"
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
                                        'kd-step-index-done': index < activeIndex,
                                        'kd-step-index-small': size == 'small',
                                        'kd-step-index-simple': type == 'simple',
                                        'kd-step-index-icon': icon != '',
                                        'kd-step-cursor':isClick
                                    },
                                    _status != '' ? customStatusClass : '',
                                ]"
                                :style="handleLH"
                        >
                            <span v-if="icon == '' && _status != 'error' && _status != 'finished'">{{ index }}</span>
                            <i
                                    v-if="icon == ''"
                                    :class="iconObj"
                            ></i>
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
                        </span>
                        <!-- spot类型 -->
                        <span
                                v-if="type == 'spot'"
                                :class="{ 'kd-step-spot-line': index == activeIndex }"
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
                <div class="kd-step-main">
                    <span
                            v-if="title != ''"
                            class="kd-step-title"
                            :class="{
                                'kd-step-title-active': index == activeIndex,
                                'kd-step-title-bottom': position == 'bottom',
                                'kd-step-title-simple': type == 'simple',
                                'kd-step-title-spot': type == 'spot',
                                'kd-step-title-vertical':direction == 'vertical',
                                'kd-step-cursor':isClick,
                                'kd-step-title-spot-active':index == activeIndex && type == 'spot'
                            }"
                            @click="_click"
                    >{{ title }}</span>
                    <p
                            v-if="description != ''"
                            class="kd-step-description"
                            :class="{
                                'kd-step-desc-notitle': title == '' && position == 'left'&&direction != 'vertical',
                                'kd-step-desc-notitle-spot': title == '' && type == 'spot',
                                'kd-step-desc-active': index == activeIndex,
                                'kd-step-desc-bottom': position == 'bottom',
                                'kd-step-desc-spot': type == 'spot',
                                'kd-step-desc-vertical-notitle':title==''&&direction == 'vertical',
                                'kd-step-desc-vertical':direction == 'vertical'
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
                position: 'left',
                direction: 'horizontal',
                type: '',
                isClick: this.$parent.isClick
            };
        },
        computed: {
            activeIndex() {
                return this.$parent.stepIndex;
            },
            _status() {
                return this.getStatus();
            },
            customStatusClass() {
                return 'kd-step-custom-status-' + this._status;
            },
            handleLH() {
                const style = {};
                if (this.size === 'small' && this.icon === '') {
                    if (this._status === 'finished' || this._status === 'error') {
                        style['line-height'] = '20px';
                    }
                }
                return style;
            },
            iconObj() {
                return {
                    'kd-icon-success': this._status === 'finished',
                    'kd-icon-error': this._status === 'error'
                };
            }
        },
        watch: {},
        created() {
            this.index = this.$parent.getChildrenIndex(this);
            this.position = this.$parent.position;
            this.direction = this.$parent.orientation;
            this.type = this.getType();
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
                return status;
            },
            getType() {
                const v = this.$parent.type;
                if (v === 'spot') {
                    this.position = 'bottom';
                    this.direction = 'horizontal';
                    this.status = '';
                } else if (v === 'simple') {
                    this.description = '';
                    this.position = 'left';
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
