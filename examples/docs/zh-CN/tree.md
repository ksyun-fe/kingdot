### 树形控件
用清晰的层级结构展示信息，可展开或折叠。

:::demo #基本使用 ##通过data属性指定渲染的数据，该属性的格式详见Node对象属性。

```html
<template>
    <div class="tree-demo-1">
        <div class="demo-props">
            showLine: <kd-switch v-model="showLine" size="small" />
            checkbox: <kd-switch v-model="checkbox" size="small" />
            draggable: <kd-switch v-model="draggable" size="small" />
        </div>
        <div class="demo-props">
            <kd-input v-model="search" placeholder="按显示内容搜索" />
            <kd-button @click="getCheckedData">getCheckedData</kd-button>
            <kd-button @click="getSelectedData">getSelectedData</kd-button>
        </div>
        <kd-tree
            ref="tree1"
            :canDeleteRoot="true"
            :data="treeData1"
            :draggable="draggable"
            :halfcheck="halfcheck"
            :checkbox="checkbox"
            :radio="radio"
            selectAlone
            :showLine="showLine"
            :expandedKeys="expandedKeys"
            :checkedKeys="checkedKeys"
            :chkDisabledKeys="['node-1-1']"
            :nocheckKeys="['node-1-1-2']"
        >
            <span slot-scope="node">
                {{ node.title }} ??
                <kd-button type="mini">test</kd-button>
            </span>
        </kd-tree>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showLine: false,
                checkbox: true,
                draggable: true,
                halfcheck: true,
                radio: true,
                search: "",
                expandedKeys: ['node1'],
                checkedKeys: ['node-1-1-1', 'node-1-1-3'],
                treeData1: [
                    {
                        title: "Node1",
                        // expanded: true,
                        selDisabled: true,
                        id: 'node1',
                        children: [
                            {
                                title: "Node 1-1",
                                id: 'node-1-1',
                                // expanded: true,
                                children: [
                                    {
                                        title: "Node 1-1-1",
                                        id: 'node-1-1-1',
                                    },
                                    {
                                        title: "Node 1-1-2",
                                        id: 'node-1-1-2',
                                    },
                                    {
                                        title: "Node 1-1-3",
                                        id: 'node-1-1-3',
                                    },
                                ],
                            },
                            {
                                title: "Node 1-2",
                                id: 'node-1-2',
                                children: [
                                    {
                                        title: 'Node 1-2-1',
                                        id: 'node-1-2-1',
                                    },
                                    {
                                        title: 'Node 1-2-2',
                                        id: 'node-1-2-2',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        title: "Node 2",
                        id: 'node-2',
                        children: [
                            {
                                title: 'Node 2-1-1',
                                id: 'node-2-1-1',
                            },
                            {
                                title: 'Node 2-1-2',
                                id: 'node-2-1-2',
                            },
                        ],
                    },
                ],
                treeData2: [
                    {
                        title: "node1",
                        expanded: false,
                        async: true,
                    },
                ],
            }
        },
        watch: {
            search() {
                // this.$refs.tree1.searchNodes(this.search);
                this.$refs.tree1.searchNodes(this.searchFn);
            },
        },
        methods: {
            searchFn(node) {
                // return node.id === this.search;
                return node.title.includes(this.search);
            },
            getCheckedData() {
                // console.log('getCheckedData==', this.$refs.tree1.getNodes({
                //     checked: true,
                //     key: 'value'
                // }))
                console.log('getCheckedData==', this.$refs.tree1.getCheckedNodes({
                    isLeaf: true, // leaf only
                }));
            },
            getSelectedData() {
                console.log('getSelectedData==', this.$refs.tree1.getSelectedNodes());
            }
        },
    }
</script>
<style lang="stylus" scoped>
    .tree-demo-1
        .demo-props
            margin-bottom 20px
</style>
```

:::

:::demo #高级用法：自定义、懒加载 ##通过属性async asyncFn进行数据懒加载。

