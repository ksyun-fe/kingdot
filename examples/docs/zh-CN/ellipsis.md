:::demo #基础用法 ##按钮主要有2种类型：title，move。

```html
<template>
    <div class='row'>
        <div class="demo-ellipsis-wrap">
            <kd-ellipsis>King Dot 使用基本设计要素统一风格，专注于用户体验和交互，建立稳定、灵活的设计，为使用者解决设计问题</kd-ellipsis>
        </div>

        <div class="demo-ellipsis-wrap">
            <kd-ellipsis type="move">King Dot 使用基本设计要素统一风格，专注于用户体验和交互，建立稳定、灵活的设计，为使用者解决设计问题</kd-ellipsis>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{}
        },
        methods:{}
    }
</script>
<style scoped>
.demo-ellipsis-wrap{
    font-size: 14px;
    width: 400px;
    margin-bottom: 40px;
}
</style>
```
:::


### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 类型   | string    | title / move | title