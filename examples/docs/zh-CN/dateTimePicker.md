## DateTimePicker 日期时间选择器
用于选择日期-时间

### 基础用法
:::demo #基础用法 ## 选择日期-时间

```html
<template>
    <div>
        <kd-date-time-picker v-model="dateTimeString"> </kd-date-time-picker> 
        选中值: {{ dateTimeString }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dateTimeString: ''
            }
        }
    }
</script>
```
:::

### 禁用组件
:::demo #禁用组件 ## 组件级别的禁用

```html
<template>
    <kd-date-time-picker :disabled="true"> </kd-date-time-picker>
</template>

```
:::

### 快捷选项
:::demo #快捷选项 ## 快捷选项需配置 `shortcuts` 属性. `shortcuts` 中 `label` 与 `offset` 属性可以接受自定义函数,

```html
<template>
    <div>
        <kd-date-time-picker v-model="dateTimeString" :shortcuts="data"> </kd-date-time-picker>
        选中值: {{ dateTimeString }}
    </div>
</template>
<script >
    export default {
        data() {
            return {
                dateTimeString: '',
                data: [{
                    label: '今天',
                    offset: {
                        value: 0,
                        unit: 'day'
                    }
                }, {
                    label: '昨天',
                    offset: {
                        value: -1,
                        unit: 'day'
                    }
                }, {
                    label: '明天',
                    offset: {
                        value: 1,
                        unit: 'day'
                    }
                },{
                    label: '一周前',
                    offset: {
                        value: -1,
                        unit: 'week'
                    }
                }, {
                    label: '一个月前',
                    offset() {
                        return {
                            value: -1,
                            unit: 'month'
                        }
                    }
                }]
            }
        }
    }
</script>
```
:::

### 选择日期时间范围
:::demo #基础用法 ## 选择日期-时间

```html
<template>
    <div>
        <kd-date-time-picker range v-model="dateTimeArray" :shortcuts="data"> </kd-date-time-picker> 
        选中值: {{ dateTimeArray }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dateTimeArray: [],
                data: [{
                    label: '今天',
                    offset: {
                        value: 0,
                        unit: 'day'
                    }
                }, {
                    label: '昨天',
                    offset: {
                        value: -1,
                        unit: 'day'
                    }
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
| value / v-model  | 绑定值   | string, array    | - | - |
| format-string  | 日期格式字符串   | string    | - | 'YYYY-MM-DD' |
| range  | 是否为范围选择   | bool    | - | false |
| placeholder  | 非范围选择时的占位内容   | string    | - | '请选择日期' |
| shortcuts  | 设置快捷选项   | Object[]    | - | - |
| disabled-date  | 符合条件的日期将被禁用   | function    | - | - |
| clearable | 是否能清空当前值   | Boolean   | true, false | true |



### shortcuts {.component__content}
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label  | 快捷选项展示的标签文本 | string, function  | - | - |
| offset  | 快捷选项展示的标签文本 | object, function  | - | - |

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 在选择完成, 绑定值改变时触发 | (dateArr: Array, source: String)
| clear | 清空选中日期时触发 | -