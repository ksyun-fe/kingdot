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
                            :node-id="`cascader-menu-${id}-${index}-${idx}`"
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
            // 展示字段name
            labelName: {
                type: String,
                default: 'label'
            },
            // 取值字段name
            valueName: {
                type: String,
                default: 'value'
            }
        },
        provide() {
            return {
                panel: this,
                cascader: this.cascader,
                expandTrigger: this.expandTrigger,
                lazy: this.lazy,
                labelName: this.labelName,
                valueName: this.valueName
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
            emptyWidth() {
                return this.cascader.$refs.kdCascader && (this.cascader.$refs.kdCascader.clientWidth + 'px') || '300px';
            }
        },
        watch: {
            value: {
                deep: true,
                handler(val) {
                    this.checkedValue = val;
                    if (!this.lazy) {
                        this.menus = this.initMenus(this.options);
                    }
                }
            },
            checkedValue: {
                deep: true,
                handler(val) {
                    this.getPresentPath();
                    this.$emit('input', val);
                }
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
                        const node = options.find(i => i[this.valueName] === item);
                        options = node && node.children || [];
                        if (options.length) menus.push(options);
                    });
                }
                return menus;
            },
            isActiveNode(node, level) {
                if (!this.activePath.length || !this.activePath[level]) return false;
                return this.activePath[level].uid === node.uid;
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
                        list.forEach(i => {
                            i.uid = Math.floor(Math.random() * 10000);
                            i.level = parent ? parent.level + 1 : 1;
                            i.loaded = i.loaded || i.isLeaf;
                        });
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
                                const node = flatOpt[this.loadCount].find(i => i[this.valueName] === nodeValue);
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
                const val = this.activePath.map(i => i[this.valueName]);
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
                        const node = optionsArr.find(i => i[this.valueName] === item);
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
                return node.isLeaf;
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
            }
        }
    };
</script>
