### Timeline
Vertical display timeline.

:::demo #Basic Usage ##Use Timeline to nest TimelineItem to realize the basic timeline. You can choose different types of colors, or directly specify the colors, or customize the nodes

```html
<template>
    <div>
        <Button class="demo-main" @click="() => {this.reverse = !this.reverse;}">reverse: {{ reverse }}</Button>
        <kd-timeline :reverse="reverse">
            <kd-timeline-item type="success">publish</kd-timeline-item>
            <kd-timeline-item color="orange">lalalala</kd-timeline-item>
            <kd-timeline-item color="blue">Solve problems</kd-timeline-item>
            <kd-timeline-item type="danger">debugger</kd-timeline-item>
            <kd-timeline-item>
                <div>Find problems 1</div>
                <div>Find problems 2</div>
                <div>Find problems 3</div>
            </kd-timeline-item>
            <kd-timeline-item>testing</kd-timeline-item>
            <kd-timeline-item color="#ccc">
                <i class="kd-icon-message-solid" slot="dot"></i>
                develop
            </kd-timeline-item>
            <kd-timeline-item color="green">
                <i class="kd-icon-success-solid" slot="dot"></i>
                design
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

### Timeline Attributes {.component__content}
| Attribute      | Description    | Type      | Accepted Values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| reverse     | whether the node is ascending or descending, default is ascending   | `Boolean`    | `true | false` | `false`
### TimelineItem Attributes {.component__content}
| Attribute      | Description    | Type      | Accepted Values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| type      | node type   | `String`    | `primary | danger | success` | `primary`|
| color     | node color   | `String`    | `hsl | hsv | hex | rgb`      |     —    |
### TimelineItem Slot {.component__content}
| Attribute       | Description                 |
|---------- |--------                           |
| -         | Custom content for TimelineItem   |
| dot       | Custom defined node               |
