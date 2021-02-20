<template>
    <div
            :class="classNameObj"
            class="kd-pagination"
    >
        <kd-button
                v-if="!superMini && showTotal"
                type="none"
                :size="size"
                class="kd-pagination-total"
        >共 {{ total }} 条</kd-button>
        <kd-button
                v-if="superMini"
                type="none"
                :size="size"
                class="kd-pagination-total"
        >共 {{ pageCount }} 页</kd-button>
        <!-- <div class="kd-pagination-limits" v-if="!superMini">
            <div class="kd-pagination-limits-text">每页显示</div>
            <Dropdown>
                <kd-button class="kd-pagination-btns kd-btn-total" :no-border="type" :size="size">
                    {{innerLimit}}条 / 页
                    <i class="kd-arrow ion-arrow-down-b"></i>
                </kd-button>
                <DropdownMenu>
                    <DropdownItem v-for="item in limits" :key="item" @click="selectSize(item)">{{item}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div> -->
        <kd-button
                class="kd-pagination-btn kd-pagination-first"
                :size="size"
                :disabled="innerCurrent === 1"
                :no-border="type"
                @click="prev"
        >
            <i class="kd-icon-riqishaixuan_shangyige kd-pagination-left"></i>
        </kd-button>
        <kd-button-group
                v-if="!superMini"
                v-model="innerCurrent"
                class="kd-pagination-btns"
                check-type="radio"
        >
            <kd-button
                    v-for="item in showPageArray"
                    :key="getKey(item.value)"
                    class="kd-pagination-btn"
                    :value="item.value"
                    :no-border="type"
                    :size="size"
                    @click="checkPage()"
            >{{ item.label }}</kd-button>
        </kd-button-group>
        <div
                v-else
                class="kd-pagination-btns"
        >
            <kd-button
                    key="superMini"
                    class="kd-pagination-btn kd-active"
                    :no-border="type"
                    type="primary"
                    :size="size"
            >{{ innerCurrent }}</kd-button>
        </div>
        <kd-button
                :size="size"
                class="kd-pagination-btn kd-pagination-end"
                icon
                :disabled="innerCurrent == pageCount"
                :no-border="type"
                @click="next"
        >
            <i class="kd-icon-date-forward kd-pagination-right"></i>
        </kd-button>
        <div
                v-if="!superMini"
                class="kd-pagination-goto"
        >
            前往<input
                    v-model="inputCurrent"
                    class="kd-pagination-input"
                    :size="size"
                    @keyup.enter="jumpEnterAction"
            />页
        </div>
    </div>
</template>

<script>
    // import Dropdown from "../Dropdown/index";
    import KdButton from '../Button/button';
    import KdButtonGroup from '../ButtonGroup/button-group';
    // import paginationInput from "./input.js";
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
        // components: { KdDropdown, KdButton, ButtonGroup, paginationInput },
        components: { KdButton, KdButtonGroup },
        props: {
            limit: {
                type: Number,
                default: 10
            },
            align: {
                type: String,
                default: 'default'
            },
            total: {
                type: Number
            },
            size: {
                type: String,
                default: 'default'
            },
            showTotal: {
                type: Boolean,
                default: true
            },
            current: {
                type: Number,
                default: 1
            },
            showGoto: {
                type: Boolean,
                default: false
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
            counts: {
                type: Number,
                default: 7
            },
            superMini: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                ellipsis: '...',
                pageCount: 0,
                showPageArray: [],
                classNameObj: {
                    align: this.align
                },
                innerCurrent: this.current,
                type: this.noBorder,
                innerLimit: this.limit,
                ellipsisMark: markDic.left,
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
                if (newV !== this.innerCurrent) {
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
                if (newV !== this.innerCurrent) {
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
            this.parseData();
            this.preValue = this.innerCurrent;
        },
        methods: {
            jumpEnterAction() {
                var v = this.inputCurrent;
                if (!/^\d{1,}$/.test(v)) {
                    return;
                }

                if (v !== this.innerCurrent) {
                    if (v > 0 && v <= this.pageCount) {
                        this.innerCurrent = v;
                    } else if (v <= 0) {
                        this.innerCurrent = 1;
                        this.inputCurrent = 1;
                    } else {
                        this.innerCurrent = this.pageCount;
                        this.inputCurrent = this.pageCount;
                    }
                    this.parseData();
                }
            },
            parseData() {
                this.emitEvent();
                const _pageArrayData = [];
                this.pageCount = Math.ceil(this.total / this.innerLimit);
                // 显示页面总数大于 总页数
                if (this.pageCount <= this.counts) {
                    for (let i = 1; i < this.pageCount + 1; i++) {
                        _pageArrayData.push(pageItem(i));
                    }
                } else if (this.total !== 0) {
                    // 需要显示省略符'...'
                    // 前半段全显
                    // debugger;
                    if (this.innerCurrent <= this.counts - 3) {
                        for (let i = 1; i < this.counts - 1; i++) {
                            _pageArrayData.push(pageItem(i));
                        }
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.right));
                        _pageArrayData.push(pageItem(this.pageCount));
                    } else if (this.pageCount - this.innerCurrent < this.counts - 2) {
                        // 后半段 全显
                        //   debugger;
                        _pageArrayData.push(pageItem(1));
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.left));
                        for (let i = this.counts - 2; i > 0; i--) {
                            _pageArrayData.push(pageItem(this.pageCount - i + 1));
                        }
                    } else {
                        _pageArrayData.push(pageItem(1));
                        _pageArrayData.push(pageItem(this.ellipsis, this.markDic.left));
                        const start = this.innerCurrent - Math.ceil((this.counts - 2) / 2);
                        for (let i = 0; i < this.counts - 2; i++) {
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
            prev() {
                if (this.innerCurrent === 1) return;
                this.innerCurrent--;
                this.parseData();
            },
            next() {
                if (this.innerCurrent === this.pageCount) return;
                this.innerCurrent++;
                this.parseData();
            },
            checkPage(index) {
                if (this.innerCurrent === this.markDic.left) {
                    this.innerCurrent = this.preValue - 2;
                } else if (this.innerCurrent === this.markDic.right) {
                    this.innerCurrent = this.preValue + 2;
                }
                this.preValue = this.innerCurrent;
                this.inputCurrent = this.innerCurrent;
                this.parseData();
            },
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
            emitEvent() {
                if (this.innerCurrent !== this.current || this.innerLimit !== this.limit) {
                    this.$emit('change', {
                        current: this.innerCurrent,
                        limit: this.innerLimit
                    });
                }
            },
            getKey(keyStr) {
                if (keyStr === this.markDic.left || keyStr === this.markDic.right) {
                    return Math.random() + keyStr;
                }
                return keyStr;
            }
        }
    };
</script>
