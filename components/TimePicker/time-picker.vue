<template>
    <div class="kd-time-picker">
        <!-- 根据 range 改变input长度 -->
        <kd-tooltip
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
                        class="dropdown"
                >
                    <div class="k-step">
                        <div v-if="true">
                            <div
                                    v-for="(item, index) in timeList"
                                    :key="index"
                                    :class="{
                                        'k-item': true,
                                        'k-disabled': !!disabledTime && disabledTime(item),
                                        'k-active': selectedTime == item
                                    }"
                                    @click="selectTimeValue(item)"
                            >
                                {{ item }}
                                <!-- <i
                                        v-if="selectedValues.includes(item)"
                                        class="k-checkmark ksicon-checkmark ksfont"
                                ></i> -->
                            </div>
                        </div>
                    </div>
                    <!-- <div class="scroll-container">
                        <ScrollSelect
                                v-model="selectedTime"
                                :data="timeList"
                        ></ScrollSelect>
                    </div> -->
                </div>
                <div
                        v-if="!range && mode === 'anytime'"
                        class="dropdown"
                >
                    <div class="scroll-container">
                        <Time
                                v-model="startTime"
                                :min="minTime"
                                :max="maxTime"
                                @change="timeValueChange"
                        >
                        </Time>
                        <!-- <div
                                v-for="(item, index) in scrollTimeArr"
                                :key="index"
                                class="column"
                        >
                            <ScrollSelect
                                    ref="ScrollSelect"
                                    v-model="startTime[index]"
                                    :data="item"
                            >
                            </ScrollSelect>
                        </div> -->
                    </div>
                </div>
                <div
                        v-if="range"
                        class="range-container"
                >
                    <div>
                        <div class="sub-title">开始时间</div>
                        <div
                                v-if="mode === 'steptime'"
                                class="selector-container"
                        >
                            <ScrollSelect
                                    ref="startTimeSelector"
                                    v-model="selectedTime"
                                    :data="timeList"
                                    :item-disable="startTimeSelectorLimit()"
                            ></ScrollSelect>
                        </div>
                        <div
                                v-if="mode === 'anytime'"
                                class="selector-container"
                        >
                            <Time
                                    v-model="startTime"
                                    :min="minTime"
                                    :max="startTimeMaxLimit(maxTime, endTime)"
                                    @change="timeValueChange"
                            >
                            </Time>
                            <!-- <div
                                    v-for="(item, index) in scrollTimeArr"
                                    :key="index"
                                    class="column"
                            >
                                <ScrollSelect
                                        ref="ScrollSelect"
                                        v-model="startTime[index]"
                                        :data="item"
                                        :disable="getScrollDisable(index)"
                                >
                                </ScrollSelect>
                            </div> -->
                        </div>
                    </div>
                    <div>
                        <div class="sub-title">结束时间</div>
                        <div
                                v-if="mode === 'steptime'"
                                class="selector-container"
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
                                class="selector-container"
                        >
                            <Time
                                    v-model="endTime"
                                    :min="endTimeMinLimit(minTime, startTime)"
                                    :max="maxTime"
                                    @change="timeValueChange"
                            >
                            </Time>
                            <!-- <div
                                    v-for="(item,index) in scrollTimeArr"
                                    :key="index"
                                    class="column"
                            >
                                <ScrollSelect
                                        ref="ScrollSelect"
                                        v-model="endTime[index]"
                                        :data="item"
                                >
                                </ScrollSelect>
                            </div> -->
                        </div>
                    </div>
                </div>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import Time from './Time.vue';
    import Lang from 'src/mixin/lang.js';
    import { parseTime, stringTime } from './utils.js';
    export default {
        name: 'KdTimePicker',
        components: {
            Time
        },
        mixins: [Lang],
        props: {
            value: {
                type: [String, Array]
                // default: function () {
                //     return '00:00:00';
                // }
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
                type: Number,
                default: 30
            },
            range: {
                type: Boolean,
                default: false
            }
            // placeholder: {
            // type: String,
            // default: '23:59:59'
            // }
        },
        data() {
            return {
                placeholder: this.range ? '开始时间-结束时间' : '选择时间',
                // rangePlaceholder: '开始时间-结束时间',
                hourArr: Array(24).fill(0).map((x, i) => {
                    return this.addPreZero(i);
                }),
                minArr: Array(60).fill(0).map((x, i) => {
                    return this.addPreZero(i);
                }),
                scrollTimeArr: Array.apply(null, {length: 3}).map((item, index) => {
                    const length = index === 0 ? 24 : 60;
                    return Array(length).fill(0).map((x, i) => this.addPreZero(i));
                }),
                startTime: '', // '00:00:00'
                // startTime: ['00', '00', '00'],
                endTime: '', // '00:00:00'
                // startTime: {
                //     hour: '00',
                //     minute: '00',
                //     second: '00'
                // },
                // endTime: {
                //     hour: '00',
                //     minute: '00',
                //     second: '00'
                // },
                // timeList: [],
                selectedTime: '', // step 模式下的结果
                endSelectedTime: '',
                timeString: '' // input value
            };
        },
        computed: {
            timeList() {
                if (this.mode === 'steptime') {
                    // if (!this.step) return [];
                    const step = this.step;
                    const max = parseTime(this.maxTime);
                    const min = parseTime(this.minTime);
                    console.log('生成 timeList()', this.minTime, min, max, step);
                    const data = [];

                    for (let t = min; t <= max; t += step * 60) {
                        data.push(stringTime(t, 'minute'));
                        // data.push({
                        //     label: stringTime(t, 'minute'),
                        //     value: stringTime(t, 'minute'),
                        //     // disabled: this.disabledTime && this.disabledTime(stringTime(t))
                        //     // this.maxDateValue && t.isAfter() ||
                        //     // this.minDateValue && t.isBefore(),
                        // });
                    }
                    // this.timeList = data;
                    // 固定时间点, 不展示秒..
                    // console.log('timeList', this.timeList);
                    return data;
                } else {
                    return [];
                }
            },
            // timeString() { // selectedTime 变化, TODO: selectedTime 被禁用
            //     let timeString = '';
            //     if (!this.range) {
            //         if (this.mode === 'steptime') {
            //             timeString = this.selectedTime;
            //         } else {
            //             timeString = `${this.startTime.hour}:${this.startTime.minute}:${this.startTime.second}`;
            //         }
            //         if (timeString === '0:0:0') { // fix input中只有分隔符
            //             return '';
            //         }
            //         // console.log('单点时间 timeString', timeString);
            //         if (this.disabledTime && !this.disabledTime(timeString)) {
            //             return timeString;
            //         } else {
            //             return ''; // 应该保持老的
            //         }
            //     } else {
            //         let start = '';
            //         let end = '';

            //         if (this.mode === 'steptime') {
            //             start = this.selectedTime;
            //             end = this.endSelectedTime;
            //         } else {
            //             start = `${this.startTime.hour}:${this.startTime.minute}:${this.startTime.second}`;
            //             end = `${this.endTime.hour}:${this.endTime.minute}:${this.endTime.second}`;
            //         }
            //         if (!start && !end) { // fix input中只有分隔符
            //             return '';
            //         }
            //         return `${start}-${end}`;
            //     }
            // }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    console.log('init valve', v);
                    if (typeof v === 'string') { // 单
                        this.timeString = v;
                        this.selectedTime = v;

                        this.startTime = v;
                        // console.log('set startTime', this.startTime);
                    } else if (Array.isArray(v)) { // 范围
                        this.timeString = v.join(' ~ ');
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
                        console.log('startTime change 单点时间', v);
                        this.timeString = this.startTime; // innervalue 变化
                        this.$emit('input', this.startTime);
                    } else {
                        console.log('startTime change 范围时间', v);

                        this.timeString = `${v} - ${this.endTime}`;
                        this.$emit('input', [v, this.endTime]);
                    }
                }
            },
            endTime: {
                deep: true,
                handler(v) {
                    console.log('endTime change', v, this.startTime, this.timeString);
                    if (!this.range) {
                        // this.timeString = this.startTime.join(':'); // innervalue 变化
                        // this.$emit('input', this.timeString);
                    } else {
                        this.timeString = `${this.startTime} - ${v}`;
                        console.log('this.timeString', this.timeString);

                        this.$emit('input', this.timeString);
                    }
                }
            },
            selectedTime: {
                handler(v) {
                    console.log('selectedTime change', v);
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
                        console.log('endSelectedTime change', v);
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
                console.log('click time', item);
                this.timeString = item;
                this.$emit('input', item); // 冒出去string 从value回来变成了array
                // this.$emit('tooltipHide');
            },
            addPreZero(num) {
                return ('00' + String(num)).slice(-2);
            },
            startTimeMaxLimit(...times) {
                console.log('startTimeMaxLimit', times);
                times = times.map(item => parseTime(item || '23:59:59'));
                return stringTime(Math.min.apply(null, times));
            },
            endTimeMinLimit(...times) {
                times = times.map(item => parseTime(item || '00:00:00'));
                return stringTime(Math.max.apply(null, times));
            },
            // endHourLimit(value) {
            //     return value < this.startTime.hour;
            // },
            // endMinuteLimit(value) {
            //     if (this.startTime.hour < this.endTime.hour) {
            //         return false;
            //     } else if (this.startTime.hour > this.endTime.hour) {
            //         return true;
            //     } else if (this.startTime.hour === this.endTime.hour) {
            //         return value < this.startTime.minute;
            //     }
            // },
            timeValueChange(value) {
                // const length = this.selectedValues.length;
                // const index = this.valueId || length && length - 1;
                // this.$emit('selectTime', value, index); // 第几个 选了时间
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
<style>
    .k-input i {
        color: #b2b2b2;
    }
    .dropdown {
        /* border: 1px solid #e5e5e5;
        margin-bottom: 10px;
        padding: 20px; */
        width: 172px;
        max-height: 200px;
        overflow: scroll;
        }
    .dropdown .scroll-container {
        width: 150px;
        margin: 0 auto;
    }
    .range-container {
        /* border: 1px solid #e5e5e5; */
        margin-bottom: 10px;
        /* padding: 20px; */
        width: 500px;
        display: flex;
        justify-content: space-around;
    }
    .sub-title {
        margin: 20px 0px 10px;
        text-align:center
    }
    .selector-container {
        border: 1px solid #e5e5e5;
        margin-bottom: 20px;
        padding: 5px 10px;
        width: 180px;
        /* display: flex;
        justify-content: center; */
    }
    .item {
        padding: 0px 20px;
        height: 25px;
        line-height: 25px;
    }
    .item:hover {
        background-color: #e5e5e5;
    }
    .column {
        display: inline-block;
        width: 50px;
    }
</style>
