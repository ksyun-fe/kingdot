## Icon

提供了一套常用的图标集合。

### 基础用法

:::demo #基础用法 ##直接通过设置类名为 `kd-icon-iconName` 来使用即可。例如：

```html
<template>
    <div>
        <i class="kd-icon-message-solid icon-demo"></i>
        <i class="kd-icon-success-solid icon-demo"></i>
    </div>
</template>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .icon-demo
        font-size 20px
        margin-right 10px
    .kd-icon-message-solid
        color rgb(85, 125, 252)
    .kd-icon-success-solid
        color rgb(56, 196, 130)
</style>
```

:::

### Icon集合

:::demo #Icon集合 ##示例：

```html
<template>
    <div class="icon-list">
        <div v-for="name in iconList" :key="name" class="icon-list-block">
            <i :class="'kd-icon-' + name + ' icon-show'"></i>
            <span class="icon-name">{{'kd-icon-' + name}}</span>
        </div>
    </div>
</template>
<script>
import iconList from '../../icon.json'
export default {
    data(){
        return {
            iconList:iconList
        }
    }
}
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .icon-list
        overflow hidden
        border 1px solid #eee
    .icon-list-block
        float left
        width 16.66%
        height 140px
        margin-right -1px
        margin-bottom -1px
        border-right 1px solid #eee
        border-bottom 1px solid #eee
        text-align center
        font-size 13px
        color #666
        .icon-show
            display block
            height 32px
            margin 30px 0
            font-size 32px
            color #3d3d3d
        .icon-name
            display inline-block
            padding 0 3px
</style>
<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .dark
        .icon-name
        .icon-list-block [class ^= kd-icon-]
            color #fff !important
</style>
```

:::