```html
<template>
    <div class="tree-demo-2">
        <div class="demo-props">
            <kd-button @click="addNewNode">添加节点</kd-button>
        </div>
        <kd-tree
            ref="tree2"
            :canDeleteRoot="true"
            :data="treeData2"
            :radio="radio"
            selectAlone
            @node-expand="_nodeExpand"
            :tpl="tpl"
            draggable
            async
            :asyncFn="asyncFn"
        />
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showLine: false,
                checkbox: true,
                draggable: true,
                halfcheck: true,
                radio: true,
                treeData2: [
                    {
                        title: "Node1",
                        expanded: false,
                        async: true,
                    },
                ],
            }
        },
        methods: {
            addNewNode() {
                this.treeData2.push({
                    title: "Node1",
                    expanded: false,
                    async: true,
                });
            },
            async asyncFn(node, resolve) {
                node.loaded = true;
                setTimeout(() => {
                    const data = [
                        { title: "Sync Node1", async: true },
                        { title: "Sync Node2", async: true },
                        { title: "Node3" },
                    ];
                    resolve(data);
                }, 500);
            },
            _nodeExpand(node, expand, position) {
                if (!expand) {
                    // delete node.children;
                }
            },
            _testAsync(node) {
                this.$refs.tree2.asyncLoadNodes(node);
            },
            // tpl (node, ctx, parent, index, props) {
            tpl(...args) {
                let { 0: node, 2: parent, 3: index } = args;
                let titleClass = node.selected
                    ? "node-title node-selected"
                    : "node-title";
                if (node.searched) titleClass += " node-searched";
                return (
                    <span>
                        <span
                            class={titleClass}
                            domPropsInnerHTML={node.title}
                        />
                        <i
                            class="op1 kd-icon-plus"
                            title="add node"
                            onClick={() =>
                                this.$refs.tree2.addNode(node, {
                                    title: "new Node",
                                })
                            }
                        />
                        <i
                            class="op1 kd-icon-circle-plus-outline"
                            title="async add node"
                            onClick={() => this._testAsync(node)}
                        />
                        <i
                            class="op1 kd-icon-delete"
                            title="delete node"
                            onClick={() =>
                                this.$refs.tree2.delNode(node, parent, index)
                            }
                        />
                    </span>
                );
            }
        },
    }
</script>
<style lang="stylus" scoped>
    .tree-demo-2
        .demo-props
            margin-bottom 20px
    .op1
        margin 0 10px
</style>
```

:::

### Tree属性 {.component__content}

| 属性    | 说明                         | 类型      | 可选值         | 默认值  |
| --------- | ---------------------------- | --------- | -------------- | ------- |
| `data` | `要渲染的数据` | `Node Object[]` | `[]` | `[]` |
| `nodeKey` | `指定树节点的唯一标识` | `String` | `--` | `id` |
| `expandedKeys` | `通过nodeKey指定展开的节点` | `String[]` | `[]` | `[]` |
| `checkedKeys` | `通过nodeKey指定勾选的节点` | `String[]` | `[]` | `[]` |
| `checkbox` | `是否展示复选框` | `Boolean` | `true | false` | `false` |
| `nocheckKeys` | `通过nodeKey指定的节点不展示复选框` | `Array` | `[]` | `[]` |
| `chkDisabledKeys` | `通过nodeKey指定的节点禁用复选框` | `Array` | `[]` | `[]` |
| `halfcheck` | `非叶子节点是否展示半选状态（获取勾选的节点可选是否包含非叶子节点）` | `Boolean` | `true | false` | `true` |
| `scoped` | `隔离节点选中状态` | `Boolean` | `true | false` | `false` |
| `radio` | `select是否允许单选` | `Boolean` | `true | false` | `false` |
| `selectAlone` | `select事件是否影响checkbox` | `Boolean` | `true | false` | `false` |
| `canDeleteRoot` | `是否可以删除根节点` | `Boolean` | `true | false` | `false` |
| `allowGetParentNode` | `是否允许节点获取父节点信息` | `Boolean` | `true | false` | `false` |
| `showLine` | `是否展示折叠线` | `Boolean` | `true | false` | `false` |
| `draggable` | `是否可拖拽` | `Boolean` | `true | false` | `false` |
| `dragAfterExpanded` | `dragover是否自动展开targetNode` | `Boolean` | `true | false` | `true` |
| `tpl` | `自定义Node模版` | `JSX` | `--` | `--` |
| `async` | `是否开启懒加载，与asyncFn配合使用` | `Boolean` | `true | false` | `false` |
| `asyncFn` | `加载子树数据的方法，懒加载时候生效` | `Function` | `--` | `--` |

### Tree事件 {.component__content}

