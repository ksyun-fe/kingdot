## Spin 加载中

加载数据时显示动效。

### 区域加载

:::demo #区域加载 ##在表格等容器中加载数据时显示。

```html
<template>
    <div class="demo-wrapper">
        1<br/>
        2<br/>
        3<br/>
        4<br/>
        5<br/>
        6<br/>
        7<br/>
        8<br/>
        9<br/>
        <kd-spin local></kd-spin>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .demo-wrapper
        position relative
        width 100%
        height 200px
</style>
```

:::

### 自定义

可自定义加载文案、图标和背景色

:::demo #自定义 ##添加 `text` 属性，其值会被渲染为加载文案，并显示在加载图标的下方。类似地，`background` 属性分别用来设定图标类名和背景色值。`spinner` 属性为布尔值 `true` 时，可自定义图标和动画；属性为布尔值 `false` 时，展示组件默认图标和动画；属性为 `String` 类型时，可传入 icon 类名。

```html
<template>
    <div class="demo-wrapper">
        1<br/>
        2<br/>
        3<br/>
        4<br/>
        5<br/>
        6<br/>
        7<br/>
        8<br/>
        9<br/>
        <kd-spin local spinner="kd-icon-refresh" size="small" background="rgba(0,0,0,.6)"></kd-spin>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .demo-wrapper
        position relative
        width 100%
        height 200px
</style>
```

:::

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

### 整页加载

:::demo #用法 ##通过控制属性`overlay`，默认值为`true`，即展示带遮罩层的加载动画。

```html
<template>
    <div>
        <kd-button
        @click="changeHandler">加载中</kd-button>
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
| overlay     | 是否展示带遮罩层的加载动画   | Boolean    |     true / false     |    true     |
| background  |   遮罩背景色   | String  |     -    |    rgba(255, 255, 255, .5)    |
| text  |   显示在加载图标下方的加载文案   | String  |     -    |    -    |
| spinner  |   是否自定义加载图标   | Boolean / String  |     -    |    false    |
| local  |   局部spin，是否展示带遮罩层的加载动画，需要父元素为定位元素   | Boolean  |     -    |    false    |
