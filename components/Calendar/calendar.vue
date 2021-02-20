<template>
    <div class="kd-calendar-wrapper">
        <!-- 头部放置翻页按钮, 展示当前月份 -->
        <div
                v-show="mode==='select-year' || mode==='select-month'"
                class="kd-calendar-header"
        >
            <i
                    v-show="mode==='select-year'"
                    class="kd-icon-date-forward left"
                    @click="setMonthOrYear('Year', -10)"
            ></i>
            <i
                    v-show="mode==='select-month'"
                    class="kd-icon-date-forward left"
                    @click="setMonthOrYear('Year', -1)"
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
                    @click="setMode('select-year')">{{ year }} 年
            </span>
            <i
                    v-show="mode==='select-year'"
                    class="kd-icon-date-forward right"
                    @click="setMonthOrYear('Year',10)"
            ></i>
            <i
                    v-show="mode==='select-month'"
                    class="kd-icon-date-forward right"
                    @click="setMonthOrYear('Year',1)"
            ></i>
        </div>
        <div
                v-show="mode==='select-day'"
                class="kd-calendar-header"
        >
            <i
                    v-if="!isRange || isRange && !isEndCalendar"
                    class="kd-icon-skip-forward left"
                    @click="setMonthOrYear('Year', -1)"
            ></i>
            <i
                    v-if="!isRange || isRange && !isEndCalendar"
                    class="kd-icon-date-forward left"
                    @click="setMonthOrYear('Month', -1)"
            ></i>
            <span
                    :class="{
                        'kd-calendar-text-btn': !isRange,
                    }"
                    @click="setMode('select-year')">{{ year }} 年 </span>
            <span
                    :class="{
                        'kd-calendar-text-btn': !isRange,
                    }"
                    @click="setMode('select-month')">{{ month }} 月</span>
            <i
                    v-if="!isRange || isRange && isEndCalendar"
                    class="kd-icon-skip-forward right"
                    @click="setMonthOrYear('Year',1)"
            ></i>
            <i
                    v-if="!isRange || isRange && isEndCalendar"
                    class="kd-icon-date-forward right"
                    @click="setMonthOrYear('Month',1)"
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
                    class="kd-calendar-table"
            >
                <div
                        v-for="(row,index) in yearLists"
                        :key="index"
                        class="kd-calendar-row"
                >
                    <span
                            v-for="(item,k) in row"
                            :key="k"
                            :class="{
                                'kd-blue':item === now.year,
                                'kd-selected': year === item,
                            }"
                            @click="selectYear(item)"
                    >
                        {{ item }}
                    </span>
                </div>
            </div>
            <div
                    v-show="mode==='select-month'"
                    class="kd-calendar-table"
            >
                <div
                        v-for="(row,index) in monthLists"
                        :key="index"
                        class="kd-calendar-row"
                >
                    <span
                            v-for="(item,k) in row"
                            :key="k"
                            :class="{
                                'kd-blue': item.isCurrentMonth,
                                'kd-selected': selectedDate[0] && selectedDate[0].indexOf(item.dateStr) > -1,
                            }"
                            @click="selectMonth(item.month)"
                    >
                        {{ item.month }} 月
                    </span>
                </div>
            </div>
            <div
                    v-show="mode==='select-day'"
                    class="kd-calendar-table"
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
                            }"
                    >
                        <span
                                :class="{
                                    'kd-day': true,
                                    'kd-blue':item.isTodayFlag,
                                    'kd-disMonth': item.disMonth,
                                    'kd-disabled': item.isDisabled,
                                    'kd-selected': selectedDate.indexOf(item.dateStr) > -1
                                }"
                                @click="selectDate(item)"
                                @mouseenter="onDayMouseenter(item)"
                        >
                            {{ item.day }}
                        </span>
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
                type: Array,
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
                type: Function
            },
            isRange: { // 多选模式
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            // isMultiple: { // 多选模式
            //     type: Boolean,
            //     default: function () {
            //         return false;
            //     }
            // },
            minDate: {
                type: String
            },
            maxDate: {
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
                moment: this.isEndCalendar ? Moment().add(1, 'month') : Moment(), // 第二日历 默认渲染下个月的日期
                selectedDate: this.value,
                maxDateValue: this.maxDate,
                minDateValue: this.minDate,
                mode: 'select-day'
            };
        },
        computed: {
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
                let tmpYear = Math.floor(this.moment.year() / 10) * 10;
                for (let j = 0; j < 10; j++) {
                    tmpArr.push(tmpYear);
                    tmpYear++;
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
                for (let j = 1; j <= 12; j++) {
                    tmpArr.push({
                        dateStr: tmpTime.format('YYYY-MM'), // 日期字符串
                        month: tmpTime.month() + 1, // 当前第几月. 渲染用
                        isCurrentMonth: tmpTime.month() === Moment().month() &&
                            tmpTime.year() === Moment().year()
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
                        isDisabled: this.disabledDate && this.disabledDate(tmpTime.format(this.formatString)) ||
                            this.maxDateValue && tmpTime.isAfter(Moment(this.maxDateValue)) ||
                            this.minDateValue && tmpTime.isBefore(Moment(this.minDateValue)),
                        isInRange: this.selectedDate.length > 0 && !!rangeEndDate && tmpTime.isBetween(this.selectedDate[0], rangeEndDate, 'day', '[]') || false
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
            setMode(mode) {
                if (this.isRange) return;
                this.mode = mode;
            },
            onDayMouseenter(dayItem) {
                // this.hoverDate = dayItem.dateStr;
                this.$emit('onDayMouseenter', dayItem.dateStr);
            },
            // 检查某个日期是否处于禁用状态
            validateDisabledStatus(dateStr) {

            },

            // 日历翻页
            setMonthOrYear(k, v) {
                this.$emit('pageChange', v, k); // 由外层统一执行
            },
            changePage(v, unit) {
                this.moment = this.moment.add(v, unit);
            },

            selectYear(y) {
                this.moment = Moment(this.moment).set('year', y);
                this.mode = 'select-month';
            },

            selectMonth(m) { // 只改变month 逻辑对不对?? 通过进入月份, 翻页 看看是否变年份
                // console.log('month item', m);
                // console.log('selectedDate', this.selectedDate, m.dateStr.slice(0, 7));
                // console.log('month', this.now, this.year, this.month);

                this.moment = Moment(this.moment).set('month', m - 1);
                this.mode = 'select-day';
            },

            // 点击选中日期
            selectDate(date) {
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
                    // 点击已选中的日期, 取消选中
                    const pos = this.selectedDate.indexOf(date.dateStr);
                    if (pos < 0) {
                        this.selectedDate.push(date.dateStr);
                    } else {
                        this.selectedDate.splice(pos, 1);
                    }

                    // 使时间字符串数组保持 左值早于右值
                    if (Moment(this.selectedDate[0]).isAfter(Moment(this.selectedDate[1]))) { // 左时间晚于右时间
                        const tmp = this.selectedDate.pop();
                        this.selectedDate.unshift(tmp);
                    }
                    this.$emit('select', this.selectedDate);
                } else { // 非时间范围(单点时间)
                    if (date.disMonth) {
                        this.moment = Moment(date.dateStr); // 点击其他月份日期, 需要刷新日历的页面
                    }

                    this.selectedDate.splice(0, this.value.length, date.dateStr); // 清空, 然后第一位赋值
                    this.$emit('select', this.selectedDate);
                }
            },

            jumpToDate(dateStr) {
                const formattedStr = Moment(dateStr).format('YYYY-MM-DD');
                if (this.disabledDate && this.disabledDate(formattedStr)) {
                    this.$emit('select', 'Invalid Date');
                    return;
                }

                this.moment = Moment(dateStr); // 刷新日历的页面
                this.$emit('select', this.selectedDate);
            }
        }
    };
</script>
