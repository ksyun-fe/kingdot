## kd-offline
网络判断器

### 基础用法

:::demo #基础用法 ##kd-offline使用方法

```html
<template>
    <div>
        <kd-offline/> 
    </div>
</template>
<script>
  
</script>
```
:::



### kd-table属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| offlineTitle     | 断网时显示文案   | string    | — | 网络已断开，请检查网络连接
| onlineTitle     | 重新联网时显示文案   | string    | - | 网络已连接
| duration     | 提示展示多长时间后自动关闭，当传入0时，提示将会一直展示。单位ms   | Number    | — |     5000    |









