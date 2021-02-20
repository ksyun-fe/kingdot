## DatePicker 日期选择器
用于选择或输入日期

### 基础用法
:::demo #基础用法 ## 以「日」为基本单位，基础的日期选择控件

```html
<template>
    <kd-date-picker> </kd-date-picker>
</template>
```
:::

### 自定义输出格式
:::demo #自定义输出格式 ## 可以通过配置格式字符串来指定绑定值输出格式

```html
<template>
    <kd-date-picker format-string="MM/DD/YYYY"> </kd-date-picker>
</template>

```
:::

### 快捷选项
:::demo #快捷选项 ## 快捷选项需配置shortcuts属性

```html
<template>
    <kd-date-picker :shortcuts="data"> </kd-date-picker>
</template>
<script >
    export default {
        data() {
            return {
                data: [{
                    label: '今天',
                    value: 0,
                    unit: 'day'
                }, {
                    label: '昨天',
                    value: -1,
                    unit: 'day'
                }, {
                    label: '明天',
                    value: 1,
                    unit: 'day'
                },{
                    label: '一周前',
                    value: -1,
                    unit: 'week'
                }, {
                    label: '一个月前',
                    value: -1,
                    unit: 'month'
                }, {
                    label: '三个月前',
                    value: -3,
                    unit: 'month'
                }]
            }
        }
    }
</script>
```
:::

### 禁用组件
:::demo #禁用组件 ## 以「日」为基本单位，基础的日期选择控件

```html
<template>
    <kd-date-picker :disabled="true"> </kd-date-picker>
</template>

```
:::

### 禁用日期
:::demo #禁用日期 ## 通过自定义方法设置禁用状态，参数为当前日期，返回布尔值
```html
<template>
    <kd-date-picker :disabled-date="disabledDate"> </kd-date-picker>
</template>
<script>
    import Day from 'dayjs';
    export default{
        methods: {
            disabledDate(dateStr) {
                const timeObj = Day(dateStr);
                if (timeObj.day() === 0 || timeObj.day() === 6) {
                    return true
                }
            }
        }
    }
</script>
```
:::

### 日期范围
:::demo #日期范围 ## 选择日期范围

```html
<template>
    <kd-date-picker :is-range="true"> </kd-date-picker>
</template>
<script>
    import Moment from 'dayjs';
    export default{
    }
</script>
```
:::

### 带快捷选项的日期范围
:::demo #带快捷选项的日期范围 ## 选择日期范围

```html
<template>
    <kd-date-picker :is-range="true" :shortcuts="data"> </kd-date-picker>
</template>
<script>
    import Moment from 'dayjs';
    export default{
        data() {
            return {
                data: [{
                    label: '最近3天',
                    value: -3,
                    unit: 'day'
                }, {
                    label: '最近一周',
                    value: -1,
                    unit: 'week'
                }, {
                    label: '近一个月',
                    value: -1,
                    unit: 'month'
                }, {
                    label: '三个月前',
                    value: -3,
                    unit: 'month'
                },{
                    label: '未来一周',
                    value: 1,
                    unit: 'week'
                }, {
                    label: '未来一个月',
                    value: 1,
                    unit: 'month'
                }, {
                    label: '未来三个月',
                    value: 3,
                    unit: 'month'
                }]
            }
        }
    }
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model  | 绑定值   | array    | - | - |
| formatString  | 日期格式字符串   | string    | - | 'YYYY-MM-DD' |
| isRange  | 是否为范围选择   | bool    | - | false |
| placeholder  | 非范围选择时的占位内容   | string    | - | '请选择日期' |
| range-placeholder  | 范围选择时的占位内容   | string    | - | '开始日期 ~ 结束日期' |
| shortcuts  | 设置快捷选项   | Object[]    | - | - |
| disabledDate  | 符合条件的日期将被禁用   | function    | - | - |


### shortcuts {.component__content}
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 快捷选项跳转的时间值  | number    | - | - |
| unit  | 快捷选项跳转的时间单位 | string  | 'day', 'week', 'month', 'year' | - |
| label  | 快捷选项展示的标签文本 | string  | - | - |

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 在选择完成, 绑定值改变时触发 | (dateArr: Array)