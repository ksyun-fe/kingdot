## Form表单
表单

:::demo #基础用法 ##表单验证,支持自定义`rules`和`messages`,默认的`rules`和`messages`支持(required, digits, email, url, date, dateISO [YYYY-MM-DD]格式, number, maxLength, minLength, rangeLength, max, min, range)的验证及提示.
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
                :fluid="true"
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
                    model="gender"
                    ref="gender"
                    :rules="{
                        required: true,
                        unique(val) {
                            return /^(fe)?male$/.test(val)
                        }
                    }"
                    :messages="{
                        unique: '暂时可填项仅为 male 或 female'
                    }"
            >
                <template v-slot:label><i class="required">* </i> 请输入性别：</template>
                <kd-input
                        :fluid="true"
                        placeholder="性别暂时可填项仅为 male 或 female"
                        v-model.trim="gender"/>
            </kd-form-item>
            <kd-form-item
                    model="word"
                    ref="word"
                    :rules="{
                        required: true,
                        letter: true,
                        minLength: 2,
                        maxLength: 10
                    }"
            >
                <template v-slot:label><i class="required">* </i> 英文单词：</template>
                <kd-input
                        :fluid="true"
                        placeholder="请输入一个英文单词"
                        v-model.trim="word"/>
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
            <kd-form-item
                    :rules="{
                        required: true,
                        minLength: 5
                    }"
                    model="desc"
            >
                 <template slot="label"> 自我介绍：</template>
                <kd-input
                        type="textarea"
                        placeholder="最大输入长度1000"
                        show-count
                        v-model="desc"
                        name="ten"
                        maxlength="1000"
                        size="large"
                ></kd-input>
            </kd-form-item>
        </kd-form>
        <kd-button
            class="submit-btn"
            @click="submitHandler"
        >提交</kd-button>
    </div>
</template>
<script >
    import Kingdot from '../../../src/index.js'
    
    Kingdot.Form.addValidateMethod('letter', /^[a-z|A-Z]+$/, '必须是字母');
    export default{
        data() {
            return {
                desc: '',
                babel: '精度',
                age: 20,
                positiveInteger: 10,
                gender: '',
                rules: {
                    required: true,
                    digits: true,
                    max: 134,
                    min: 0
                },
                messages: {max: '目前吉尼斯纪录中最长寿命134岁呦'},
                isLikeFruit: false,
                word: '',
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
        margin-top: 10px;
        margin-left: 240px;
    }
    .required {
        color: red;
    }
</style>
```
:::

:::demo #自定义规则及相应错误提示 ##通过设置`rules`和`messages`来自定义规则及对应规则的错误提示
```html
<template>
    <kd-form
        ref="form"
    >
        
    </kd-form>
</template>
<script >
export default {
    data() {
        return {
            gender: ''
        }   
    }
}
</script>
<style scoped>
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
<style scoped>
    .required {
        color: red;
    }
</style>
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
<style scoped>
    .required {
        color: red;
    }
</style>
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
| submit | 表单验证通过之后的处理函数 (如果希望阻止 form 中 submit 的默认行为，可以在 <kd-form> 标签上添加 @submit.native.prevent) | -
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

### Form Static Methods {.component__content}
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| addValidateMethod | 添加验证规则,在任一 FormItem 的 rules 中配置此规则,即可进行验证 | 1. name: 规则名称 2. method: 规则验证函数,返回 true / false 该值可以为 正则 或者 函数 3. message: 规则错误时的提示文案, 该值可以为 函数 或者 字符串

### Rules {.component__content}
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| required | 必须填写 | -
| digits | 正整数 | -
| email | 邮箱地址 | -
| url | 网址 | -
| date | 日期 | -
| dateISO | YYYY-MM-DD形式日期 | -
| number | 数字 | -
| minLength | 长度不小于 n 的字符串 | -
| maxLength | 长度不大于 n 的字符串 | -
| min | 不小于 n 的数 | -
| max | 不大于 n 的数 | -
| rangeLength | 长度为 n 到 m 的数组或字符串 | -
| range | n 到 m 之间的数 | -
| 自定义 | 函数 | 当前Item的值,需要指定相应规则的 message
