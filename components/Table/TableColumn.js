import {ulid} from "../../src/utils/utils.js";

const defaults = {
    title: "",
    props: "",
    width: "",
    renderColumnFn: null,
    renderColumnHeaderFn: null,
    isShow: true,
    checked: true,
    defaultShow: true
};

//遍历数据
const getColumnData = function (props, table) {
    let scopeDefault = Object.assign({}, defaults);
    for (let keyStr in props) {
        props.hasOwnProperty(keyStr) && (scopeDefault[keyStr] = props[keyStr]);
    }

    scopeDefault.fixedLeft = props.fixed === true;
    scopeDefault.fixedRight = props.fixed === "right";

    // 设置默认是否显示，配合columnFilter使用
    if (table.$props.columnFilter) {
        scopeDefault.isShow = props.defaultShow;
    }
    //td拖拽偏移量
    scopeDefault.deviation = 0;
    let unshiftFlag = scopeDefault.group.some(item => {
        if (item.value == 'all') {
            return true;
        }
    })
    if (scopeDefault.group.length > 0 && !unshiftFlag) {
        scopeDefault.group.unshift({
            value: "all",
            label: "全部"
        });
    }
    return scopeDefault;
};

export default {
    name: 'kd-table-column',
    props: {
        width: {
            type: [Number, String]
        },
        title: String,
        props: String,
        fixed: [Boolean, String],
        //是否可以排序
        sortable: {
            type: Boolean,
            default: false
        },
        //筛选分组
        group: {
            default() {
                return [];
            }
        },
        //筛选回调
        filter: {
            type: Function,
            default: null
        },
        //类型，expand为展开模块
        type: {
            type: String,
            default: 'default'
        },
        defaultShow: {
            type: Boolean,
            default: true
        }
    },
    data() {
        const idStr = ulid();
        return {
            key: idStr
        };
    },
    computed: {
        table() {
            return this.$parent;
        }
    },
    mounted() {
        // console.log(this.$slots.default);
        let children = null;
        //获取children，为了实现合并表头
        if (this.$slots.default) {
            children = this.getChildren(this.$slots.default);
        }
        // console.log(children)
        let propsData = Object.assign({key: this.key, children: children}, this.$props);
        //是否插槽
        if (this.$vnode.data.scopedSlots) {
            if (this.$vnode.data.scopedSlots.default) {
                propsData._slotColumn = true;
                propsData.renderColumnFn = (h, data) =>
                    this.$vnode.data.scopedSlots.default(data);
            }
            if (this.$vnode.data.scopedSlots.header) {
                propsData._slotColumnHeader = true;
                propsData.renderColumnHeaderFn = (h, data) =>
                    this.$vnode.data.scopedSlots.header(data);
            }
            // this.$vnode.data.scopedSlots.default &&
            // ((propsData._slotColumn = true),
            //     (propsData.renderColumnFn = (h, data) =>
            //         this.$vnode.data.scopedSlots.default(data)));
        }
        this.data = getColumnData(propsData, this.table);
        //区分tablecolumn的类型，如果是default
        if (this.data.type === 'default') {
            //获取index
            let columnIndex = [].indexOf.call(this.$parent.$refs.hiddenColumns.children, this.$el);
            //在store中存储数据
            this.table.store.commit("insertColumn", this.data, columnIndex);
        } else {
            this.table.store.commit("insertExpand", this.data);
        }
    },
    methods: {
        getChildren(data) {
            let children = [];
            data.map(item => {
                if(item.componentOptions && item.componentOptions.propsData){
                    let propsData = Object.assign({}, item.componentOptions.propsData);
                    // 如果没有props 且有插槽
                    if(!item.componentOptions.propsData.props && item.data.scopedSlots && item.data.scopedSlots.default) {
                        propsData._slotColumn = true;
                        propsData.renderColumnFn = (h, data) =>
                            item.data.scopedSlots.default(data);
                    }
                    if(item.componentOptions.children){
                        propsData.children = this.getChildren(item.componentOptions.children);
                    }
                    children.push(propsData);
                }
            });
            return children;
        }
    },
    destroyed() {
        this.table.store.commit("deleteColumn", this.key);
    },
    render() {
        return <div></div>
    }
}
