<template>
    <div class="kd-time-picker">
        <!-- 根据 isrange 改变input长度 -->
        <kd-tooltip
                placement="bottom-start"
                trigger="click"
                :width-limit="false"
        >
            <kd-input
                    :placeholder="placeholder"
                    :value="timeString"
            >
                <template slot="prefix">
                    <i class="kd-icon-time"></i>
                </template>
            </kd-input>
            <!-- </kd-tooltip> -->
            <!-- <Input
                    :placeholder="rangePlaceholder"
                    :value="rangeTimeString"
            >
            <template v-slot:prefix>
                <i class="kd-icon-time"></i>
            </template>
            </Input> -->
            <template slot="content">
                <div
                        v-if="!isRange && mode === 'steped-time'"
                        class="dropdown"
                >
                    <!-- <div
                            v-for="(item, i) in timeList"
                            :key="i"
                            class="item">
                        {{ item }}
                    </div> -->
                    <ScrollSelect
                            v-model="selectedTime"
                            :data="timeList"
                    ></ScrollSelect>
                </div>
                <div
                        v-if="!isRange && mode === 'anytime'"
                        class="dropdown"
                >
                    <div class="column">
                        <ScrollSelect
                                v-model="startTime.hour"
                                :data="hourArr"
                        ></ScrollSelect>
                    </div>
                    <div class="column">
                        <ScrollSelect
                                v-model="startTime.minute"
                                :data="minArr"
                        ></ScrollSelect>
                    </div>
                    <div class="column">
                        <ScrollSelect
                                v-model="startTime.second"
                                :data="minArr"
                        ></ScrollSelect>
                    </div>
                </div>
                <div
                        v-if="isRange"
                        class="range-container"
                >
                    <div>
                        <div class="sub-title">开始时间</div>
                        <div
                                v-if="mode === 'steped-time'"
                                class="selector-container"
                        >
                            <ScrollSelect
                                    v-model="selectedTime"
                                    :data="timeList"
                            ></ScrollSelect>
                        </div>
                        <div
                                v-if="mode === 'anytime'"
                                class="selector-container"
                        >
                            <div class="column">
                                <ScrollSelect
                                        v-model="startTime.hour"
                                        :data="hourArr"
                                ></ScrollSelect>
                            </div>
                            <div class="column">
                                <ScrollSelect
                                        v-model="startTime.minute"
                                        :data="minArr"
                                ></ScrollSelect>
                            </div>
                            <div class="column">
                                <ScrollSelect
                                        v-model="startTime.second"
                                        :data="minArr"
                                ></ScrollSelect>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="sub-title">结束时间</div>
                        <div
                                v-if="mode === 'steped-time'"
                                class="selector-container"
                        >
                            <ScrollSelect
                                    v-model="endSelectedTime"
                                    :data="timeList"
                            ></ScrollSelect>
                        </div>
                        <div
                                v-if="mode === 'anytime'"
                                class="selector-container"
                        >
                            <div class="column">
                                <ScrollSelect
                                        v-model="endTime.hour"
                                        :data="hourArr"
                                        :item-disable="endHourLimit"
                                ></ScrollSelect>
                            </div>
                            <div class="column">
                                <ScrollSelect
                                        v-model="endTime.minute"
                                        :data="minArr"
                                        :item-disable="endMinuteLimit"
                                ></ScrollSelect>
                            </div>
                            <div class="column">
                                <ScrollSelect
                                        v-model="endTime.second"
                                        :data="minArr"
                                ></ScrollSelect>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import Lang from 'src/mixin/lang.js';
    import { parseTime, stringTime } from './utils.js';
    export default {
        name: 'TimePicker',
        mixins: [Lang],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            // 满足某条件的时间将被禁用
            disableCondition: {
                type: Function
            },
            // 显示模式: 'steped-time', 'anytime', 按步长显示时间, 任意时间点
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
            isRange: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                placeholder: this.isRange ? '开始时间-结束时间' : '选择时间',
                // rangePlaceholder: '开始时间-结束时间',
                hourArr: Array(24).fill(0).map((x, i) => {
                    return this.addPreZero(i);
                }),
                minArr: Array(60).fill(0).map((x, i) => {
                    return this.addPreZero(i);
                }),
                startTime: {
                    hour: '0',
                    minute: '0',
                    second: '0'
                },
                endTime: {
                    hour: '0',
                    minute: '0',
                    second: '0'
                },
                timeList: [],
                selectedTime: '',
                endSelectedTime: ''
            };
        },
        computed: {
            timeString() {
                let timeString = '';
                if (!this.isRange) {
                    if (this.mode === 'steped-time') {
                        timeString = this.selectedTime;
                    } else {
                        timeString = `${this.startTime.hour}:${this.startTime.minute}:${this.startTime.second}`;
                    }
                    return timeString;
                } else {
                    let start = '';
                    let end = '';

                    if (this.mode === 'steped-time') {
                        start = this.selectedTime;
                        end = this.endSelectedTime;
                    } else {
                        start = `${this.startTime.hour}:${this.startTime.minute}:${this.startTime.second}`;
                        end = `${this.endTime.hour}:${this.endTime.minute}:${this.endTime.second}`;
                    }
                    return `${start}-${end}`;
                }
            }
            // rangeTimeString() {
            //     let start = '';
            //     let end = '';

            //     if (this.mode === 'steped-time') {
            //         start = this.selectedTime;
            //         end = this.endSelectedTime;
            //     } else {
            //         start = `${this.startTime.hour}:${this.startTime.minute}:${this.startTime.second}`;
            //         end = `${this.endTime.hour}:${this.endTime.minute}:${this.endTime.second}`;
            //     }
            //     return `${start}-${end}`;
            // }
        },
        watch: {},
        updated() {
        },
        created() {
            this.init();
        },
        methods: {
            addPreZero(num) {
                return ('00' + String(num)).slice(-2);
            },
            init() {
                // if step, 生成datalist 并且渲染
                if (this.mode === 'steped-time') {
                    // if (!this.step) return [];
                    const step = this.step;
                    const max = parseTime(this.maxTime);
                    const min = parseTime(this.minTime);
                    const data = [];

                    for (let i = min; i <= max; i += step * 60) {
                        data.push(stringTime(i, 'minute'));
                    }
                    this.timeList = data;
                    // 固定时间点, 不展示秒..
                    console.log('timeList', this.timeList);
                }
            },
            endHourLimit(value) {
                return value < this.startTime.hour;
            },
            endMinuteLimit(value) {
                if (this.startTime.hour < this.endTime.hour) {
                    return false;
                } else if (this.startTime.hour > this.endTime.hour) {
                    return true;
                } else if (this.startTime.hour === this.endTime.hour) {
                    return value < this.startTime.minute;
                }
            }
        }
    };
</script>
<style>
    .k-input i {
        color: #e5e5e5;
    }
    .dropdown {
        /* border: 1px solid #e5e5e5;
        margin-bottom: 10px;
        padding: 20px; */
        width: 200px;
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
