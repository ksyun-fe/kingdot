<template>
    <div
            ref="kdCascaderPanel"
            class="kd-cascader-panel"
    >
        <div
                v-if="menus.length"
                class="kd-cascader-menu"
        >
            <ul
                    v-for="(menu, index) in menus"
                    ref="menu"
                    :key="index"
                    class="kd-cascader-menu__list"
                    :index="index"
            >
                <template v-if="menu.length">
                    <cascader-node
                            v-for="(node, idx) in menu"
                            :key="node.uid"
                            :node="node"
                            :node-id="`cascader-menu-${node.uid}-${index}-${idx}`"
                            :level="index"
                    >
                    </cascader-node>
                </template>
            </ul>
        </div>
        <div
                v-else
                class="kd-cascader-menu_empty"
                :style="{width: emptyWidth}"
        >
            暂无数据
        </div>
    </div>
</template>
<script>
    import CascaderNode from './cascaderNode.vue';
    import { isEmpty, arrayEquals } from '../../src/utils/utils.js';
    import Node from './node';

    export default {
        name: 'KdCascaderPanel',
        components: {
            CascaderNode
        },
        mixins: [],
        props: {
            options: {
                type: Array,
                default() {
                    return [];
                }
            },
            expandTrigger: {
                type: String
            },
            value: {
                type: Array,
                default() {
                    return [];
                }
            },
            cascader: {
                type: Object
            },
            lazy: {
                type: Boolean,
                default: false
            },
            lazyMethod: {
                type: Function
            },
            labelName: {
                type: String,
                default: 'label'
            },
            valueName: {
                type: String,
                default: 'value'
            },
            multiple: {
                type: Boolean,
                default: false
            },
            checkStrictly: {
                type: Boolean,
                default: false
            }
        },
        provide() {
            return {
                panel: this,
                cascader: this.cascader,
                expandTrigger: this.expandTrigger,
                lazy: this.lazy,
                multiple: this.multiple,
                checkStrictly: this.checkStrictly
            };
        },
        data() {
            return {
                nodeList: [],
                checkedValue: [],
                menus: [],
                flatOpt: [],
                activePath: [],
                loadCount: 0
            };
        },
        computed: {
            emptyWidth() {
                return this.cascader.$refs.kdCascader && (this.cascader.$refs.kdCascader.clientWidth + 'px') || '300px';
            },
            config() {
                const { lazy, multiple, checkStrictly, labelName, valueName } = this;
                const conf = {
                    multiple,
                    lazy,
                    checkStrictly,
                    labelName,
                    valueName
                };
                return conf;
            }
        },
        watch: {
            value: {
                deep: true,
                immediate: true,
                handler(val) {
                    if (!arrayEquals(val, this.checkedValue)) {
                        this.activePath = [];
                        this.checkedValue = val;
                        this.calcMenuState();
                    }
                }
            },
            checkedValue: {
                deep: true,
                handler(val) {
                    if (!arrayEquals(val, this.value)) {
                        this.$emit('input', val);
                        this.$emit('change', val);
                    }
                }
            },
            options: {
                deep: true,
                immediate: true,
                handler() {
                    this.initNodeList();
                }
            }
        },
        created() {
        },
        mounted() {
        },
        methods: {
            // 初始化menulist， flatopt
            initNodeList() {
                const { lazy, options, config } = this;
                if (lazy && isEmpty(options)) {
                    this.lazyLoadFn();
                } else {
                    this.nodeList = options.map(nodeData => new Node(nodeData, config));
                    this.menus = [this.nodeList];
                    this.flatOpt = this._flatNodes(this.nodeList);
                    this.calcMenuState();
                }
            },
            // 计算activepath
            calcMenuState() {
                this.calcActivePath();
                this.multiple && this.calcMultiCheckState();
            },
            // 计算activepath, menus
            calcActivePath() {
                const { multiple, activePath, checkedValue } = this;

                if (!isEmpty(activePath)) {
                    const nodes = activePath.map(node => this.getNodeByValue(node.value));
                    nodes.forEach(node => this.handleExpand(node));
                } else if (!isEmpty(checkedValue)) {
                    const value = multiple ? checkedValue[0] : checkedValue;
                    // 当前选择的节点
                    const checkedNode = this.getNodeByValue(value) || {};
                    const nodes = (checkedNode.pathNodes || []).slice(0, -1);
                    nodes.forEach(node => this.handleExpand(node));
                } else {
                    this.activePath = [];
                    this.menus = [this.nodeList];
                }
            },
            calcMultiCheckState() {
                const {menus, checkedValue} = this;
                if (!menus.length) return;
                const nodes = this._flatNodes(menus[0]);
                nodes.forEach(node => {
                    node.syncCheckState(checkedValue);
                });
            },
            //  更新当前被选择列表（activePath）, 更新面板（menus）
            handleExpand(node) {
                const { activePath } = this;
                const { level } = node;
                const path = activePath.slice(0, level - 1);
                const menus = this.menus.slice(0, level);

                if (!node.isLeaf) {
                    path.push(node);
                    menus.push(node.children);
                }

                this.activePath = path;
                this.menus = menus;
            },
            handleClickNode(pathValue) {
                this.checkedValue = pathValue;
            },
            lazyLoadFn(node, fn) {
                if (!node) {
                    node = { root: true, level: 0 };
                    this.menus = [];
                }
                this.$set(node, 'loading', true);
                const resolve = list => {
                    if (list && list.length) {
                        const parent = node.root ? null : node;
                        const item = list.map(nodeData => new Node(nodeData, this.config, parent));
                        if (parent) {
                            parent.children = item;
                        } else {
                            this.menus.push(item);
                        }
                        if (this.menus.length) {
                            this.flatOpt = this._flatNodes(this.menus[0]);
                        }
                        node.loading = false;
                        node.loaded = true;

                        // 有默认值时的初始化
                        if (this.checkedValue && this.checkedValue.length) {
                            const nodeValue = this.checkedValue[this.loadCount];
                            const flatOpt = this._initMenus(this.menus[0]);
                            if (flatOpt[this.loadCount]) {
                                const node = flatOpt[this.loadCount].find(i => i[this.valueName] === nodeValue);
                                this.loadCount++;
                                if (node && !node.isLeaf) {
                                    this.lazyLoadFn(node, () => {
                                        this.handleExpand(node);
                                    });
                                }
                                if (this.loadCount === this.checkedValue.length) {
                                    this.$emit('setLabel');
                                }
                            }
                        }
                        fn && fn(list);
                    } else {
                        node.loading = false;
                        node.isLeaf = true;
                        node.loaded = true;
                    }
                };
                this.lazyMethod(node, resolve);
            },
            calcMultiCheckedValue() {
                const checkedArr = this.calcMultiCheckedNodes();
                this.checkedValue = checkedArr.map(node => node.pathValue);
            },
            calcMultiCheckedNodes() {
                this.flatOpt = this._flatNodes(this.menus[0]);
                return this.flatOpt.filter(node => node.checked && node.isLeaf);
            },
            scrollToView() {
                const menu = this.$refs.menu || [];
                menu.forEach(item => {
                    const activeNode = item.querySelector('.kd-cascader-panel-node.is-active');
                    this.scrollToViewFn(item, activeNode);
                });
            },
            scrollToViewFn(container, target) {
                if (!target) {
                    container.scrollTop = 0;
                    return;
                }
                // 计算当前可视区的上下界限值；
                const viewTop = container.scrollTop;
                const viewBottom = viewTop + container.clientHeight;

                // 计算当前选择元素的上下高度值
                const top = target.offsetTop;
                const bottom = top + target.offsetHeight;

                if (top < viewTop) {
                    container.scrollTop = top;
                } else if (bottom > viewBottom) {
                    container.scrollTop = bottom - container.clientHeight;
                }
            },
            _flatNodes(data) {
                if (!data || data.length < 1) return [];
                return data.reduce((res, node) => {
                    res.push(node);
                    if (node.children && node.children.length) {
                        res = res.concat(this._flatNodes(node.children));
                    }
                    return res;
                }, []);
            },
            getNodeByValue(value) {
                const nodes = this.flatOpt.filter(node => (arrayEquals(node.pathValue, value) || node.value === value));
                return nodes && nodes.length ? nodes[0] : null;
            },
            _initMenus(option = []) {
                const menus = [];
                let options = option.slice();
                menus.push(options);
                if (this.value.length) {
                    this.value.forEach(item => {
                        const node = options.find(i => i[this.valueName] === item);
                        options = node && node.children || [];
                        if (options.length) menus.push(options);
                    });
                }
                return menus;
            }
        }
    };
</script>
