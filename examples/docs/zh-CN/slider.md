### Slider 滑块
通过拖动滑块在一个固定区间内进行选择

### 基础用法
:::demo #基础用法  ##用min和max指定取值范围，v-model进行双向数据绑定。展示tooltip、间隔点、刻度、禁用、带输入框等。

```html
<template>
    <div>
        <div class="block">
            <span class="demo-title">默认</span>
            <kd-slider v-model="value1" isShowEnd></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">自定义初始值</span>
            <kd-slider :value="20" isShowEnd></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">自定义mix、max</span>
            <kd-slider :min="min" :max="max" :value="20" isShowEnd></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">隐藏 Tooltip</span>
            <kd-slider v-model="value1" :showTip="false"></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">always Tooltip</span>
            <kd-slider v-model="value1" always></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">禁用</span>
            <kd-slider v-model="value1" disabled></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">分隔点</span>
            <kd-slider v-model="value1" isShowStop></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">范围滑块</span>
            <kd-slider
                v-model="value2"
                isRange
                isShowEnd
                always
            ></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">带输入框</span>
            <kd-slider v-model="value1" isShowEnd isShowInput></kd-slider>
            <br />
            <br />
            <kd-slider
                v-model="value2"
                isRange
                isShowInput
                isShowEnd
                always
            ></kd-slider>
        </div>
        <div class="block">
            <span class="demo-title">标注</span>
            <kd-slider :min="1" :max="12" :value="3" :marks="marks"></kd-slider>
            <br />
            <br />
            <kd-slider isRange :min="1" :max="12" :value="value3" :marks="marks"></kd-slider>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                min: 10,
                max: 200,
                value1: 10,
                value2: [10, 80],
                value3: [1, 4],
                marks: {
                    "1": "1",
                    "2": "2",
                    "3": "3",
                    "4": "4",
                    "5": "5",
                    "6": "6月",
                    "7": "7",
                    "8": "8",
                    "9": "9",
                    "10": "1年",
                    "11": "2年",
                    "12": "3年",
                },
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
    .block
        border-bottom 1px solid #ccc
    .demo-title
        font-size 14px
        color #8492a6
        line-height 44px
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
| marks     | `标注刻度(Object：key表示组件的值，value为该值对应展示的标注文案。)`  | `Object`    |     `undefined`    |
| showTip     | 是否展示tooltip  | `Boolean`    |     `true`    |
| always     | 是否一直展示tooltip  | `Boolean`    |     `false`    |
| isRange     | 是否为范围选择  | `Boolean`    |     `false`    |
| disabled     | 禁用  | `Boolean`    |     `false`    |
