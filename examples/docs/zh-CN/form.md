## Form表单
表单

:::demo #基础用法
```html
<template>
    <kd-form
        ref="form"
    >
        <kd-form-item
            model="age"
            label="年龄："
        >
       <kd-input
            v-model.trim="age"/>
       </kd-form-item>
    </kd-form>
</template>
<script >
export default {
    data() {
        return {
            age: 10
        }   
    }
}
</script>
```
:::

:::demo #基础用法 ##表单验证,支持自定义`rules`和`messages`,默认的`rules`和`messages`支持(required, digits, email, url, date, dateISO [YYYY-MM-DD]格式, number, maxLength, minLength, rangeLength, max, min, range, equalTo)的验证及提示.
```html
<template>
    <div>
        <kd-form
            ref="form"
            :fluid="true"
            :labelWidth="230"
            @validateFail="validateFail"
            @submit="submit"
        >
            <kd-form-item
                model="age"
                ref="age"
                :messages="messages"
                :rules="rules"
            >
                <template v-slot:label><i class="required">* </i> 年龄：</template> 
                <kd-input
                        :fluid="true"
                        placeholder="请输入年龄"
                        v-model.trim="age"/>
            </kd-form-item>
            <kd-form-item
                model="positiveInteger"
                :rules="{
                    min: 1,
                    max: 99,
                    digits: true
                }"
            >
                <template v-slot:label><i class="required">* </i> 100内正整数：</template> 
                <kd-input
                        :fluid="true"
                        placeholder="100内正整数"
                        v-model.trim="positiveInteger"/>
            </kd-form-item>
            <kd-form-item
                    label="是否喜欢水果:"
                    model="isLikeFruit">
                <kd-switch v-model="isLikeFruit"/>
            </kd-form-item>
            <kd-form-item
                    model="fruit"
                    :rules="{
                        required: true
                    }"
                >
                <template slot="label"><i class="required">* </i> 喜好：</template>
                <kd-radio
                    v-for="(item, radioIndex) in fruits"
                    :key="radioIndex+'fruit'"
                    :true-value="item.value"
                    name="fruit"
                    v-model="fruit"
                    >{{item.text}}
                </kd-radio>
            </kd-form-item>
        </kd-form>
        <kd-button
            class="submit-btn"
            @click="submitHandler"
        >提交</kd-button>
    </div>
</template>
<script >
    export default{
        data() {
            return {
                babel: '精度',
                age: 20,
                positiveInteger: 10,
                rules: {
                    required: true,
                    digits: true,
                    max: 134,
                    min: 0
                },
                messages: {max: '目前吉尼斯纪录中最长寿命134岁呦'},
                isLikeFruit: false,
                fruit: 0,
                fruits: [
                    {
                        text: '苹果',
                        value: 0
                    }, {
                        text: '香蕉',
                        value: 1
                    }, {
                        text: '橙子',
                        value: 2
                    }
                ],
            }
        },
        methods: {
            submitHandler() {
                this.$refs.form.validate()
                    .then((isvalid) => {
                        isvalid ? this.$message.success('validate success') : this.$message.error('validate error');
                    })
            },
            validateFail() {
                console.log('validateFail');
            },
            submit() {
                console.log('submit');
            }
        }
    }
</script>
<style scoped>
    .submit-btn {
        margin-left: 240px;
    }
    .required {
        color: red;
    }
</style>
```
:::

:::demo #自定义label的宽度 ##通过 `labelWidth` 设置为String 或者 Number 来自定义label宽度
```html
<template>
    <kd-form
        ref="form"
        :labelWidth="230"
    >
        <kd-form-item
            model="age"
            label="自定义label的宽度："
        >
       <kd-input
            v-model.trim="age"/>
       </kd-form-item>
    </kd-form>
</template>
<script >
export default {
    data() {
        return {
            age: 10
        }   
    }
}
</script>
```
:::

:::demo #隐藏label ##通过设置`hideLabel`来隐藏某表单项的label
```html
<template>
    <kd-form
        ref="form"
        :labelWidth="230"
    >
        <kd-form-item
            ref="age"
            :hideLabel="true"
            model="age"
            label="年龄："
        >
            <kd-input
                v-model.trim="age"
            />
        </kd-form-item>
    </kd-form>
</template>
<script >
export default {
    data() {
        return {
            age: 10
        }   
    }
}
</script>
```
:::

:::demo #隐藏错误提示 ##通过设置`showWarning`为false来隐藏某表单项的错误提示
```html
<template>
    <kd-form
        ref="form"
    >
        <kd-form-item
            model="age"
            ref="age"
            :rules="{
                required: true,
                min: 0,
                max: 134
            }"
            :messages="{
                max: '目前吉尼斯纪录中最长寿命134岁呦'
            }"
        >
            <template v-slot:label><i class="required">* </i> 显示错误提示：</template> 
            <kd-input
                    :fluid="true"
                    placeholder="请输入年龄"
                    v-model.trim="age"/>
        </kd-form-item>
        <kd-form-item
            model="age"
            ref="age"
            :rules="{
                required: true,
                min: 0,
                max: 134
            }"
            :messages="{
                max: '目前吉尼斯纪录中最长寿命134岁呦'
            }"
            :showWarning="false"
        >
            <template v-slot:label><i class="required">* </i> 隐藏错误提示：</template> 
            <kd-input
                    :fluid="true"
                    placeholder="请输入年龄"
                    v-model.trim="age"/>
        </kd-form-item>
    </kd-form>
</template>
<script >
export default {
    data() {
        return {
            age: 10
        }   
    }
}
</script>
```
:::


### Form Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| labelWidth            | label宽度           | string / number       | 200
| fluid                 | FormItem的宽度默认是被子元素撑开的，添加该属性可以渲染100%的宽度 | boolean | false

### Form Methods {.component__content}
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| validate | 对整个表单进行校验，返回一个promise，数据是验证结果 true / false | -

### Form Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| submit | 表单验证通过之后的处理函数 | -
| validateFail | 表单验证失败之后的处理函数 | -

### FormItem Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| model | 当前表单字段数据对象 | string | - 
| label | 标签文本 | string | - | -
| hideLabel | 是否隐藏label | boolean | - | false
| labelWidth | 标签宽度 | string / number | auto
| rules | 当前表单字段验证规则 | object | -
| messages | 当前表单字段各个规则的提示信息 | object | -
| showWarning | 当前Item是否显示提示信息 | boolean | - | true

### Form Methods {.component__content}
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| validate | 对当前表单字段进行校验，返回一个promise，数据是验证结果 true / false | -
