## Cascader 级联选择器
当需要逐级查看数据并选择时，可考虑使用级联选择器。


:::demo #基本使用 ##有两种触发子菜单的方式：1. 默认click触发子菜单 2.hover触发子菜单

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                class="trigger-type-demo"
            >
            </kd-cascader>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                expandTrigger="hover"
            >
            </kd-cascader>
        </div>
</template>
<script>
export default{
    data() {
        return{
            defaultValue: [],
            options: [
                {
                    label: 'option 1',
                    value: 1,
                    children: [{
                        label: 'option 4',
                        value: 4,
                        children: []
                    }, {
                        label: 'option 5',
                        value: 5,
                        children: [{
                            label: 'option 6',
                            value: 6
                        }]
                    }, {
                        label: 'option 7',
                        value: 7,
                        children: [{
                            label: 'option 8',
                            value: 8
                        },{
                            label: 'option 9',
                            value: 9
                        }]
                    }]
                }, 
                {
                    label: 'option 2',
                    value: 2
                },
                {
                    label: 'option 3',
                    value: 3
                }
            ]
        }
    },
    mounted() {}
}
</script>
<style>
    .trigger-type-demo {
        margin-right: 20px;
    }
</style>
```

:::

:::demo #禁用选项 ##通过在数据源中设置 disabled 字段来声明该选项是禁用的

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                class="trigger-type-demo"
            >
            </kd-cascader>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                disabled
            >
            </kd-cascader>
        </div>
</template>
<script>
export default{
    data(){
        return{
            defaultValue: [],
            options: [
                {
                    label: 'option 1',
                    value: 1,
                    children: [{
                        label: 'option 4',
                        value: 4,
                        disabled: true,
                        children: []
                    }, {
                        label: 'option 5',
                        value: 5,
                        disabled: true,
                        children: [{
                            label: 'option 6',
                            value: 6
                        }]
                    }, {
                        label: 'option 7',
                        value: 7,
                        children: [{
                            label: 'option 8',
                            value: 8
                        },{
                            label: 'option 9',
                            value: 9
                        }]
                    }]
                }, 
                {
                    label: 'option 2',
                    value: 2,
                    disabled: true
                },
                {
                    label: 'option 3',
                    value: 3
                }
            ]
        }
    },
    mounted() {}
}
</script>
<style>
    .trigger-type-demo {
        margin-right: 20px;
    }
</style>

:::

:::demo #可清空 ##设置clearable属性即可得到一个可清空的级联选择器。

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                clearable
            >
            </kd-cascader>
        </div>
</template>
<script>
export default {
    data() {
        return {
            defaultValue: [],
            options: [
                {
                    label: 'option 1',
                    value: 1,
                    children: [{
                        label: 'option 4',
                        value: 4,
                        children: []
                    }, {
                        label: 'option 5',
                        value: 5,
                        children: [{
                            label: 'option 6',
                            value: 6
                        }]
                    }, {
                        label: 'option 7',
                        value: 7,
                        children: [{
                            label: 'option 8',
                            value: 8
                        },{
                            label: 'option 9',
                            value: 9
                        }]
                    }]
                }, 
                {
                    label: 'option 2',
                    value: 2
                },
                {
                    label: 'option 3',
                    value: 3
                }
            ]
        }
    },
    mounted() {}
}
</script>

:::

:::demo #仅显示最后一级 ##输入框中不显示选中值的完整路径，仅显示最后一级。

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                :showAllLevels="false"
            >
            </kd-cascader>
        </div>
</template>
<script>
export default {
    data() {
        return {
            defaultValue: [],
            options: [
                {
                    label: 'option 1',
                    value: 1,
                    children: [{
                        label: 'option 4',
                        value: 4,
                        children: []
                    }, {
                        label: 'option 5',
                        value: 5,
                        children: [{
                            label: 'option 6',
                            value: 6
                        }]
                    }, {
                        label: 'option 7',
                        value: 7,
                        children: [{
                            label: 'option 8',
                            value: 8
                        },{
                            label: 'option 9',
                            value: 9
                        }]
                    }]
                }, 
                {
                    label: 'option 2',
                    value: 2
                },
                {
                    label: 'option 3',
                    value: 3
                }
            ]
        }
    },
    mounted() {}
}
</script>

:::

:::demo #自定义节点内容 ##可以通过scoped slot对节点进行自定义，node表示当前节点的数据。

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
            >
                <template slot-scope="node">
                    <span>{{ node.label }}</span>
                    <span v-if="node.children"> ({{ node.children.length }}) </span>
                </template>
            </kd-cascader>
        </div>
</template>
<script>
export default {
    data() {
        return {
            defaultValue: [],
            options: [
                {
                    label: 'option 1',
                    value: 1,
                    children: [{
                        label: 'option 4',
                        value: 4
                    }, {
                        label: 'option 5',
                        value: 5,
                        children: [{
                            label: 'option 6',
                            value: 6
                        }]
                    }, {
                        label: 'option 7',
                        value: 7,
                        children: [{
                            label: 'option 8',
                            value: 8
                        },{
                            label: 'option 9',
                            value: 9
                        }]
                    }]
                }, 
                {
                    label: 'option 2',
                    value: 2
                },
                {
                    label: 'option 3',
                    value: 3
                }
            ]
        }
    },
    mounted() {}
}
</script>

:::

:::demo #可搜索 ##可以快捷地搜索选项并选择。

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                :options="options"
                filterable
                clearable
            >
            </kd-cascader>
        </div>
</template>
<script>
export default {
    data() {
        return {
            defaultValue: [],
            options: [
                {
                    label: 'option 1',
                    value: 1,
                    children: [{
                        label: 'option 4',
                        value: 4,
                        children: []
                    }, {
                        label: 'option 5',
                        value: 5,
                        children: [{
                            label: 'option 6',
                            value: 6
                        }]
                    }, {
                        label: 'option 7',
                        value: 7,
                        children: [{
                            label: 'option 8',
                            value: 8
                        },{
                            label: 'option 9',
                            value: 9
                        }]
                    }]
                }, 
                {
                    label: 'option 2',
                    value: 2
                },
                {
                    label: 'option 3',
                    value: 3
                }
            ]
        }
    },
    mounted() {}
}
</script>

:::

:::demo #动态加载 ##动态加载某一级下的选项。

```html
<template>
        <div>
            <kd-cascader
                v-model="defaultValue"
                lazy
                :lazyMethod="lazyMethod"
            >
            </kd-cascader>
        </div>
