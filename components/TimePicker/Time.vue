<template>
    <div class="k-time k-scroll-select-group" v-if="!step">
        <div
                v-for="(item, index) in data"
                :key="index"
                class="column"
        >
            <ScrollSelect
                    ref="ScrollSelect"
                    v-model="timeValue[index]"
                    :data="item"
                    :item-disable="getScrollDisable(index)"
                    :disabled="scrollDisabled[index]"
            >
            </ScrollSelect>
        </div>
    </div>
</template>
<script>
    // import ScrollSelect from '../ScrollSelect/ScrollSelect.vue';
    // import { parseTime, stringTime } from './utils.js';
    import { strPad, range, getDateString } from './utils.js';

    export default {
        // components: { ScrollSelect },
        props: {
            // title: {
            //     type: String
            // },
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
            }
        },
        data() {
            return {
                timeValue: [],
                disabledItems: this.disabled || [false, false, false],
                baseDate: '',
                maxTime: this.max,
                minTime: this.min
            };
        },
        computed: {
            data() {
                return Array.apply(null, {length: 3}).map((item, index) => {
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
                    if (Array.isArray(v)) {
                        this.timeValue = v; // 给 innerValue 赋值
                    } else {
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
            min: {
                immediate: true,
                handler(v) {
                    this.minTime = v;
                }
            },

            timeValue(value, oldValue) {
                console.log('time 变化', value, oldValue);
                value = value.join(':');

                oldValue = oldValue && oldValue.join(':');

                if (this.value !== value) {
                    this.$emit('input', value); // 传递给上层的 触发 value 变化. 上层 value 是字符串
                    this.$emit('change', value, oldValue);
                }
            }
        },
        created() {
            console.log('time created', this.min, this.max);
        },
        methods: {
            selectTimeValue(item) {
                this.$emit('input', [item]);
                this.$emit('tooltipHide');
            },
            parseTime(time) {
              let [h = 0, m = 0, s = 0] = time.split(':').map(i => +i);
              return (h * 60 + m) * 60 + s;
            },
            stringTime(time) {
                let h = Math.floor(time / 3600);
                let m = Math.floor((time % 3600) / 60);
                let s = time % 60;
                return `${strPad(h, 2)}:${strPad(m, 2)}:${strPad(s, 2)}`;
            },
            getScrollDisable(index) {
                return value => {
                    let time = [...this.timeValue].map((item, i) => {
                        if (this.$refs.ScrollSelect && this.$refs.ScrollSelect[i]) {
                            return this.$refs.ScrollSelect[i].currentValue;
                        }
                        return item;
                    });

                    const min = this.date ? this.minTime : `${this.baseDate} ${this.minTime}`;
                    const max = this.date ? this.maxTime : `${this.baseDate} ${this.maxTime}`;
                    let disable = false;
                    time[index] = value;
                    const timeValue = time.join(':');

                    time = new Date(`${this.baseDate} ${timeValue}`);

                    if (this.minTime && this.maxTime) {
                        disable = time < new Date(`${min}`) || time > new Date(`${max}`);
                    } else if (this.minTime) {
                        disable = time < new Date(`${min}`);
                    } else if (this.maxTime) {
                        disable = time > new Date(`${max}`);
                    }
                    if (this.disabledList) {
                        if (Array.isArray(this.disabledList)) {
                            disable = disable || this.disabledList.includes(timeValue); // string 格式的时间
                        }
                        if (typeof this.disabledList === 'function') {
                            disable = disable || this.disabledList(timeValue);
                        }
                    }
                    return disable;
                };
            }
        }
    };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus" type="text/stylus">
// @require('./time.styl')
</style>
