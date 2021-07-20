<template>
    <div class="kd-time-picker">
        <!-- 根据 range 改变input长度 -->
        <kd-tooltip
                v-model="isTooltipShow"
                placement="bottom-start"
                trigger="click"
                :width-limit="false"
                :disabled="disabled"
        >
            <kd-input
                    :placeholder="placeholder"
                    :value="timeString"
                    :disabled="disabled"
                    :width="range ? 400 : 200"
            >
                <template slot="suffix">
                    <i
                            v-if="clearable && !disabled && !!timeString"
                            class="kd-icon-close ksfont"
                            @click="onClear"
                    ></i>
                    <i
                            v-else
                            class="kd-icon-time ksfont"
                    ></i>
                </template>
            </kd-input>
            <template slot="content">
                <div></div>
                <div v-if="isTooltipShow">
                    <div
                            v-if="!range && mode === 'steptime'"
                            class="kd-timepicker-panel"
                    >
                        <div class="kd-steptime-container">
                            <div v-if="true">
                                <div
                                        v-for="(item, index) in timeList"
                                        :key="index"
                                        :class="{
                                            'kd-steptime-item': true,
                                            'kd-disabled': !!disabledTime && disabledTime(item),
                                            'kd-active': timeValue[0] == item
                                        }"
                                        @click="selectTimeValue(item)"
                                >
                                    {{ item }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                            v-if="!range && mode === 'anytime'"
                            class="kd-timepicker-panel"
                    >
                        <div class="kd-common-selector-container">
                            <Time
                                    v-model="timeValue[0]"
                                    :min="minTime"
                                    :max="maxTime"
                                    :accuracy="accuracy"
                                    @change="timeValueChange"
                            >
                            </Time>
                        </div>
                    </div>
                    <div
                            v-if="range"
                            class="kd-timepicker-panel range"
                    >
                        <div>
                            <div class="kd-timepicker-title">开始时间</div>
                            <div
                                    v-if="mode === 'steptime'"
                                    class="kd-range-selector-container"
                            >
                                <!-- :item-disable 不能直接绑定一个函数. 可能有min max限制 有联动限制, 有外部定义的限制 -->
                                <ScrollSelect
                                        ref="startTimeSelector"
                                        v-model="timeValue[0]"
                                        :data="timeList"
                                        :item-disable="startTimeSelectorLimit()"
                                ></ScrollSelect>
                            </div>
                            <div
                                    v-if="mode === 'anytime'"
                                    class="kd-range-selector-container"
                            >
                                <Time
                                        v-model="timeValue[0]"
                                        :min="minTime"
                                        :max="startTimeMaxLimit(maxTime, timeValue[1])"
                                        :accuracy="accuracy"
                                        @change="timeValueChange"
                                >
                                </Time>
                            </div>
                        </div>
                        <div>
                            <div class="kd-timepicker-title">结束时间</div>
                            <div
                                    v-if="mode === 'steptime'"
                                    class="kd-range-selector-container"
                            >
                                <ScrollSelect
                                        ref="endTimeSelector"
                                        v-model="timeValue[1]"
                                        :data="timeList"
                                        :item-disable="endTimeSelectorLimit()"
                                ></ScrollSelect>
                            </div>
                            <div
                                    v-if="mode === 'anytime'"
                                    class="kd-range-selector-container"
                            >
                                <Time
                                        v-model="timeValue[1]"
                                        :min="endTimeMinLimit(minTime, timeValue[0])"
                                        :max="maxTime"
                                        :accuracy="accuracy"
                                        @change="timeValueChange"
                                >
                                </Time>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import Time from './Time.vue';
    import { parseTime, stringTime } from './utils.js';
    export default {
        name: 'KdTimePicker',
        components: {
            Time
        },
        props: {
            value: {
                type: [String, Array]
            },
            disabled: { // 组件禁用
                type: Boolean,
                default: false
            },
            // 满足某条件的时间将被禁用
            disabledTime: {
                type: Function
            },
            // 显示模式: 'steptime', 'anytime', 按步长显示时间, 任意时间点
            mode: {
                type: String,
                default: 'anytime'
            },
            minTime: {
                type: String,
                default: '00:00:00'
            },
            maxTime: {
                type: String,
                default: '23:59:59'
            },
            step: {
                type: [Number, String],
                default: 30
            },
            range: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '选择时间'
            },
            optionalTimes: {
                type: Array
            },
            clearable: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            accuracy: {
                type: String,
                default() {
                    return 'secend';
                }
            }
        },
        data() {
            return {
                scrollTimeArr: Array.apply(null, {length: 3}).map((item, index) => {
                    const length = index === 0 ? 24 : 60;
                    return Array(length).fill(0).map((x, i) => this.addPreZero(i));
                }),
                timeValue: [], // innervalue
                timeString: '', // input value
                isTooltipShow: false
            };
        },
        computed: {
            timeList() {
                if (!!this.optionalTimes && Array.isArray(this.optionalTimes)) { // 传入不规则的时间列表
                    return this.optionalTimes;
                } else if (this.mode === 'steptime') {
                    const step = Number(this.step) ? Number(this.step) * 60 : parseTime(this.step);
                    const max = parseTime(this.maxTime);
                    const min = parseTime(this.minTime);
                    const data = [];

                    for (let t = min; t <= max; t += step) {
                        data.push(stringTime(t, 'minute'));
                    }
                    // this.timeList = data;
                    // 固定时间点, 不展示秒..
                    return data;
                } else {
                    return [];
                }
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if (!v) {
                        v = '';
                    }
                    if (typeof v === 'string') { // 单
                        // TODO: 检查合法性. 不规范字符串, 空值 null undefined
                        // A: 转成空字符串
                        this.timeString = v;
                        this.timeValue = [v];
                    } else if (Array.isArray(v)) { // 范围
                        if (v.length < 2) return;
                        this.timeValue = v;
                        this.timeString = v.join(' - ');
                    }
                }
            },
            timeValue: {
                deep: true,
                handler(v) {
                    if (!this.range) {
                        this.timeString = this.timeValue[0];
                        this.$emit('input', this.timeValue[0]);
                    } else {
                        this.timeString = this.timeValue.join(' - ');
                        this.$emit('input', this.timeValue);
                    }
                }
            }
        },
        created() {
        },
        methods: {
            onClear(e) {
                e.stopPropagation();
                this.timeString = '';

                this.$emit('clear');
                // this.$emit('change', this.dateValue, 'clear');
                if (this.range) {
                    // inner value
                    this.timeValue = [];
                    this.$emit('change', [], 'clear');
                } else {
                    this.timeValue = [];
                    this.$emit('change', '', 'clear');
                }
            },
            selectTimeValue(item) {
                if (this.timeString !== item) {
                    this.timeValue = [item];
                    // this.timeString = item;

                    // this.$emit('input', item);
                    this.$emit('change', item, 'select');
                    this.isTooltipShow = false;
                }
            },
            addPreZero(num) {
                return ('00' + String(num)).slice(-2);
            },
            startTimeMaxLimit(...times) {
                times = times.map(item => parseTime(item || '23:59:59'));
                return stringTime(Math.min.apply(null, times));
            },
            endTimeMinLimit(...times) {
                times = times.map(item => parseTime(item || '00:00:00'));
                return stringTime(Math.max.apply(null, times));
            },

            timeValueChange(value) {
                this.$emit('change', value, 'scroll'); // 通过滚动选的时间
            },
            startTimeSelectorLimit() {
                // let max =  生成的timelist 已经遵循 min max 限制
                return time => { // "02:00"
                    let disabled = false;
                    // if (true) {
                    disabled = parseTime(time) > parseTime(this.timeValue[1]);
                    // }
                    return disabled;
                };
            },
            endTimeSelectorLimit() {
                return time => { // "02:00"
                    let disabled = false;
                    disabled = parseTime(time) < parseTime(this.timeValue[0]);
                    return disabled;
                };
            }
        }
    };
</script>
