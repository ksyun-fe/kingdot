## DatePicker 日期选择器
用于选择或输入日期

### 基础用法
:::demo #基础用法 ## 以「日」为基本单位，基础的日期选择控件. 通过 value 属性可以指定一个默认日期

```html
<template>
    <div>
        <kd-date-picker v-model="dateString"> </kd-date-picker> 选中值: {{ dateString }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dateString: '2020-01-01'
            }
        }
    }
</script>
```
:::

### 拾取其他日期单位
:::demo #拾取其他日期单位 ## 通过设置 `pick-type` 属性，可以选择月、年单位的时间

```html
<template>
    <div>
        <kd-date-picker v-model="dateString" pick-type="year" minDate="2021" maxDate="2028" :disabled-date="disabledDate"/> 选中值: {{ dateString }}
        <br>
        <br>
        <kd-date-picker v-model="dateString1" pick-type="month" minDate="2021-9" maxDate="2022-9" :disabled-date="dateArr1"/> 选中值: {{ dateString1 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dateString: '',
                dateString1: '',
                dateArr: ['2022', '2023'],
                dateArr1: ['2022-06', '2022-08']
            }
        },
        methods: {
            disabledDate(dateStr) {
                if (dateStr === '2024') {
                    return true
                }
            },
        }
    }
</script>
```
:::

### 自定义输出格式
:::demo #自定义输出格式 ## 可以通过配置格式字符串来指定绑定值输出格式

```html
<template>
    <kd-date-picker v-model="dateString" format-string="MM/DD/YYYY"> </kd-date-picker>
</template>
<script>
    export default {
        data() {
            return {
                dateString: ''
            }
        }
    }
</script>
```
:::

### 快捷选项
:::demo #快捷选项 ## 快捷选项需配置 `shortcuts` 属性. `shortcuts` 中 `label` 与 `value` 属性可以接受自定义函数,

```html
<template>
    <kd-date-picker v-model="dateString" :shortcuts="data"> </kd-date-picker>
</template>
<script >
    import Day from 'dayjs';
    export default {
        data() {
            return {
                dateString: '',
                data: [{
                    label: '元旦',
                    value: ['2021-01-01 12:00:00']
                },{
                    label: '儿童节',
                    value: '2021-06-01 00:00:00'
                }, {
                    label: '全部(字符型)',
                    value() {
                        return ''
                    }
                },{
                    label: '全部(数组类型)',
                    value() {
                        return []
                    }
                }]
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
    <kd-date-picker :disabled="true"> </kd-date-picker>
</template>

```
:::

### 禁用日期
:::demo #禁用日期 ## 通过自定义方法设置满足条件的日期禁用，传入参数为日期字符串，返回布尔值
```html
<template>
    <div>
        <kd-date-picker v-model="dateString" :disabled-date="dateArr"> </kd-date-picker>
        <br>
        <br>
        <kd-date-picker v-model="dateString1" :disabled-date="disabledDate"> </kd-date-picker>
        <br>
        <br>
        <kd-date-picker v-model="dateString2" range :disabled-date="disabledDate1"> </kd-date-picker>
    </div>
    
</template>
<script>
    import Day from 'dayjs';
    export default {
        data() {
            return {
                dateString: '',
                dateString1: '',
                dateString2: [''],
                dateArr: ['2021-10-01', '2021-10-05']
            }
        },
        methods: {
            disabledDate(dateStr) {
                const timeObj = Day(dateStr);
                if (timeObj.day() === 0 || timeObj.day() === 6) {
                    return true
                }
            },
            disabledDate1(dateStr, firstDate) {
                if (!!firstDate) {
                    if (Day(dateStr).isAfter(Day(firstDate).add(-3, 'day')) && Day(dateStr).isBefore(Day(firstDate).add(3, 'day'))) {
                        return false
                    } else {
                        return true
                    }
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
    <div>
        <kd-date-picker range v-model="dateArr"> </kd-date-picker>
    </div>
</template>
<script>
    import Moment from 'dayjs';
    export default {
        data() {
            return {
                dateArr: ['2020-01-01', '2020-01-11']
            }
        },
    }
</script>
```
:::

### 带快捷选项的日期范围
:::demo #带快捷选项的日期范围 ## 可以通过自定义快捷选项, 选择日期范围. `shortcuts` 中 `label` 与 `offset` 属性可以接受自定义函数,

```html
<template>
    <div>
        <kd-date-picker v-model="dateValue" range :shortcuts="data" placeholder="起始时间 ~ 结束时间"> </kd-date-picker>
        选中值: {{ dateValue }}
    </div>
</template>
<script>
    import Day from 'dayjs';
    export default{
        data() {
            return {
                dateValue: [],
                data: [{
                    label: '端午假期',
                    value: ['2021-06-12', '2021-06-14']
                }, {
                    label: '最近一个月',
                    value() {
                        let start = Day().format();
                        let end = Day().add(-1, 'month').format()
                        return [start, end]
                    } 
                }, {
                    label: '全部',
                    value() {
                        return []
                    } 
                }]
            }
        }
    }
</script>
```
:::

### 日历模式
:::demo #日历模式 ## 仅用于回显日期.

```html
<template>
    <div>
        <kd-date-picker calendar :markDate="markDate"> </kd-date-picker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                markDate: ['2020-01-01', '2020-01-11']
            }
        },
        mounted() {
            setTimeout(() => {
                this.markDate = ['2021-09-29', '2021-09-27', '2021-09-26'];
            }, 5000)
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
| pickType |  设置拾取的日期单位  | String   | 'year', 'month', 'day' | 'day' |
| range  | 是否为范围选择   | bool    | - | false |
| placeholder  | 非范围选择时的占位内容   | string    | - | '请选择日期' |
| shortcuts  | 设置快捷选项   | Object[]    | - | - |
| disabled-date  | 设置禁用的日期   | Array, Function    | - | - |
| minDate  |  可选的最小日期  | string  | - | - |
| maxDate  |  可选的最大日期  | string  | - | - |
| clearable | 是否能清空当前值   | Boolean   | true, false | true |
| iconPosition | 图标在input中的位置   | String   | 'prefix', 'suffix' | 'prefix' |
| calendar | 是否为日历模式   | Boolean   | true, false | false |
| markDate | 日历模式下被标记的日期   | array   | - | - |


### disabled-date {.component__content}
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| dateStr   | 待判断是否禁用的日期 | string  | - | - |
| firstDate  | 选中的第一个日期 | string  | - | - |

### shortcuts {.component__content}
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label  | 快捷选项展示的标签文本 | string, function  | - | - |
| value  | 快捷选项跳转的值 | string, array, function  | - | - |

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | 在选择完成, 绑定值改变时触发 | (dateArr: Array, source: String)
| clear | 清空选中日期时触发 | -