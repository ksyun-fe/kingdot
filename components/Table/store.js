import {ulid} from "../utils.js";

//列最小宽度
const columnMinWidth = 100;

//对比数据唯一标识，是否在存储数据中包含该条数据
const uniqProcess = function (rowData, transactionData, key) {
    let result = false;
    let index = -1;
    transactionData.forEach((item, _index) => {
        if (result) return false;
        result = item[key] === rowData[key];
        if (result) {
            index = _index
        }
    })
    return {result, index}
}

//遍历数据，增加一些参数
const parseData = function (
    data,
    disableRow,
    transactionData,
    key,
    stored
) {
    let outData = [];
    data.forEach((item, index) => {
        item.__index__ = index;
        let _checked = item.checked;
        if (stored) {
            let {result} = uniqProcess(item, transactionData, key);
            _checked = result;
        }
        outData.push({
            originData: item,
            checked: _checked,
            showExpand: false,
            showTree: false,
            key: ulid(),
            disabled: disableRow(item, index)
        });
    });
    return outData;
};

//获取对应的value值。支持"a", "a.b", "a.b.c"
function getRealyProps(data, propsArray) {
    if (!data) return "";
    if (propsArray.length > 1) {
        var _data = data[propsArray[0]];
        propsArray.shift();
        return getRealyProps(_data, propsArray);
    } else {
        return data[propsArray[0]];
    }
}

//处理a.b 排序
function sortBy(attr, rev) {
    if (rev == undefined) {
        rev = 1;
    } else {
        rev = rev ? 1 : -1;
    }
    attr = attr.split('.')

    return function (a, b) {
        a = getRealyProps(a, Object.assign([], attr));
        b = getRealyProps(b, Object.assign([], attr));
        if (a < b) {
            return rev * -1;
        } else if (a > b) {
            return rev * 1;
        }
        return 0;
    };
}

function mapHasChildrenColumn(item, hasWidthFn, hasNoWidthFn, hasPropsFn) {
    if (item.props || item.renderColumnFn) {
        if (item.width) {
            hasWidthFn && hasWidthFn(item.width)
        } else {
            hasNoWidthFn && hasNoWidthFn();
        }
        hasPropsFn && hasPropsFn();
    }
    if (item.children && item.children.length) {
        item.children.map(inner => {
            mapHasChildrenColumn(inner, hasWidthFn, hasNoWidthFn, hasPropsFn);
        })
    }
}

const TableStore = function (table, initState = {}) {
    this.table = table;
    let checkboxWidth = 34;
    this.checkboxData = {
        width: checkboxWidth,
        autoColumnWidth: checkboxWidth,
        deviation: 0,
        native: true,
        renderHeaderFn: (h, {self, data, store}) => {
            return !initState.isRadio ? (
                <kd-checkbox
                    trueValue={true}
                    indeterminate={store.states.checkboxIndeterminate}
                    value={store.states._isCheckAll}
                    on-change={v => {
                        store.states._isCheckAll = v;
                        store.checkboxAllAction(v);
                    }}
                ></kd-checkbox>
            ) : (
                ""
            );
        },
        renderColumnFn: (h, {data, store}) => {
            //判断是否有key，children没有key，不显示checkbox
            if (!data.key) {
                return ('');
            }
            return !initState.isRadio ?
                (
                    <kd-checkbox
                        trueValue={true}
                        value={data.checked}
                        on-change={v => {
                            data.checked = v;
                            store.checkboxSingle(data.originData, v);
                        }}
                        disabled={data.disabled}
                    ></kd-checkbox>
                )
                :
                (
                    <kd-radio
                        trueValue={true}
                        value={data.checked}
                        on-change={v => {
                            store.checkedRadio(data, v)
                        }}
                        disabled={data.disabled}
                    ></kd-radio>
                );
        },
        _slotHeader: true,
        _slotColumn: true,
        checked: true,
        fixedLeft: true,
        fixedRight: false
    };
    let expandWith = 30;
    this.expandData = {
        width: expandWith,
        autoColumnWidth: expandWith,
        deviation: 0,
        renderColumnFn: (h, {data, store}) => {
            return (
                <i
                    class={
                        [
                            "kd-table-btn",
                            "kd-icon-arrow-down",
                            {
                                "kd-table-show-btn": data.showExpand
                            }
                        ]
                    }
                    on-click={v => {
                        store.showMore(data);
                    }}
                ></i>
            )
        },
        _slotHeader: false,
        _slotColumn: true,
        fixedLeft: true,
        fixedRight: false
    };
    this.states = {
        //head列
        columns: [],
        //数据
        data: null,
        //是否全选
        _isCheckAll: false,
        //是否显示checkbox
        showCheckbox: true,
        checkboxIndeterminate: false,
        _columns: [],
        //table外围总宽度
        layoutWidth: "",
        //左侧固定宽度
        fixedLeftWidth: "",
        //右侧固定宽度
        fixedRightWidth: "",
        //右侧固定偏移量
        marginfixedRightWidth: "",
        //左侧固定的列
        fixedColumns: [],
        //是否有左侧固定列
        hasFiexLeft: false,
        //是否有右侧固定列
        hasFiexRight: false,
        //右侧固定的列
        rightFixedColumns: [],
        //是否所有的列都设置了宽度
        isAllColumnSetWidth: false,
        //未设置宽度的列的个数
        _unPropsColumnWidthCount: 0,
        //设置宽度的列的个数
        _propsColumnWidthCount: 0,
        //设置了列的宽度的总值
        _propsColumnWidthSum: 0,
        //计算未设置宽度的列的值
        _autoColumnWidth: 0,
        //table外围container宽度
        _outInputLayoutWidth: 0,
        //table总宽度
        _layoutWidth: 0,
        _columnMinWidth: columnMinWidth,
        //disabled方法
        disableRow: null,
        //是否存储每次选中
        stored: false,
        //存储选中的数据
        _innerCheckedData: [],
        //data唯一标识
        _keyStr: '',
        //排序升序 key
        _sortAsc: '',
        //排序降序 key
        _sortDesc: '',
        //存储那个key在排序
        _sortProps: '',
        //存储是否在排序
        _sortIsAsc: '',
        expand: null,
    }

    //覆盖states里属性
    for (let prop in initState) {
        if (
            initState.hasOwnProperty(prop) &&
            this.states.hasOwnProperty(prop)
        ) {
            this.states[prop] = initState[prop];
        }
    }
};

