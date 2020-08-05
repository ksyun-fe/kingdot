### 基础用法

:::demo #基础用法 可使用鼠标滚轮 点击目标的方式选中item

```html
<template>
    <div>
        <ScrollSelect :data=dataArr></ScrollSelect>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dataArr: [
                    {
                        "label": "1月",
                        "value": 0
                    },
                    {
                        "label": "2月",
                        "value": 1
                    },
                    {
                        "label": "3月",
                        "value": 2
                    },
                    {
                        "label": "4月",
                        "value": 3
                    },
                    {
                        "label": "5月",
                        "value": 4
                    },
                    {
                        "label": "6月",
                        "value": 5
                    },
                    {
                        "label": "7月",
                        "value": 6
                    },
                    {
                        "label": "8月",
                        "value": 7
                    },
                    {
                        "label": "9月",
                        "value": 8
                    },
                    {
                        "label": "10月",
                        "value": 9
                    },
                    {
                        "label": "11月",
                        "value": 10
                    },
                    {
                        "label": "12月",
                        "value": 11
                    }
                ],
            }
        },
    }
</script>
```
:::

### 禁用状态

:::demo #禁用状态 选择器不可操作

```html
<template>
    <div>
        <ScrollSelect disabled></ScrollSelect>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                strArr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            }
        },
    }
</script>
```
:::

### 部分选项禁用

:::demo #部分选项禁用  通过选项的 disabled 属性 控制选项的禁用状态

```html
<template>
    <div>
        <ScrollSelect :data="dataArr" :itemDisable="disable"></ScrollSelect>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dataArr: [
                    {
                        "label": "1月",
                        "value": 0
                    },
                    {
                        "label": "2月",
                        "value": 1
                    },
                    {
                        "label": "3月",
                        "value": 2
                    },
                    {
                        "label": "4月",
                        "value": 3
                    },
                    {
                        "label": "5月",
                        "value": 4
                    },
                    {
                        "label": "6月",
                        "value": 5
                    },
                    {
                        "label": "7月",
                        "value": 6
                    },
                    {
                        "label": "8月",
                        "value": 7
                    },
                    {
                        "label": "9月",
                        "value": 8
                    },
                    {
                        "label": "10月",
                        "value": 9
                    },
                    {
                        "label": "11月",
                        "value": 10
                    },
                    {
                        "label": "12月",
                        "value": 11
                    }
                ],
            }
        },
        methods: {
            disable(value){
                return !!(value % 2);
            }
        }
    }
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 选中值   | string  |     —     |    -   |
| data     | 选择器的内容   | Array <Object \| String \| Number> [{label, value}], [String \| Number]    |     —     | [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] |
| disabled  | 设置禁用状态   | boolean  |     —     |    false   |
| itemDisable  | 按条件设置禁用选项   | function  |     —     |    -   |
| count  | 选择区域展示的项数, 最好是奇数个   | number  |     —     |    5   |