| 事件名 | 说明               | 参数    |
| ----  | ------------------| ------- |
| `node-click` | `单击节点触发的事件` | `Function(node: Object)` |
| `node-select` | `选择节点后触发的事件(和node-click一样)；position: 位置信息level：层级` | `Function(node: Object, selected: boolean, position: {level, index})` |
| `node-check` | `点击checkbox触发事件` | `Function(node: Object, checked: boolean, position: {level, index})` |
| `node-mouse-over` | `鼠标滑过节点触发事件` | `Function(node: Object, index: Number, parentNode: node, position: {level, index})` |
| `drag-node-end` | `节点拖拽结束后触发事件` | `Function({dragNode: Object, targetNode: Object})` |
| `del-node` | `删除节点后触发事件` | `Function({ parentNode: Object/null, delNode: Object })` |
| `node-expand` | `节点展开触发事件` | `Function(node: Object, expand: boolean, position: {level, index})` |

### Tree方法 {.component__content}

| 方法名      | 说明    | 参数      | 返回值      |
|---------- |-------- |---------- |---------- |
| `getNodes` | `options: 可以包含一些过滤属性对象如{selected: true,checked: true}，空需传{}; data: node[],默认为传入Tree的data数据;isOriginal:是否保持原始数据,默认为false,会去掉children、hasExpanded、parent等属性;ignoreInvisibleNode:忽略不可见节点,默认false; isLeaf:是否只返回叶子节点,默认false` | `{options: Object, data: Array,isOriginal: Boolean,ignoreInvisibleNode: Boolean, isLeaf: Boolean}` | `Array` |
| `getCheckedNodes` | `返回目前复选框选中的节点组成的数组` | `{isOriginal: '是否保持原始数据',ignoreInvisibleNode: '是否忽略不可见节点', isLeaf: '是否只返回叶子节点'}` | `Array` |
| `getSelectedNodes` | `返回目前被选中的节点所组成的数组` | `{isOriginal: '是否保持原始数据',ignoreInvisibleNode: '是否忽略不可见节点'` | `Array` |
| `searchNodes` | `数据搜索过滤方法` | `{filter:Function/String (如果是函数则返回true时候才会匹配数据),data:Array(默认为Tree数据data可不传)}` | `Array` |
| `nodeSelected` | `选中节点方法` | `Function(node: Object)` | `null` |
| `addNode` | `增加节点` | `{parentNode: Object(不能为空), node: Object}` | `null` |
| `addNodes` | `增加多个节点` | `{parentNode: Object(不能为空), nodes: Array}` | `null` |

### Node对象属性 {.component__content}

| 参数      | 说明    | 类型      | 可选值 | 默认值  |
|---------- |-------- |---------- |---------- |---------- |
| `title`   | `节点名称` | `String` | `N` | `—` |
| `visible`   | `节点是否可见` | `Boolean` | `Y` | `true` |
| `expanded` |  `节点是否展开` | `Boolean` | `Y` | `false` |
| `hasExpanded` | `某一结点是否已经展开过` | `Boolean` | `Y` | `false` |
| `checked` |  `节点复选框是否选中` | `Boolean` | `Y` | `false` |
| `halfcheck` |  `节点是否为半选（下级被选中）` | `Boolean` | `Y` | `false` |
| `nocheck` | `多复选框开启时指定某一节点不渲染复选框` | `Boolean` | `Y` | `false` |
| `chkDisabled` | `禁用某一结点的复选框的功能` | `Boolean` | `Y` | `false` |
| `selected` |  `节点是否被选中` | `Boolean` | `Y` | `false` |
| `selDisabled` | `禁用某一结点的select的功能` | `Boolean` | `Y` | `false` |
| `loaded` | `是否已完成异步加载子节点(配合懒加载使用，为true后不会懒加载)` | `Boolean` | `N` | `false` |
| `loading` | `开启加载效果` | `Boolean` | `Y` | `false` |
| `children` |  `子节点` | `Array[Node Object]` | `Y` | `—` |
| `parent` | `获取父节点：当allowGetParentNode=true时,增加parent方法,若父节点不存在时,会返回null` | `Function` | `-` | `undefined` |
| `__key__ ` | `组件内部标识，可指定Tree属性nodeKey为任一节点的属性（不重复）` | `String` | `N` | `—` |

### Tree scoped slot {.component__content}

| 名称       | 说明           |
|---------- |--------        |
| --   | 自定义树节点的内容，参数slot-scope="node"，优先级低于props tpl   |
