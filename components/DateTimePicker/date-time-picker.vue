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
                    :disabled="disabled"
                    :class="{
                        'kd-datetime-picker-input': true,
                        'range': range
                    }"
                    @focus="syncDateTime(inputDateString)"
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
                            class="kd-icon-close kd-datetime-close-icon kdicon"
                            @click="onClear"
                    ></i>
                </template>
                <template
                        v-if="iconPosition==='suffix'"
                        slot="suffix"
                >
                    <i
                            v-if="clearable && !disabled && !!inputDateString"
                            class="kd-icon-close kd-datetime-close-icon kdicon"
                            @click="onClear"
                    ></i>
                    <i
                            v-if="clearable && !disabled && !!inputDateString"
                            class="kd-icon-date kd-datetime-date-icon kdicon"
                    ></i>
                    <i
                            v-else
                            class="kd-icon-date kdicon"
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
                                @click="rapidSelect(item.value)"
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
                                        'kd-datetime-tab-not-active': tabSelectValue!=='date'
                                    }"
                                    @click="tabSelectValue='date'"
                            >
                                <span class="kd-datetime-tab-text">{{ tabDateArr[0] || tabDateText }}</span>
                            </div>
                            <div
                                    :class="{
                                        'kd-datetime-tab': true,
                                        'kd-datetime-tab-not-active': tabSelectValue!=='time'
                                    }"
                                    @click="tabSelectValue='time'"
                            >
                                <div class="kd-datetime-tab-text">{{ tabTimeArr[0] || tabTimeText }}</div>
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
                                    :min-date="minDateTime.split(' ')[0]"
                                    :max-date="maxDateTime.split(' ')[0]"
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
                                    :min="minDateTime"
                                    :max="maxDateTime"
                                    :disabled="disabledColumn"
                                    :accuracy="accuracy"
                                    @change="timeValueChange"
                            >
                            </Time>
                        </div>
                    </div>
                </div>

                <div
                        v-if="range===true"
                        :class="{
                            'kd-datetime-picker-panel': true,
                            'isRange': true,
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
                                @click="rapidSelect(item.value)"
                        >
                            <span>{{ item.label }}</span>
                        </div>
                    </div>
                    <!-- 范围选择 主体container -->
                    <div class="kd-datetime-range-container">
                        <div
                                class="kd-datetime-panel"
                                @mouseleave="clearRangeDay"
                        >
                            <div class="kd-datetime-tabs">
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-datetime-tab-not-active': tabSelectValue!=='date'
                                        }"
                                        @click="tabSelectValue='date'"
                                >
                                    <span class="kd-datetime-tab-text">{{ tabDateArr[0] || tabDateText }}</span>
                                </div>
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-datetime-tab-not-active': tabSelectValue!=='time'
                                        }"
                                        @click="tabSelectValue='time'"
                                >
                                    <div class="kd-datetime-tab-text">{{ tabTimeArr[0] || tabTimeText }}</div>
                                </div>
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
                                        :min-date="minDateTime.split(' ')[0]"
                                        :max-date="maxDateTime.split(' ')[0]"
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
                                        :min="minDateTime"
                                        :max="maxDateTime"
                                        :disabled="disabledColumn"
                                        :accuracy="accuracy"
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
                                            'kd-datetime-tab-not-active': tabSelectValue!=='date'
                                        }"
                                        @click="tabSelectValue='date'"
                                >
                                    <span class="kd-datetime-tab-text">{{ tabDateArr[1] || tabDateText }}</span>
                                </div>
                                <div
                                        :class="{
                                            'kd-datetime-tab': true,
                                            'kd-datetime-tab-not-active': tabSelectValue!=='time'
                                        }"
                                        @click="tabSelectValue='time'"
                                >
                                    <div class="kd-datetime-tab-text">{{ tabTimeArr[1] || tabTimeText }}</div>
                                </div>
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
                                        :min-date="minDateTime.split(' ')[0]"
                                        :max-date="maxDateTime.split(' ')[0]"
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
                                        :min="minDateTime"
                                        :max="maxDateTime"
                                        :disabled="disabledColumn"
                                        :accuracy="accuracy"
                                        @change="timeValueChange"
                                >
                                </Time>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- footer -->
                <div
                        v-if="!hideConfirmBtn"
                        class="kd-datetime-footer"
                >
                    <kd-button
                            hollow
                            size="mini"
                            @click="cancelChange"
                    >取消</kd-button>
                    <kd-button
                            hollow
                            size="mini"
                            @click="confirmDateTime"
                    >确认</kd-button>
                </div>
            </template>
        </kd-tooltip>
    </div>
