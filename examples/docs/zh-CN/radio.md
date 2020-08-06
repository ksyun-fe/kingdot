## Radio 单选框
单选。

### 基础用法

:::demo #基础用法 `Radio`的基本用法，及禁用状态。通过`v-model`进行数据双向绑定。由于`trueValue`的默认值为`true`，所以可以直接传入`value=true`来指定选中状态。

```html
<template>
    <div>
        <Radio :true-value="1" v-model="radioValue" @change="change">radio</Radio>
        <Radio :true-value="2" v-model="radioValue"  @change="change">radio</Radio>
        <Radio :true-value="3" v-model="radioValue" @change="change">radio</Radio>
        <Radio :true-value="4" v-model="radioValue" :disabled="true">radio</Radio>
        <Radio :true-value="3" v-model="radioValueDisabled" :disabled="true">radio</Radio>
        <div class="red">选择的数据是：{{ radioValue }}</div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                radioValue: 1,
                radioValueDisabled: 3
            }
        },
        methods:{
            change(v){
                console.log(v)
            }
        }
    }
</script>
<style>
    .red
        color red
</style>
```

:::

### 垂直排列

:::demo #用法 通过`type`属性设置排列方式，垂直方向为`vertical`。默认值为`horizontal`。

```html
<template>
    <div>
        <Radio
            :true-value="v"
            v-model="radioValue"
            v-for="(v,k) in radioValueList"
            :key="k"
            type="vertical"
        >{{v}}</Radio>

        <div class="red">选择的数据是：{{ radioValue }}</div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                radioValue:'北京',
                radioValueList: ['北京','上海','深圳']
            }
        }
    }
</script>
```

:::

### 多行展示

:::demo #说明 外层元素宽度有限制时，水平方向和垂直方向文字过多时展示效果。

```html
<template>
    <div>
        <div style="width:280px;border-bottom:1px dashed #ccc;padding-bottom:20px">
            <Radio
                :true-value="v"
                v-model="horValue"
                v-for="(v,k) in horValueList"
                :key="k"
            >{{v}}</Radio>
        </div>
        <div style="width:280px;">
            <Radio
                :true-value="v"
                v-model="horValue"
                v-for="(v,k) in horValueList"
                :key="k"
                type="vertical"
            >{{v}}</Radio>
        </div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                horValue:'北京',
                horValueList: ['外层元素宽度有限制时，文字过多时的展示效果','北京','上海']
            }
        }
    }
</script>
```

:::

### 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| value     | 单选框的取值，用于v-model进行双向绑定   | Boolean / String / Number    |  —  |    —    |
| trueValue  |   单选框选中后的值   | Boolean / String / Number  |     —     |   —    |
| disabled     | 是否禁用   | Boolean    |     true / false     |    false     |
| type  |   定义radio的排列方式：垂直、水平   | String  |     "vertical" / "horizontal"    |    "horizontal"    |

### 事件 {.component__content}

| 时间名称      | 说明    | 回调参数      |
|:---------- |:-------- |:---------- |
| change     | 绑定值变化时触发的事件   | 选中的 Radio 值   |
