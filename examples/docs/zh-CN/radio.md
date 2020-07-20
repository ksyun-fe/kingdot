## Radio 单选框
单选。

### 基础用法

:::demo #基础用法 `Radio`的基本用法，及禁用状态。通过`v-model`进行数据双向绑定。由于`trueValue`的默认值为`true`，所以可以直接传入`value=true`来指定选中状态。。

```html
<template>
    <div>
        <Radio :true-value="1" v-model="valueFirst" @change="change">radio</Radio>
        <Radio :true-value="2" v-model="valueFirst">radio</Radio>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                valueFirst: 1
            }
        },
        methods:{
            change(v){
                console.log(v)
            }
        },
        watch:{
            valueFirst(v){
                console.log(v)
            }
        }
    }
</script>
```

:::

### 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| disabled     | 是否禁用   | Boolean    |     *     |    false     |
| value     | 单选框的取值，用于v-model进行双向绑定   | *    |    |        |
| trueValue  |   单选框选中后的值   | *  |     —     |       |
| name  |   原生 name 属性   | string / number  |     —     |       |
| label  |   Radio 的 value   | string  |     —     |       |
