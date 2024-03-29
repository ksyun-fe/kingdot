<template>
    <div class="kd-date-picker">
        <kd-tooltip
                v-model="isTooltipShow"
                placement="bottom-start"
                trigger="click"
                :width-limit="false"
                :disabled="disabled"
                can-hover
        >
            <kd-input
                    v-if="!calendar"
                    v-model="inputDateString"
                    :placeholder="placeholder"
                    :readonly="false"
                    :disabled="disabled"
                    :class="{
                        'kd-datepicker-input': true,
                        'range': range
                    }"
                    @keyup.enter="setDate(inputDateString)"
                    @blur="setDate(inputDateString)"
            >
                <template
                        v-if="iconPosition==='prefix'"
                        slot="prefix"
                >
                    <i class="kd-icon-date kdicon"></i>
                </template>
                <template
                        v-if="iconPosition==='prefix'"
                        slot="suffix"
                >
                    <i
                            v-if="clearable && !disabled && !!inputDateString"
                            class="kd-icon-close kd-datepicker-close-icon kdicon"
                            @click="onClear"
                    ></i>
                </template>
                <template
                        v-if="iconPosition==='suffix'"
                        slot="suffix"
                >
                    <i
                            v-if="clearable && !disabled && !!inputDateString"
                            class="kd-icon-close kd-datepicker-close-icon kdicon"
                            @click="onClear"
                    ></i>
                    <i
                            v-if="clearable && !disabled && !!inputDateString"
                            class="kd-icon-date kd-datepicker-date-icon kdicon"
                    ></i>
                    <i
                            v-else
                            class="kd-icon-date kdicon"
                    ></i>
                </template>
            </kd-input>
            <template slot="content">
                <div
                        v-if="range===true"
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
                                @click="rapidSelect(item.value)"
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
                                :pick-type="pickType"
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
                                :pick-type="pickType"
                                @select="popDateValue"
                                @pageChange="pageChange"
                                @onDayMouseenter="onDayMouseenter"
                        ></Calendar>
                    </div>
                </div>
                <div
                        v-if="range===false"
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
                                @click="rapidSelect(item.value)"
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
                                :is-multiple="multiple"
                                :format-string="formatString"
                                :disabled-date="disabledDate"
                                :max-date="max"
                                :min-date="min"
                                :pick-type="pickType"
                                @pageChange="pageChange"
                                @select="popDateValue"
                        ></Calendar>
                    </div>
                </div>
            </template>
        </kd-tooltip>
        <div
                v-if="calendar"
                class="kd-panel-body"
        >
            <Calendar
                    ref="calendar"
                    v-model="markDate"
                    is-multiple
                    read-only
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

