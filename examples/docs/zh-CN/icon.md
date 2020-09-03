### 基础用法
:::demo #基础用法 直接通过设置类名为 kd-icon-iconName 来使用即可。例如：

```html
<template>
    <div>
        <i class="">123</i>
    </div>
</template>

<script type="text/javascript">
import a from "i18n.md"
export default {
        created(){
            // this._getFile();
        },
        methods:{
            // _getFile(){
            //     var ajx = new XMLHttpRequest()
            //     ajx.open("get",,true)
            //     ajx.onreadystatechange = function(){
            //         if(ajx.readyState!=4){
            //             return;
            //         }
            //         if(ajx.status>=200 && ajx.status<300){
            //             console.log(ajx.responseText)
            //         }
            //     }
            //     ajx.send()
            // }
        }
    }
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 按钮类型   | string    | default / primary / warning /danger / success | default
| size     | 按钮尺寸   | string    | large / small |     —    |
