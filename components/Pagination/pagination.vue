<template>
    <div
            class="kd-pagination"
    >
        <!-- total -->
        <div
            v-if="!superMini && showTotal"
            class="kd-pagination-total">
            <span>共{{ total }}条</span>
        </div>
        <div
            v-if="showPageCount"
            class="kd-pagination-total">
            <span>共{{ pageCount }}页</span>
        </div>
        <!-- limits -->
        <div class="kd-pagination-limits" v-if="!superMini && showLimits">
            <kd-dropdown size="mini">
                {{innerLimit}}条 / 页 <i class="kd-icon-arrow-down"></i>
                <kd-dropdown-menu slot="dropdown">
                    <kd-dropdown-item slot="dropdownItem" v-for="item in limits" :key="item" @click="selectSize(item)">{{item}}</kd-dropdown-item>
                </kd-dropdown-menu>
            </kd-dropdown>
        </div>
        <!-- prev -->
        <kd-button
                class="kd-pagination-btn"
                :size="size"
                :disabled="innerCurrent == 1"
                :type="type"
                @click="prev"
        >
            <i
                v-if="!prevText || prevText.includes('kd-icon')"
                :class="[
                    'kd-icon-caret-left',
                    prevText.includes('kd-icon') ? prevText : 'kd-pagination-left'
                ]"
            ></i>
            <span v-else>
                {{ prevText }}
            </span>
        </kd-button>
        <kd-button-group
                v-if="!superMini && showPageNum"
                v-model="innerCurrent"
                class="kd-pagination-btns"
                check-type="radio"
        >
            <kd-button
                    v-for="item in showPageArray"
                    :key="getKey(item.value)"
                    :class="{'kd-pagination-btn': true, 'kd-pagination-btn-active': type == 'none'}"
                    :value="item.value"
                    :type="type"
                    :size="size"
                    @click="checkPage(item)"
            >{{ item.label }}</kd-button>
        </kd-button-group>
        <div
                v-else-if="showPageNum"
                class="kd-pagination-btns"
        >
            <kd-button
                    key="superMini"
                    :class="{'kd-pagination-btn': true, 'kd-pagination-btn-active': type == 'none'}"
                    type="text"
                    :size="size"
            >{{ innerCurrent }}</kd-button>
        </div>
        <!-- next -->
        <kd-button
                :size="size"
                class="kd-pagination-btn kd-pagination-btn-next"
                icon
                :disabled="innerCurrent == pageCount"
                :type="type"
                @click="next"
        >
            <i
                v-if="!nextText || nextText.includes('kd-icon')"
                :class="[
                    'kd-pagination-right',
                    nextText.includes('kd-icon') ? nextText : 'kd-icon-date-forward'
                ]"
            ></i>
            <span v-else>
                {{ nextText }}
            </span>
        </kd-button>
        <!-- jump  -->
        <div
                v-if="!superMini && showGoto"
                class="kd-pagination-goto"
        >
            前往<input
                    v-model.number="inputCurrent"
                    class="kd-pagination-input"
                    :size="size"
                    @keyup.enter="jumpEnterAction"
            />页
        </div>
    </div>
</template>

