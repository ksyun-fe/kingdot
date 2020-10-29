### 复选框
:::demo #基本使用 ##通过v-model进行数据双向绑定。默认绑定变量的值会是Boolean，选中为true。

```html
<template>
    <div>
        <Checkbox v-model="value1">checkbox</Checkbox>
    </div>
</template>
<script >
    export default {
        data() {
            return {
                value1: '',
                value2: 'aaa',
                value3: ['b', 'a']
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


:::demo #指定选中和非选中的取值 ##默认选中的值为true，非选中的值为false，通过trueValue和falseValue属性，我们可以指定选中和非选中的值。

```html
<template>
    <div>
        <Checkbox v-model="value1">默认值: {{ value1 }}</Checkbox>
        <Checkbox v-model="value2" trueValue="checked" falseValue="unchecked">指定值: {{ value2 }}</Checkbox>
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

:::demo #Checkbox组 ##和浏览器原生行为一样，给Checkbox指定相同的name，它们便组成了复选框组。

```html
<template>
    <div>
        <Checkbox name="languages" trueValue="js" v-model="languages">Javascript</Checkbox>
        <Checkbox name="languages" trueValue="css" v-model="languages">Css</Checkbox>
        <Checkbox name="languages" trueValue="html" v-model="languages">Html</Checkbox>
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

:::demo #半选中状态 ##通过indeterminate属性可以控制Checkbox的半选中状态

```html
<template>
    <div>
        <Checkbox 
                :indeterminate="length > 0 && length < 3"
                :value="length === 3"
                @change="toggleSelectAll"
        >全选</Checkbox>
        <hr />
        <Checkbox name="languages" trueValue="js" v-model="languages">Javascript</Checkbox>
        <Checkbox name="languages" trueValue="css" v-model="languages">Css</Checkbox>
        <Checkbox name="languages" trueValue="html" v-model="languages">Html</Checkbox>
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
            toggleSelectAll(value, checked) {
                this.languages = checked ? ['js', 'css', 'html'] : [];
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

:::demo #禁用状态 ##设置disabled属性表示禁用状态。

```html
<template>
    <div>
        <Checkbox disabled v-model="value1">disabled</Checkbox>
        <Checkbox disabled v-model="value2">disabled</Checkbox>
        <Checkbox disabled v-model="value3" indeterminate>disabled</Checkbox>
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
