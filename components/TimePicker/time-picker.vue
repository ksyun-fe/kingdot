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
                    <i class="kd-icon-time"></i>
                </template>
            </kd-input>
            <template slot="content">
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
                                        'kd-active': selectedTime == item
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
                                v-model="startTime"
                                :min="minTime"
                                :max="maxTime"
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
                                    v-model="selectedTime"
                                    :data="timeList"
                                    :item-disable="startTimeSelectorLimit()"
                            ></ScrollSelect>
                        </div>
                        <div
                                v-if="mode === 'anytime'"
                                class="kd-range-selector-container"
                        >
                            <Time
                                    v-model="startTime"
                                    :min="minTime"
                                    :max="startTimeMaxLimit(maxTime, endTime)"
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
                                    v-model="endSelectedTime"
                                    :data="timeList"
                                    :item-disable="endTimeSelectorLimit()"
                            ></ScrollSelect>
                        </div>
                        <div
                                v-if="mode === 'anytime'"
                                class="kd-range-selector-container"
                        >
                            <Time
                                    v-model="endTime"
                                    :min="endTimeMinLimit(minTime, startTime)"
                                    :max="maxTime"
                                    @change="timeValueChange"
                            >
                            </Time>
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
            disabled: {
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
            }
        },
        data() {
            return {
                scrollTimeArr: Array.apply(null, {length: 3}).map((item, index) => {
                    const length = index === 0 ? 24 : 60;
                    return Array(length).fill(0).map((x, i) => this.addPreZero(i));
                }),
                startTime: '', // '00:00:00'
                endTime: '', // '00:00:00'
                selectedTime: '', // step 模式下的选择结果
                endSelectedTime: '',
                timeString: '', // input value
                isTooltipShow: false
            };
        },
        computed: {
            timeList() {
                if (!!this.optionalTimes && Array.isArray(this.optionalTimes)) { // 传入不规则的时间列表
                    return this.optionalTimes;
                } else if (this.mode === 'steptime') {
                    const step = !!Number(this.step) ? Number(this.step) * 60 : parseTime(this.step);
                    const max = parseTime(this.maxTime);
                    const min = parseTime(this.minTime);
                    console.log('生成 timeList()', this.minTime, min, max, step);
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
            },
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    console.log('init valve', v);
                    if (typeof v === 'string') { // 单
                        // TODO: 检查合法性
                        this.timeString = v;
                        // this.selectedTime = v;
                        // this.startTime = v;
                        if (this.mode === 'steptime') {
                            this.selectedTime = v;
                        } else {
                            this.startTime = v;
                        }
                    } else if (Array.isArray(v)) { // 范围
                        this.timeString = v.join(' - ');
                        if (this.mode === 'steptime') {
                            this.selectedTime = v[0];
                            this.endSelectedTime = v[1];
                        } else {
                            this.startTime = v[0];
                            this.endTime = v[1];
                        }
                    }
                }
            },
            // selectTimeValue: {
            //     handler(v) {
            //         console.log('selectTimeValue change', v);
            //         if (typeof v === 'string') { // 单
            //             this.timeString = v.label;
            //         }
            //     }
            // },
            startTime: {
                deep: true,
                handler(v) {
                    if (!this.range) {
                        this.timeString = this.startTime; // innervalue 变化
                        this.$emit('input', this.startTime);
                    } else {
                        this.timeString = `${v} - ${this.endTime}`;
                        this.$emit('input', [v, this.endTime]);
                    }
                }
            },
            endTime: {
                deep: true,
                handler(v) {
                    if (!this.range) {
                        // this.timeString = this.startTime.join(':'); // innervalue 变化
                        // this.$emit('input', this.timeString);
                    } else {
                        this.timeString = `${this.startTime} - ${v}`;
                        this.$emit('input', [this.startTime, v]);
                    }
                }
            },
            selectedTime: {
                handler(v) {
                    if (this.range === false) {
                        this.timeString = v;
                        this.$emit('input', this.selectedTime);
                    } else {
                        if (this.timeString !== `${v} - ${this.endSelectedTime}`) {
                            this.timeString = `${v} - ${this.endSelectedTime}`;
                            this.$emit('input', this.timeString.split(' - '));
                        }
                    }
                }
            },
            endSelectedTime: {
                handler(v) {
                    if (this.timeString !== `${this.selectedTime} - ${v}`) {
                        this.timeString = `${this.selectedTime} - ${v}`;
                        this.$emit('input', this.timeString.split(' - '));
                    }
                }
            }
        },
        created() {
        },
        methods: {
            selectTimeValue(item) {
                if (this.timeString != item) {
                    this.timeString = item;
                    this.$emit('input', item);
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
                this.$emit('change', value, 'scroll'); // 通过点击选中的时间
            },
            startTimeSelectorLimit() {
                // let max =  生成的timelist 已经遵循 min max 限制
                return time => { // "02:00"
                    let disabled = false;
                    // if (true) {
                    disabled = parseTime(time) > parseTime(this.endSelectedTime);
                    // }
                    return disabled;
                };
            },
            endTimeSelectorLimit() {
                return time => { // "02:00"
                    let disabled = false;
                    disabled = parseTime(time) < parseTime(this.selectedTime);
                    return disabled;
                };
            }
        }
    };
</script>
