## Input输入框
通过鼠标或键盘输入字符

:::demo #基础用法 ##输入任意内容 input
```html
<template>
<div>
    <kd-input
            placeholder="请输入内容"
            v-model="age"
    ></kd-input>
    <kd-input
            class="input-gap1"
            width="200px"
            placeholder="请输入内容"
            v-model="age"
    ></kd-input>
</div>
   
</template>
<script >
    export default{
        data() {
            return {
                age: 20
            }
        }
    }
</script>
<style scoped>
    .input-gap1 {
        margin-left: 10px;
    }
</style>
```
:::

:::demo #禁用状态 ##通过 disabled 属性指定是否禁用 input 组件
```html
<template>
<div>
    <kd-input
            placeholder="请输入内容"
            v-model="age"
            :disabled="true"
    ></kd-input>
</div>
</template>
<script >
    export default{
        data() {
            return {
                age: 27
            }   
        }
    }   
</script>
```
:::

:::demo #可清空 ##使用clearable属性即可得到一个可清空的输入框
```html
<template>
    <kd-input
            type="text"
            v-model="info"
            clearable
    ></kd-input>
</template>
<script >
    export default{
        data() {
            return {
                info: 'this is info'
            }   
        }
    }   
</script>
```
:::


:::demo #密码框 ##可以更改type对应不同的功能
```html
<template>
<div>
    <kd-input
            :type="type"
            v-model="password"
    >
        <template v-slot:suffix>
             <i 
                    :class="iconClass"
                    @click="switchType"
             ></i>
        </template>
    </kd-input>
</div>
</template>
<script >
    export default{
        data() {
            return {
                password: '1234567',
                type: 'password'
            }
        },
        computed: {
            iconClass() {
                return this.type === 'password' ? 'kd-icon-view' : 'kd-icon-hide'
            }   
        },
        methods: {
            switchType() {
                this.type = this.type === 'password' ? 'text' : 'password';
            }
        }   
    }   
</script>
```
:::


:::demo #不同状态的输入框 ##带有图标标记输入类型
```html
<template>
<div>
    <kd-input
            class="input-gap2"
            type="text"
            v-model="info"
            status="success"
    ></kd-input>
    <kd-input
            class="input-gap2"
            type="text"
            v-model="info"
            status="error"
    ></kd-input>
    <kd-input
            class="input-gap2"
            type="text"
            v-model="info"
            status="warning"
    ></kd-input>
</div>
</template>
<script >
    export default{
        data() {
            return {
                info: 'status'
            }   
        }
    }   
</script>
<style scoped>
    .input-gap2 {
        margin: 0 10px 10px 0;
    }
</style>
```
:::

:::demo #尺寸 ##可通过 size 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。
```html
<template>
<div>
    <kd-input
            class="input-gap3"
            type="text"
            v-model="info"
            placeholder="mini"
            size="mini"
    >
        <template v-slot:suffix>
            <i class="kd-icon-search"></i>
        </template>
    </kd-input>
    <kd-input
            class="input-gap3"
            type="text"
            v-model="info"
            placeholder="small"
            size="small"
    >
        <template v-slot:suffix>
            <i class="kd-icon-search"></i>
        </template>
    </kd-input>
    <kd-input
            class="input-gap3"
            type="text"
            v-model="info"
            placeholder="default"
            size="default"
    >
        <template v-slot:suffix>
            <i class="kd-icon-search"></i>
        </template>
    </kd-input>
    <kd-input
            class="input-gap3"
            type="text"
            v-model="info"
            placeholder="large"
            size="large"
    >
        <template v-slot:suffix>
            <i class="kd-icon-search"></i>
        </template>
    </kd-input>
</div>
</template>
<script >
    export default{
        data() {
            return {
                info: ''
            }   
        }
    }   
</script>
<style scoped>
    .input-gap3 {
        margin: 0 10px 10px 0;
    }
</style>
```
:::

