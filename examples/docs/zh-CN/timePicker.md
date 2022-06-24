### 基础用法

:::demo #基础用法 ##选择任意时间点.`accuracy`属性可以设定时间精度

```html
<template>
    <div>
        <kd-time-picker v-model='time1'></kd-time-picker>
        time1: {{ time1 }}
        <br>
        <br>
        <kd-time-picker v-model='time2' accuracy="minute"></kd-time-picker>
        time2: {{ time2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time1: '',
                time2: '08:00',
            }
        },
    }
</script>
```
:::


### 固定时间点

:::demo #固定时间点 ##按设定的`step`步长提供一类固定的时间点供用户选择. 可接受时间字符串如 `"01:00:00"` 或数值 `60`(min).  `step` 默认为 30 (min). 或者通过 `optional-times` 属性直接列出可选时间列表

```html
<template>
    <div>
        <kd-time-picker v-model='time1' mode="steptime" step="01:00:00"></kd-time-picker>
        time1: {{ time1 }}
        <br>
        <br>
        <kd-time-picker v-model='time2' mode="steptime" :optional-times="times" ></kd-time-picker>
        time2: {{ time2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time1: '08:00:00',
                time2: '10:00',
                times: ['10:00', '15:00', '19:00']
            }
        },
    }
</script>
```
:::

### 多选

:::demo #多选 ## 可以通过 `multiple` 属性设置

```html
<template>
    <div>
        <kd-time-picker 
            v-model="time" 
            mode="steptime"
            multiple
        ></kd-time-picker> 选中值: {{ time }}
        <br>
        <br>
        <kd-time-picker v-model="time1" multiple ></kd-time-picker>
        选中值: {{ time1 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time: [],
                time1: []
            }
        }
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
        <br>
        <br>
        <kd-time-picker v-model="time" :minTime="minTime" :maxTime="maxTime"></kd-time-picker>
        选中值: {{ time }}
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

### 设置时间精度

:::demo #设置时间精度 ## 可以通过 `disabled-column` `accuracy` 属性设置时间精度

```html
<template>
    <div>
        <kd-time-picker v-model="time" accuracy="minute"></kd-time-picker>
        <br>
        <br>
        <kd-time-picker v-model="time" :disabled-column="arr"></kd-time-picker>
        选中值: {{ time }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                minTime: '09:00:00',
                maxTime: '17:00:00',
                time: '09:00:00',
                arr: [false, true, true],
            }
        },
    }
</script>
```
:::
### 设置禁用时间

:::demo #设置禁用时间 ## 可以通过 `disabled-time` 属性设置禁用时间. `disabled-time` 接受数组或函数.

```html
<template>
    <div>
        <kd-time-picker v-model="time" mode="steptime" :disabled-time="disabledTime"></kd-time-picker>
        选中值1: {{ time }}
        <br>
        <br>
        <kd-time-picker v-model="time1" :disabled-time="timeArr"></kd-time-picker>
        选中值2: {{ time1 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                time: '',
                time1: '',
                timeArr: ['01:00:00', '02:00:00', '03:00:00']
            }
        },
        methods: {
            disabledTime(timeStr) {
                let hour = timeStr.split(':')[0];
                if (hour < 6) {
                    return true
                }
            },
        }
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
        <br>
        <br>
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

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|--------- |-------- |---------- |-------------  |-------- |
| value    | 时间字符串   | string, array  |     —     |    -   |
| placeholder    | 占位符   | string |     —     |    选择时间   |
| disabled  | 设置组件的禁用状态   | boolean  |     —     |    false   |
| disabled-column    | 设置内部滚动选择器的禁用状态  | array |  -  |    [false, false, false]   
| accuracy    | 精度   | string |     'minute', 'second'     |    'second'   |
| min-time  | 最小可选时间   | string  |     —     |    -   |
| max-time  | 最大可选时间   | string  |     —     |    -   |
| disabled-time  | 设置禁用的时间   | Array, Function  |     —     |    -   |
| mode  |  模式    | string  |     'anytime', 'steptime'     |    'anytime'   |
| step | 步长  | number, string  |     —     |    -   |
| optional-times | 可选时间列表  | array  |     —     |    -   |
| range | 是否是时间范围  | boolean  |     —     |    false   |
| hideFooter | 隐藏底部确定取消按钮  | boolean  |     —     |    false   |
| multiple | 多选  | boolean  |     —     |    false   |
| clearable | 是否能清空当前值   | Boolean   | true, false | true |
| iconPosition | 图标在input中的位置   | String   | 'prefix', 'suffix' | 'prefix' |

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 在选择完成, 绑定值改变时触发 | (dateArr: Array, source: String)
| clear | 清空选中时间时触发 | -