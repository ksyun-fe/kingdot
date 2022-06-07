<template>
    <div class="kd-time-panel">
        <!-- kd-scroll-select-group -->
        <div
                v-for="(item, index) in data"
                :key="index"
                class="column"
        >
            <kd-scroll-select
                    ref="ScrollSelect"
                    v-model="timeValue[index]"
                    :data="item"
                    :disable="getScrollDisable(index)"
                    :disabled="scrollDisabled[index]"
            >
            </kd-scroll-select>
        </div>
    </div>
</template>
<script>
    import { strPad, getDateString, stringTime } from './utils.js';

    export default {

        props: {
            value: {
                type: [String, Array]
            },
            min: {
                type: [String, Date]
            },
            max: {
                type: [String, Date]
            },
            step: {
                type: [String, Number]
            },
            date: { // date-time 模式, 需要传入 date 信息
                type: [String, Date]
            },
            disabled: { // 管理scrollSelect组件禁用状态
                type: Array,
                default() {
                    return [];
                }
            },
            disabledList: { // 指定禁用的时间. 可以是列表, 也可以是函数
                type: [Array, Function],
                default() {
                    return [];
                }
            },
            accuracy: {
                type: String,
                default() {
                    return 'secend';
                }
            }
            // count: {
            //     type: Number
            // }
        },
        data() {
            return {
                timeValue: [], // 设定 time 面板被框选的默认值
                disabledItems: this.disabled || [false, false, false],
                baseDate: '',
                maxTime: this.max, // 完整的时间日期字符串, 或者 "00:00:00"
                minTime: this.min
            };
        },
        computed: {
            data() {
                return Array.apply(null, {length: this.accuracy === 'minute' ? 2 : 3}).map((item, index) => {
                    const length = index === 0 ? 24 : 60;
                    return Array(length).fill(0).map((x, i) => strPad(i, 2));
                });
            },
            // stepData() {
            //     if (!this.step) return [];

            //     const step = this.parseTime(this.step || '00:30:00');
            //     const max = this.parseTime(this.maxTime || '23:59:59');
            //     const min = this.parseTime(this.minTime || '00:00:00');
            //     const data = [];

            //     for (let i = min; i <= max; i += step) {
            //         data.push(this.stringTime(i));
            //     }

            //     return data;
            // },
            scrollDisabled() {
                return this.disabledItems;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    // if (!v) {
                    //     this.timeValue = [];
                    //     return;
                    // }

                    if (Array.isArray(v)) {
                        this.timeValue = v; // 给 innerValue 赋值
                    } else if (!!v && typeof v === 'string') {
                        this.timeValue = (v || '00:00:00').split(':');
                    }
                }
            },
            disabled: {
                immediate: true,
                handler(v) {
                    this.disabledItems = v || [false, false, false];
                }
            },
            date: {
                immediate: true,
                handler(v) {
                    this.baseDate = getDateString(v ? new Date(v) : new Date(), 'date');
                }
            },
            max: {
                immediate: true,
                handler(v) {
                    this.maxTime = v;
                }
            },
            min: { // 00:00:00
                immediate: true,
                handler(v) {
                    this.minTime = v;
                }
            },

            timeValue(value, oldValue) {
                // timeValue 是数组, oldValue 和value 一样
                // oldValue = oldValue && oldValue.join(':');
                value = value.join(':');

                value = stringTime(value, this.accuracy);

                if (this.value !== value) { // 防止多次change
                    this.$emit('input', value); // 传递给上层的 触发 value 变化. 上层 value 是字符串
                    this.$emit('change', value);
                }
            }
        },
        created() {
        },
        methods: {
            // parseTime(time) {
            //     let [h = 0, m = 0, s = 0] = time.split(':').map(i => +i);
            //     return (h * 60 + m) * 60 + s;
            // },
            // stringTime(time) {
            //     let h = Math.floor(time / 3600);
            //     let m = Math.floor((time % 3600) / 60);
            //     let s = time % 60;
            //     return `${strPad(h, 2)}:${strPad(m, 2)}:${strPad(s, 2)}`;
            // },

            getScrollDisable(index) {
                return value => {
                    let time = [...this.timeValue].map((item, i) => {
                        if (this.$refs.ScrollSelect && this.$refs.ScrollSelect[i]) {
                            return this.$refs.ScrollSelect[i].currentValue;
                        }
                        return item;
                    });
                    // this.minTime 09:00:00, 或者 mintime 是完整的时间字符串, 并且给date
                    // baseDate: 给了 this.date , 一致. 没给this.date 今天
                    const min = this.date ? this.minTime : `${this.baseDate} ${this.minTime}`;
                    const max = this.date ? this.maxTime : `${this.baseDate} ${this.maxTime}`;
                    let disable = false;
                    time[index] = value;
                    const timeStr = time.join(':');

                    time = new Date(`${this.baseDate} ${timeStr}`);

                    if (this.minTime && this.maxTime) {
                        disable = time < new Date(`${min}`) || time > new Date(`${max}`);
                    } else if (this.minTime) {
                        disable = time < new Date(`${min}`);
                    } else if (this.maxTime) {
                        disable = time > new Date(`${max}`);
                    }
                    if (this.disabledList) {
                        if (Array.isArray(this.disabledList)) {
                            disable = disable || this.disabledList.includes(timeStr); // string 格式的时间
                        }
                        if (typeof this.disabledList === 'function') {
                            disable = disable || this.disabledList(timeStr);
                        }
                    }
                    return disable;
                };
            }
        }
    };
</script>
