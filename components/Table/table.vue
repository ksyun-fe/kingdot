<template>
    <div
        :class="{
                'kd-table': true,
                'kd-table-border': border
            }"
    >
        <div class="kd-hidden-columns" ref="hiddenColumns">
            <slot></slot>
        </div>

        <kd-dropdown
            v-if="columnFilter"
            class="kd-table-column-content"
            stype=""
            type='text'>
            <div class="kd-table-column-btn-outer">
                <span class="kd-table-column-btn"></span>
            </div>
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item
                    slot="dropdownItem"
                    v-for="columnItem in store.states._columns"
                    :value="columnItem.title"
                >
                    <kd-checkbox
                        v-model="showColumns[columnItem.key]"
                        :value="true"
                        @change="setSelectColumn"
                    ></kd-checkbox>
                    {{ columnItem.title }}
                </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>

        <!--   核心table     -->
        <div class="kd-table-main"
             ref="mainTable">
            <table-header
                ref="mainHeader"
                :store="store"
                :width="tableWidth"
                :style="{ width: bodyWidthUnit }"
            ></table-header>
            <table-body
                ref="tableBody"
                :store="store"
                :width="tableWidth"
                :treeProps="treeProps"
                :style="{ width: bodyWidthUnit, maxHeight: tableBodyHeight }"
            ></table-body>
        </div>

        <!--   左侧固定     -->
        <div class="kd-table-fixed ks-fixed-left"
             ref="fixedLeftTable"
             :class="{ 'box-shadow-left': scrollX > 0 }"
             :style="{ width: tableFixedWidth }"
             v-if="hasFiexLeft"
        >
            <table-header
                ref="fixedLeftHeader"
                :width="tableWidth"
                :store="store"></table-header>
            <table-body
                ref="fixedLeftBody"
                :store="store"
                :width="tableWidth"
                :treeProps="treeProps"
                :style="{maxHeight: tableBodyHeight }"
            ></table-body>
        </div>

        <!--   右侧固定     -->
        <div class="kd-table-fixed ks-fixed-right"
             ref="fixedRightTable"
             :class="{
                'box-shadow-right': tableWidthNumber - bodyWidth - scrollX > 0
            }"
             :style="{ width: tableRightFixedWidth }"
             v-if="hasFiexRight"
        >
            <table-header
                ref="fixedRighttHeader"
                :width="tableWidth"
                :margin-left="marginfixedRightWidth"
                :store="store"></table-header>
            <table-body
                ref="fixedRightBody"
                :store="store"
                :margin-left="marginfixedRightWidth"
                :width="tableWidth"
                :treeProps="treeProps"
                :style="{maxHeight: tableBodyHeight }"
            ></table-body>
        </div>

        <!--   横向滚动条     -->
        <div class="kd-table-overflow-x"
             ref="scrollBar"
             v-show="isShowScroll"
             v-if="!isIe"
             :style="{
                    width: bodyWidthUnit,
                    height: scrollRegionHeight,
                    transform: scrollMarginTop > 0
                        ? `translateY(-${scrollMarginTop}px)`
                        : '',
                    opacity: scrollMarginTop > 0 && scrollBarStatus ? 0 : 1
                }"
        >
            <div class="bar"
                 :style="{
                        width: scrollRegionWidth,
                        marginLeft: barScrollX + 'px'
                    }"
                 @mousedown="barMouseDown"
            ></div>
        </div>

        <!--   拖拽td辅助线     -->
        <div class="kd-table-move-line"
             :style="{
                left: this.moveLeft + 'px'
             }"
             v-if="moveLeft != 0"
        ></div>
    </div>
</template>

<script>
import store from './store';
import myColgroup from './colgroup';
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import KdCheckbox from '../Checkbox/checkbox';
import KdDropdown from "../Dropdown/dropdown";
import KdDropdownMenu from "../DropdownMenu/index";
import KdDropdownItem from "../DropdownItem/index";
import radio from "../Radio/radio";
import {
    mouseDragBegin,
    animationFrame,
    isIe
} from "../../src/utils/utils";

let inIeBrowser = isIe();

