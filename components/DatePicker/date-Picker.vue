<template>
    <div class="kd-date-picker">
        <kd-tooltip
                placement="bottom-start"
                trigger="click"
                :width-limit="false"
                :disabled="disabled"
                can-hover
        >
            <kd-input
                    v-model="inputDateString"
                    :placeholder="placeholder"
                    :width="isRange ? 400 : 200"
                    :disabled="disabled"
                    @keyup.enter="setDate(inputDateString)"
            >
                <template slot="suffix">
                    <i class="kd-icon-date"></i>
                </template>
            </kd-input>
            <template slot="content">
                <div
                        v-if="isRange===true"
                        :class="{
                            'kd-picker-panel': true,
                            'isRange': true,
                            'has-sidebar': shortcuts.length>0
                        }"
                >
                    <!-- 左边 快捷选项-->
                    <div
                            v-if="shortcuts.length>0"
                            class="kd-panel-sidebar"
                    >
                        <div
                                v-for="(item, i) in shortcuts"
                                :key="i"
                                class="kd-sidebar-row"
                                @click="rapidSelect(item.offset)"
                        >
                            <span>{{ item.label }}</span>
                        </div>
                    </div>
                    <!-- 日历 -->
                    <!-- <div class="kd-panel-body-container"> -->
                    <div
                            class="kd-panel-body"
                            @mouseleave="clearRangeDay"
                    >
                        <!-- :selected-date="inputDateString" -->
                        <Calendar
                                ref="startCalendar"
                                v-model="dateValue"
                                :format-string="formatString"
                                :disabled-date="disabledDate"
                                :max-date="max"
                                :min-date="min"
                                :is-range="true"
                                :range-end-date="rangeEndDate"
                                @select="popDateValue"
                                @pageChange="pageChange"
                                @onDayMouseenter="onDayMouseenter"
                        ></Calendar>
                        <Calendar
                                ref="endCalendar"
                                v-model="dateValue"
                                :format-string="formatString"
                                :is-end-calendar="true"
                                :disabled-date="disabledDate"
                                :max-date="max"
                                :min-date="min"
                                :is-range="true"
                                :range-end-date="rangeEndDate"
                                @select="popDateValue"
                                @pageChange="pageChange"
                                @onDayMouseenter="onDayMouseenter"
                        ></Calendar>
                    </div>
                </div>
                <div
                        v-if="isRange===false"
                        :class="{
                            'kd-picker-panel': true,
                            'has-sidebar': shortcuts.length>0
                        }"
                >
                    <!-- 左边 快捷选项-->
                    <div
                            v-if="shortcuts.length>0"
                            class="kd-panel-sidebar"
                    >
                        <div
                                v-for="(item, i) in shortcuts"
                                :key="i"
                                class="kd-sidebar-row"
                                @click="rapidSelect(item.offset)"
                        >
                            <span>{{ typeof item.label === 'function' ? item.label() : item.label }}</span>
                        </div>
                    </div>
                    <!-- 日历 -->
                    <div class="kd-panel-body">
                        <!-- :selected-date="inputDateString" -->
                        <Calendar
                                ref="calendar"
                                v-model="dateValue"
                                :format-string="formatString"
                                :disabled-date="disabledDate"
                                :max-date="max"
                                :min-date="min"
                                @pageChange="pageChange"
                                @select="popDateValue"
                        ></Calendar>
                    </div>
                </div>
            </template>
        </kd-tooltip>
    </div>
</template>

