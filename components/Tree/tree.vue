<template>
    <TreeUl v-bind="childBind"/>
</template>

<script>
    import TreeUl from './treeUl.vue';
    export default {
        name: 'KdTree',
        components: {
            TreeUl
        },
        inheritAttrs: false,
        provide() {
            return {
                isLeaf: this.isLeaf, // 是否为叶子节点
                childChecked: this.childCheckedHandle,
                parentChecked: this.parentCheckedHandle,
                emitEventToTree: this.emitEventToParent,
                nodeSelected: this.nodeSelected,
                setAttr: this.setAttr,
                TREE: this
            };
        },
        props: {
            data: {
                type: Array,
                default: () => []
            },
            // 唯一key
            nodeKey: {
                type: String,
                default: 'id'
            },
            expandedKeys: {
                type: Array,
                default: () => []
            },
            checkedKeys: {
                type: Array,
                default: () => []
            },
            checkbox: {
                type: Boolean,
                default: false
            },
            halfcheck: {
                type: Boolean,
                default: true
            },
            // todo: 可增加selectedKeys
            radio: {
                // 单选, selected节点至多可以选一个
                type: Boolean,
                default: false
            },
            selectAlone: {
                // select事件不影响checkbox
                type: Boolean,
                default: false
            },
            canDeleteRoot: {
                type: Boolean,
                default: false
            },
            allowGetParentNode: {
                // 允许获取父节点
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                test: true,
                radioNode: null,
                mode: null,
                dragInfo: {}
            };
        },
        computed: {
            childBind() {
                return Object.assign({}, this.$attrs, this.$props);
            }
        },
        beforeCreate() {
            window.__tree = this;
            // default false
            this.$defVal = {
                visible: true
            };
        },
        methods: {
            // leaf node or not
            isLeaf(node) {
                return !(node.children && node.children.length);
            },
            childCheckedHandle(node, checked, halfcheck = false) {
                const { children } = node;
                if (children && children.length) {
                    children.forEach((child) => {
                        if (!child.chkDisabled) {
                            this.$set(child, 'checked', checked);
                            if (halfcheck) {
                                this.$set(child, 'halfcheck', false);
                            }
                            this.$set(child, 'parentCheckedToChildren', true);
                        }
                    });
                }
            },
            parentCheckedHandle(parentNode, checked, halfcheck = false) {
                if (!parentNode || parentNode.chkDisabled) return false;
                let someBrotherNodeChecked = checked;
                let allBrotherNodeChecked = checked;
                const childNodes = parentNode.children;
                if (checked) {
                    allBrotherNodeChecked = childNodes.every(
                        (child) => child.checked
                    );
                } else {
                    someBrotherNodeChecked = childNodes.some(
                        ({ checked, halfcheck: itemHalfCheck }) => {
                            return checked || (halfcheck && itemHalfCheck);
                        }
                    );
                }
                if (halfcheck) {
                    // all | some | none
                    const nodeHalfCheck = checked
                        ? !allBrotherNodeChecked
                        : someBrotherNodeChecked;
                    const { halfcheck: oldHalfCheck = false } = parentNode;
                    if (oldHalfCheck !== nodeHalfCheck) {
                        this.$set(parentNode, 'halfcheck', nodeHalfCheck);
                    } else if (nodeHalfCheck) {
                        return false;
                    }
                    this.$set(parentNode, 'checked', allBrotherNodeChecked);
                } else {
                    this.$set(parentNode, 'checked', allBrotherNodeChecked);
                }
                return true;
            },
            emitEventToParent(eventName, ...args) {
                if (!eventName) return;
                if (eventName !== 'node-mouse-over') {
                    switch (eventName) {
                        case 'node-click':
                        case 'node-select':
                        case 'node-check':
                        case 'node-mouse-over':
                        case 'async-load-nodes':
                        case 'drag-node-end':
                        case 'del-node':
                        case 'node-expand':
                            this.$emit(eventName, ...args);
                            break;
                        default:
                            throw new ReferenceError(
                                `the event of ${eventName} is not effective`
                            );
                    }
                }
            },
            // set node attr
            setAttr(node, attr, val = true) {
                const { [attr]: defVal = this._getDefVal(attr) } = node;
                if (defVal !== val) {
                    this.$set(node, attr, val);
                }
            },
            setAttrs(node, attrs = [], val = true) {
                const setAttr = this.setAttr;
                attrs.forEach((attr) => setAttr(node, attr, val));
            },
            setNodeAttr(node, attr, val = true) {
                if (!node || !attr) return;
                if (Object.prototype.hasOwnProperty.call(node, attr)) {
                    this.setAttr(node, attr, val);
                } else {
                    this.$set(node, attr, val);
                }
            },
            updateRadioNode(node, selected = false) {
                if (!selected) return;
                const previousNode = this.radioNode;
                if (previousNode) {
                    this.setNodeAttr(previousNode, 'selected', !selected);
                }
                this.radioNode = node;
            },
            // change node selected
            nodeSelected(node, position) {
                const selected = !node.selected;
                const changeCheck = this.checkbox && !this.selectAlone;
                if (changeCheck) {
                    this.$set(node, 'checked', selected);
                    this.childCheckedHandle(node, selected, this.halfcheck);
                }
                if (this.radio) {
                    this.updateRadioNode(node, selected);
                }
                this.$set(node, 'selected', selected);
                this.emitEventToParent('node-click', node, selected, position);
                this.emitEventToParent('node-select', node, selected, position);
            },
            // node: add, delete
            addNode(parent, newNode) {
                if (!parent) return;
                let addnode = null;
                this.$set(parent, 'expanded', true);
                const newNodeType = typeof newNode;
                if (newNodeType === 'newNode') {
                    throw new ReferenceError('newNode is required but undefined');
                } else if (newNodeType === 'string') {
                    addnode = { title: newNode };
                } else if (newNodeType === 'object') {
                    if (!Object.prototype.hasOwnProperty.call(newNode, 'title')) {
                        throw new ReferenceError('the title property is missed');
                    } else {
                        addnode = newNode;
                    }
                } else {
                    throw new ReferenceError(
                        `newNode type error, not allowed ${newNodeType}`
                    );
                }
                const { halfcheck, checked } = parent;
                addnode = Object.assign(
                    {
                        checked: !halfcheck && checked
                    },
                    addnode
                );
                if (this.isLeaf(parent)) {
                    this.$set(parent, 'children', []);
                    parent.children.push(addnode);
                } else {
                    parent.children.push(addnode);
                }
            },
            addNodes(parent, children) {
                if (!parent) return;
                for (const n of children) {
                    this.addNode(parent, n);
                }
            },
            delNode(node, parent, index) {
                if (parent === null || typeof parent === undefined) {
                    if (this.canDeleteRoot) {
                        this.data.splice(index, 1);
                    } else {
                        throw new ReferenceError("the root element can't deleted!");
                    }
                } else {
                    parent.children.splice(index, 1);
                }
                this.emitEventToParent('del-node', {
                    parentNode: parent,
                    delNode: node
                });
            },
            // get node by options
            getNodes(
                opt = {},
                data,
                isOriginal,
                ignoreInvisibleNode = false,
                isLeaf = false
            ) {
                const optArr = Object.entries(opt);
                const hasOpt = optArr.length > 0;
                return this._getNodes(
                    optArr,
                    hasOpt,
                    data,
                    isOriginal,
                    ignoreInvisibleNode,
                    isLeaf
                );
            },
            // opt: Array
            _getNodes(
                opt,
                hasOpt,
                data = this.data,
                isOriginal = false,
                ignoreInvisibleNode,
                isLeaf = false,
                res = []
            ) {
                const _pushNode = (arr, node, isOrg, isLeaf) => {
                    if (isLeaf && !this.isLeaf(node)) return;
                    if (isOrg) {
                        arr.push(node);
                    } else {
                        const n = Object.assign({}, node);
                        Reflect.deleteProperty(n, 'hasExpanded');
                        Reflect.deleteProperty(n, 'children');
                        Reflect.deleteProperty(n, 'parent');
                        // Reflect.deleteProperty(n, "__key__");
                        arr.push(n);
                    }
                };
                const pushNode = (node) => _pushNode(res, node, isOriginal, isLeaf);
                // is a node matched the condition
                const _isMatchedNode = (node, condition) => {
                    let matched = true;
                    for (const [attr, val] of condition) {
                        if (Object.prototype.hasOwnProperty.call(node, attr)) {
                            const {
                                [attr]: nodeVal = this._getDefVal(attr)
                            } = node;
                            matched = nodeVal === val;
                        } else {
                            matched = false;
                        }
                        if (!matched) break;
                    }
                    return matched;
                };
                const isMatchedNode = (node) => _isMatchedNode(node, opt);
                for (const node of data) {
                    const { children, visible = true } = node;
                    if (ignoreInvisibleNode && !visible) {
                        continue;
                    }
                    if (hasOpt) {
                        if (isMatchedNode(node)) {
                            pushNode(node);
                        }
                    } else {
                        pushNode(node);
                    }
                    if (children && children.length) {
                        this._getNodes(
                            opt,
                            hasOpt,
                            children,
                            isOriginal,
                            ignoreInvisibleNode,
                            isLeaf,
                            res
                        );
                    }
                }
                return res;
            },
            // get selected node | condition
            getSelectedNodes(option = {}) {
                const { isOriginal = false, ignoreInvisibleNode = false } = option;
                return this.getNodes(
                    { selected: true },
                    this.data,
                    isOriginal,
                    ignoreInvisibleNode
                );
            },
            // get checked node | condition
            getCheckedNodes(option = {}) {
                const {
                    isOriginal = false,
                    ignoreInvisibleNode = false,
                    isLeaf = false
                } = option;
                return this.getNodes(
                    { checked: true },
                    this.data,
                    isOriginal,
                    ignoreInvisibleNode,
                    isLeaf
                );
            },
            // search nodes
            searchNodes(filter, data = this.data) {
                if (
                    filter == null ||
                    (typeof filter === 'string' && filter.trim() === '')
                ) {
                    data.forEach((node) => this._modifyAllNode(node));
                    return;
                }
                const filterFn =
                    typeof filter === 'function'
                        ? filter
                        : ({ title = '' } = {}) => title.includes(filter);
                const searchRes = Array.from({ length: data.length }, () => []);
                data.forEach((node, index) => {
                    const matched = searchRes[index];
                    this._searchNodes(filterFn, node, index, matched);
                    if (matched.length > 0) {
                        matched.sort((x, y) => x.length - y.length); // 根据长度升序
                        const attrs = ['visible', 'expanded'];
                        if (matched.some((x) => x.length === 1)) {
                            attrs.push('searched');
                        }
                        this.setAttrs(node, attrs);
                        this._showSearchNodes(
                            node,
                            matched.map((x) => x.slice(1)).filter((x) => x.length)
                        );
                    } else {
                        this.setAttr(node, 'visible', false);
                    }
                });
            },
            _searchNodes(filterFn, node, index, matched, path = []) {
                const isMatched = filterFn(node);
                path = [...path, index];
                if (isMatched) {
                    matched.push(path);
                }
                const { children } = node;
                if (children && children.length) {
                    for (const [i, node] of children.entries()) {
                        this._searchNodes(filterFn, node, i, matched, path);
                    }
                }
            },
            _showSearchNodes(node, matched) {
                matched = matched.map((path) => [...path]);
                const setAttrs = this.setAttrs;
                const dedupe = (arr) => Array.from(new Set(arr));
                let isSame = true;
                while (isSame && matched.length > 0) {
                    const { children } = node;
                    // 将长度为1的匹配路径设置为'searched'
                    const newMatched = [];
                    const searchedPaths = matched.filter((x) => {
                        const len = x.length;
                        if (len > 1) {
                            newMatched.push(x);
                        }
                        return len === 1;
                    });
                    searchedPaths.forEach((path) => {
                        setAttrs(children[path[0]], [
                            'visible',
                            'expanded',
                            'searched'
                        ]);
                    });
                    const samePaths = dedupe(matched.map((item) => item[0]));
                    const len = samePaths.length;
                    if (len !== children.length) {
                        children.forEach((childNode, i) => {
                            if (!samePaths.includes(i)) {
                                this.setAttr(childNode, 'visible', false);
                            }
                        });
                    }
                    if (newMatched.length > 0) {
                        if (len === 1) {
                            matched = newMatched.map((x) => x.slice(1));
                            node = children[samePaths[0]];
                            setAttrs(node, ['visible', 'expanded']);
                        } else {
                            samePaths.forEach(
                                // eslint-disable-next-line no-loop-func
                                (pathIndex) => {
                                    const childNode = children[pathIndex];
                                    setAttrs(childNode, ['visible', 'expanded']);
                                    this._showSearchNodes(
                                        childNode,
                                        matched.filter((x) => x[0] === pathIndex && x.length > 1).map((x) => x.slice(1))
                                    );
                                }
                            );
                            isSame = false;
                        }
                    } else {
                        isSame = false;
                    }
                }
            },
            _modifyAllNode(node, attrsObj = { visible: true, searched: false }) {
                for (const [key, val] of Object.entries(attrsObj)) {
                    this.setAttr(node, key, val);
                }
                const { children } = node;
                if (children && children.length > 0) {
                    children.forEach((node) => this._modifyAllNode(node, attrsObj));
                }
            },
            _getDefVal(attr) {
                return this.$defVal[attr] || false;
            }
        }
    };
</script>
