### 时间轴
垂直展示的时间流信息。

:::demo #基本使用 ##使用Timeline嵌套TimelineItem即可实现基础的时间轴。可选择不同类型颜色，或直接给定颜色，也可自定义节点

```html
<template>
    <div>
        <Button class="demo-main" @click="() => {this.reverse = !this.reverse;}">reverse: {{ reverse }}</Button>
        <kd-timeline :reverse="reverse">
            <kd-timeline-item type="success">发布</kd-timeline-item>
            <kd-timeline-item color="orange">lalalala</kd-timeline-item>
            <kd-timeline-item color="blue">Solve problems</kd-timeline-item>
            <kd-timeline-item type="danger">debugger</kd-timeline-item>
            <kd-timeline-item>
                <div>Find problems 1</div>
                <div>Find problems 2</div>
                <div>Find problems 3</div>
            </kd-timeline-item>
            <kd-timeline-item>测试</kd-timeline-item>
            <kd-timeline-item color="#ccc">
                <i class="kd-icon-message-solid" slot="dot"></i>
                开发
            </kd-timeline-item>
            <kd-timeline-item color="green">
                <i class="kd-icon-success-solid" slot="dot"></i>
                设计
                <div>Find problems 1</div>
                <div>Find problems 2</div>
                <div>Find problems 3</div>
            </kd-timeline-item>
        </kd-timeline>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                reverse: false,
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .demo-main
        margin-bottom 20px
</style>
```
:::

### Timeline属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| reverse     | 指定节点排序方向，默认为正序   | `Boolean`    | `true | false` | `false`
### TimelineItem属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type      | 节点类型   | `String`    | `primary | danger | success` | `primary`|
| color     | 节点颜色   | `String`    | `hsl | hsv | hex | rgb`      |     —    |
### TimelineItem Slot {.component__content}
| 属性       | 说明                 |
|---------- |--------             |
| -         | TimelineItem的内容   |
| dot       | 自定义节点            |
