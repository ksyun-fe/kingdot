## Spin 加载中
加载中。

### 基础用法

:::demo #基础用法 使用`size` 属性可以指定组件尺寸：`large`、`default`、`small`、`mini`。

```html
<template>
    <div>
        <Spin v-for="(value,key) in size" :size="value" :text="text" :key="key"/>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                size:["large" , "default" , "small" , "mini"],
                text: ""
            }
        }
    }
</script>
```
:::
### 展示遮罩层

:::demo #添加`overlay`属性，即可展示带遮罩层的加载动画，此时包含`Spin`的容器必须是定位元素，动画元素默认会居中展示，所以`center`属性在该情况下无效。

```html

```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| size     | 组件尺寸   | string    | "large" / "default" / "small" / "mini"         |    default     |
| center     | 是否居中展示，需要父元素为定位元素   | Boolean    |    |     false   |
| overlay  | 是否展示带遮罩层的加载动画   | Boolean  |     —     |    false   |
| background  | 遮罩背景色   | string  |         |    rgba(255, 255, 255, .5)   |
| text  | 显示在加载图标下方的加载文案   | string  |     —     |    加载中   |
| spinner  | 是否自定义加载图标   | Boolean  |     —     |    false   |
| local  | 局部spin，是否展示带遮罩层的加载动画，需要父元素为定位元素   | Boolean  |     —     |    false   |
