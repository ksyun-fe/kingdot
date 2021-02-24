import myColgroup from './colgroup.js';
import {mouseDragBegin} from "../utils";

const getAllColumns = (columns) => {
    const result = [];
    columns.forEach((column) => {
        if (column.children) {
            result.push(column);
            result.push.apply(result, getAllColumns(column.children));
        } else {
            result.push(column);
        }
    });
    return result;
};

const convertToRows = (originColumns) => {
    let maxLevel = 1;
    const traverse = (column, parent) => {
        if (parent) {
            column.level = parent.level + 1;
            if (maxLevel < column.level) {
                maxLevel = column.level;
            }
        }
        if (column.children) {
            let colSpan = 0;
            column.children.forEach((subColumn) => {
                traverse(subColumn, column);
                colSpan += subColumn.colSpan;
            });
            column.colSpan = colSpan;
        } else {
            column.colSpan = 1;
        }
    };

    originColumns.forEach((column) => {
        column.level = 1;
        traverse(column);
    });

    const rows = [];
    for (let i = 0; i < maxLevel; i++) {
        rows.push([]);
    }

    const allColumns = getAllColumns(originColumns);

    allColumns.forEach((column) => {
        if (!column.children) {
            column.rowSpan = maxLevel - column.level + 1;
        } else {
            column.rowSpan = 1;
        }
        rows[column.level - 1].push(column);
    });

    return rows;
};

