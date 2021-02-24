### 基础用法

:::demo #基础用法 ##可使用鼠标滚轮 点击目标的方式选中item

```html
<template>
    <div>
        <ScrollSelect :data="dataArr" v-model="selectedVal"></ScrollSelect>
        <div>
            选中值: {{selectedVal}}
        </div>
    </div>
    
    
</template>
<script>
    export default {
        data() {
            return {
                selectedVal: '1月',
                dataArr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月'],
            }
        },
    }
</script>
```
:::

### 禁用组件

:::demo #禁用 ##选择器不可操作

```html
<template>
    <div>
        <ScrollSelect disabled v-model=selectedVal></ScrollSelect>
        选中值: {{selectedVal}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selectedVal: '',
                strArr: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            }
        },
    }
</script>
```
:::

### 部分选项禁用

:::demo #部分选项禁用  ##通过给 itemDisable 属性 传入一个方法, 控制选项的禁用状态

```html
<template>
    <div>
        <ScrollSelect :itemDisable="disable" v-model=selectedVal></ScrollSelect>
        选中值: {{selectedVal}}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selectedVal: '',
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
|--------- |-------- |---------- |-------------  |-------- |
| value    | 选中选项   | string  |     —     |    -   |
| data     | 选择器的内容   | Array <Object \| String \| Number> [{label, value}], [String \| Number]    |     —     | [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] |
| disabled  | 设置禁用状态   | boolean  |     —     |    false   |
| itemDisable  | 按条件设置禁用选项   | function  |     —     |    -   |
<!-- | count  | 选择区域展示的项数, 最好是奇数个   | number  |     —     |    5   | -->




