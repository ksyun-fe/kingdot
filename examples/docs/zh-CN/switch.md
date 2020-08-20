## Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基础用法

:::demo #基础用法 ##绑定v-model到一个Boolean类型的变量,使用 `size` 属性可以指定组件尺寸：`large`、`default`、`small`、`mini`。

```html
<template>
    <div>
        <KdSwitch v-model="val" size="mini"></KdSwitch>
        <KdSwitch v-model="val" size="small"></KdSwitch>
        <KdSwitch v-model="val" size="default"></KdSwitch>
        <KdSwitch v-model="val" size="large"></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: 'false',
            }
        }
    }
</script>
<style>
    div .kd-switch {
        margin-right: 10px;
    }
</style>
```
:::

### 文字描述

:::demo #文字描述 ##使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述,使用 `font-size` 属性来设置字体大小。

```html
<template>
    <div>
        <KdSwitch
                v-model="val"
                active-text="开"
                inactive-text="关"
                font-size="14"
            ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: 'false',
            }
        }
    }
</script>
<style>
    div .kd-switch {
        margin-right: 10px;
    }
</style>
```
:::

### 扩展的value类型

:::demo #扩展的 `value` 类型 ##设置 `active-value` 和 `inactive-value` 属性，接受`Boolean`, `String`或`Number`类型的值。

```html
<template>
    <div>
        <KdSwitch
                v-model="val1"
                activeText="开"
                inactiveText="关"
                active-value="open"
                inactive-value="close"
            ></KdSwitch>
        <KdSwitch
            v-model="val2"
            activeText="开"
            inactiveText="关"
            :active-value="100"
            :inactive-value="10"
        ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val1: 'open',
                val2: 10
            }
        }
    }
</script>
<style>
    div .kd-switch {
        margin-right: 10px;
    }
</style>
```
:::

### 自定义大小

:::demo #自定义大小 ##设置`width`属性和`height`属性，接受一个`Number`或`String`类型。

```html
<template>
    <div>
        <KdSwitch
            v-model="val"
            :width="80"
            :height="32"
        ></KdSwitch>
        <KdSwitch
            v-model="val"
            :width="60"
            :height="18"
            @change="changeHandler"
        ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: true
            }
        },
        methods: {
            changeHandler(val) {
                console.log(`current status: ${val}`);
            }
        }
    }
</script>
<style>
    div .kd-switch {
        margin-right: 10px;
    }
</style>
```
:::

### 禁用状态

:::demo #禁用状态 ##设置disabled属性，接受一个Boolean，设置true即可禁用。

```html
<template>
    <div>
        <KdSwitch
                v-model="val"
                :disabled="true"
            ></KdSwitch>
        <KdSwitch
            v-model="val1"
            :disabled="true"
        ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: true,
                val1: false
            }
        }
    }
</script>
<style>
    div .kd-switch {
        margin-right: 10px;
    }
</style>
```
:::
### Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 绑定值                   | boolean / number / string | —         |  —
| name           | switch 对应的 name属性     | string                    |  —       |  —
| size           | switch的尺寸              | string                    | mini / small / default / large |     default    
| width          | switch的宽度              | number / string           |     —     |    —   
| height         | switch的高度              | number / string           |     —     |    —   
| activeValue    | switch 打开时的值          | boolean / string / number |     —     |    —   
| inactiveValue  | switch 关闭时的值          | boolean / string / number |     —     |    —   
| active-text    | switch 打开时的文字描述     | string	                 |     —     |   —
| inactive-text  | switch 关闭时的文字描述      | number / string           |     —     |    —   
| disabled  | 设置禁用状态   | boolean  |     —     |    false   |

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| change | switch 状态发生变化时的回调函数 | 新状态的值