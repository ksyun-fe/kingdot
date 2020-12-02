### Slider 滑块
通过拖动滑块在一个固定区间内进行选择

:::demo #基础用法  ##test

```html
<template>
    <div>
        <kd-slider :min="0" :max="100" :value="[30, 60]" isRange always isShowEnd isShowInput></kd-slider>
        <br />
        <br />
        <br />
        <kd-slider :min="0" :max="100" :value="30" isShowStop disabled :isShowEnd="isShowEnd"></kd-slider>
        <br />
        <br />
        <br />
        <kd-slider :min="0" :max="100" :value="30" isShowStop isShowInput :step="0.5"></kd-slider>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isShowEnd: true
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

### 属性 {.component__content}

|   属性    |   说明    |   类型    |   默认值  |
|---------- |-------- |---------- |-------------  |-------- |
| value/v-model     | 绑定的值   | `Number| Number[]`    |     —    |
| min     | 最小值   | `Number`    |     —    |
| max     | 最大值   | `Number`    |     —    |
| unit     | 单位，用于刻度展示   | `String`    |     —    |
| isShowEnd     | 是否展示最小和最大刻度   | `Boolean`    |     `false`    |
| isShowInput     | 是否展示输入框  | `Boolean`    |     `false`    |
| isShowStop     | 是否展示间隔点  | `Boolean`    |     `false`    |
| step     | 步长  | `Number`    |     `1`    |
| marks     | 标注刻度  | `Object`    |     `undefined`    |
| showTip     | 是否展示tooltip  | `Boolean`    |     `false`    |
| always     | 是否一直展示tooltip  | `Boolean`    |     `false`    |
| isRange     | 是否为范围选择  | `Boolean`    |     `false`    |
| disabled     | 禁用  | `Boolean`    |     `false`    |