</template>
<script>
export default {
    data() {
        return {
            defaultValue: [],
            id: 0
        }
    },
    mounted(){},
    methods: {
        lazyMethod(node, resolve) {
            setTimeout(() => {
                const nodes = Array.from({ length: 1 })
                    .map(item => ({
                        value: ++this.id,
                        label: `选项${this.id}`,
                        isLeaf: this.id >= 3
                    }));
                // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                resolve(nodes);
            }, 1000);
        }
    }
}
</script>

```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值       |  array | —         |  []
| options         | 选项列表      | array  |  —       |  —
| width          | 宽度              | number / string           |     —     |    —   
| placeholder | 输入框占位符 | string | - | -
| clearable  | 是否可清空选项 | boolean | - | false
| disabled | 禁用 | boolean | - | false
| filterable | 是否可搜索选项 | boolean | - | false
| filter-method | 自定义搜索方法，第一个参数为节点，第二个参数是搜索值，filterable为true时生效 | function | - | -
| expand-trigger | 菜单展开方式	 | string | click, hover | click
| show-all-levels | 是否显示选项完整路径 | boolean | - | true
| lazy | 是否支持动态加载 | boolean | - | false
| lazy-method | 动态加载方法，第一个参数为当前节点，第二个参数为数据加载完成的回调(必须调用)，lazy为true时生效 | function | - | -

### Slots {.component__content}
| 事件名称      | 说明   
|---------- |-------- 
| - | 自定义节点内容，参数data表示当前数据


### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发	 | 选中值
| blur | 当失去焦点时触发 | (event: Event)
| focus | 当获得焦点时触发 | (event: Event)
