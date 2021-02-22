### 复选框
:::demo #基本使用 ##通过`v-model`进行数据双向绑定。默认绑定变量的值会是`Boolean`，选中为`true`。

```html
<template>
    <div>
        <kd-checkbox>checkbox</kd-checkbox>
        <kd-checkbox v-model="value1">checkbox</kd-checkbox>
    </div>
</template>
<script >
    export default {
        data() {
            return {
                value1: ''
            };
        },
        methods: {
            change(v) {
                console.log(v);
            }   
        }       
    }   
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .kd-checkbox
        margin-right 16px
</style>
```
:::


:::demo #指定选中和非选中的取值 ##默认选中的值为`true`，非选中的值为`false`，通过`trueValue`和`falseValue`属性，我们可以指定选中和非选中的值。

```html
<template>
    <div>
        <kd-checkbox v-model="value1">默认值: {{ value1 }}</kd-checkbox>
        <kd-checkbox v-model="value2" trueValue="checked" falseValue="unchecked">指定值: {{ value2 }}</kd-checkbox>
    </div>
</template>
<script >
    export default {
        data() {
            return {
                value1: true,
                value2: 'checked'
            };
        }     
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .kd-checkbox
        margin-right 16px
</style>
```
:::

:::demo #Checkbox组 ##和浏览器原生行为一样，给`Checkbox`指定相同的`name`，它们便组成了复选框组。

```html
<template>
    <div>
        <kd-checkbox name="languages" trueValue="js" v-model="languages">Javascript</kd-checkbox>
        <kd-checkbox name="languages" trueValue="css" v-model="languages">Css</kd-checkbox>
        <kd-checkbox name="languages" trueValue="html" v-model="languages">Html</kd-checkbox>
    </div>
</template>
<script >
    export default {
        data() {
            return {
                languages: ['css']
            };
        }     
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .kd-checkbox
        margin-right 16px
</style>
```
:::

:::demo #半选中状态 ##通过`indeterminate`属性可以控制`Checkbox`的半选中状态

```html
<template>
    <div>
        <kd-checkbox 
                :indeterminate="length > 0 && length < 3"
                :value="length === 3"
                @change="toggleSelectAll"
        >全选</kd-checkbox>
        <br/>
        <kd-checkbox name="languages" trueValue="js" v-model="languages">Javascript</kd-checkbox>
        <kd-checkbox name="languages" trueValue="css" v-model="languages">Css</kd-checkbox>
        <kd-checkbox name="languages" trueValue="html" v-model="languages">Html</kd-checkbox>
    </div>
    
</template>
<script >
    export default {
        data() {
            return {
                languages: [],
                value2: 'checked'
            };
        },
        computed: {
            length() {
                return this.languages.length;
            }
        },
        methods: {
            toggleSelectAll(value) {
                this.languages = value ? ['js', 'css', 'html'] : [];
            }
        }  
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .kd-checkbox
        margin-right 16px
</style>
```
:::

:::demo #禁用状态 ##设置`disabled`属性表示禁用状态。

```html
<template>
    <div>
        <kd-checkbox disabled v-model="value1">disabled</kd-checkbox>
        <kd-checkbox disabled v-model="value2">disabled</kd-checkbox>
        <kd-checkbox disabled v-model="value3" indeterminate>disabled</kd-checkbox>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: '',
                value2: true,
                value3: false
            };
        }     
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .kd-checkbox
        margin-right 16px
</style>
```
:::

### Checkbox属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value/v-model  |  绑定值  | string / number / boolean	  |     —     |    —   |
| name     | 原生name属性   | string    |  — | undefined
| trueValue     | 选中的值   | String/Number/Boolean   | — |     true    |
| falseValue    | 未选中的值   | String/Number/Boolean  |  — |    false   |
| indeterminate  | 半选中   | boolean  |     —     |    false   |
| disabled  | 禁用   | boolean  |     —     |    false   |


### Checkbox事件
| 属性      | 说明    | 参数   |
|---------- |--------|--------|
| change  |  当用户点击绑定值变化时触发的事件  |   更新后的值   |