</template>

<script>
    import Moment from 'dayjs';
    import _isEqual from 'lodash/isEqual';
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
            multiple: {
                type: Boolean,
                default() {
                    return false;
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
            hideConfirmBtn: {
                type: Boolean,
                default() {
                    return false;
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
                type: [Array, Function],
                default() {
                    return [];
                }
            },
            minDateTime: {
                type: String,
                default() {
                    return '';
                }
            },
            maxDateTime: {
                type: String,
                default() {
                    return '';
                }
            },
            disabledColumn: {
                type: Array,
                default() {
                    return [false, false, false];
                }
            },
            accuracy: {
                type: String,
                default() {
                    return 'secend';
                }
            },
            // prefix, suffix
            iconPosition: {
                type: String,
                default: function () {
                    return 'prefix';
                }
            }
        },
        data() {
            return {
                dateTimeValue: [],
                inputDateString: '',
                formatString: 'YYYY-MM-DD', // 日期格式字符串
                // 时间范围模式专用变量
                rangeEndDate: '', // 选中第一个日期后, hover 的第二个日期, 用于 isInRange 状态计算
                isTooltipShow: false,
                tooltipShowFlag: false,
                onShowValue: Array.isArray(this.value) ? [...this.value] : this.value,
                tabDateText: '0000-00-00',
                tabTimeText: this.accuracy === 'minute' ? '00:00' : '00:00:00',
                tabSelectValue: 'date' // 默认是 date 的 tab 页面
            };
        },
        computed: {
            tabDateArr() {
                let dateTimeValue = this.dateTimeValue;
                if (this.multiple) {
                    dateTimeValue = dateTimeValue.length > 0 ? [dateTimeValue[dateTimeValue.length - 1]] : [];
                }
                return dateTimeValue.map(x => x && x.split(' ')[0]) || [this.tabDateText];
            },
            tabTimeArr() {
                let dateTimeValue = this.dateTimeValue;
                if (this.multiple) {
                    dateTimeValue = dateTimeValue.length > 0 ? [dateTimeValue[dateTimeValue.length - 1]] : [];
                }
                return dateTimeValue.map(x => x && x.split(' ')[1]) || [this.tabTimeText];
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    // TODO: 接受时间戳, 其他格式的时间
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
                    } else if (this.multiple) {
                        if (!Array.isArray(v)) {
                            v = [v];
                        }
                        this.inputDateString = v.join(',');
                        this.dateTimeValue = v;
                    } else if (Array.isArray(v)) {
                        const tmpArr = v.filter(timeStr => Moment(timeStr).isValid());
                        v = tmpArr.length > 2 ? tmpArr.slice(0, 2) : tmpArr;
                        this.inputDateString = v.join(' ~ ');
                        this.dateTimeValue = v;
                    }
                }
            },
            isTooltipShow(v) {
                this.onShowValue = Array.isArray(this.value) ? [...this.value] : this.value;
                if (v) {
                    this.tooltipShowFlag = true;
                } else {
                    this.tooltipShowFlag = false;
                }
            }
        },
        methods: {
            // 点击 input, 将 input value 和 innerValue 同步
            syncDateTime(inputValue) {
                if (!inputValue) {
                    this.dateTimeValue = [];
                }
            },
            parseDatetimeStr(datetimeStr) {
                // const separatorList = ['~', '-', '/', '.', ' '];
                let datetimeArr = [];
                const delimiter = this.range ? '~' : ',';
                const tmpArr = datetimeStr.split(delimiter);

                datetimeArr = tmpArr.map(date => {
                    if (Moment(date).isValid() === false) {
                        return 'Invalid Date';
                    }
                    return Moment(date).format('YYYY-MM-DD HH:mm:ss');
                });
                // 排序
                if (this.range && Moment(datetimeArr[0]).isAfter(Moment(datetimeArr[1]))) {
                    [datetimeArr[0], datetimeArr[1]] = [datetimeArr[1], datetimeArr[0]];
                }
                return datetimeArr;
            },
            // input 回车和blur事件触发
            setDate(inputValue) {
                if (this.range) {
                    if (!inputValue) return;
                    const dateTimeArr = this.parseDatetimeStr(inputValue);
                    if (dateTimeArr.filter(x => x === 'Invalid Date').length > 0) {
                        this.$message.error('无法解析范围日期字符串');
                        return;
                    }

                    this.dateTimeValue = dateTimeArr;
                    this.emitChange();
                } else if (this.multiple) {
                    const dateTimeArr = this.parseDatetimeStr(inputValue).filter(x => x !== 'Invalid Date');
                    this.dateTimeValue = dateTimeArr;
                    this.emitChange();
                } else { // 单点时间
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
                }
            },
            timeValueChange() {
                this.mergeDateTime(this.tabTimeArr, 'time');
                if (this.hideConfirmBtn) {
                    this.emitChange();
                }
            },
            cancelChange() {
                this.isTooltipShow = false;
                if (this.onShowValue.toString() !== this.value.toString()) {
                    this.$emit('input', this.onShowValue);
                    this.$emit('change', this.onShowValue);
                }
            },
            confirmDateTime() {
                this.isTooltipShow = false;
                this.tabSelectValue = 'date';
                this.emitChange();
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
                if (this.multiple) {
                    let dateTimeValue;
                    if (type === 'date') {
                        dateTimeValue = `${arr[0]} ${this.tabTimeText}`;
                    }
                    if (type === 'time') {
                        dateTimeValue = `${this.tabDateArr[0] || Moment().format(this.formatString)} ${arr[0]}`;
                    }
                    if (!this.dateTimeValue.includes(dateTimeValue)) {
                        if (this.tooltipShowFlag) {
                            this.dateTimeValue = [...this.dateTimeValue, dateTimeValue];
                            this.tooltipShowFlag = false;
                        } else {
                            this.dateTimeValue = [...this.dateTimeValue];
                            this.dateTimeValue.splice(-1, 1, dateTimeValue);
                        }
                    }
                } else if (this.dateTimeValue.length === 0) {
                    if (type === 'date') {
                        this.dateTimeValue = arr.map(date => {
                            return `${date} ${this.tabTimeText}`;
                        });
                    }
                    if (type === 'time') {
                        this.dateTimeValue = arr.map(time => {
                            return `${Moment().format(this.formatString)} ${time}`;
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
                    // 不自动跳到 time tab
                    // this.tabSelectValue = 'time';
                    this.mergeDateTime(dateArr, 'date');
                    if (this.hideConfirmBtn) {
                        this.emitChange();
                    }
                }
                if (this.range === true) {
                    if (dateArr.length === 2) {
                        this.mergeDateTime(dateArr, 'date');
                        if (this.hideConfirmBtn) {
                            this.emitChange();
                        }
                        // this.tabSelectValue = 'time';
                    }
                }
            },
            rapidSelect(aimDateTime) { // value, unit  {label, Value}
                aimDateTime = typeof aimDateTime === 'function' ? aimDateTime() : aimDateTime; // 可能是 arr, string
                if (this.range) {
                    // 正常的 范围日期
                    let newDates = [];
                    if (Array.isArray(aimDateTime) && aimDateTime.length === 2) {
                        // 使时间字符串数组保持 左值早于右值
                        if (Moment(aimDateTime[0]).isAfter(Moment(aimDateTime[1]))) { // 左时间晚于右时间
                            const tmp = aimDateTime.pop();
                            aimDateTime.unshift(tmp);
                        }
                        newDates = aimDateTime.map(x => {
                            return Moment(x).format('YYYY-MM-DD HH:mm:ss'); // TODO: 加上精度之后, formatStr 格式变化
                        });
                        this.mergeDateTime(newDates, 'date');
                    }
                    this.dateTimeValue = newDates;
                } else { // 时间点模式
                    let newDateTime = '';
                    if (!!aimDateTime && typeof aimDateTime === 'string') { // 空字符串? 需要单独逻辑
                        newDateTime = Moment(aimDateTime).format('YYYY-MM-DD HH:mm:ss');
                    }
                    if (Array.isArray(aimDateTime) && aimDateTime.length === 1) {
                        newDateTime = Moment(aimDateTime[0]).format('YYYY-MM-DD HH:mm:ss');
                    }
                    this.dateTimeValue = [newDateTime];
                }

                if (this.hideConfirmBtn) {
                    this.emitChange();
                }
            },
            emitChange() { // 对外 emit 的部分. 可以在此处format
                let v = this.dateTimeValue;
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
                this.dateTimeValue = [];
                this.emitChange();
                this.$emit('clear');
            }
        }
    };
</script>
