### 基础用法

:::demo #基础用法 ##选择任意时间点

```html
<template>
    <div>
        <TimePicker></TimePicker>
    </div>
    
    
</template>
<script>
    export default {
        data() {
            return {
                
            }
        },
    }
</script>
```
:::

### 固定时间点

:::demo #固定时间点 ##将mode设置"steped-time", 表示固定时间点,  如整点, 半点, 刻钟. 可以额外设置起始时间与终止时间

```html
<template>
    <div>
        <TimePicker :mode="mode"></TimePicker>
        <TimePicker :mode="mode" :minTime="minTime" :maxTime="maxTime" :step="step" ></TimePicker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mode: 'steped-time',
                minTime: '09:00:00',
                maxTime: '17:00:00',
                step: 15,
                
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
        <TimePicker isRange="true"></TimePicker>
        <TimePicker isRange="true" mode="steped-time"></TimePicker>
        <!-- <TimePicker :mode="mode" :minTime="minTime" :maxTime="maxTime" :step="step" ></TimePicker> -->
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mode: 'steped-time',
                minTime: '09:00:00',
                maxTime: '17:00:00',
                step: 15,
                
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
| disableCondition  | 按条件设置禁用时间   | function  |     —     |    -   |