TableStore.prototype.mutation = {
    //插入head列
    insertColumn: function (column, index) {
        let _columns = this.states._columns;
        if (index < _columns.length) {
            _columns.splice(index, 0, column);
        } else {
            _columns.push(column);
        }
        this.table.updateColumnData();
        this._render();
    },
    //删除head列
    deleteColumn: function (key) {
        const _colums = Object.assign([], this.states._columns);
        const index = _colums.findIndex(item => item.key === key);
        _colums.splice(index, 1);
        this.states._columns = _colums;
        this.table.updateColumnData();
        this._render();
    },
    //插入expand数据
    insertExpand: function (v) {
        this.states.expand = v;
    },
    //更新data数据
    updateData: function (v) {
        var data = parseData(
            v,
            this.states.disableRow,
            this.states._innerCheckedData,
            this.states._keyStr,
            this.states.stored
        );
        this.states.data = data;
        this.checkboxStatus();
    }
};

//操作
TableStore.prototype.commit = function () {
    var args = Object.assign([], arguments);
    const actionName = args.splice(0, 1);
    if (this.mutation[actionName]) this.mutation[actionName].apply(this, args);
};

//渲染
TableStore.prototype._render = function () {
    this.update();
};

TableStore.prototype.update = function () {
    const states = this.states;
    //筛选出需要显示的
    const _columns = states._columns.filter(item => item.isShow) || [];
    let setColumns = [];
    let setFixedColumns = [];
    let setFixedRightColumns = [];
    //设置列宽的个数
    let setWidthCount = 0;
    //设置了宽度的列的宽度总值
    let setWidth = 0;
    //隐藏的列的个数
    let hidenColumnsCount = 0;
    //合并表头时的无宽度的children
    let childrenCount = 0;
    let allLength = 0;

    //筛选列
    _columns.forEach(item => {
        if (!item.isShow) hidenColumnsCount++;
        //if (!item.width) return;
        // setWidth += Number.parseInt(item.width);
        // setWidthCount++;
        mapHasChildrenColumn(
            item,
            //有宽度
            function (width) {
                setWidth += Number.parseInt(width);
                setWidthCount ++;
            },
            //无宽度
            function () {
                childrenCount ++;
            },
            //有效的列
            function(){
                allLength ++;
            }
        )
    })

    states.showCheckbox && (setWidth += this.checkboxData.width);
    states.expand && (setWidth += this.expandData.width);

    //判断列数，如果是头部合并则取所有有效列个数。
    let colunmLength = allLength > _columns.length ? allLength : _columns.length;

    //判断是否所有的列都设置了宽度
    this.states.isAllColumnSetWidth = setWidthCount == colunmLength;
    //判断未设置宽度的列的个数  列总数 - 设置宽度的列 - 隐藏的列
    this.states._unPropsColumnWidthCount = colunmLength - setWidthCount - hidenColumnsCount;
    //存储设置了宽度的列的总数
    this.states._propsColumnWidthCount = setWidthCount;
    //存储设置了宽度的列的宽度总值
    this.states._propsColumnWidthSum = setWidth;

    this._setColumnAutoWidth();
    this.renderLayout();

    //判断是否有左右固定列
    this.states.hasFiexLeft = _columns.findIndex(item => item.fixedLeft) > -1;
    this.states.hasFiexRight = _columns.findIndex(item => item.fixedRight) > -1;

    //autoColumnWidth = width
    _columns.forEach(
        item => (item.autoColumnWidth = item.width ? item.width : "")
    );

    setColumns = setFixedColumns.concat(
        _columns.filter(item => item)
    );
    //获取左侧固定列
    setFixedColumns = _columns.filter(item => item.fixedLeft);
    //获取右侧固定列
    setFixedRightColumns = _columns.filter(item => item.fixedRight);

    //判断是否有expand的column
    if (states.expand) {
        //有左侧fixed
        if (states.hasFiexLeft) {
            setFixedColumns.unshift(this.expandData);
        }
        setColumns.unshift(this.expandData);
    }

    //checkbox模式
    if (states.showCheckbox) {
        //有左侧fixed
        if (states.hasFiexLeft) {
            setFixedColumns.unshift(this.checkboxData);
        }
        setColumns.unshift(this.checkboxData);
    }

    this.states.fixedColumns = setFixedColumns;
    // this.states.columns = states._columns;
    this.states.columns = setColumns;
    this.states.rightFixedColumns = setFixedRightColumns;
};

