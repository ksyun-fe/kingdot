import myColgroup from './colgroup.js';

export default {
    name: 'TableBody',
    props: {
        store: {
            type: Object,
            default: {}
        },
        marginLeft: {
            type: [String],
            default: "0px"
        },
        width: [String],
        treeProps: {
            type: Object
        }
    },
    computed: {
        columns() {
            //return this.store.states.columns;
            return this.getAllCols();
        },
        rowsData() {
            return this.store.states.data;
        },
        expandData() {
            return this.store.states.expand;
        },
        table() {
            return this.$parent;
        },
        disableCache() {
            return this.$parent.disableCache;
        },
        firstColumnIndex() {
            return this.store.states.showCheckbox ? 1 : 0;
        },
        childRenKey() {
            if (this.treeProps) {
                return this.treeProps.children || 'children';
            } else {
                return null
            }
        },
        hasChildrenKey() {
            if (this.treeProps) {
                return this.treeProps.hasChildren || 'hasChildren';
            } else {
                return null
            }
        }
    },
    components: {
        myColgroup
    },
    methods: {
        getCols(item) {
            let columns = [
                item.props || item.renderColumnFn
                    ?
                    Object.assign({}, item)
                    :
                    null
            ];
            let nextCol = [];
            if (item.children && item.children.length) {
                item.children.map(inner => {
                    nextCol = this.getCols(inner);
                    columns = columns.concat(nextCol);
                })
            }
            return columns;
        },
        //当合并表头时，需要拉平children层级。通过store里的columns和TableBody的columns的length对比可以知道是否合并表头
        getAllCols() {
            let columns = [];
            this.store.states.columns.map(item => {
                columns = columns.concat(this.getCols(item));
            });
            // console.log(columns)
            return columns;
        },
        getRealyProps(data, propsArray) {
            if (!data) return "";
            if (!propsArray) return "";
            if (propsArray.length > 1) {
                var _data = data[propsArray[0]];
                propsArray.shift();
                return this.getRealyProps(_data, propsArray);
            } else {
                return data[propsArray[0]];
            }
        },
        getHeight() {
            if (this.$refs.tableBody) {
                return this.$refs.tableBody.offsetHeight;
            }
        },
        //开关父节点下的所有子节点tree
        triggerTree(rowsItem, flag) {
            !flag && this.calleeTreeData(rowsItem);
        },
        calleeTreeData(rowsItem) {
            if (this.disableCache && rowsItem.loadTree != undefined && rowsItem[this.childRenKey] && rowsItem[this.hasChildrenKey]) {
                rowsItem[this.childRenKey] && (rowsItem[this.childRenKey] = []);
            }
            if (!rowsItem[this.childRenKey]) return false;
            rowsItem[this.childRenKey].map(item => {
                item.showTree = false;
                item[this.childRenKey] && this.calleeTreeData(item);
            });
            this.table.resize();
        },
        //显示tr下tree  normal
        showTrTree(rowsItem) {
            rowsItem.showTree = !rowsItem.showTree;
            this.$nextTick(() => {
                this.triggerTree(rowsItem.originData || rowsItem, rowsItem.showTree)
            })
        },
        //显示tr下的tree lazy load
        showLazyLoadTree(item, parent = {}, rowsItem) {
            item.loadTree = true;
            new Promise(resolve => {
                this.table.treeLoad(parent, item, resolve);
            }).then(data => {
                item.loadTree = false;
                let childRenKey = this.childRenKey || 'children';
                if (data && data.length) {
                    item[childRenKey] = data;
                }
                this.$nextTick(() => {
                    rowsItem.showTree = true;
                })
            })
        },
        //处理表格合并
        getSpan(row, column, rowIndex, columnIndex) {
            let rowspan = 1;
            let colspan = 1;
            const fn = this.table.spanMethod;
            if (typeof fn === 'function') {
                const result = fn({
                    row,
                    column,
                    rowIndex,
                    columnIndex
                });
                if (Array.isArray(result)) {
                    rowspan = result[0];
                    colspan = result[1];
                } else if (typeof result === 'object') {
                    rowspan = result.rowspan;
                    colspan = result.colspan;
                }
            }
            return {rowspan, colspan};
        },
        //普通tr
        renderTr(rowsItem, index) {
            let data = rowsItem.originData;
            let hasChildren = data[this.childRenKey] && data[this.childRenKey].length;
            //重置数据
            data.loadTree == undefined && this.$set(data, "loadTree", false);
            data[this.childRenKey] == undefined && this.$set(data, this.childRenKey, []);
            return (
                <tr
                    key={rowsItem.key}
                    class={
                        {
                            'kd-disabled': rowsItem.disabled
                        }
                    }
                >
                    {
                        this.columns.map((columnItem, cellIndex) => {
                            let scopeData = {
                                data: rowsItem,
                                $index: index,
                                row: rowsItem.originData,
                                store: this.store,
                                _self: this.$parent.$vnode.context
                            };
                            const {rowspan, colspan} = this.getSpan(rowsItem.originData, columnItem, index, cellIndex);
                            if (!rowspan || !colspan) {
                                return null;
                            }
                            return (
                                columnItem ?
                                    <td
                                        style={{
                                            paddingLeft:
                                                !this.store.states.showCheckbox && cellIndex == 0
                                                    ?
                                                    "20px"
                                                    :
                                                    ""
                                        }}
                                        rowspan={rowspan}
                                        colspan={colspan}
                                    >
                                        {
                                            (
                                                this.treeProps && cellIndex == this.firstColumnIndex
                                                && (
                                                    hasChildren
                                                    ||
                                                    data[this.hasChildrenKey]
                                                )
                                            ) && (
                                                <span
                                                    class={[
                                                        "kd-table-btn",
                                                        "kd-table-tree-btn",
                                                        "kd-icon-arrow-down",
                                                        {
                                                            "kd-icon-loading1": data.loadTree,
                                                            "kd-table-loading": data.loadTree,
                                                            "kd-table-show-btn": rowsItem.showTree
                                                        }
                                                    ]}
                                                    on-click={v => {
                                                        if (data[this.hasChildrenKey] && !hasChildren) {
                                                            this.showLazyLoadTree(data, data, rowsItem);
                                                        } else {
                                                            this.showTrTree(rowsItem);
                                                        }
                                                    }}
                                                ></span>
                                            )
                                        }
                                        {
                                            columnItem._slotColumn
                                                ?
                                                columnItem.renderColumnFn.call(
                                                    this._renderProxy,
                                                    h,
                                                    scopeData
                                                )
                                                :
                                                this.getRealyProps(
                                                    rowsItem.originData,
                                                    columnItem.props ? columnItem.props.split(".") : null
                                                )
                                        }
                                    </td>
                                    :
                                    null
                            )
                        })
                    }
                </tr>
            )
        },
        //包含expand的tr
        renderExpandTr() {
            let renderTr = this.rowsData.map((rowsItem, index) => {
                return (
                    [
                        this.renderTr(rowsItem, index),
                        this.expandData
                            ?
                            (
                                rowsItem.showExpand && (
                                    <tr class="kd-table-tr-expand">
                                        <td
                                            colspan={
                                                this.columns.length +
                                                (this.store.states.showCheckbox
                                                    ? 1
                                                    : 0)
                                            }>
                                            {
                                                this.expandData._slotColumn
                                                    ?
                                                    this.expandData.renderColumnFn.call(
                                                        this._renderProxy,
                                                        h,
                                                        {
                                                            data: rowsItem,
                                                            store: this.store,
                                                            row: rowsItem.originData
                                                        }
                                                    )
                                                    :
                                                    ('')
                                            }
                                        </td>
                                    </tr>
                                )
                            )
                            :
                            ('')
                    ]
                )
            });
            return renderTr;
        },
        //包含tree的tr
        renderTreeTr(rowsItem, index, step) {
            if (!this.childRenKey) return [];
            let trList = [];
            let nextLevel = [];
            step = step ? step : 0;
            let Items = rowsItem.originData || rowsItem;
            if (!Items[this.childRenKey]) return [];
            Items[this.childRenKey].map((item, nCount) => {
                //重置数据
                item.loadTree == undefined && this.$set(item, "loadTree", false);
                item[this.childRenKey] == undefined && this.$set(item, this.childRenKey, []);
                item.showTree == undefined && this.$set(item, "showTree", false);
                item.disabled == undefined && this.$set(item, "disabled", rowsItem.disabled);

                let hasChildren = item[this.childRenKey] && item[this.childRenKey].length;
                trList.push(
                    rowsItem.showTree || item.showTree
                        ?
                        (
                            <tr key={Math.random()}
                                class={
                                    {
                                        'kd-disabled': item.disabled
                                    }
                                }
                            >
                                {
                                    this.columns.map((columnItem, cellIndex) => {
                                        let scopeData = {
                                            data: item,
                                            $parent: rowsItem.originData || rowsItem,
                                            $index: index,
                                            $childrenIndex: nCount,
                                            row: item,
                                            store: this.store,
                                            _self: this.$parent.$vnode.context
                                        };
                                        return (
                                            <td style={{
                                                paddingLeft:
                                                    !this.store.states.showCheckbox && cellIndex == 0
                                                        ?
                                                        "20px"
                                                        :
                                                        ""
                                            }}>
                                                {
                                                    cellIndex == this.firstColumnIndex
                                                    &&
                                                    (
                                                        <span
                                                            class="kd-table-tree-placeholder"
                                                            style={
                                                                {
                                                                    "width": 24 * (step + 1) + 'px'
                                                                }
                                                            }></span>
                                                    )
                                                }
                                                {
                                                    (
                                                        this.treeProps && cellIndex == this.firstColumnIndex
                                                        && (
                                                            hasChildren
                                                            ||
                                                            item[this.hasChildrenKey]
                                                        )
                                                    ) &&
                                                    (
                                                        <span
                                                            class={[
                                                                "kd-table-btn",
                                                                "kd-table-tree-btn",
                                                                "kd-icon-arrow-down",
                                                                {
                                                                    "kd-icon-loading1": item.loadTree,
                                                                    "kd-table-loading": item.loadTree,
                                                                    "kd-table-show-btn": item.showTree
                                                                }
                                                            ]}
                                                            on-click={v => {
                                                                if (item[this.hasChildrenKey] && !hasChildren) {
                                                                    this.showLazyLoadTree(item, rowsItem.originData, item);
                                                                } else {
                                                                    this.showTrTree(item);
                                                                }
                                                            }}
                                                        ></span>
                                                    )

                                                }
                                                {
                                                    columnItem._slotColumn
                                                        ?
                                                        columnItem.renderColumnFn.call(
                                                            this._renderProxy,
                                                            h,
                                                            scopeData
                                                        )
                                                        :
                                                        this.getRealyProps(
                                                            item,
                                                            columnItem.props ? columnItem.props.split(".") : null
                                                        )
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                        :
                        ('')
                );
                //如果有children
                if (item[this.childRenKey] && item[this.childRenKey].length) {
                    nextLevel = this.renderTreeTr(item, nCount, step += 1);
                }
                trList = trList.concat(nextLevel);
            });
            return trList;
        },
        renderTree() {
            let renderTr = this.rowsData.map((rowsItem, index) => {
                let normal = [this.renderTr(rowsItem, index)];
                let tree = this.renderTreeTr(rowsItem, index);
                return normal.concat(tree);
            });
            return renderTr;
        },
    },
    render() {
        const renderNormalTr =
            this.treeProps
                ?
                this.renderTree()
                :
                this.renderExpandTr();

        return (
            <div class="kd-table-body">
                <table
                    cellSpacing="0"
                    cellPadding="0"
                    border="0"
                    ref="tableBody"
                    style={{
                        width: this.width,
                        marginLeft: this.marginLeft
                    }}
                >
                    {
                        //判断是否是合并表头模式
                        this.columns.length == this.store.states.columns.length
                            ?
                            <my-colgroup store={this.store}></my-colgroup>
                            :
                            <colgroup>
                                {
                                    this.columns.map(item => {
                                        return (
                                            item
                                                ?
                                                <col name={item.key} width={item.width || this.store._autoColumnWidth}></col>
                                                :
                                                ''
                                        )
                                    })
                                }
                            </colgroup>
                    }
                    <tbody>
                    {
                        renderNormalTr
                    }

                    {
                        this.noData && (
                            <tr>
                                <td
                                    style="text-align: center;"
                                    colspan={
                                        this.columns.length +
                                        (this.store.states.showCheckbox
                                            ? 1
                                            : 0)
                                    }
                                >
                                    无数据
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>

        );
    }
}