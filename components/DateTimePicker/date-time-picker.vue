<template>
    <div class="kd-date-time-picker">
        <kd-tooltip
                v-model="isTooltipShow"
                placement="bottom-start"
                trigger="click"
                content-class="kd-date-time-tooltip"
                :width-limit="false"
                :disabled="disabled"
                can-hover
        >
            <kd-input
                    v-model="inputDateString"
                    :placeholder="placeholder"
                    :width="range ? 400 : 200"
                    :disabled="disabled"
            >
                <!-- <template slot="suffix">
                    <i class="kd-icon-date"></i>
                </template> -->
                <template slot="suffix">
                    <i
                            v-if="clearable && !disabled && !!inputDateString"
                            class="kd-icon-close ksfont"
                            @click="onClear"
                    ></i>
                    <i
                            v-else
                            class="kd-icon-date ksfont"
                    ></i>
                </template>
            </kd-input>
            <template slot="content">
                <div
                        v-if="range===false"
                        :class="{
                            'kd-datetime-picker-panel': true,
                            'has-sidebar': shortcuts.length>0
                        }"
                >
                    <!-- 左边 快捷选项-->
                    <div
                            v-if="shortcuts.length>0"
                            class="kd-datetime-picker-sidebar"
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
                    <!-- 选择器主体 -->
                    <div class="kd-datetime-panel">
                        <div class="kd-datetime-tabs">
                            <!-- kd-tabs-content -->
                            <div
                                    :class="{
                                        'kd-datetime-tab': true,
                                        'kd-not-active': tabSelectValue!=='date'
                                    }"
                                    @click="tabSelectValue='date'"
                            >
                                <span class="kd-datetime-tab-text">{{ tabDateArr[0] || '0000-00-00' }}</span>
                            </div>
                            <div
                                    :class="{
                                        'kd-datetime-tab': true,
                                        'kd-not-active': tabSelectValue!=='time'
                                    }"
                                    @click="tabSelectValue='time'"
                            >
                                <div class="kd-datetime-tab-text">{{ tabTimeArr[0] || '00:00:00' }}</div>
                            </div>
                        </div>
                        <div
                                v-show="tabSelectValue === 'date'"
                                class="kd-picker-wrapper"
                        >
                            <Calendar
                                    ref="calendar"
                                    v-model="tabDateArr"
                                    :format-string="formatString"
                                    :disabled-date="disabledDate"
                                    :max-date="max"
                                    :min-date="min"
                                    @pageChange="pageChange"
                                    @select="popDateTimeValue"
                            ></Calendar>
                        </div>
                        <div
                                v-if="tabSelectValue === 'time'"
                                class="kd-picker-wrapper"
                        >
                            <Time
                                    v-model="tabTimeArr[0]"
                                    :date="tabDateArr[0]"
                                    :count="9"
                                    @change="timeValueChange"
                            >
                            </Time>
                        </div>
                    </div>
                    <!-- footer -->
                    <!-- <div class="kd-datetime-footer">
                        <kd-button @click="confirmDateTime">确认</kd-button>
                        <kd-button @click="isTooltipShow=false">关闭</kd-button>
                    </div> -->
                </div>

                <div
                        v-if="range===true"
                        :class="{
                            'kd-datetime-picker-panel': true,
                            'isRange': true,
                            'has-sidebar': shortcuts.length>0
                        }"
                >
                    <!-- <div class="kd-datetime-body"> -->
                    <!-- 左边 快捷选项-->
                    <div
                            v-if="shortcuts.length>0"
                            class="kd-datetime-picker-sidebar"
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
                    <div class="kd-datetime-range-container">
                        <div
                                class="kd-datetime-panel"
                                @mouseleave="clearRangeDay"
                        >
                            <div class="kd-datetime-tabs">
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-not-active': tabSelectValue!=='date'
                                        }"
                                        @click="tabSelectValue='date'"
                                >
                                    <span class="kd-datetime-tab-text">{{ tabDateArr[0] || '0000-00-00' }}</span>
                                </div>
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-not-active': tabSelectValue!=='time'
                                        }"
                                        @click="tabSelectValue='time'"
                                >
                                    <div class="kd-datetime-tab-text">{{ tabTimeArr[0] || '00:00:00' }}</div>
                                </div>
                                <!-- <kd-button
                                        class="kd-datetime-tab"
                                        @click="tabSelectValue='date'"
                                >{{ tabDateArr[0] || '0000-00-00' }}</kd-button>
                                <kd-button
                                        class="kd-datetime-tab"
                                        @click="tabSelectValue='time'"
                                >{{ tabTimeArr[0] || '00:00:00' }}</kd-button> -->
                            </div>
                            <div
                                    v-show="tabSelectValue === 'date'"
                                    class="kd-picker-wrapper"
                            >
                                <Calendar
                                        ref="startCalendar"
                                        v-model="tabDateArr"
                                        :format-string="formatString"
                                        :disabled-date="disabledDate"
                                        :max-date="max"
                                        :min-date="min"
                                        :is-range="true"
                                        :range-end-date="rangeEndDate"
                                        @select="popDateTimeValue"
                                        @pageChange="pageChange"
                                        @onDayMouseenter="onDayMouseenter"
                                ></Calendar>
                            </div>
                            <div
                                    v-if="tabSelectValue === 'time'"
                                    class="kd-picker-wrapper"
                            >
                                <Time
                                        v-model="tabTimeArr[0]"
                                        :date="tabDateArr[0]"
                                        :count="9"
                                        @change="timeValueChange"
                                >
                                </Time>
                            </div>
                        </div>
                        <div
                                class="kd-datetime-panel"
                                @mouseleave="clearRangeDay"
                        >
                            <div class="kd-datetime-tabs">
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-not-active': tabSelectValue!=='date'
                                        }"
                                        @click="tabSelectValue='date'"
                                >
                                    <span class="kd-datetime-tab-text">{{ tabDateArr[1] || '0000-00-00' }}</span>
                                </div>
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-not-active': tabSelectValue!=='time'
                                        }"
                                        @click="tabSelectValue='time'"
                                >
                                    <div class="kd-datetime-tab-text">{{ tabTimeArr[1] || '00:00:00' }}</div>
                                </div>
                                <!-- <kd-button
                                        class="kd-datetime-tab"
                                        @click="tabSelectValue='date'"
                                >{{ tabDateArr[1] || '0000-00-00' }}</kd-button>
                                <kd-button
                                        class="kd-datetime-tab"
                                        @click="tabSelectValue='time'"
                                >{{ tabTimeArr[1] || '00:00:00' }}</kd-button> -->
                            </div>
                            <div
                                    v-show="tabSelectValue === 'date'"
                                    class="kd-picker-wrapper"
                            >
                                <Calendar
                                        ref="endCalendar"
                                        v-model="tabDateArr"
                                        :format-string="formatString"
                                        :is-end-calendar="true"
                                        :disabled-date="disabledDate"
                                        :max-date="max"
                                        :min-date="min"
                                        :is-range="true"
                                        :range-end-date="rangeEndDate"
                                        @select="popDateTimeValue"
                                        @pageChange="pageChange"
                                        @onDayMouseenter="onDayMouseenter"
                                ></Calendar>
                            </div>
                            <div
                                    v-if="tabSelectValue === 'time'"
                                    class="kd-picker-wrapper"
                            >
                                <Time
                                        v-model="tabTimeArr[1]"
                                        :date="tabDateArr[1]"
                                        :count="9"
                                        @change="timeValueChange"
                                >
                                </Time>
                            </div>
                        </div>
                    </div>
                    <!-- </div> -->
                </div>
                <!-- footer -->
                <div class="kd-datetime-footer">
                    <kd-button
                            type="primary"
                            @click="confirmDateTime"
                    >确认</kd-button>
                </div>
            </template>
        </kd-tooltip>
    </div>
