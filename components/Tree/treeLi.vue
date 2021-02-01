<template>
    <li
            v-if="itemVisible"
            :class="liClass"
    >
        <div
                class="kd-tree-node-el"
                :draggable="draggable"
                @dragstart="drag(item, $event)"
                @dragend="dragEnd(item, $event)"
        >
            <!-- expand icon -->
            <span
                    class="kd-tree-switcher"
                    @click="expandNode(item)"
            >
                <i
                        v-if="showExpand"
                        :class="switcherClass"
                />
            </span>
            <!-- checkbox -->
            <Checkbox
                    v-if="checkbox && !item.nocheck"
                    v-model="item.checked"
                    :disabled="item.chkDisabled"
                    :indeterminate="item.halfcheck"
                    class="kd-tree-checkbox"
                    @change="changeNodeCheckStatus(item, $event)"
            />
            <!-- loading -->
            <span
                    v-if="item.loading && item.expanded"
                    class="kd-tree-loading kd-icon-loading"
            ></span>
            <!-- node -->
            <TreeNode
                    :node="item"
                    :parent="parent"
                    :index="index"
                    :tpl="tpl"
                    :node-mouse-over="nodeMouseOver"
                    :level="level"
            />
        </div>
        <KdTransition
                v-if="item.children && item.children.length"
                type="collapse"
        >
            <div v-show="item.expanded">
                <TreeUl
                        :drag-after-expanded="dragAfterExpanded"
                        :draggable="draggable"
                        :tpl="tpl"
                        :data="item.children"
                        :halfcheck="halfcheck"
                        :scoped="scoped"
                        :parent="item"
                        :can-delete-root="canDeleteRoot"
                        :checkbox="checkbox"
                        :level="level"
                        :allow-get-parent-node="allowGetParentNode"
                        :show-line="showLine"
                />
            </div>
        </KdTransition>
    </li>
</template>
<script>
    import TreeNode from './treeNode.vue';
    import KdTransition from '../Transition';
    import Checkbox from '../Checkbox';
    export default {
        name: 'TreeLi',
        components: {
            TreeNode,
            KdTransition,
            Checkbox
        },
        props: {
            item: {
                type: Object,
                default: () => {}
            },
            index: Number,
            parent: {
                type: Object,
                default: () => null
            },
            checkbox: {
                type: Boolean,
                default: false
            },
            draggable: {
                type: Boolean,
                default: false
            },
            dragAfterExpanded: {
                type: Boolean,
                default: true
            },
            halfcheck: {
                type: Boolean,
                default: false
            },
            scoped: {
                type: Boolean,
                default: false
            },
            canDeleteRoot: {
                type: Boolean,
                default: false
            },
            showLine: {
                type: Boolean,
                default: false
            },
            tpl: Function,
            level: Number,
            allowGetParentNode: Boolean
        },
        inject: [
            'isLeaf',
            'childChecked',
            'parentChecked',
            'nodeSelected',
            'emitEventToTree',
            'setAttr',
            'TREE'
        ],
        computed: {
            itemVisible() {
                const { visible = true } = this.item;
                return visible;
            },
            hasExpanded() {
                const { hasExpanded = false, expanded = false } = this.item;
                return this.itemVisible && (expanded || hasExpanded);
            },
            liClass() {
                return {
                    leaf: this.parent && this.isLeaf(this.item)
                };
            },
            switcherClass() {
                return {
                    'kd-tree-switcher-icon': true,
                    'kd-icon-video-play': !this.showLine,
                    'tree-open': !this.showLine && this.item.expanded,
                    'kd-tree-switcher-border': this.showLine,
                    'kd-icon-plus': this.showLine && !this.item.expanded,
                    'kd-icon-minus-solid': this.showLine && this.item.expanded
                };
            },
            hasChildren() {
                const item = this.item;
                return item.children && item.children.length > 0;
            },
            showExpand() {
                const item = this.item;
                return this.hasChildren || item.async;
            },
            position() {
                return { level: this.level, index: this.index };
            }
        },
        watch: {
            'item.checked': {
                immediate: true,
                handler() {
                    if (!this.scoped) {
                        this.checkedChange();
                    }
                }
            },
            'item.halfcheck': {
                immediate: true,
                handler() {
                    this.checkedChange();
                }
            }
        },
        beforeCreate() {
            this.$options.components.TreeUl = require('./treeUl.vue').default;
        },
        methods: {
            // drag node
            drag(node, ev) {
                this.$set(node, 'expanded', false);
                const guid = node.__key__;
                this.$set(this.TREE.dragInfo, 'dragKey', guid);
                this.$set(this.TREE.dragInfo, guid, {
                    node: node,
                    parent: this.parent
                });
                ev.dataTransfer.setData('guid', guid);
            },
            dragEnd(node, ev) {
                this.$delete(this.TREE.dragInfo, 'dragKey');
                this.$delete(this.TREE.dragInfo, 'targetKey');
            },
            // expand or shrink node
            expandNode(node) {
                if (!this.showExpand) return;
                const expended = !node.expanded;
                this.setAttr(node, 'expanded', expended);
                this.setAttr(node, 'hasExpanded', true);
                if (node.async && !node.children) {
                    this.emitEventToTree('async-load-nodes', node);
                }
                this.emitEventToTree('node-expand', node, expended, this.position);
            },
            // node check
            nodeCheck(node, checked) {
                this.$set(node, 'checked', checked);
                if (!this.scoped) {
                    const halfcheck = this.halfcheck;
                    if (halfcheck) {
                        this.$set(node, 'halfcheck', false);
                    }
                    this.childChecked(node, checked, halfcheck);
                }
            },
            // mouse over
            nodeMouseOver(node, index, parent) {
                this.emitEventToTree('node-mouse-over', node, index, parent);
            },
            // change checkbox status
            changeNodeCheckStatus(node, $event) {
                const checked = node.checked;
                this.nodeCheck(node, checked);
                this.emitEventToTree('node-check', node, checked, this.position);
            },
            theParentChecked(checked, halfcheck) {
                const parentNode = this.parent;
                this.parentChecked(parentNode, checked, halfcheck);
            },
            checkedChange() {
                const {
                    checked = false,
                    parentCheckedToChildren = false
                } = this.item;
                if (!this.scoped || !parentCheckedToChildren) {
                    this.theParentChecked(checked, this.halfcheck);
                }
                if (parentCheckedToChildren) {
                    this.$delete(this.item, 'parentCheckedToChildren');
                }
            }
        }
    };
</script>