<script>
    import Moment from 'dayjs';
    import _isEqual from 'lodash/isEqual';

    export default {
        name: 'KdDatePicker',
        props: {
            value: {
                type: [String, Array],
                default: function () {
                    return [];
                }
            },
            // 格式字符串
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
            // 是否为多选模式
            multiple: {
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
            // 条件禁用
            disabledDate: {
                type: [Array, Function],
                default() {
                    return [];
                }
            },
            maxDate: {
                type: String
            },
            minDate: {
                type: String
            },
            // prefix, suffix
            iconPosition: {
                type: String,
                default: function () {
                    return 'prefix';
                }
            },
            // 日历模式
            calendar: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            markDate: {
                type: [String, Array],
                default: function () {
                    return [];
                }
            },
            // 拾取类型  year month day
            pickType: {
                type: String,
                default() {
                    return 'day';
                }
            }
        },
        data() {
            return {
                dateValue: [],
                inputDateString: '',
                max: this.maxDate ? Moment(this.maxDate).format(this.formatString) : '',
                min: this.minDate ? Moment(this.minDate).format(this.formatString) : '',
                // 时间范围模式专用变量
                rangeEndDate: '', // 选中第一个日期后, hover 的第二个日期, 用于 isInRange 状态计算
                isTooltipShow: false
            };
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if (!v) { // 空字符
                        this.inputDateString = v;
                        this.dateTimeValue = [];
                    }
                    if (!!v && typeof v === 'string') {
                        if (!Moment(v).isValid()) {
                            v = '';
                        }
                        this.inputDateString = v;
                        this.dateValue = [v];
                    } else if (this.range && !this.multiple) {
                        const tmpArr = v.filter(timeStr => Moment(timeStr).isValid());
                        v = tmpArr.length > 2 ? tmpArr.slice(0, 2) : tmpArr;
                        this.inputDateString = v.join(' ~ ');
                        this.dateValue = v;
                    } else if (!this.range && this.multiple) {
                        const tmpArr = v.filter(timeStr => Moment(timeStr).isValid());
                        this.inputDateString = tmpArr.join(',');
                        this.dateValue = tmpArr;
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

            // 底下上传上来的数据  在这里不给dateValue赋值. 从底下来的数据, 又通过props传下去不合理
            // 应该用 watch 监听value, 然后改变 inputDateString. 就没有select 的事情了 吗??
            popDateValue(dateArr, source = 'calendar') {
                if (this.range && dateArr.length < 2) return;

                this.dateValue = dateArr;
                this.emitChange();

                if (source !== 'shortcuts' && !this.multiple) {
                    this.isTooltipShow = false;
                }
            },
            parseDateStr(dateStr) {
                let dateArr = [];
                const separatorList = ['~', '-', ',', '/', '.', ' '];

                if (this.range) {
                    const tmpArr = dateStr.split(' ').filter(x => !!x && separatorList.indexOf(x) === -1);

                    dateArr = tmpArr.filter(x => Moment(x).isValid()).map(date => {
                        return Moment(date).format(this.formatString);
                    });
                    // 排序
                    if (Moment(dateArr[0]).isAfter(Moment(dateArr[1]))) {
                        [dateArr[0], dateArr[1]] = [dateArr[1], dateArr[0]];
                    }
                    return dateArr;
                } else if (this.multiple) {
                    const tmpArr = dateStr.split(',').filter(x => !!x && separatorList.indexOf(x) === -1);

                    dateArr = tmpArr.filter(x => Moment(x).isValid()).map(date => {
                        return Moment(date).format(this.formatString);
                    });
                    return dateArr;
                }
            },
            // input 回车和blur事件触发
            setDate(inputValue) {
                if (this.range || this.multiple) {
                    const dateArr = this.parseDateStr(inputValue);
                    if (dateArr.filter(x => x === 'Invalid Date').length > 0) {
                        this.$message.error('无法解析范围日期字符串');
                        return;
                    }
                    this.dateValue = dateArr;
                    this.emitChange();
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
                // 验证通过了
                this.dateValue = [inputValue];
                this.emitChange();
            },
            rapidSelect(aimDate) { // value, unit
                aimDate = typeof aimDate === 'function' ? aimDate() : aimDate;
                // const { value, unit } = offset;
                if (this.range) { // 对应的是数组
                    // 正常的 范围日期
                    let newDates = [];
                    if (Array.isArray(aimDate) && aimDate.length === 2) {
                        // 使时间字符串数组保持 左值早于右值
                        if (Moment(aimDate[0]).isAfter(Moment(aimDate[1]))) { // 左时间晚于右时间
                            const tmp = aimDate.pop();
                            aimDate.unshift(tmp);
                        }
                        newDates = aimDate.map(x => {
                            return Moment(x).format('YYYY-MM-DD');
                        });
                    }
                    this.dateValue = newDates;
                } else {
                    let newDate = '';
                    if (!!aimDate && typeof aimDate === 'string') {
                        newDate = Moment(aimDate).format('YYYY-MM-DD');
                    }
                    if (Array.isArray(aimDate) && aimDate.length === 1) {
                        newDate = Moment(aimDate[0]).format('YYYY-MM-DD');
                    }
                    this.dateValue = [newDate];
                    // 时间点模式
                }
                this.emitChange();
            },
            emitChange() { // 对外 emit 的部分. 可以在此处format
                let v = this.dateValue;
                if (this.range) {
                    v = (v && v.length < 2) ? [] : v;
                } else if (!this.multiple) {
                    v = v[0] || '';
                }

                this.$emit('input', v);
                if (!_isEqual(v, this.value)) {
                    this.$emit('change', v);
                }
            },
            onClear(e) {
                e.stopPropagation();
                this.dateValue = [];
                this.emitChange();
                this.$emit('clear', '');
            }
        }
    };
</script>