<script>
    import Moment from 'dayjs';

    export default {
        name: 'KdDatePicker',
        props: {
            value: {
                type: [String, Array],
                default: function () {
                    return [];
                }
            },
            // dateValue: {
            //     type: Array,
            //     default: function () {
            //         return [];
            //     }
            // },
            // 格式字符串
            formatString: {
                type: String,
                default: function () {
                    return 'YYYY-MM-DD';
                }
            },
            // 是否是范围区间
            isRange: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            placeholder: {
                type: String,
                default() {
                    return '请选择日期';
                }
            },
            // 配置的快捷菜单
            shortcuts: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            // 组件级别禁用
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            // 条件禁用
            disabledDate: {
                type: Function
            },
            maxDate: {
                type: String
            },
            minDate: {
                type: String
            }
        },
        data() {
            return {
                dateValue: [],
                inputDateString: '',
                max: this.maxDate ? Moment(this.maxDate).format(this.formatString) : '',
                min: this.minDate ? Moment(this.minDate).format(this.formatString) : '',
                // 时间范围模式专用变量
                rangeEndDate: '' // 选中第一个日期后, hover 的第二个日期, 用于 isInRange 状态计算
            };
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if (typeof v === 'string') {
                        // this.$emit('input', v);
                        // this.$emit('change', v);
                        this.inputDateString = v;
                        this.dateValue = [v];
                    } else if (Array.isArray(v)) {
                        // this.$emit('input', v);
                        // this.$emit('change', v);
                        this.inputDateString = v.join(' ~ ');
                        this.dateValue = v;
                    }
                }
            },
            maxDate: {
                immediate: true,
                handler(v) {
                    this.max = this.maxDate ? Moment(this.maxDate).format(this.formatString) : '';
                }
            },
            minDate: {
                immediate: true,
                handler(v) {
                    this.min = this.minDate ? Moment(this.minDate).format(this.formatString) : '';
                }
            }
        },
        methods: {
            onDayMouseenter(date) {
                // const [begin, end] = this.dateValue;
                // const isSetRange = this.range && begin && !end;
                this.rangeEndDate = this.isRange ? date : '';
            },
            // 鼠标移出日历, 清空 rangeEndDate 信息 (hover )
            clearRangeDay() {
                this.rangeEndDate = null;
            },

            // 日历翻页
            pageChange(v, unit) {
                if (this.isRange) {
                    this.$refs.startCalendar.changePage(v, unit);
                    this.$refs.endCalendar.changePage(v, unit);
                } else {
                    this.$refs.calendar.changePage(v, unit);
                }
            },

            // 底下上传上来的数据  在这里不给dateValue赋值. 从底下来的数据, 又通过props传下去不合理
            // 应该用 watch 监听value, 然后改变 inputDateString. 就没有select 的事情了 吗??
            popDateValue(dateArr, source = 'calendar') {
                if (this.isRange && dateArr.length < 2) return;
                if (this.isRange) {
                    this.$emit('input', dateArr);
                    this.inputDateString = dateArr.join(' ~ ');
                } else {
                    this.$emit('input', dateArr[0]);
                    this.inputDateString = dateArr[0];
                }
                // console.log('emit change', this.inputDateString, source);
                this.dateValue = dateArr;
                this.$emit('change', this.dateValue, source);
            },
            // input 回车和blur事件触发
            setDate(inputValue) {
                if (this.isRange) {
                    return;
                }
                if (!inputValue.trim()) {
                    this.inputDateString = '';
                    return;
                }
                if (Moment(inputValue).isValid() === false) {
                    // 回显作为信息提示
                    this.inputDateString = 'Invalid Date';
                    return;
                }
                this.$refs.calendar.jumpToDate(inputValue, 'input');
                this.$emit('input', inputValue); // 通过 input 改变时间.
            },
            rapidSelect(offset) { // value, unit
                offset = typeof offset === 'function' ? offset() : offset;
                const { value, unit } = offset;

                if (this.isRange) {
                    const aimDateStr = Moment().add(value, unit).format(this.formatString);
                    const startDate = value > 0 ? Moment().format(this.formatString) : aimDateStr;
                    if (value > 0) {
                        this.dateValue.splice(0, this.dateValue.length, Moment().format(this.formatString), aimDateStr);
                    } else {
                        this.dateValue.splice(0, this.dateValue.length, aimDateStr, Moment().format(this.formatString));
                    }
                    this.inputDateString = this.dateValue.join(' ~ ');

                    // 调整两页的日历渲染月份
                    this.$refs.startCalendar.jumpToDate(startDate, 'shortcuts');
                    this.$refs.endCalendar.jumpToDate(Moment(startDate).add(1, 'month').format(this.formatString), 'shortcuts');
                } else {
                    // 时间点模式
                    const aimDateStr = Moment().add(value, unit).format(this.formatString);
                    this.dateValue.splice(0, this.dateValue.length, aimDateStr);
                    this.$refs.calendar.jumpToDate(aimDateStr, 'shortcuts');
                }
            }
        }
    };
</script>