<script>
    import KdDropdown from "../Dropdown/dropdown";
    import KdDropdownMenu from "../Dropdown/dropdown-menu";
    import KdDropdownItem from "../Dropdown/dropdown-item";
    import KdButton from '../Button/button';
    import KdButtonGroup from '../ButtonGroup/button-group';
    const markDic = {
        left: 'left',
        right: 'right'
    };
    const pageItem = (value, keyStr) => {
        return !keyStr
            ? { value: value, label: value }
            : { value: keyStr, label: value };
    };
    export default {
        name: 'KdPagination',
        components: { KdDropdown, KdDropdownMenu, KdDropdownItem, KdButtonGroup, KdButton },
        props: {
            limit: {
                type: Number,
                default: 10
            },
            total: {
                type: Number
            },
            showTotal: {
                type: Boolean,
                default: true
            },
            showPageCount: {
                type: Boolean,
                default: false
            },
            current: {
                type: Number,
                default: 1
            },
            showGoto: {
                type: Boolean,
                default: true
            },
            noBorder: {
                type: Boolean,
                default: false
            },
            limits: {
                type: Array,
                default() {
                    return [10, 20, 50];
                }
            },
            showLimits: {
                type: Boolean,
                default: true
            },
            counts: {
                type: Number,
                validator(value) {
                    return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1;
                },
                default: 7
            },
            superMini: {
                type: Boolean,
                default: false
            },
            prevText: {
                type: String,
                default: ''
            },
            nextText: {
                type: String,
                default: ''
            },
            showPageNum: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                ellipsis: '...',
                pageCount: 0,
                showPageArray: [],
                innerCurrent: this.current,
                type: this.noBorder ? 'none' : 'default',
                size: this.noBorder ? 'mini' : 'default',
                innerLimit: this.limit,
                markDic: markDic,
                timer: null,
                preValue: 0,
                inputCurrent: this.current
            };
        },
        watch: {
            total: function () {
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                    this.parseData();
                    this.timer = null;
                }, 100);
            },
            current(newV, oldV) {
                // 若外部传入的值 != 当前值
                if (newV != this.innerCurrent) {
                    this.innerCurrent = newV;
                    this.inputCurrent = newV;
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                    this.timer = setTimeout(() => {
                        this.parseData();
                        this.timer = null;
                    }, 100);
                    this.preValue = this.innerCurrent;
                }
            },
            limit(newV) {
                if (newV != this.innerCurrent) {
                    this.innerLimit = newV;
                    if (this.timer) {
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                    this.timer = setTimeout(() => {
                        this.parseData();
                        this.timer = null;
                    }, 100);
                }
            }
        },
        created() {
            // init
            this.parseData();
            this.preValue = this.innerCurrent;
        },
        methods: {
            parseData() {
                this.emitEvent();
                const _pageArrayData = [];
                this.pageCount = Math.ceil(this.total / this.innerLimit);
                // 显示页码数 大于 总页数
                if (this.counts >= this.pageCount) {
                    for (let i = 1; i < this.pageCount + 1; i++) {
                        _pageArrayData.push(pageItem(i));
                    }
                } else if (this.total != 0) {
                    // 前半部分全显，需要显示省略符'...'，总页数
                    if (this.innerCurrent <= this.counts - 2) {
                        for (let i = 1; i < this.counts; i++) {
                            _pageArrayData.push(pageItem(i));
                        }
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.right));
                        _pageArrayData.push(pageItem(this.pageCount));
                    } else if (this.pageCount - this.innerCurrent <= this.counts - 3) {
                        // 1，省略符'...'，后半部分全显
                        _pageArrayData.push(pageItem(1));
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.left));
                        for (let i = this.counts - 1; i > 0; i--) {
                            _pageArrayData.push(pageItem(this.pageCount - i + 1));
                        }
                    } else {
                        // 1，省略符'...'，中间部分，省略符'...'，总页数
                        _pageArrayData.push(pageItem(1));
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.left));
                        let num = this.counts%2 == 0 ? Math.ceil((this.counts - 2) / 2) : Math.floor((this.counts - 2) / 2)
                        const start = this.innerCurrent - num;
                        let endNum = this.counts%2 == 0 ? (this.counts - 1) : (this.counts - 2)
                        for (let i = 0; i < endNum; i++) {
                            _pageArrayData.push(pageItem(i + start));
                        }
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.right));
                        _pageArrayData.push(pageItem(this.pageCount));
                    }
                } else {
                    _pageArrayData.push(1);
                }
                this.showPageArray = _pageArrayData;
            },
            // prev
            prev() {
                if (this.innerCurrent == 1) return;
                this.innerCurrent--;
                this.parseData();
            },
            // next
            next() {
                if (this.innerCurrent == this.pageCount) return;
                this.innerCurrent++;
                this.parseData();
            },
            // jump
            jumpEnterAction() {
                var v = this.inputCurrent;
                if (!/^\d{1,}$/.test(v)) {
                    this.innerCurrent = 1;
                    this.inputCurrent = 1;
                    return;
                }
                // 是否等于当前高亮值
                if (v != this.innerCurrent) {
                    if (v > 0 && v <= this.pageCount) {
                        this.innerCurrent = v;
                    } else {
                        this.innerCurrent = this.pageCount;
                        this.inputCurrent = this.pageCount;
                    }
                    this.parseData();
                }
            },
            // click page btn
            checkPage(item) {
                // click right ... or left ...
                if (item.value == this.markDic.left) {
                    this.innerCurrent = this.preValue - 2;
                } else if (item.value == this.markDic.right) {
                    this.innerCurrent = this.preValue + 2;
                }else{
                    this.innerCurrent = item.value;
                }
                this.preValue = this.innerCurrent;
                this.inputCurrent = this.innerCurrent;
                this.parseData();
            },
            // change limit
            selectSize(pageSize) {
                this.innerLimit = pageSize;
                // 当每页条数变动，页码自动变为1
                this.innerCurrent = 1;
                this.inputCurrent = 1;
                this.parseData();
            },
            changePage(i) {
                this.checkPage(i);
            },
            // change event
            emitEvent() {
                if (this.innerCurrent != this.current || this.innerLimit != this.limit) {
                    this.$emit('change', {
                        current: this.innerCurrent,
                        limit: this.innerLimit
                    });
                }
            },
            getKey(keyStr) {
                if (keyStr == this.markDic.left || keyStr == this.markDic.right) {
                    return Math.random() + keyStr;
                }
                return keyStr;
            }
        }
    };
</script>
