<template>
    <div
            class="kd-calendar-wrapper"
            @click.stop
    >
        <!-- 头部放置翻页按钮, 展示当前月份 -->
        <div
                v-show="mode==='select-year' || mode==='select-month'"
                class="kd-calendar-header"
        >
            <i
                    v-show="mode==='select-year'"
                    class="kd-icon-date-forward page-left-icon"
                    @click.stop="setMonthOrYear('Year', -10)"
            ></i>
            <i
                    v-show="mode==='select-month'"
                    class="kd-icon-date-forward page-left-icon"
                    @click.stop="setMonthOrYear('Year', -1)"
            ></i>
            <span
                    v-show="mode==='select-year'"
            >
                {{ Math.floor(moment.year() / 10) * 10 }}年 ~ {{ Math.floor(moment.year() / 10) * 10 + 9 }}年
            </span>
            <span
                    v-show="mode==='select-month'"
                    :class="{
                        'kd-calendar-text-btn': !isRange,
                    }"
                    @click.stop="setMode('select-year')"
            >{{ year }} 年
            </span>
            <i
                    v-show="mode==='select-year'"
                    class="kd-icon-date-forward page-right-icon"
                    @click.stop="setMonthOrYear('Year',10)"
            ></i>
            <i
                    v-show="mode==='select-month'"
                    class="kd-icon-date-forward page-right-icon"
                    @click.stop="setMonthOrYear('Year',1)"
            ></i>
        </div>
        <div
                v-show="mode==='select-day'"
                class="kd-calendar-header"
        >
            <i
                    v-if="!isRange || isRange && !isEndCalendar"
                    class="kd-icon-skip-forward page-left-icon"
                    @click.stop="setMonthOrYear('Year', -1)"
            ></i>
            <i
                    v-if="!isRange || isRange && !isEndCalendar"
                    class="kd-icon-date-forward page-left-icon"
                    @click.stop="setMonthOrYear('Month', -1)"
            ></i>
            <span
                    :class="{
                        'kd-calendar-text-btn': !isRange,
                    }"
                    @click.stop="setMode('select-year')"
            >{{ year }} 年 </span>
            <span
                    :class="{
                        'kd-calendar-text-btn': !isRange,
                    }"
                    @click.stop="setMode('select-month')"
            >{{ month }} 月</span>
            <i
                    v-if="!isRange || isRange && isEndCalendar"
                    class="kd-icon-skip-forward page-right-icon"
                    @click.stop="setMonthOrYear('Year',1)"
            ></i>
            <i
                    v-if="!isRange || isRange && isEndCalendar"
                    class="kd-icon-date-forward page-right-icon"
                    @click.stop="setMonthOrYear('Month',1)"
            ></i>
        </div>
        <div class="kd-calendar-default">
            <div
                    v-show="mode==='select-day'"
                    class="kd-week"
            >
                <span
                        v-for="v in ['日', '一', '二', '三', '四', '五', '六']"
                        :key="v"
                >{{ v }}
                </span>
            </div>
            <div
                    v-show="mode==='select-year'"
                    class="kd-calendar-table year"
            >
                <div
                        v-for="(row,index) in yearLists"
                        :key="index"
                        class="kd-calendar-row wide"
                >
                    <span
                            v-for="(item,k) in row"
                            :key="k"
                            :class="{
                                'kd-year': true,
                                'kd-blue':item.year === now.year,
                                'kd-disabled': item.isDisabled,
                                'kd-in-range': item.isInRange,
                                'kd-selected': selectedDate[0] && selectedDate[0].indexOf(item.dateStr) > -1,
                            }"
                            @click.stop="selectYear(item)"
                    >
                        {{ item.year }}
                    </span>
                </div>
            </div>
            <div
                    v-show="mode==='select-month'"
                    class="kd-calendar-table month"
            >
                <div
                        v-for="(row,index) in monthLists"
                        :key="index"
                        class="kd-calendar-row wide"
                >
                    <span
                            v-for="(item,k) in row"
                            :key="k"
                            :class="{
                                'kd-month': true,
                                'kd-blue': item.isCurrentMonth,
                                'kd-disabled': item.isDisabled,
                                'kd-in-range': item.isInRange,
                                'kd-selected': selectedDate[0] && selectedDate[0].indexOf(item.dateStr) > -1,
                            }"
                            @click.stop="selectMonth(item)"
                    >
                        {{ item.month }} 月
                    </span>
                </div>
            </div>
            <div
                    v-show="mode==='select-day'"
                    class="kd-calendar-table day"
            >
                <div
                        v-for="(row,index) in dayLists"
                        :key="index"
                        class="kd-calendar-row"
                >
                    <div
                            v-for="(item,k) in row"
                            :key="k"
                            :class="{
                                'kd-day-container': true,
                                'kd-in-range': item.isInRange,
                                'kd-disMonth': item.disMonth,
                                'kd-disabled': item.isDisabled,
                            }"
                    >
                        <div
                                :class="{
                                    'kd-day': true,
                                    'kd-today':item.isTodayFlag,
                                    'kd-disMonth': item.disMonth,
                                    'kd-disabled': item.isDisabled,
                                    'kd-in-range': item.isInRange,
                                    'kd-selected': selectedDate.indexOf(item.dateStr) > -1
                                }"
                                @click.stop="selectDate(item)"
                                @mouseenter="onDayMouseenter(item)"
                        >
                            {{ item.day }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Moment from 'dayjs';
    var isBetween = require('dayjs/plugin/isBetween');
    Moment.extend(isBetween);
    export default {
        name: 'Calendar',
        props: {
            // 选中的日期列表
            value: {
                type: [String, Array],
                default: function () {
                    return [];
                }
            },
            formatString: {
                type: String,
                default: function () {
                    return 'YYYY-MM-DD';
                }
            },
            isEndCalendar: {
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            rangeEndDate: {
                type: String,
                default: function () {
                    return '';
                }
            },
            // 条件禁用, 可以接受日期字符串, 以及筛选条件
            disabledDate: {
                type: [Array, Function],
                default() {
                    return [];
                }
            },
            isRange: { // 范围选择模式
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            isMultiple: { // 多选模式
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            readOnly: {
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            minDate: {
                type: String
            },
            maxDate: {
                type: String
            },
            pickType: {
                type: String
            }
        },
        data() {
            return {
                now: {
                    year: Moment().year(),
                    month: Moment().month() + 1,
                    date: Moment().date()
                },
                moment: this.value[0]
                    ? this.isEndCalendar ? Moment(this.value[0]).add(1, 'month') : Moment(this.value[0]) // 第二日历 默认渲染下个月的日期
                    : this.isEndCalendar ? Moment().add(1, 'month') : Moment(), // 没有初始值时, 默认展示当前月份
                selectedDate: this.value,
                maxDateValue: this.maxDate,
                minDateValue: this.minDate,
                mode: ['year', 'month'].indexOf(this.pickType) > -1 ? `select-${this.pickType}` : 'select-day'
            };
        },
        computed: {
            // selectedDate() {
            //     return this.value;
            // },
            hoverDate() {
                return this.rangeEndDate;
            },
            year() {
                return this.moment.year();
            },
            month() {
                return this.moment.month() + 1;
            },
            yearLists() {
                const rows = [];
                const tmpArr = [];
                let tmpYear = Moment(String(Math.floor(this.moment.year() / 10) * 10));
                for (let j = 0; j < 10; j++) {
                    tmpArr.push({
                        year: tmpYear.year(),
                        dateStr: tmpYear.format('YYYY'),
                        isDisabled: this.checkDisabled(tmpYear.format('YYYY'), this.selectedDate[0]) ||
                            this.maxDateValue && tmpYear.isAfter(Moment(this.maxDateValue), 'year') ||
                            this.minDateValue && tmpYear.isBefore(Moment(this.minDateValue), 'year')
                        // isInRange: this.selectedDate.length > 0 && !!rangeEndDate && tmpYear.isBetween(this.selectedDate[0], rangeEndDate, 'year', '()') || false
                    });
                    tmpYear = tmpYear.add(1, 'year');
                }
                for (let i = 0; i < 3; i++) {
                    rows.push(tmpArr.slice(i * 4, (i + 1) * 4));
                }
                return rows;
            },
            monthLists() {
                const rows = [];
                const tmpArr = [];
                let tmpTime = this.moment.set('month', 0);
                let rangeEndDate;

                if (this.isRange) {
                    rangeEndDate = this.selectedDate[1] || !!this.hoverDate && this.hoverDate || this.selectedDate[0];
                }
                // console.log('min, max', this.minDateValue, this.maxDateValue, this.selectedDate[0])
                for (let j = 1; j <= 12; j++) {
                    tmpArr.push({
                        dateStr: tmpTime.format('YYYY-MM'), // 日期字符串
                        month: tmpTime.month() + 1, // 当前第几月. 渲染用
                        isCurrentMonth: tmpTime.month() === Moment().month() &&
                            tmpTime.year() === Moment().year(),
                        isDisabled: this.checkDisabled(tmpTime.format('YYYY-MM'), this.selectedDate[0]) ||
                            this.maxDateValue && tmpTime.isAfter(Moment(this.maxDateValue), 'month') ||
                            this.minDateValue && tmpTime.isBefore(Moment(this.minDateValue), 'month'),
                        isInRange: this.selectedDate.length > 0 && !!rangeEndDate && tmpTime.isBetween(this.selectedDate[0], rangeEndDate, 'day', '()') || false
                    });

                    tmpTime = tmpTime.add(1, 'month');
                    // tmpArr.push(j);
                }
                for (let i = 0; i < 3; i++) {
                    rows.push(tmpArr.slice(i * 4, (i + 1) * 4));
                }
                return rows;
            },
            // 渲染日历
            dayLists() {
                const row = [];
                const calendatArr = [];

                let tmpTime = this.moment.set('date', 1);
                tmpTime = tmpTime.subtract(tmpTime.day(), 'day');

                let rangeEndDate;

                if (this.isRange) {
                    rangeEndDate = this.selectedDate[1] || !!this.hoverDate && this.hoverDate || this.selectedDate[0];
                }
                // 6行 * 7列 = 42
                for (let j = 0; j < 42; j++) {
                    calendatArr.push({
                        dateStr: tmpTime.format(this.formatString), // 日期字符串
                        day: tmpTime.date(), // 当前日期. 渲染用
                        disMonth: tmpTime.month() !== this.moment.month(), // 非本月日期置灰
                        isTodayFlag: tmpTime.date() === Moment().date() && // 试试用 equal代替
                            tmpTime.month() === Moment().month() &&
                            tmpTime.year() === Moment().year(),
                        // isDisabled: this.disabledDate && this.disabledDate(tmpTime.format(this.formatString), this.selectedDate[0]) ||
                        isDisabled: this.checkDisabled(tmpTime.format(this.formatString), this.selectedDate[0]) ||
                            this.maxDateValue && tmpTime.isAfter(Moment(this.maxDateValue), 'day') ||
                            this.minDateValue && tmpTime.isBefore(Moment(this.minDateValue), 'day'),
                        isInRange: this.selectedDate.length > 0 && !!rangeEndDate && tmpTime.isBetween(this.selectedDate[0], rangeEndDate, 'day', '()') || false
                    });
                    tmpTime = tmpTime.add(1, 'day');
                }
                for (let i = 0; i < 6; i++) {
                    row.push(calendatArr.slice(i * 7, (i + 1) * 7));
                }
                return row;
            }
        },

        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if (Array.isArray(v)) {
                        this.selectedDate = v;
                        // fix: 当日历用来回显接口返回的日期时, 应当重新渲染日历页面
                        if (!this.isRange) {
                            this.refreshCalendar();
                        } else if (this.isRange && v.length === 2) {
                            this.refreshCalendar();
                        }
                    } else if (typeof v === 'string') {
                        this.selectedDate = [v];
                    }
                }
            },
            rangeEndDate: {
                immediate: true,
                handler(v) {
                    // this.maxDateValue = v;
                }
            },
            maxDate: {
                immediate: true,
                handler(v) {
                    this.maxDateValue = v;
                }
            },
            minDate: {
                immediate: true,
                handler(v) {
                    this.minDateValue = v;
                }
            }
        },

        methods: {
            refreshCalendar() {
                const lastDate = this.value[this.value.length - 1];
                this.moment = lastDate
                    ? this.isEndCalendar ? Moment(lastDate).add(1, 'month') : Moment(lastDate) // 第二日历 默认渲染下个月的日期
                    : this.isEndCalendar ? Moment().add(1, 'month') : Moment();
            },
            setMode(mode) {
                if (this.isRange) return;
                this.mode = mode;
            },
            onDayMouseenter(dayItem) {
                // this.hoverDate = dayItem.dateStr;
                this.$emit('onDayMouseenter', dayItem.dateStr);
            },
            // 日历翻页
            setMonthOrYear(unit, v) {
                // 如果是 isRange 状态, 应该由外层判断效果
                if (this.isRange) {
                    this.$emit('pageChange', v, unit); // 由外层统一执行
                } else {
                    this.changePage(v, unit);
                }
            },
            changePage(v, unit) {
                this.moment = this.moment.add(v, unit);
            },

            selectYear(yearItem) {
                if (yearItem.isDisabled) return;

                if (this.pickType === 'year') {
                    this.selectedDate.splice(0, this.selectedDate.length, yearItem.dateStr); // 清空, 然后第一位赋值
                    this.$emit('select', this.selectedDate, 'calendar');
                    return;
                }
                this.moment = Moment(yearItem.dateStr);
                this.mode = 'select-month';
            },

            selectMonth(monthItem) {
                if (monthItem.isDisabled) return;

                if (this.pickType === 'month') {
                    this.selectedDate.splice(0, this.selectedDate.length, monthItem.dateStr); // 清空, 然后第一位赋值
                    this.$emit('select', this.selectedDate, 'calendar');
                    return;
                }
                this.moment = Moment(monthItem.dateStr);
                this.mode = 'select-day';
            },

            checkDisabled(dateStr, firstDate) {
                let disable = false;
                if (this.disabledDate) {
                    if (Array.isArray(this.disabledDate)) {
                        disable = disable || this.disabledDate.includes(dateStr);
                    }
                    if (typeof this.disabledDate === 'function') {
                        disable = disable || this.disabledDate(dateStr, firstDate);
                    }
                }
                return disable;
            },

            // 点击选中日期
            selectDate(date) {
                if (this.readOnly) return;
                if (date.isDisabled) return;
                if (date.disMonth) return; // 不能点击另外月份的日期进行翻页
                if (this.isRange && date.disMonth) return;

                // 多选
                // if (this.isMultiple) {
                //     const pos = this.value.indexOf(date.dateStr);
                //     if (pos < 0) {
                //         this.value.push(date.dateStr);
                //     } else {
                //         this.value.splice(pos, 1);
                //     }
                //     // this.selectedDate.push(date.dateStr);
                //     this.$emit('select', this.value);
                // }

                if (this.isRange) {
                    // 范围选择模式, 第三次点击意味着重选
                    if (this.selectedDate.length >= 2) {
                        this.value.splice(0, this.value.length);
                    }
                    // 点击已选中的日期, 取消选中 (仅多选模式需要该功能)
                    // const pos = this.selectedDate.indexOf(date.dateStr);
                    // if (pos < 0) {
                    //     this.selectedDate.push(date.dateStr);
                    // } else {
                    //     this.selectedDate.splice(pos, 1);
                    // }

                    // 范围日期模式 允许 选择一天: 2021-01-01 ~ 2021-01-01
                    this.selectedDate.push(date.dateStr);

                    // 使时间字符串数组保持 左值早于右值
                    if (Moment(this.selectedDate[0]).isAfter(Moment(this.selectedDate[1]))) { // 左时间晚于右时间
                        const tmp = this.selectedDate.pop();
                        this.selectedDate.unshift(tmp);
                    }
                    this.$emit('select', this.selectedDate, 'calendar');
                } else if (this.isMultiple) { // 单点 多选
                    const pos = this.value.indexOf(date.dateStr);
                    if (pos < 0) {
                        this.value.push(date.dateStr);
                    } else {
                        this.value.splice(pos, 1);
                    }
                    // this.selectedDate.push(date.dateStr);
                    this.$emit('select', this.value);
                } else { // 非时间范围(单点时间)
                    if (date.disMonth) {
                        this.moment = Moment(date.dateStr); // 点击其他月份日期, 需要刷新日历的页面
                    }

                    this.selectedDate.splice(0, this.value.length, date.dateStr); // 清空, 然后第一位赋值
                    this.$emit('select', this.selectedDate, 'calendar');
                }
            },

            jumpToDate(dateValue, source) {
                // 接受 dateArr  this.selectedDate 可以是array
                if (Array.isArray(dateValue)) {
                    this.selectedDate = dateValue;
                    this.$emit('select', this.selectedDate, source);
                    this.moment = this.isEndCalendar ? Moment(dateValue[0]).add(1, 'month') : Moment(dateValue[0]);
                } else if (typeof dateValue === 'string') {
                    const formattedStr = Moment(dateValue).format(this.formatString);
                    this.selectedDate = [formattedStr];
                    // if (this.disabledDate && this.disabledDate(formattedStr, this.selectedDate[0])) {
                    if (this.checkDisabled(formattedStr, this.selectedDate[0])) {
                        this.$emit('select', 'Invalid Date');
                        return;
                    }

                    this.moment = Moment(dateValue); // 刷新日历的页面
                    // this.$emit('input', this.selectedDate);
                    this.$emit('select', this.selectedDate, source);
                }
            }
        }
    };
</script>