:::demo #复合型输入框 ##可前置或后置元素，一般为标签或按钮
```html
<template>
<div>
    <kd-input
            v-model="url"
            name="url"
            size="mini"
    >
        <template v-slot:prepend>
                <span>http://</span>
        </template>
        <template v-slot:append>
                <span>.com</span>
        </template>
    </kd-input>
    <kd-input
            class="input-gap4"
            v-model="url"
            name="url"
            size="small"
    >
        <template v-slot:prepend>
                <span>http://</span>
        </template>
        <template v-slot:append>
                <span>.com</span>
        </template>
    </kd-input>
    
    <kd-input
            class="input-gap4"
            v-model="url"
            name="url"
            size="default"
    >
        <template v-slot:prepend>
                <span>http://</span>
        </template>
        <template v-slot:append>
                <span>.com</span>
        </template>
    </kd-input>
    <kd-input
            class="input-gap4"
            v-model="url"
            name="url"
            size="large"
    >
        <template v-slot:prepend>
                <span>http://</span>
        </template>
        <template v-slot:append>
                <span>.com</span>
        </template>
    </kd-input>
</div>
</template>
<script>
    export default{
        data() {
            return {
                url: 'kingsoft'
            }   
        }
    }   
</script>
<style scoped>
    .input-gap4 {
        margin: 10px 0;
    }
</style>
```
:::

:::demo #文本域 ##用于输入多行文本信息，通过将 type 属性的值指定为 textarea。
```html
<template>
<div>
    <kd-input
            class="input-gap5"
            type="textarea"
            v-model="intro"
            name="intro"
            :rows="5"
            width="300px"
    ></kd-input>
    <kd-input
            class="input-gap5"
            type="textarea"
            v-model="intro"
            name="intro"
            :fluid="true"
    ></kd-input>
</div>
</template>
<script>
    export default{
        data() {
            return {
                intro: 'this is textarea'
            }   
        }
    }
</script>
<style scoped>
    .input-gap5 {
        margin: 10px 0;
    }
</style>
```
:::


:::demo #输入长度限制 ##maxlength是原生属性，用来限制输入框的字符长度.对于 textarea 的输入框，在使用 maxlength 属性限制最大输入长度的同时，可通过设置 show-count 属性来展示字数统计。
```html
<template>
<div>
    <kd-input
            class="input-gap5"
            type="text"
            placeholder="最大输入长度10"
            v-model="info"
            name="ten"
            maxlength="10"
            size="large"
    ></kd-input>
    <kd-input
            type="textarea"
            placeholder="最大输入长度100"
            v-model="intro"
            name="intro"
            maxlength="100"
            :show-count="true"
            size="large"
    ></kd-input>
</div>
</template>
<script>
    export default{
        data() {
            return {
                info: 'hellohelloeqw',
                intro: 'this is textarea'
            }   
        }
    }   
</script>
<style scoped>
    .input-gap5 {
        display: block;
        margin: 10px 0;
    }
</style>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type            | 类型           | string       | text，textarea 和其他 原生 input 的 type 值
| value / v-model | 绑定值                   |  number / string | —         |  —
| name           |  对应的 name属性     | string                    |  —       |  —
| width          | 宽度              | number / string           |     —     |    —   
| size           | 尺寸              | string                    | mini / small / default / large |     default
| maxlength      | 原生属性，最大输入长度 | number | - | -
| minlength | 原生属性，最小输入长度 | number | - | -
| show-count | 是否显示输入字数统计，只在Textarea中生效 | - | -
| placeholder | 输入框占位符 | string | - | -
| clearable  | 是否可清空（只在text中生效） | boolean | - | false
| disabled | 禁用 | boolean | - | false
| size | 只在text中有效 | string | mini/small/defalut/large | -
| rows | 输入框行数，只在textarea中有效 | number | - | 3
| name | 原生属性 | string | - | -
| readonly | 原生属性，是否只读 | boolean | - | false
| resize | 控制是否能被用户缩放 | string | none, both, horizontal, vertical | -
| autofocus | 原生属性，自动获取焦点 | boolean | true/false | false
| tabindex | 输入框的tabindex | string | - | -

### Slots {.component__content}
| 事件名称      | 说明   
|---------- |-------- 
| prefix | 输入框头部内容，只对 type="text"
| suffix | 输入框尾部内容，只对 type="text" 有效
| prepend | 输入框前置内容，只对 type="text" 有效
| append | 输入框后置内容，只对 type="text" 有效

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| blur | 在 Input 失去焦点时触发 | (event: Event)
| focus | 在 Input 获得焦点时触发 | (event: Event)
| change | 仅在输入框失去焦点或用户按下回车时触发 | (event: Event)
| input | 在 Input 值改变时触发 | (event: Event)
| clear | 在点击由 clearable 属性生成的清空按钮时触发 | —
| keydown | 在键盘按下时触发 | -
| keyup | 在键盘弹起时触发 | -

### Methods {.component__content}
| 方法名      | 说明    | 参数 |
|---------- |-------- |---------- |
| focus | 使 input 获取焦点 | -
| blur | 使 input 失去焦点 | -
| select | 选中input内容 | -
