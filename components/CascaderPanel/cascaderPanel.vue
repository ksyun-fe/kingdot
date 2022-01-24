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
                <div v-if="menu.length">
                    <cascader-node
                            v-for="(node, idx) in menu"
                            :key="node.uid"
                            :node="node"
                            :node-id="`cascader-menu-${id}-${index}-${idx}`"
                            :level="index"
                    >
                    </cascader-node>
                </div>
            </ul>
        </div>
        <div
                v-else
                class="kd-cascader-menu_empty"
        >
            暂无数据
        </div>
    </div>
</template>
<script>
    import Lang from 'src/mixin/lang.js';
    import CascaderNode from './cascaderNode.vue';

    export default {
        name: 'KdCascaderPanel',
        components: {
            CascaderNode
        },
        mixins: [Lang],
        props: {
            options: {
                type: Array,
                default() {
                    return [];
                }
            },
            noData: {
                type: String,
                default: '暂无数据'
            },
            // 次级菜单的展开方式
            expandTrigger: {
                type: String
            },
            // 是否显示选中值的完整路径
            showAllLevels: {
                type: Boolean,
                default: true
            },
            value: {
                type: Array,
                default() { []; }
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
            filterable: {
                type: Boolean,
                default: false
            }
        },
        provide() {
            return {
                panel: this,
                cascader: this.cascader,
                expandTrigger: this.expandTrigger,
                lazy: this.lazy
            };
        },
        data() {
            return {
                checkedValue: this.value,
                menus: [],
                activePath: [],
                id: this.generateId(),
                loadCount: 0
            };
        },
        computed: {
        },
        watch: {
            value: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.checkedValue = val;
                    if (this.filterable) {
                        this.menus = this.initMenus(this.options);
                    }
                }
            },
            checkedValue(val) {
                this.getPresentPath();
                this.$emit('input', val);
                this.$emit('change', val);
            },
            options: {
                deep: true,
                handler(val) {
                    if (val.length) this.menus = this.initMenus(val);
                }
            }
        },
        created() {
        },
        methods: {
            generateId() {
                return Math.floor(Math.random() * 10000);
            },
            initMenus(option = []) {
                const menus = [];
                let options = option.slice();
                menus.push(options);
                if (this.value.length) {
                    this.value.forEach(item => {
                        const node = options.find(i => i.value === item);
                        options = node && node.children || [];
                        if (options.length) menus.push(options);
                    });
                }
                return menus;
            },
            isActiveNode(node) {
                return this.activePath.includes(node);
            },
            lazyLoadFn(node, fn, type) {
                if (!node) {
                    node = { root: true, level: 0 };
                    this.menus = [];
                }
                this.$set(node, 'loading', true);
                const resolve = list => {
                    if (list && list.length) {
                        const parent = node.root ? null : node;
                        if (parent) {
                            parent.children = list;
                        } else {
                            this.menus.push(list);
                        }
                        node.loading = false;
                        node.loaded = true;

                        // 有默认值时的初始化
                        if (this.checkedValue.length && !type) {
                            const nodeValue = this.checkedValue[this.loadCount];
                            const flatOpt = this.initMenus(this.menus[0]);
                            if (flatOpt[this.loadCount]) {
                                const node = flatOpt[this.loadCount].find(i => i.value === nodeValue);
                                this.loadCount++;
                                if (node && !node.isLeaf) {
                                    this.lazyLoadFn(node, () => {
                                        this.handleExpand(node, this.loadCount);
                                    });
                                }
                                if (this.loadCount === this.checkedValue.length) {
                                    this.$emit('setValue');
                                }
                            }
                        }
                        fn && fn(list);
                    }
                };
                this.lazyMethod(node, resolve);
            },
            //  更新当前被选择列表（activePath）, 更新面板（menus）
            handleExpand(node, level) {
                const { activePath, menus } = this;
                const path = activePath.slice(0, level);
                const menu = menus.slice(0, level + 1);

                if (!this.isLeaf(node)) {
                    path.push(node);
                    menu.push(node.children);
                }

                this.activePath = path;
                this.menus = menu;
            },
            // 当点击叶子节点时
            handleClickNode(node, level) {
                const path = this.activePath.slice(0, level);
                path.push(node);
                this.activePath = path;
                // 更新当前被选择列表
                const val = this.activePath.map(i => i.value);
                this.checkedValue = val;
                this.$nextTick(() => {
                    this.$emit('menuUnvisible');
                    this.$emit('setValue');
                });
            },
            // 根据当前选项获取路径
            getPresentPath() {
                const {checkedValue, menus} = this;
                const activePath = [];
                if (checkedValue && checkedValue.length) {
                    let optionsArr = menus && menus.length ? menus[0].slice() : [];
                    checkedValue.forEach(item => {
                        const node = optionsArr.find(i => i.value === item);
                        if (node) {
                            activePath.push(node);
                            optionsArr = node.children || [];
                        }
                    });
                }
                this.activePath = activePath;
                return activePath;
            },
            // 是否是叶子节点
            isLeaf(node) {
                // 懒加载情况
                return node.isLeaf;
            },
            scrollIntoView() {}
        }
    };
</script>
