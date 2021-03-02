<template>
    <ul :class="ulClass">
        <treeLi
                v-for="(item, index) in data"
                :key="item.id ? item.id : index"
                :item="item"
                :index="index"
                v-bind="childBind"
                @drop.stop.native="drop(item, $event)"
                @dragover.stop.native="dragover(item, $event)"
        />
    </ul>
</template>
<script>
    import TreeLi from './treeLi.vue';
    export default {
        name: 'TreeUl',
        components: { TreeLi },
        inheritAttrs: false,
        inject: [
            'isLeaf',
            'childChecked',
            'parentChecked',
            'emitEventToTree',
            'TREE'
        ],
        props: {
            data: {
                type: Array,
                default: () => []
            },
            parent: {
                type: Object,
                default: () => null
            },
            dragAfterExpanded: {
                type: Boolean,
                default: true
            },
            level: {
                type: Number,
                default: 0
            },
            allowGetParentNode: {
                type: Boolean,
                default: false
            },
            showLine: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            ulClass() {
                return {
                    'kd-tree': true,
                    'kd-tree-line': this.showLine
                };
            },
            childBind() {
                // eslint-disable-next-line no-unused-vars
                const { data, ...otherObj } = this.$props;

                return Object.assign({}, this.$attrs, otherObj, {
                    level: this.treeLevel
                });
            },
            treeLevel() {
                return this.level + 1;
            }
        },
        created() {
            this.data.forEach((item) => {
                const __key__ = this.guid();
                // let __key__ = item[this.TREE.nodeKey];
                // do not use nodeKey , maybe duplicate
                this.$set(item, '__key__', __key__);
                if (this.TREE.expandedKeys.includes(item[this.TREE.nodeKey])) {
                    this.$set(item, 'expanded', true);
                }
                if (this.TREE.checkedKeys.includes(item[this.TREE.nodeKey])) {
                    this.$set(item, 'checked', true);
                    const halfcheck = this.TREE.halfcheck;
                    if (halfcheck) {
                        this.$set(item, 'halfcheck', false);
                    }
                    this.childChecked(item, true, halfcheck);
                }
            });
            if (this.allowGetParentNode === true) {
                const parent = this.parent;
                this.data.forEach((item) => {
                    item.parent = () => parent;
                });
            }
        },
        methods: {
            guid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
                    /[xy]/g,
                    (c) => {
                        const r = (Math.random() * 16) | 0;
                        const v = c === 'x' ? r : (r & 0x3) | 0x8;
                        return v.toString(16);
                    }
                );
            },
            hasInGenerations(root, node) {
                let ret = false;
                if (Object.prototype.hasOwnProperty.call(root, 'children') && root.children) {
                    for (const rn of root.children) {
                        if (rn === node) return true;
                        if (rn.children) ret |= this.hasInGenerations(rn, node);
                    }
                }
                return ret;
            },
            // get drag node info
            _getDragNodeInfo() {
                const guid = this.TREE.dragInfo.dragKey;
                return this.TREE.dragInfo[guid];
            },
            // node drop
            drop(node, e) {
                // const mode = this.TREE.mode;
                // todo: 后面根据模式在不同位置插入
                e.preventDefault();
                e.stopPropagation();

                const {
                    node: dragNode,
                    parent: parentNode
                } = this._getDragNodeInfo();

                // drag from parent node to child node
                if (this.hasInGenerations(dragNode, node)) return false;

                // if drag node's parent is enter node or root node
                if (parentNode === node || dragNode === node) {
                    return false;
                }
                // root position 不能向自己或内部节点push
                if (parentNode === null) {
                    // delete node form tree
                    this.TREE.data.splice(this.data.indexOf(dragNode), 1);
                    if (node.children && node.children.indexOf(dragNode) === -1) {
                        node.children.push(dragNode);
                    } else {
                        this.$set(node, 'children', [dragNode]);
                    }
                    if (this.dragAfterExpanded) {
                        this.$set(node, 'expanded', true);
                    }
                    return false;
                }

                const dragHost = parentNode.children;
                if (node.children && node.children.indexOf(dragNode) === -1) {
                    node.children.push(dragNode);
                    dragHost.splice(dragHost.indexOf(dragNode), 1);
                } else {
                    this.$set(node, 'children', [dragNode]);
                    dragHost.splice(dragHost.indexOf(dragNode), 1);
                }

                if (this.dragAfterExpanded) {
                    this.$set(node, 'expanded', true);
                }
                // debugger
                this.dragNodeEnd({
                    dragNode: dragNode,
                    targetNode: node,
                    event: e
                });
            },
            // dragover node
            dragover(item, e) {
                const {
                    node: dragNode,
                    parent: parentNode
                } = this._getDragNodeInfo();
                // expand when node can drop
                if (
                    parentNode !== item &&
                    dragNode !== item &&
                    !this.hasInGenerations(dragNode, item)
                ) {
                    this.$set(item, 'expanded', true);
                }
                const mode = this._calcInsertMode(e);
                this.TREE.mode = mode;
                // different mode style | target & drag
                this.TREE.dragInfo.targetKey = item.__key__;
                e.preventDefault();
                e.stopPropagation();
            },
            // 计算节点拖放的位置
            _calcInsertMode(e) {
                const RANGE = 1 / 4;
                const { clientY } = event;
                const {
                    top,
                    bottom,
                    height
                } = e.currentTarget.getBoundingClientRect();
                const des = height * RANGE;

                if (clientY <= top + des) {
                    return 'before';
                } else if (clientY >= bottom - des) {
                    return 'after';
                } else {
                    return 'inner';
                }
            },
            // after node drop: emit event to tree
            dragNodeEnd(obj = {}) {
                this.$delete(this.TREE.dragInfo, 'dragKey');
                this.$delete(this.TREE.dragInfo, 'targetKey');
                // reset after drop
                this.TREE.mode = null;
                this.emitEventToTree('drag-node-end', obj);
            }
        }
    };
</script>
