### Breadcrumb面包屑
 用途： 显示当前页面的路径，快速返回之前的任意页面。
### 基础用法
:::demo #基础用法 ##在Breadcrumb中使用Breadcrumb-item标签表示从首页开始的每一级。

```html
<template>
    <div>
         <kd-breadcrumb separator="/">
            <kd-breadcrumb-item>一级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item>二级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
        </kd-breadcrumb>
    </div>
</template>
```
:::
### 可以返回任意父级
:::demo #基础用法 ##给每个父级Breadcrumb-item标签增to或href属性。

```html
<template>
    <div>
         <kd-breadcrumb>
            <kd-breadcrumb-item to="/">一级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item href="/">二级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
        </kd-breadcrumb>
    </div>
</template>
```
:::
### 自定义分隔符
:::demo #基础用法 ##可以通过separator属性改变分隔符，也可以通过separatorClass传入想代替分隔符的图标的类名。

```html
<template>
    <div>
        <div>
         <kd-breadcrumb separator="/">
            <kd-breadcrumb-item to="/">一级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item href="/">二级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
        </kd-breadcrumb>
        </div>
        <div style="margin-top:20px">
         <kd-breadcrumb separatorClass="kd-icon-video-play">
            <kd-breadcrumb-item to="/" href="#/zh-CN/component/button">一级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item href="/">二级菜单</kd-breadcrumb-item>
            <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
        </kd-breadcrumb>
        </div>
    </div>
</template>
```
:::

### Breadcrumb 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| separator | 分隔符   | String    |      -        |   -     |
|separatorClass | 图标分隔符 class  |  String | -     | - |


### Breadcrumb-item 属性 {.component_content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
|  to       |路由跳转对象，同 vue-router 的 to| String/Function/Object | - | - |
| href     |  跳转链接  ，同a标签的href,优先级大于to  | String | - |- |
| replace | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录 | Boolean | - |false