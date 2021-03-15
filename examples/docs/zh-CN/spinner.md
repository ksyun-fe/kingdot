## spinner 计数器
通过鼠标或者键盘，定义范围内的数值。

:::demo #基础使用 ##计数器的基本使用

```html
<template>
    <kd-spinner v-model="value" :min="0" :max="10" @change="change"></kd-spinner>
</template>
<script>
export default{
    data(){
        return{
            value: 0
        }
    },
    methods:{
        change(v,oldv){
            console.log(v, oldv)
        }
    }
}
</script>
```

:::

:::demo #禁用 ##禁用状态的计数器

```html
<template>
    <kd-spinner v-model="value" :min="0" :max="10" disabled></kd-spinner>

</template>
<script>
export default{
    data(){
        return{
            value: 1
        }
    },
}
</script>
```

:::

:::demo #小数点计数器 ##precision是设置小数点几位。必须是个非负数。带有小数点的计数器

```html
<template>
    <kd-spinner v-model="value" :min="-10" :max="10" :step="5.4" :precision="2"></kd-spinner>

</template>
<script>
export default{
    data(){
        return{
            value: 1
        }
    },
}
</script>
```

:::

:::demo #步数 ## 带有步数的计数器。使用step，每次加减对应的数值。

```html
<template>
    <kd-spinner v-model="value" :min="0" :max="10" :step="0.2"></kd-spinner>
</template>
<script>
export default{
    data(){
        return{
            value: 0.1
        }
    },
}
</script>
```

:::

:::demo #按钮位置 ##不同的按钮位置展示。使用button-position属性设置。

```html
<template>
    <div class="row">
        <kd-spinner v-model="value" :min="0" :max="10" :step="2"></kd-spinner>
        <kd-spinner v-model="value" button-position="right" :min="0" :max="10" :step="2"></kd-spinner>
    </div>
</template>
<script>
export default{
    data(){
        return{
            value: 1
        }
    },
}
</script>
```

:::

:::demo #大小 ##不同大小的按钮展示。

```html
<template>
    <div>
        <div class="row">
            <kd-spinner v-model="value" button-position="right" size="large"></kd-spinner>
            <kd-spinner v-model="value" button-position="right" ></kd-spinner>
            <kd-spinner v-model="value" button-position="right" size="small"></kd-spinner>
            <kd-spinner v-model="value" button-position="right" size="mini"></kd-spinner>
        </div>
        <div class="row comp-top">
            <kd-spinner v-model="value" size="large"></kd-spinner>
            <kd-spinner v-model="value" ></kd-spinner>
            <kd-spinner v-model="value" size="small"></kd-spinner>
            <kd-spinner v-model="value" size="mini"></kd-spinner>
        </div>
        
    </div>
</template>
<script>
export default{
    data(){
        return{
            value: 1
        }
    },
}
</script>
<style>
.row .kd-spinner{
    margin-left: 10px;
}
</style>
```

:::

:::demo #精准步数 ##在输入数字的时候，严格按照步数。

```html
<template>
    <kd-spinner ref="spinner" v-model="value" input-step :min="0" :max="10" :step="0.2" :precision="2" @change="change"></kd-spinner>
</template>
<script>
export default{
    data(){
        return{
            value: 1
        }
    },
    methods:{
        change(v,oldv){
            console.log(v,oldv)
            if(v < 5 ){
                if(v > oldv){
                    this.value = 5
                }else{
                    this.value = 0
                }
            }
        }
    }
}
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value/v-model | 更新值 | number  | — | — |
| min | 最小值 | number  | — | — |
| max | 最大值 | number  | — | — |
| step | 步数 | number  | — | — |
| precision | 小数点个数 | number  | — | — |
| buttonPosition | 按钮位置 | string  | — | — |
| disabled | 禁用 | boolean  | — | false |
| placeholder | 提示文字 | string  | — | — |
| size | 大小 | string  | — | large / small / mini |
| inputStep | 精准严格步数 | boolean | — | false |

### 事件 {.component__content}
| 属性      | 说明    | 回调参数 |
|---------- |-------- |-------- |
| change | 值改变时触发 | currentValue,oldValue
| focus | input获取焦点时触发 | event
| blur | input失去焦点时触发 | event

### 方法 {.component__content}
| 属性      | 说明    | 参数 |
|---------- |-------- |-------- |
| focus | input获得焦点 | —
| select | input内的文字全选 | —