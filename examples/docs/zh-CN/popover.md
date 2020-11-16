### Popover 气泡卡片
点击/鼠标移入元素，弹出气泡式的卡片浮层。

:::demo #自定义  ##支持`title`、`content`属性、slot。`其他更多使用参考Tooltip`

```html
<template>
    <div>
        <kd-popover placement="top-end" title="标题" content="通常用来显示完整信息、注释信息；通常用来显示完整信息、注释信息；">
            <Button class="btn">light</Button>
        </kd-popover>
        <kd-popover placement="top-start" effect="dark" trigger="click">
            <Button type="primary" class="btn">dark</Button>
            <template slot="title">
                <span>标题</span>
            </template>
            <template slot="content">
                <span>通常用来显示完整信息、注释信息；通常用来显示完整信息、注释信息；</span>
            </template>
        </kd-popover>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

#### Popover基于Tooptip增加的属性

### Popover新增属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tittle    | 标题内容 | `String` | `--` | `--` |
| content    | 内容 | `String` | `--` | `--` |

### Popover slot {.component__content}

| 属性       | 说明           |
|---------- |--------        |
| default   | 弹层的参考元素   |
| title     | 标题内容        |
| content   | 弹层内容        |
