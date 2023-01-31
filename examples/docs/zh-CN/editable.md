:::demo #基础用法 ##使用`v-model`建立需要编辑的文本的双向数据绑定；使用`disabled`可以禁用文本编辑

```html
<template>
    <div class='e-test'>
        <kd-editable v-model="model1"></kd-editable>
        <kd-editable value="disabled" disabled></kd-editable>
        <kd-editable v-model="model2" follow size='large'>
            <i class="kd-icon-date" />
            {{ model2 }}
        </kd-editable>
        <kd-editable v-model="model3" hover size='mini'></kd-editable>
        <kd-editable
            v-model="model4"
            hover
            :validate="validateFn"
            placeholder="长度不小于5"
            @change="change"
            @error="error"
            size='small'
        ></kd-editable>
        <kd-editable v-model="model1">
            <template slot='icon'>
                <i class='kd-icon-em-xitongshezhi'></i>
            </template>
        </kd-editable>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                model1: 'normal',
                model2: 'slot&follow',
                model3: 'hover',
                model4: 'validate',
            }
        },
        methods: {
            validateFn (v) {
                return v.length >= 5;
            },
            change(e, n, o) {
                this.model4 = n;
                this.$message.success(`newValue: ${n}`);
            },
            error(n) {
                this.$message.error('编辑失败！');
            }
        }
    }
</script>
<style scoped>
.e-test {
    width: 200px;
    /* height: 40px; */
}
</style>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值   | 默认值   |
|---------- |-------- |---------- |-------------  |-------------  |
| value/v-model | `绑定的值`   | `Number| String`    |      `—`    |    `—`    |
| disabled  |  `是否禁用编辑`   | `Boolean`  |      `true|false`    |   `false`  |
| editing  |  `是否为编辑状`   | `Boolean`  |      `true|false`    |   `false`  |
| validate  | `验证规则，可以为函数/正则/正则字符串，若为字符串将转为正则表达式；函数则会传入当前编辑框的值来调用函数验证，返回true则验证通过，否则验证失败（验证通过后，不会直接改变model，需要自行监听change事件）` | `Function | RegExp | String` |         `—`    |`undefined`     |
| authid  | `权限属性`   | `String`  |    `-`     |     `—`    |    `-`   |
| size    | `大小`      | `String`  |    `default|small|mini|large`     |    `default`   |
| hover  | `隐藏编辑图标，hover时候显示`   | `Boolean`  |     `true|false`    |    `false`  |
| follow  | `图标跟随`   | `Boolean`  |     `true|false`    |    `false`  |
| placeholder  | 输入框占位符  | `String`    |     ``    |     ``    |


### 事件 {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| focus | 在输入框获得焦点时触发 | (event: Event)
| change | 仅在输入框失去焦点或用户按下回车时触发 | (event, newValue, oldValue)
| error | 在键盘弹起时触发 | (newValue)

### Slots {.component__content}
| 事件名称      | 说明 |
|---------- |-------- |
| default | 展示内容 |
| icon | 自定义icon,若icon大小需要和字体保持一致，需要增加class`'edit-icon'` |
