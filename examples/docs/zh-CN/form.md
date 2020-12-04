## Input输入框
通过鼠标或键盘输入字符

:::demo #基础用法 ##输入任意内容 input
```html
<template>
<div>
    <Form
        ref="form"
    >
        <FormItem
            model="batchSize"
            :message="message"
            :rules="rules"
            :isDirty="false"
        >
            <template v-slot:label><i class="required">* </i> 数据写入批次大小：</template> 
            <Input class="address-step1-format-width"
                   placeholder="0或大于等于100并且小于1000000000"
                   v-model.trim="batchSize"/>
            <template slot="append">
                <div>
                    <i class="kd-icon-success-solid"></i>
                </div>
            </template>
        </FormItem>
    </Form>
    <Button
        class="btn"
        @click="submitHandler">提交</Button>
</div>
    
</template>
<script >
    export default{
        data() {
            return {
                babel: '精度',
                batchSize: 20,
                rules: {
                    required: true,
                    digits: true,
                    max: 999999,
                    min: 1,
                    range(value){
                        if(/^[1-9][0-9]{1,5}$|^[1-9]$/.test(value) ){
                            return true;
                        }else{
                            return '批次大小的合法值为大于0并且小于1000000';
                        }
                    },
                },
                message: {max: '最大值999999'}
            }
        },
        methods: {
            submitHandler() {
                this.$refs.form.validate()
                    .then((isvalid) => {
                        console.log(`isvalid : ${isvalid}`);
                    })
            }
        }
    }
</script>
<style scoped>
.btn {
    margin: 10px 0;
}
</style>
```
:::


:::demo #基础用法 ##输入任意内容 input
```html
<template>
<div>
    <Form
        ref="form"
    >
        <FormItem
            model="batchSize"
            :message="message"
            :rules="rules"
            :isDirty="false"
        >
            <template v-slot:label><i class="required">* </i> 数据写入批次大小：</template> 
            <Input class="address-step1-format-width"
                   placeholder="0或大于等于100并且小于1000000000"
                   v-model.trim="batchSize"/>
            <template slot="append">
                <div>
                    <i class="kd-icon-success-solid"></i>
                </div>
            </template>
        </FormItem>
        <Button
            type="mockSubmit"
            class="btn"
            @click="submitHandler">提交</Button>
    </Form>
</div>
    
</template>
<script >
    export default{
        data() {
            return {
                babel: '精度',
                batchSize: 20,
                rules: {
                    required: true,
                    digits: true,
                    max: 999999,
                    min: 1,
                    range(value){
                        if(/^[1-9][0-9]{1,5}$|^[1-9]$/.test(value) ){
                            return true;
                        }else{
                            return '批次大小的合法值为大于0并且小于1000000';
                        }
                    },
                },
                message: {max: '最大值999999'}
            }
        },
        methods: {
            submitHandler() {
                this.$refs.form.validate()
                    .then((isvalid) => {
                        console.log(`isvalid : ${isvalid}`);
                    })
            }
        }
    }
</script>
<style scoped>
.btn {
    margin-left: 10px;
}
</style>
```
:::

:::demo #基础用法 ##输入任意内容 input
```html
<template>
<div>
    <Form
        ref="form"
        @submit="submitHandler"
        @validateFail="validateFail"
    >
        <FormItem
            model="batchSize"
            :message="message"
            :rules="rules"
            :isDirty="false"
        >
            <template v-slot:label><i class="required">* </i> 数据写入批次大小：</template> 
            <Input class="address-step1-format-width"
                   placeholder="0或大于等于100并且小于1000000000"
                   v-model.trim="batchSize"/>
            <template slot="append">
                <div>
                    <i class="kd-icon-success-solid"></i>
                </div>
            </template>
        </FormItem>
    </Form>
</div>
    
</template>
<script >
    export default{
        data() {
            return {
                babel: '精度',
                batchSize: 20,
                rules: {
                    required: true,
                    digits: true,
                    max: 999999,
                    min: 1,
                    range(value){
                        if(/^[1-9][0-9]{1,5}$|^[1-9]$/.test(value) ){
                            return true;
                        }else{
                            return '批次大小的合法值为大于0并且小于1000000';
                        }
                    },
                },
                message: {max: '最大值999999'}
            }
        },
        methods: {
            submitHandler(e, vform) {
            console.log('submitHandler');
            console.log(e);
                console.log(vform);
            },
            validateFail(e, vform) {
                console.log('validateFail');
                console.log(e);
                console.log(vform);
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
| message | 当前表单字段各个规则的提示信息 | object | -
| isDirty | 是否开启惰性验证，若开启如input将会在输入字符时进行校验，不开启则会在失焦时触发 | boolean | -

### Form Methods {.component__content}
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| validate | 对当前表单字段进行校验，返回一个promise，数据是验证结果 true / false | -
