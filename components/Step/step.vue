<template>
    <div
            class="kd-step"
            :class="{ 'kd-step-simple': type == 'simple' }"
    >
        <div class="kd-step-wrap">
            <div class="kd-step-head">
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
                                },
                                _status != '' ? customStatusClass : '',
                            ]"
                    >
                        <i
                                v-if="icon == '' && _status == 'finished'"
                                class="iconzhengque_tubiaoji kdicon"
                        ></i>
                        <span
                                v-if="icon == '' && _status != 'error' && _status != 'finished'"
                        >{{ index }}</span>
                        <i
                                v-if="icon == '' && _status == 'error'"
                                class="iconcuowu_tubiaoji kdicon"
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
                                class="kd-step-spot kd-step-spot-default"
                                :class="{
                                    'kd-step-spot-active': index == activeIndex,
                                    'kd-step-spot-done': index < activeIndex,
                                }"
                        ></span>
                    </span>
                </slot>
                <!-- 标题 simple类型以及竖式 -->
                <span
                        v-if="title != '' && (type == 'simple' || direction == 'vertical')"
                        class="kd-step-title kd-step-title-simple"
                        :class="{ 'kd-step-title-active': index == activeIndex }"
                >{{ title }}</span>
            </div>
            <!-- 描述  竖式 -->
            <p
                    v-if="description != '' && direction == 'vertical'"
                    class="kd-step-description"
                    :class="{
                        'kd-step-description-title':
                            (title != '' && position == 'left') || direction == 'vertical',
                        'kd-step-description-active': index == activeIndex,
                        'kd-step-description-vertical': direction == 'vertical',
                        'kd-step-description-vertical-notitle':
                            direction == 'vertical' && title == '',
                        'kd-step-description-vertical-small':
                            size == 'small' || type == 'spot',
                    }"
            >
                {{ description }}
            </p>
            <!--  -->
            <div
                    v-if="position == 'left' && type == 'default' && direction == 'level'"
                    class="kd-step-content"
            >
                <!-- 标题 默认 -->
                <p
                        v-if="title != ''"
                        class="kd-step-title"
                        :class="{ 'kd-step-title-active': index == activeIndex }"
                >
                    {{ title }}
                </p>
            </div>
            <!-- 连线 -->
            <span
                    v-if="!isLast() && type != 'simple'"
                    :id="'kd-step-line' + index"
                    class="kd-step-line"
                    :class="{
                        'kd-step-line-active': index < activeIndex,
                        'kd-step-line-vertical': direction == 'vertical',
                        'kd-step-line-spot': type == 'spot',
                    }"
            ></span>
        </div>
        <!-- 标题和描述 位于底部 -->
        <div
                v-if="position == 'bottom'"
                class="kd-step-content-bottom"
        >
            <p
                    v-if="title != ''"
                    class="kd-step-title"
                    :class="{ 'kd-step-title-active': index == activeIndex }"
            >
                {{ title }}
            </p>
        </div>
        <div>
            <p
                    v-if="description != '' && direction == 'level'"
                    class="kd-step-description"
                    :class="{
                        'kd-step-description-title': title != '' && position == 'left',
                        'kd-step-description-active': index == activeIndex,
                    }"
            >
                {{ description }}
            </p>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'Step',
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
            }
        },
        data() {
            return {
                index: 1,
                // type: this.$parent.type,
                lineWidth: this.space,
                size: this.$parent.size,
                position: 'left',
                direction: 'level',
                type: ''
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
            getStatus() {
                let status;
                const parentFinishStatus = this.$parent.finishStatus;
                const parentCurrentStatus = this.$parent.currentStatus;
                if (this.index < this.activeIndex) {
                    status =
                        this.status != ''
                            ? this.status
                            : parentFinishStatus != ''
                                ? parentFinishStatus
                                : '';
                } else if (this.index == this.activeIndex) {
                    status =
                        this.status != ''
                            ? this.status
                            : parentCurrentStatus != ''
                                ? parentCurrentStatus
                                : '';
                } else {
                    status = this.status;
                }
                return status;
            },
            getType() {
                const v = this.$parent.type;
                if (v == 'spot') {
                    this.position = 'bottom';
                    this.direction = 'level';
                    this.status = '';
                } else if (v == 'simple') {
                    this.description = '';
                    this.position = 'left';
                    this.size = 'small';
                    this.direction = 'level';
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

<style scoped lang="stylus">
// @import './index.styl'
</style>
