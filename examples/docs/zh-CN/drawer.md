### 基础用法
:::demo #基础用法 呼出一个临时的侧边栏，可以从左右两个方向呼出。

```html
<template>
 <div>
    <Button type='primary' @click="show('left')">点我打开左侧</Button>
    <Button type='primary' @click="show('right')">点我打开右侧</Button>
    <Button type='primary' @click="show('top')">点我打开上侧</Button>
    <Button type='primary' @click="show('bottom')">点我打开下侧</Button>
    <Drawer 
            v-model='flag' 
            :position='position'
             >
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                position:'right'
            }
        },
        methods:{
            show(value){
                this.position=value;
                this.flag=true;
            }
        }
   }
</script>
```
:::

### 自定义header
:::demo #自定义header title可以根据具体需求进行具体设置。

```html
<template>
 <div>
    <Button type='primary' @click="show()">自定义标题内容</Button>
    <Button type='primary' @click="showOther()">重构标题</Button>
    <Button type='primary' @click="show(false)">隐藏header</Button>
    <Drawer 
            v-model='flag' 
            :showHeader='headerFlag'
            title="我是自定义标题"
             >
    </Drawer>
    <Drawer 
            v-model='flagOther' 
             >
          <div slot="header">
          我是重构标题
          </div>
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                flagOther:false,
                headerFlag:true,
            }
        },
        methods:{
            showOther(){
                this.flagOther=true;
            },
            show(value){
                this.headerFlag=value
                this.flag=true
            }
        }
   }
</script>
```
:::
### 自定义footer
:::demo #自定义footer footer可以根据具体需求进行具体设置。

```html
<template>
 <div>
    <Button type='primary' @click="show()">自定义footer内容</Button>
    <Button type='primary' @click="showOther(false)">隐藏footer</Button>
    <Drawer 
            v-model='flag' 
             >
            <div slot="footer">
               <Button>
                 自定义
               </Button>
            </div>
    </Drawer>
    <Drawer 
            v-model='flagOther' 
            :showFooter='footerFlag'
             >
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                flagOther:false,
                footerFlag:true,
            }
        },
        methods:{
            showOther(value){
                this.flagOther=true;
                this.footerFlag=false
            },
            show(){
                this.flag=true
            }
        }
   }
</script>
```
:::
### 自定义内容
:::demo #自定义内容 主题内容可以根据具体需求进行具体设置。

```html
<template>
 <div>
    <Button type='primary' @click="show()">自定义内容</Button>
    <Drawer 
            v-model='flag' 
             >
             <div>
                自定义内容
             </div>
    </Drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
            }
        },
        methods:{
            show(){
                this.flag=true
            }
        }
   }
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| v-model     | 是否显示抽屉   | boolean    | true / false | false
| showHeader     | 是否显示header   | boolean    | true / false |    true   |
| showFooter  | 是否显示footer   | boolean  |     true / false     |    true   |
| title  | 标题   | string  |     —     |    —   |
| cancelText  | 取消按钮文字   | string  |     —     |    —   |
| okText  | 确认按钮文字   | string  |     —    |    —   |
| mask  | 是否显示遮罩层   | boolean  |    true / false     |   true   |
| maskClosable  | 是否点击遮罩关闭抽屉   | boolean  |     true / false     |    false   |
| width  | 抽屉宽度(最大800px，默认480px)   | string / number  |   —   |   480  |
| height  | 抽屉高度(只有上方弹出，下方弹出时可设置)   | string / number  |   —   |   300  |
| position  | 抽屉弹出位置 | string |  lest / bottom / right / top  |  right |


### Event {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| ok  | 确认按钮执行的事件 | function |  —  |  — |
| cancel  | 取消按钮执行的事件 | function |  —  |  — |
### Slot {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| header  | 头部 | slot |  —  |  — |
|  body | 内容区 | slot |  —  |  — |
|  footer | 底部 | slot |  —  |  — |