### 基础用法

:::demo #基础用法 ##选择任意时间点

```html
<template>
    <div>
        <kd-time-picker v-model='time1' mode="steped-time"></kd-time-picker>
        time1: {{ time1 }}
        <kd-time-picker v-model='time2'></kd-time-picker>
        time2: {{ time2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time1: '08:00',
                time2: '10:00:00'
            }
        },
    }
</script>
```
:::

### 选择时间范围

:::demo #时间范围 ##将 `isRange` 设置为 `true`, 表示时间范围

```html
<template>
    <div>
        <kd-time-picker :isRange="true" mode="anytime"></kd-time-picker>
        timeRange1: {{ timeRange1 }}
        <kd-time-picker :isRange="true" mode="steped-time"></kd-time-picker>
        <kd-time-picker :minTime="minTime" :maxTime="maxTime"></kd-time-picker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                minTime: '01:00:00',
                maxTime: '7:00:00',
                step: 15,
                timeRange1: ['01:00:00', '02:00:00']
            }
        },
    }
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|--------- |-------- |---------- |-------------  |-------- |
| value    | 时间字符串   | string  |     —     |    -   |
| disabled  | 设置组件的禁用状态   | boolean  |     —     |    false   |
| disabledTime  | 按条件设置禁用时间   | function  |     —     |    -   |