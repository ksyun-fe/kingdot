### 基础用法

:::demo #基础用法 ##可以选择任意时间点. 可以通过 `minTime` `maxTime` 属性设置边界值

```html
<template>
    <div>
        <kd-time-picker v-model='time1'></kd-time-picker>
        time1: {{ time1 }}
        <kd-time-picker v-model='time2' :min-time="minTime" :max-time="maxTime"></kd-time-picker>
        time2: {{ time2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time1: '',
                time2: '10:00:00',
                minTime: '09:00:00',
                maxTime: '17:00:00',
            }
        },
    }
</script>
```
:::


### 固定时间点

:::demo #固定时间点 ##通过 `min-time`, `max-time`, `step` 属性设置约束 ,提供一类固定的时间点供用户选择

```html
<template>
    <div>
        <kd-time-picker v-model='time1'></kd-time-picker>
        time1: {{ time1 }}
        <kd-time-picker v-model='time2' mode="steptime"></kd-time-picker>
        time2: {{ time2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time1: '08:00:00',
                time2: '10:00'
            }
        },
    }
</script>
```
:::

### 选择时间范围

:::demo #时间范围 ##将 `is-range` 设置为 `true`, 表示时间范围

```html
<template>
    <div>
        <kd-time-picker v-model='timeRange1' :is-range="true" mode="anytime"></kd-time-picker>
        timeRange1: {{ timeRange1 }}
        <kd-time-picker v-model='timeRange2' :is-range="true" mode="steptime"></kd-time-picker>
        timeRange2: {{ timeRange2 }}
        <kd-time-picker :min-time="minTime" :max-time="maxTime"></kd-time-picker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                minTime: '01:00:00',
                maxTime: '7:00:00',
                step: 15,
                timeRange1: ['01:00:00', '02:00:00'],
                timeRange2: ['08:00', '08:30']
            }
        },
    }
</script>
```
:::


### 设置边界值

:::demo #设置边界值 ## 可以通过 `minTime` `maxTime` 属性设置边界值

```html
<template>
    <div>
        <kd-time-picker mode="steptime" :minTime="minTime" :maxTime="maxTime"></kd-time-picker>
        <kd-time-picker v-model="time" :minTime="minTime" :maxTime="maxTime"></kd-time-picker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                minTime: '09:00:00',
                maxTime: '17:00:00',
                time: '09:00:00'
            }
        },
    }
</script>
```
:::
### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|--------- |-------- |---------- |-------------  |-------- |
| value    | 时间字符串   | string, array  |     —     |    -   |
| placeholder    | 占位符   | string |     —     |    选择时间   |
| disabled  | 设置组件的禁用状态   | boolean  |     —     |    false   |
| disabled-time  | 按条件设置禁用时间   | array, function  |     —     |    -   |
| min-time  | 最小可选时间   | string  |     —     |    -   |
| max-time  | 最大可选时间   | string  |     —     |    -   |
| mode  |  模式,    | string  |     'anytime', 'steptime'     |    'anytime'   |
| step | 步长(min)  | number  |     —     |    30   |
| is-range | 是否是时间范围  | boolean  |     —     |    false   |