export default {
    name: 'TableHeader',
    props: {
        store: {
            type: Object,
            default: {}
        },
        width: {
            type: [String]
        },
        marginLeft: {
            type: [String],
            default: "0px"
        },
    },
    data() {
        return {
            groupSelect: {},
            tableWidth: 0,
            isGroup: false
        }
    },
    computed: {
        columns() {
            return this.store.states.columns;
        },
        rowsData() {
            return this.store.states.data;
        },
        table() {
            return this.$parent;
        },
        showCheckbox() {
            return this.store.states.showCheckbox;
        },
        checked() {
            return this.store.states._isCheckAll;
        },
        expandData() {
            return this.store.states.expand;
        },
    },
    components: {
        myColgroup
    },
    methods: {
        getHeaderHeight() {
            if (!this.$el) {
                return 38;
            } else {
                return this.$el.offsetHeight;
            }
        },
        orderAction({props, sortable, key}, action) {
            this.store.orderAction(props, key, action, sortable);
        },
        fillterData(columnItem, groupItem) {
            this.$set(this.groupSelect, columnItem.key, groupItem.label);
            if (columnItem.filter) {
                columnItem.filter(
                    {
                        props: columnItem.props,
                        value: groupItem.value
                    }
                )
            }
        },
        moveTh(event, thisColumnData, preColumnData) {
            mouseDragBegin(
                event,
                (startPoint, endPoint) => {
                    this.table.setLinePosition(
                        startPoint.x + endPoint.x - startPoint.x,
                        endPoint.x - startPoint.x,
                        thisColumnData,
                        preColumnData
                    );
                },
                (startPoint, endPoint) => {
                    this.table.setLinePosition(
                        startPoint.x + endPoint.x - startPoint.x,
                        endPoint.x - startPoint.x,
                        thisColumnData,
                        preColumnData,
                        true
                    );
                }
            );
        },
        //当合并表头时，需要拉平children层级
        returnCols(item) {
            let colList = [
                item.props || item.renderColumnFn
                    ?
                    <col name={item.key} width={item.width || this.store._autoColumnWidth}></col>
                    :
                    null
            ];

            let nextCol = [];
            if (item.children && item.children.length) {
                item.children.map(inner => {
                    nextCol = this.returnCols(inner);
                    colList = colList.concat(nextCol);
                })
            }
            return colList;
        },
        // setTableWidth(item) {
        //     if(item.props || item.renderColumnFn){
        //         let minWidth = this.store._autoColumnWidth;
        //         this.tableWidth += parseInt(item.width || minWidth);
        //     }
        //     if (item.children && item.children.length) {
        //         item.children.map(inner => {
        //             this.setTableWidth(inner);
        //         })
        //     }
        // }
    },
    mounted() {
        // this.columns.map(item => {
        //     this.setTableWidth(item);
        // });
    },
    updated(){
        //弃用
        //为了兼容store原有逻辑，在这里触发重新计算table宽度
        //store中已经计算好了宽度，由于表头合并在store中没有拉平层级，所以计算的宽度是第一级的宽度
        //this.isGroup && this.table.resetTableWidth(this.tableWidth)
    },
    render() {
        const columnRows = convertToRows(this.columns);
        // console.log(columnRows)
        const hasNoDragTd = this.expandData ? [0, 1, 2] : [0, 1];
        // 是否拥有多级表头
        const isGroup = columnRows.length > 1;
        this.isGroup = isGroup;
        return (
            <div class="kd-table-header">
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    border="0"
                    style={{
                        width: this.width,
                        marginLeft: this.marginLeft
                    }}
                >
                    {
                        //判断是否是合并表头模式
                        !isGroup
                            ?
                            <my-colgroup store={this.store}></my-colgroup>
                            :
                            <colgroup>
                                {
                                    this.columns.map(item => {
                                        return (
                                            [this.returnCols(item)]
                                        )
                                    })
                                }
                            </colgroup>
                    }
                    <thead class="kd-thead">
                    {
                        columnRows.map((columns, rowIndex) => {
                            return (
                                <tr>
                                    {
                                        columns.map((item, cellIndex) => {
                                            let isFilterGroup = item.group && item.group.length > 0;
                                            return (
                                                <th
                                                    colspan={item.colSpan}
                                                    rowspan={item.rowSpan}
                                                    style={{
                                                        paddingLeft:
                                                            !this.store.states.showCheckbox && rowIndex == 0 && cellIndex == 0
                                                                ?
                                                                "20px"
                                                                :
                                                                ""
                                                    }}
                                                    class={
                                                        {
                                                            "kd-th-noborder": this.expandData && cellIndex == 0
                                                        }
                                                    }
                                                >
                                                    {
                                                        item._slotHeader
                                                            ?
                                                            item.renderHeaderFn.call(
                                                                this._renderProxy,
                                                                h,
                                                                {
                                                                    self: this,
                                                                    data: item,
                                                                    $index: cellIndex,
                                                                    store: this.store,
                                                                    _self: this.$parent.$vnode
                                                                        .context
                                                                }
                                                            )
                                                            :
                                                            item.title
                                                    }

                                                    {
                                                        (item.sortable && this.rowsData.length >= 2)
                                                            ?
                                                            (
                                                                <div class="kd-table-sort">
                                                                    <div class="kd-sort-content">
                                                                        <span class={
                                                                            [
                                                                                "kd-sort-item kd-sort-asc",
                                                                                {
                                                                                    "kd-sort-action": this.store.states._sortAsc == item.key
                                                                                }
                                                                            ]
                                                                        }>
                                                                            <i
                                                                                class="kd-icon-arrow-down-solid"
                                                                                on-click={() => {
                                                                                    this.orderAction(
                                                                                        item,
                                                                                        true
                                                                                    );
                                                                                }}
                                                                            ></i>
                                                                        </span>

                                                                        <span class={
                                                                            [
                                                                                "kd-sort-item kd-sort-desc",
                                                                                {
                                                                                    "kd-sort-action": this.store.states._sortDesc == item.key
                                                                                }
                                                                            ]
                                                                        }>
                                                                            <i
                                                                                class="kd-icon-arrow-down-solid"
                                                                                on-click={() => {
                                                                                    this.orderAction(
                                                                                        item,
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            ></i>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                            :
                                                            ("")
                                                    }

                                                    {
                                                        isFilterGroup
                                                            ?
                                                            (
                                                                <kd-dropdown
                                                                    hover
                                                                    type='text'
                                                                    stype=""
                                                                >
                                                                    <span>
                                                                        {
                                                                            this.groupSelect[item.key]
                                                                                ?
                                                                                (
                                                                                    <span style="color:rgba(0,0,0,.5)">
                                                                                        ({this.groupSelect[item.key]})
                                                                                    </span>
                                                                                )
                                                                                :
                                                                                (
                                                                                    ""
                                                                                )
                                                                        }
                                                                        <i class="kd-icon-arrow-down"></i>
                                                                    </span>
                                                                    <kd-dropdown-menu slot="dropdown">
                                                                        {
                                                                            item.group.map(groupItem => {
                                                                                return (
                                                                                    <kd-dropdown-item
                                                                                        slot="dropdownItem"
                                                                                        key={Math.random()}
                                                                                        value={groupItem.value}
                                                                                        on-click={() => {
                                                                                            this.fillterData(
                                                                                                item,
                                                                                                groupItem
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        {groupItem.label}
                                                                                    </kd-dropdown-item>
                                                                                )
                                                                            })
                                                                        }
                                                                    </kd-dropdown-menu>
                                                                </kd-dropdown>
                                                            )
                                                            :
                                                            ('')
                                                    }

                                                    {
                                                        !hasNoDragTd.includes(cellIndex)
                                                            ?
                                                            (
                                                                <div
                                                                    class="kd-table-drag-th"
                                                                    on-mousedown={$event =>
                                                                        this.moveTh(
                                                                            $event,
                                                                            item,
                                                                            this.columns[cellIndex - 1]
                                                                        )
                                                                    }
                                                                ></div>
                                                            )
                                                            :
                                                            ('')
                                                    }
                                                </th>
                                            )
                                        })
                                    }

                                </tr>
                            )
                        })
                    }
                    </thead>
                </table>
            </div>
        )
    }
}