//处理table总宽
TableStore.prototype._setColumnAutoWidth = function () {
    let states = this.states;
    let {
        _unPropsColumnWidthCount,
        _outInputLayoutWidth,
        _propsColumnWidthSum,
        isAllColumnSetWidth
    } = states;
    //未设置宽度的列剩余宽度总值  container宽度 - 设置了宽度的列的宽度总值
    let autoWidthSum = _outInputLayoutWidth - _propsColumnWidthSum;
    //未设置宽度的列个数 * 最小列宽 > 剩余宽度
    if (_unPropsColumnWidthCount * columnMinWidth > autoWidthSum) {
        //未设置列的宽度统一设置成最小宽度
        this.states._autoColumnWidth = columnMinWidth;
        //重置未设置列的宽度总值
        autoWidthSum = _unPropsColumnWidthCount * columnMinWidth;
    } else {
        //未设置列的宽度 = 剩余宽度 / 未设置宽度的列个数
        this.states._autoColumnWidth = autoWidthSum / _unPropsColumnWidthCount
    }

    //如果所有列都是设置宽度
    if (isAllColumnSetWidth) {
        this.states._layoutWidth =
            _propsColumnWidthSum >= states._layoutWidth
                ?
                _propsColumnWidthSum
                :
                states._layoutWidth
    } else {
        this.states._layoutWidth = _propsColumnWidthSum + autoWidthSum;
    }
}


TableStore.prototype.renderLayout = function () {
    let states = this.states;
    let columns = states._columns;
    //fixed左侧宽度
    let fixedLeftWdith = 0;
    //fixed右侧的宽度
    let fixedRightWdith = 0;

    //计算左右fixed宽度
    states.fixedColumns = columns.filter(item => {
        if (item.fixedLeft && item.isShow) {
            let width = item.width || states._autoColumnWidth;
            fixedLeftWdith += Number.parseInt(width) + item.deviation || 0;
            return true;
        }
    });
    //左侧增加Checkbox宽度
    if (states.showCheckbox && fixedLeftWdith > 0) {
        fixedLeftWdith += this.checkboxData.width
    }
    //左侧增加expand宽度
    if (states.expand && fixedLeftWdith > 0) {
        fixedLeftWdith += this.expandData.width
    }

    states.fixedColumns = columns.filter(item => {
        if (item.fixedRight && item.isShow) {
            let width = item.width || states._autoColumnWidth;
            fixedRightWdith += Number.parseInt(width) + item.deviation || 0;
            return true;
        }
    });

    this.states.fixedLeftWidth = fixedLeftWdith + 'px';
    this.states.fixedRightWidth = fixedRightWdith + 'px';
    this.states.layoutWidth = states._layoutWidth + 'px';
    this.states.marginfixedRightWidth = fixedRightWdith - states._layoutWidth + 'px';
}

//设置table外围container宽度
TableStore.prototype.setLayoutWidth = function (width) {
    this.states._outInputLayoutWidth = width;
    this._render();
};

