## DateTimePicker 日期时间选择器
用于选择日期-时间

### 基础用法
:::demo #基础用法 ## 选择日期-时间. 可以使用属性 `hideConfirmBtn` 隐藏确认按钮

```html
<template>
    <div>
        <kd-date-time-picker v-model="dateTimeString1" accuracy="minute"> </kd-date-time-picker>  选中值: {{ dateTimeString1 }}
        <br>
        <br>
        <kd-date-time-picker v-model="dateTimeString2" hideConfirmBtn :disabled-column="arr"> </kd-date-time-picker> 选中值: {{ dateTimeString2 }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dateTimeString1: '',
                dateTimeString2: '',
                arr: [false, true, true]
            }
        },
        
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

### 范围约束
:::demo #范围约束 ## 使用 minDateTime, maxDateTime 设置范围约束

```html
<template>
    <div>
        <kd-date-time-picker v-model="dateTimeString" hideConfirmBtn :minDateTime="minDateTime" :maxDateTime="maxDateTime"> </kd-date-time-picker> 
        <br>
        <br>
        <kd-date-time-picker v-model="dateTimeArr" hideConfirmBtn range :minDateTime="minDateTime" :maxDateTime="maxDateTime"> </kd-date-time-picker> 
        选中值: {{ dateTimeString }}
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dateTimeString: '',
                dateTimeArr:[],
                minDateTime: '2021-06-11 12:00:00',
                maxDateTime: '2021-07-21 12:00:00'
            }
        },
        
    }
</script>
```
:::
### 快捷选项
:::demo #快捷选项 ## 快捷选项需配置 `shortcuts` 属性. `shortcuts` 中 `label` 与 `value` 属性可以接受自定义函数,

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

### 禁用日期
:::demo #禁用日期 ## 通过自定义方法设置满足条件的日期禁用，传入参数为日期字符串，返回布尔值
```html
<template>
    <div>
        <kd-date-time-picker v-model="dateTimeString" :disabled-date="disableDateArr"> </kd-date-time-picker> 选中值: {{ dateTimeString }}
        <br>
        <br>
        <kd-date-time-picker v-model="dateTimeArr" range :disabled-date="disabledDate1"> </kd-date-time-picker> 选中值: {{ dateTimeArr }}
    </div>
</template>
<script>
    import Day from 'dayjs';
    export default {
        data() {
            return {
                dateTimeString: '',
                dateTimeArr: [],
                disableDateArr: ['2021-10-01', '2021-10-03']
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

### 选择日期时间范围
:::demo #基础用法 ## 选择日期-时间. 

```html
<template>
    <div>
        <kd-date-time-picker range v-model="dateTimeArray" accuracy="minute"> </kd-date-time-picker> 选中值: {{ dateTimeArray }} 
        <br>
        <br>
        <kd-date-time-picker range v-model="dateTimeArray1" :shortcuts="data"> </kd-date-time-picker> 选中值: {{ dateTimeArray1 }}
    </div>
</template>
<script>
    import Day from 'dayjs';
    export default {
        data() {
            return {
                dateTimeArray: [],
                dateTimeArray1: [],
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

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model  | 绑定值   | string, array    | - | - |
| range  | 是否为范围选择   | Boolean    | - | false |
| placeholder  | 非范围选择时的占位内容   | string    | - | '请选择日期时间' |
| disabled-column    | 设置内部滚动选择器的禁用状态  | array |  -  |    [false, false, false]   
| accuracy    | 精度   | string |     'minute', 'second'     |    'second'   |
| shortcuts  | 设置快捷选项   | Object[]    | - | - |
| disabled-date  | 设置禁用的日期   | Array, Function    | - | - |
| minDateTime  |  可选的最小日期时间  | string  | - | - |
| maxDateTime  | 可选的最大日期时间   | string  | - | - |
| hide-confirm-btn  | 隐藏确认按钮   | boolean  | true, false | false |
| clearable | 是否能清空当前值   | boolean  | true, false | true |
| iconPosition | 图标在input中的位置   | String   | 'prefix', 'suffix' | 'prefix' |


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
| change | 在选择完成, 绑定值改变时触发 | (dateTimeValue: Array/String)
| clear | 清空选中日期时触发 | -