</template>

<script>
    import Moment from 'dayjs';
    import Time from '../TimePicker/Time.vue';

    export default {
        name: 'KdDateTimePicker',
        components: {
            Time
        },
        props: {
            value: {
                type: [String, Array],
                default: function () {
                    return [];
                }
            },
            // 日期格式字符串
            formatString: {
                type: String,
                default: function () {
                    return 'YYYY-MM-DD';
                }
            },
            // 是否是范围区间
            range: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            placeholder: {
                type: String,
                default() {
                    return '请选择日期时间';
                }
            },
            // 配置的快捷菜单
            shortcuts: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            clearable: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            // 组件级别禁用
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            // 日期条件禁用
            disabledDate: {
                type: Function
            }
        },
        data() {
            return {
                dateTimeValue: [],
                inputDateString: '',
                // 时间范围模式专用变量
                rangeEndDate: '', // 选中第一个日期后, hover 的第二个日期, 用于 isInRange 状态计算
                isTooltipShow: false,
                tabSelectValue: 'date' // 默认是 date 的 tab 页面
            };
        },
        computed: {
            // tabDateArr 和  canlendar 的 value 不能等同.
            tabDateArr() {
                return this.dateTimeValue.map(x => x && x.split(' ')[0]) || ['0000-00-00'];
            },
            tabTimeArr() {
                return this.dateTimeValue.map(x => x && x.split(' ')[1]) || ['00:00:00'];
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    // TODO: 接受时间戳, 其余格式的时间(使用moment 转换)
                    if (!v) {
                        this.inputDateString = v;
                        this.dateTimeValue = [];
                    }
                    if (!!v && typeof v === 'string') {
                        if (!Moment(v).isValid()) {
                            v = '';
                        }
                        this.inputDateString = v;
                        this.dateTimeValue = [v];
                    } else if (Array.isArray(v)) {
                        const tmpArr = v.filter(timeStr => Moment(timeStr).isValid());
                        v = tmpArr.length > 2 ? tmpArr.slice(0, 2) : tmpArr;
                        this.inputDateString = v.join(' ~ ');
                        this.dateTimeValue = v;
                    }
                }
            }
        },
        methods: {
            timeValueChange() {
                this.mergeDateTime(this.tabTimeArr, 'time');
            },
            confirmDateTime() {
                this.isTooltipShow = false;
                this.tabSelectValue = 'date';
                if (!this.range) {
                    this.$emit('input', this.dateTimeValue[0]);
                } else {
                    this.$emit('input', this.dateTimeValue);
                }
            },
            onDayMouseenter(date) {
                this.rangeEndDate = this.range ? date : '';
            },
            // 鼠标移出日历, 清空 rangeEndDate 信息 (hover )
            clearRangeDay() {
                this.rangeEndDate = null;
            },

            // 日历翻页
            pageChange(v, unit) {
                if (this.range) {
                    this.$refs.startCalendar.changePage(v, unit);
                    this.$refs.endCalendar.changePage(v, unit);
                } else {
                    this.$refs.calendar.changePage(v, unit);
                }
            },

            mergeDateTime(arr, type) { // 改变日期的时候, 不改已选中的时间
                // TODO: 增加默认值. 没有日期则自动填充 '今天', 没有时间则自动填充 '零点'
                if (this.dateTimeValue.length === 0) { // 也要区分type
                    if (type === 'date') {
                        this.dateTimeValue = arr.map(date => {
                            return `${date} 00:00:00`;
                        });
                    }
                    if (type === 'time') {
                        this.dateTimeValue = arr.map(time => {
                            return `${Moment().format('YYYY-MM-DD')} ${time}`;
                        });
                    }
                } else {
                    this.dateTimeValue = this.dateTimeValue.map((datetime, i) => {
                        const newDatetime = datetime.split(' ');
                        if (type === 'date') {
                            newDatetime[0] = arr[i];
                        }
                        if (type === 'time') {
                            newDatetime[1] = arr[i];
                        }
                        return newDatetime.join(' ');
                    });
                }
            },

            // 日期改变
            popDateTimeValue(dateArr, source = 'calendar') {
                if (this.range === false) {
                    this.tabSelectValue = 'time';
                    this.mergeDateTime(dateArr, 'date');
                }
                if (this.range === true) {
                    if (dateArr.length === 2) {
                        this.mergeDateTime(dateArr, 'date');
                        this.tabSelectValue = 'time';
                    }
                }
            },
            rapidSelect(offset) { // value, unit
                offset = typeof offset === 'function' ? offset() : offset;
                const { value, unit } = offset;
                let newDates = [];
                if (this.range) {
                    const aimDateStr = Moment().add(value, unit).format(this.formatString);
                    if (value > 0) {
                        // TODO: 快捷选项的时间 不一定是以当前时间为起止点. 可能是某个日期, 某个日期至今
                        newDates = [Moment().format(this.formatString), aimDateStr];
                    } else {
                        newDates = [aimDateStr, Moment().format(this.formatString)];
                    }

                    // 调整两页的日历渲染月份
                    this.$refs.startCalendar.turnPageTo(newDates[0]);
                    this.$refs.endCalendar.turnPageTo(Moment(newDates[0]).add(1, 'month').format('YYYY-MM-DD'));

                    this.mergeDateTime(newDates, 'date');
                } else {
                    // 时间点模式
                    const aimDateTimeStr = Moment().add(value, unit).format('YYYY-MM-DD hh:mm:ss');
                    this.$refs.calendar.turnPageTo(aimDateTimeStr);
                    this.isTooltipShow = false;
                    this.$emit('input', aimDateTimeStr);
                }
            },
            onClear(e) {
                e.stopPropagation();

                this.$emit('clear', '');
                this.$emit('change', this.dateTimeValue, 'clear');
                if (this.range) {
                    this.$emit('input', []);
                } else {
                    this.$emit('input', '');
                }
            }
        }
    };
</script>
