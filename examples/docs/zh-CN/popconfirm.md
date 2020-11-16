### Popconfirm 气泡确认框
点击元素，弹出气泡确认框。

:::demo #自定义  ##支持`title`、`content`属性、slot，支持footer slot。`其他更多使用参考Tooltip`

```html
<template>
    <div>
        <kd-popconfirm placement="top-start" title="标题" content="通常用来显示完整信息、注释信息；通常用来显示完整信息、注释信息；" ref="pop1">
            <Button class="btn">light</Button>
            <template slot="footer">
                <Button @click="__close">close</Button>
            </template>
        </kd-popconfirm>
        <kd-popconfirm placement="top-start" effect="dark" trigger="click" :confirm="__confirm">
            <Button type="primary" class="btn">dark</Button>
            <template slot="title">
                <span>标题</span>
            </template>
            <template slot="content">
                <span>通常用来显示完整信息、注释信息；通常用来显示完整信息、注释信息；</span>
            </template>
        </kd-popconfirm>
    </div>
</template>
<script>
    export default {
        methods: {
            __close() {
                // do sthing
                this.$refs.pop1.close();
            },
            __confirm(pop) {
                // do sthing
                pop.close();
            },
        }
    }
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

#### Popconfirm基于Tooptip增加的属性

### Popconfirm新增属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tittle    | `标题内容` | `String` | `--` | `--` |
| titleLine    | `是否展示标题和内容分割线` | `Boolean` | `true|false` | `true` |
| content    | `内容` | `String` | `--` | `--` |
| confirm    | `确认回调` | `Function` | `--` | `undefined` |
| cancel    | `取消回调` | `Function` | `--` | `undefined` |
| okText    | `确定按钮文案` | `String` | `--` | `确定` |
| cancelText    | `取消按钮文案` | `String` | `--` | `取消` |
| okType    | `确认按钮类型` | `String` | `同Button组件` | `primary` |
| disableOk    | `禁用确认按钮` | `Boolean` | `true|false` | `false` |

### Popconfirm事件 {.component__content}

| 事件名 | 说明               | 参数    |
| ----  | ------------------| ------- |
| `confirm` | `点击确认触发的事件` | `popper` |
| `cancel` | `点击取消触发的事件` | `popper` |

### Popconfirm方法 {.component__content}

| 方法名      | 说明    | 参数      | 返回值      |
|---------- |-------- |---------- |---------- |
| `close` | `关闭弹层` | `--` | `null` |

### Popconfirm slot {.component__content}

| 属性       | 说明           |
|---------- |--------        |
| default   | 弹层的参考元素   |
| title     | 标题内容        |
| content   | 弹层内容        |
| footer    | 底部内容        |
