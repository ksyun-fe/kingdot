## Input输入框
通过鼠标或键盘输入字符

### 基础用法
:::demo #基础用法 ##输入任意内容 input
```html
<template>
    <Form>
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
        created() {
            // setTimeout(()=> {
            //     this.rules.max=1000;
            //     this.message.max='最大值1000';     
            // }, 3000)
        }
    }
</script>
<style>

</style>
```
:::