//拖拽td改变列的宽度最小宽度
const minColumnWidth = 50;

export default {
    name: "kd-table",
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        },
        border: {
            type: Boolean,
            default: false
        },
        checkboxType: {
            type: String,
            default: ""
        },
        //是否开启刷选列
        columnFilter: {
            type: Boolean,
            default: false
        },
        // 权重 优先级最高
        height: {
            type: [Number, String]
        },
        // 优先级次于 height
        fixHeader: {
            type: [Number, String]
        },
        //横向滚动条是否随纵向滚动条移动，保持在屏幕下方
        overFlowAuto: {
            type: Boolean,
            default: true
        },
        //横向滚动条高度
        scrollBarHeight: {
            type: [Number, String],
            default: 12
        },
        //disabled fn
        disableRow: {
            type: Function,
            default() {
                return false;
            }
        },
        //是否记录该表选中状态
        stored: {
            type: Boolean,
            default: false,
        },
        //每条数据的唯一标识的key，如id，code等。主要用于配合stored，存储对比数据
        nodeKey: {
            type: String,
            default: ""
        },
        //tree模式
        treeProps: {
            type: Object
        },
        //tree lazy模式fn
        treeLoad: {
            type: Function
        },
        //是否清除tree lazy的缓存，默认缓存tree lazy数据
        disableCache: {
            type: Boolean,
            default: false,
        },
        //表格合并回调
        spanMethod: {
            type: Function
        }
    },
    data() {
        let tableStore = new store(this, {
            showCheckbox: this.checkboxType != "none" || this.checkboxType == "checkbox",
            isRadio: this.checkboxType == "radio",
            disableRow: this.disableRow,
            _keyStr: this.nodeKey,
            stored: this.stored
        });
        tableStore.commit("updateData", this.data);
        let useHeight = Number.parseInt(this.height || this.fixHeader);
        return {
            store: tableStore,
            bodyWidth: "",
            bodyHeight: useHeight + 'px',
            useHeight: useHeight,
            timer: null,
            //是否显示scroll
            isShowScroll: false,
            isIe: inIeBrowser,
            //scroll偏移量
            barScrollX: 0,
            scrollX: 0,
            scrollY: 0,
            parentElement: null,
            //table header
            headerHeight: 0,
            isUseOutHeight: this.height || this.fixHeader,
            //滚动条距离顶部高度
            scrollMarginTop: 0,
            //scroll bar 状态，是否在计算位置中
            scrollBarStatus: true,
            //防止scroll bar抖动
            scrollBarTimer: null,
            //拖拽td辅助线 位置
            moveLeft: 0,
            showColumns: {},
        }
    },
    computed: {
        columns() {
            return this.store.states.columns;
        },
        hasFiexLeft() {
            return this.store.states.hasFiexLeft;
        },
        hasFiexRight() {
            return this.store.states.hasFiexRight;
        },
        marginfixedRightWidth() {
            return this.store.states.marginfixedRightWidth;
        },
        tableWidth() {
            return this.store.states.layoutWidth;
        },
        tableFixedWidth() {
            return this.store.states.fixedLeftWidth;
        },
        tableRightFixedWidth() {
            return this.store.states.fixedRightWidth;
        },
        tableWidthNumber() {
            return Number.parseInt(this.store.states.layoutWidth);
        },
        fixedRightWidth() {
            return Number.parseInt(this.store.states.fixedRightWidth);
        },
        bodyWidthUnit() {
            return this.bodyWidth + "px";
        },
        tableBody() {
            return this.$refs.tableBody.$el;
        },
        mainHeader() {
            return this.$refs.mainHeader.$el;
        },
        fixedLeftBody() {
            return this.$refs.fixedLeftBody.$el;
        },
        fixedRightBody() {
            return this.$refs.fixedRightBody.$el;
        },
        scrollRegionWidth() {
            var rotate =
                Number.parseFloat(this.bodyWidth) /
                Number.parseFloat(this.tableWidthNumber);
            this.isShowScroll = rotate < 1 && !this.isIe;
            return rotate * Number.parseFloat(this.bodyWidth) + "px";
        },
        scrollRegionHeight() {
            return this.scrollBarHeight + 'px';
        },
        tableBodyHeight() {
            return this.isUseOutHeight
                ?
                this.useHeight - this.headerHeight - this.scrollBarHeight - 2 + 'px'
                :
                '';
        }
    },
    watch: {
        data(v) {
            //如果是在排序
            if (this.store.states._sortProps) {
                this.store.updateDataKeepSort(v, this.store.states._sortProps, this.store.states._sortIsAsc);
            } else {
                this.store.commit("updateData", v);
                this.$nextTick(this.resize);
            }
        },
        height: function (v) {
            this.useHeight = Number.parseInt(v) + "px";
            this.bodyHeight = Number.parseInt(v) + "px";
            this.isUseOutHeight = true;
        },
        fixHeader: function (v) {
            this.useHeight = Number.parseInt(v) + "px";
            this.bodyHeight = Number.parseInt(v) + "px";
            this.isUseOutHeight = true;
        }
    },
    components: {
        myColgroup,
        TableBody,
        TableHeader,
        KdCheckbox,
        KdDropdown,
        KdDropdownMenu,
        KdDropdownItem
    },
    mounted() {
        this.$nextTick(() => {
            //存储table外围container宽度
            this.store.setLayoutWidth(this.$el.offsetWidth);
            this.resize();
            //绑定事件
            this.bindEvent();
        });
        window.addEventListener("resize", this.resize, false);
        window.addEventListener("scroll", this.resize, false);
    },
    destroyed() {
        window.removeEventListener("resize", this.resize);
        window.removeEventListener("scroll", this.resize);
    },
    methods: {
        // resetTableWidth(width){
        //     this.store.states.layoutWidth = width + 'px';
        // },
        resize() {
            this.scrollMoveStatus();
            if (!this.$el.parentElement || this.$el.parentElement.offsetHeight == 0) return false;
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
            this.timer = setTimeout(() => {
                this.timer = null;
                this.setLayoutPostion();
            }, 10);
        },
        //计算scrollbar位置
        setLayoutPostion() {
            let updateWidth = this.$el.offsetWidth - 2;
            if (this.bodyWidth != updateWidth) {
                this.bodyWidth = updateWidth;
                this.store.setLayoutWidth(this.bodyWidth);
            }

            let positionInfo = this.$el.getClientRects()[0] || {y: 0};
            let windowHeight = document.body.clientHeight;
            this.$nextTick(() => {
                if (!this.$refs.mainHeader || !this.$refs.tableBody) return false;
                this.headerHeight = this.$refs.mainHeader.getHeaderHeight();
                this.useHeight = this.isUseOutHeight
                    ? this.useHeight
                    : this.$refs.tableBody.getHeight();
                let nowHeight = positionInfo.y + this.headerHeight;

                //如果table组件使用 height或者fixHeader参数
                if (this.isUseOutHeight) {
                    this.bodyHeight = this.useHeight + "px";
                    this.scrollMarginTop = 0;
                }
                //如果使用html body的滚动条，需要动态计算scrollbar位置，才能使scrollbar一直在屏幕下方
                else {
                    if (windowHeight - nowHeight < this.useHeight && this.overFlowAuto) {

                        this.scrollMarginTop = this.useHeight - (windowHeight - nowHeight) + this.scrollBarHeight;
                    } else {
                        this.scrollMarginTop = 0;
                    }
                }
            });
        },
        //防止scroll bar抖动
        scrollMoveStatus() {
            this.scrollBarStatus = true;
            if (this.scrollBarTimer) {
                clearTimeout(this.scrollBarTimer);
                this.scrollBarTimer = null;
            }
            this.scrollBarTimer = setTimeout(() => {
                this.scrollBarStatus = false;
                this.scrollBarTimer = null;
            }, 100);
        },
        //模块scroll偏移
        innserScrollTo(obj, x, y) {
            if (obj.scrollTo) {
                obj.scrollTo(x, y);
            } else {
                obj.scrollTop = y;
                obj.scrollLeft = x;
            }
        },
        //设置table  scrollTop，scrollLeft
        scrollAction(isResetMainBody) {
            if (isResetMainBody) {
                this.innserScrollTo(this.tableBody, this.scrollX, this.scrollY);
                this.innserScrollTo(this.mainHeader, this.scrollX, 0);
            } else {
                this.hasFiexRight &&
                this.innserScrollTo(this.fixedRightBody, 0, this.scrollY);
                this.hasFiexLeft &&
                this.innserScrollTo(this.fixedLeftBody, 0, this.scrollY);
            }
        },
        setScrollX(rotate) {
            this.scrollX = this.tableWidthNumber * rotate;
            this.scrollAction(true);
        },
        //滚动条拖拽事件
        barMouseDown(e) {
            let that = this;
            let originX = this.barScrollX;
            //获取scroll bar区域信息
            let barData = this.$refs.scrollBar.getClientRects()[0];
            let bodyWidth = document.body.offsetWidth;

            const drag = function (start, movePoint) {
                animationFrame(() => {
                    that.barScrollX = originX + movePoint.x - start.x;
                    that.setScrollX(that.barScrollX / that.bodyWidth);
                });
            };

            mouseDragBegin(e, drag, drag, {
                left: barData.left,
                right: bodyWidth - barData.left - barData.width
            });
        },
        //绑定事件
        bindEvent() {
            this.tableBody.addEventListener('scroll', this.bodyScrollAction, false)
        },
        //table鼠标滚动
        bodyScrollAction(e) {
            let topNum = this.tableBody.scrollTop;
            let leftNum = this.tableBody.scrollLeft;
            this.scrollY = topNum;
            this.scrollX = leftNum;
            this.setBarScrollX(leftNum / this.tableWidthNumber);
            this.innserScrollTo(this.mainHeader, this.scrollX, 0);
            e.stopPropagation();
        },
        setBarScrollX(rotate) {
            this.barScrollX = this.bodyWidth * rotate;
            this.scrollAction();
        },
        // 获取当前选择数据
        getCheckedData() {
            return this.store.getCheckedData();
        },
        //拖拽改变td大小 位置， 偏移量，本次拖拽的td， 上一个td， 是否结束
        setLinePosition(value, deviationValue, thisColumnObj, preColumnObj, isEnd) {
            // console.log(value, deviationValue, thisColumnObj, preColumnObj, isEnd)
            let {left} = this.$el.getClientRects()[0];
            let _value = value - left;
            let autoColumnWidth = Number.parseInt(thisColumnObj.autoColumnWidth || this.store.states._autoColumnWidth);
            let preAutoColumnWidth = Number.parseInt(preColumnObj.autoColumnWidth || this.store.states._autoColumnWidth);
            if (isEnd) {
                //拖拽的active的td
                if (autoColumnWidth + thisColumnObj.deviation - deviationValue < minColumnWidth) {
                    deviationValue = autoColumnWidth + thisColumnObj.deviation - minColumnWidth
                }
                //拖拽的active的上一个
                else if (preAutoColumnWidth + preColumnObj.deviation + deviationValue < minColumnWidth) {
                    deviationValue = minColumnWidth - (autoColumnWidth + preColumnObj.deviation)
                }
                this.moveLeft = 0;
                //重置td偏移量
                this.store.setColumndeviation(thisColumnObj.key, -deviationValue);
                this.store.setColumndeviation(preColumnObj.key, deviationValue);
            } else {
                this.moveLeft = _value
            }
        },
        //触发loadExpand事件
        lazyLoadExpand(data, index, flag) {
            this.$emit("loadExpand", data, index, flag)
        },
        //列刷选显示
        setSelectColumn() {
            let keys = []
            Object.keys(this.showColumns).forEach(key => {
                !this.showColumns[key] && keys.push(key)
            })
            this.store.outUpdate(keys);
        },
        //重置showColumns参数key value
        updateColumnData() {
            let _columnsData = {}
            this.store.states._columns.forEach(item => _columnsData[item.key] = true)
            this.showColumns = _columnsData;
        }
    }
}
</script>

<style scoped>

</style>