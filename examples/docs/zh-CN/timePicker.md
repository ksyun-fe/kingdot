### 基础用法

:::demo #基础用法 ##选择任意时间点.

```html
<template>
    <div>
        <kd-time-picker v-model='time1'></kd-time-picker>
        time1: {{ time1 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time1: '08:00:00',
            }
        },
    }
</script>
```
:::


### 固定时间点

:::demo #固定时间点 ##按设定的步长提供一类固定的时间点供用户选择. `step` 默认为 30 (单位:min)

```html
<template>
    <div>
        <kd-time-picker v-model='time1' mode="steptime"></kd-time-picker>
        time1: {{ time1 }}
        <kd-time-picker v-model='time2' mode="steptime" step="120"></kd-time-picker>
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

### 设置边界值

:::demo #设置边界值 ## 可以通过 `minTime` `maxTime` 属性设置边界值

```html
<template>
    <div>
        <kd-time-picker v-model="time" mode="steptime" :minTime="minTime" :maxTime="maxTime"></kd-time-picker>
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
### 选择时间范围

:::demo #时间范围 ##将 `range` 设置为 `true`, 表示时间范围

```html
<template>
    <div>
        <kd-time-picker v-model='timeRange1' range></kd-time-picker>
        timeRange1: {{ timeRange1 }}
        <kd-time-picker v-model='timeRange2' range mode="steptime" step="60"></kd-time-picker>
        timeRange2: {{ timeRange2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                step: 60,
                timeRange1: [],
                timeRange2: []
            }
        },
    }
</script>
```
:::

### 设置禁用时间

:::demo #设置禁用时间 ## 通过自定义方法 设置满足条件的时间禁用，传入参数为时间字符串，返回布尔值

```html
<template>
    <div>
        <kd-time-picker v-model="time" mode="steptime" :disabled-time="disabledTime"></kd-time-picker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time: '09:00:00',
            }
        },
        methods: {
            disabledTime(timeStr) {
                if (timeStr.split(':')[0] < 8) {
                    return true;
                }
            }
        }
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
| range | 是否是时间范围  | boolean  |     —     |    false   |
