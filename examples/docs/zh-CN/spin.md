## Spin 加载中
加载中。

### 基础用法

:::demo #基础用法 ##通过`size`属性可以指定组件尺寸: `large、 default、 small、 mini`。

```html
<template>
    <div>
        <kd-spin
            class="spin-margin-right"
            v-for="item in sizes"
            :key="item"
            :size="item"
            :overlay="false"
        ></kd-spin>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                sizes:['large','default','small','mini']
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .spin-margin-right
        margin-right 10px
</style>
```

:::

### 展示遮罩层

:::demo #用法 ##通过控制属性`overlay`，默认值为`true`，即展示带遮罩层的加载动画。

```html
<template>
    <div>
        <Button
        @click="changeHandler">加载中</Button>
        <kd-spin v-if="change" text="加载中"/>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                change: false
            }
        },
        methods:{
            changeHandler(){
                this.change = true;
                setTimeout(() => {
                    this.change = false;
                }, 3000)
            },
        }
    }
</script>
```

:::

### 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| size     | 组件尺寸   | String    |  large / default / small  |    default    |
| center  |   是否居中展示，需要父元素为定位元素   | Boolean  |     true / false     |   false    |
| overlay     | 是否展示带遮罩层的加载动画   | Boolean    |     true / false     |    true     |
| background  |   遮罩背景色   | String  |     -    |    rgba(255, 255, 255, .5)    |
| text  |   显示在加载图标下方的加载文案   | String  |     -    |    -    |
| spinner  |   是否自定义加载图标   | Boolean  |     -    |    false    |
| local  |   局部spin，是否展示带遮罩层的加载动画，需要父元素为定位元素   | Boolean  |     -    |    false    |