//设置td偏移量
TableStore.prototype.setColumndeviation = function (key, value) {
    let _columns = this.states._columns;
    let index = _columns.findIndex(item => item.key == key);
    this.states._columns[index].deviation += value;
    this.update();
};

//全选
TableStore.prototype.checkboxAllAction = function (v) {
    let states = this.states;
    states._isCheckAll = v;
    states.checkboxIndeterminate = false;
    states.data.forEach(item => {
        if (item.disabled) return;
        item.checked = v;
        //如果开启了存储选中状态
        if (states.stored) {
            let {result, index} = uniqProcess(item.originData, states._innerCheckedData, states._keyStr);
            if (states._isCheckAll) {
                // 暂存数据中包含本行数据
                if (result) {
                    states._innerCheckedData.splice(index, 1);
                } else {
                    states._innerCheckedData.push(item.originData);
                }
            } else {
                //若包含本数据，则移除
                if (result) {
                    states._innerCheckedData.splice(index, 1);
                }
            }
        }
    });
    this.update();
};

//单选
TableStore.prototype.checkboxSingle = function (rowData, checked) {
    let states = this.states;
    let checkCount = 0;
    states.data.forEach(item => {
        item.checked && checkCount++;
        if (!rowData) return false;
    })
    //获取除去disabled所有
    let dataCount = states.data.filter(item => !item.disabled).length;

    if (checkCount == 0) {
        states._isCheckAll = false;
        states.checkboxIndeterminate = false;
    } else {
        if (dataCount == checkCount) {
            states._isCheckAll = true;
            states.checkboxIndeterminate = false;
        } else {
            states._isCheckAll = false;
            states.checkboxIndeterminate = true;
        }
    }

    if (rowData && states.stored) {
        let {result, index} = uniqProcess(
            rowData,
            states._innerCheckedData,
            states._keyStr
        );
        if (checked) {
            // 暂存数据中包含本行数据
            if (result) {
                states._innerCheckedData.splice(index, 1);
            } else {
                states._innerCheckedData.push(rowData);
            }
        } else {
            //若包含本数据，则移除
            if (result) {
                states._innerCheckedData.splice(index, 1);
            }
        }
    }
    this.update();
};

//radio
TableStore.prototype.checkedRadio = function (rowData, checked) {
    let states = this.states;
    states.data.forEach(item => {
        item.checked && (item.checked = false);
        if (!rowData) return false;
    });
    rowData.checked = checked;
    states._innerCheckedData = [rowData.originData];
}

//获取当前选中的数据
TableStore.prototype.getCheckedData = function () {
    if (this.states.stored) return this.states._innerCheckedData;
    let dataOut = [];
    this.states.data.forEach(item => {
        item.checked && dataOut.push(item.originData);
    });
    return dataOut;
};

//排序
TableStore.prototype.orderAction = function (
    props,
    columnkey,
    isAsc,
    sortable
) {
    if (sortable) {
        let _data = Object.assign(
            [],
            this.states.data.map(item => item.originData)
        );
        let sortDate = _data.sort(sortBy(props, isAsc));
        this.states._sortAsc = '';
        this.states._sortDesc = '';
        this.states._sortProps = props;
        this.states._sortIsAsc = isAsc;
        if (isAsc) {
            this.states._sortAsc = columnkey;
        } else {
            this.states._sortDesc = columnkey;
        }
        this.commit("updateData", sortDate);
    }
}

//排序，用于数据变化时
TableStore.prototype.updateDataKeepSort = function (data, props, isAsc) {
    //截取数组，原数组已经被vue监控，存在observer
    let _data = data.slice(0);
    let sortDate = _data.sort(sortBy(props, isAsc));
    this.commit("updateData", sortDate);
};

//重置checkbox选中
TableStore.prototype.checkboxStatus = function () {
    this.checkboxSingle();
};

//显示table tr 下详情
TableStore.prototype.showMore = function (data) {
    let $index = null;
    let flag = null;
    this.states.data.forEach((item, index) => {
        if (item.key === data.key) {
            $index = index;
            item.showExpand = !item.showExpand;
            flag = item.showExpand;
            return false;
        }
    });
    this.table.lazyLoadExpand(data.originData, $index, flag)
}

TableStore.prototype.outUpdate = function (keys, keysValue) {
    this.setColumns(keys, keysValue);
    this.update()
}
//重置是否显示列
TableStore.prototype.setColumns = function (keys, value = false) {
    this.states._columns.forEach(item => {
        keys.indexOf(item.key) > -1 ? (item.isShow = value) : (item.isShow = !value);
    });
};

export default TableStore;