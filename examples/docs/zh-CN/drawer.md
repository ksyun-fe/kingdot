### 基础用法
:::demo #基础用法 ##呼出一个临时的侧边栏，可以从左右两个方向呼出。

```html
<template>
 <div class='box'>
    <kd-button @click="show('left')">点我打开左侧</kd-button>
    <kd-button @click="show('right')">点我打开右侧</kd-button>
    <kd-button @click="show('top')">点我打开上侧</kd-button>
    <kd-button @click="show('bottom')">点我打开下侧</kd-button>
    <kd-drawer 
            v-model='flag' 
            :position='position'
             >
    </kd-drawer>
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
<style scoped lang="stylus">
    .box .kd-btn{
        margin-left: 10px
    }
</style>
```
:::

### 更改出现位置
:::demo #更改出现位置 ##可自定义上下左右的出现位置

```html
<template>
 <div class='box'>
    <kd-button @click="show('left',0,0,200,0)">点我打开距离左侧200px</kd-button>
    <kd-button @click="show('right',0,0,0,200)">点我打开距离右侧200px</kd-button>
    <kd-button @click="show('left',20,20,200,0)">点我打开距离左200px上下20px</kd-button>
    <kd-button @click="show('right',20,20,0,200)">点我打开距离右200px上下20px</kd-button>
    <kd-drawer 
            v-model='flag' 
            :position='position'
            :top='top'
            :left='left'
            :bottom='bottom'
            :right='right'
             >
    </kd-drawer>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
                flag:false,
                position:'right',
                left:'',
                right:'',
                top:'',
                bottom:'',
            }
        },
        methods:{
            show(value,top,bottom,left,right){
                this.position=value;
                this.flag=true;
                this.top=top;
                this.bottom=bottom;
                this.left=left;
                this.right=right;
            }
        }
   }
</script>
<style scoped lang="stylus">
    .box .kd-btn{
        margin-left: 10px
    }
</style>
```
:::
### 自定义header
:::demo #自定义header ##title可以根据具体需求进行具体设置。

```html
<template>
 <div class='box'>
    <kd-button @click="show()">自定义标题内容</kd-button>
    <kd-button @click="showOther()">重构标题</kd-button>
    <kd-button @click="show(false)">隐藏header</kd-button>
    <kd-drawer 
            v-model='flag' 
            :showHeader='headerFlag'
            title="我是自定义标题"
             >
    </kd-drawer>
    <kd-drawer 
            v-model='flagOther' 
             >
          <div slot="header">
          我是重构标题
          </div>
    </kd-drawer>
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
<style scoped lang="stylus">
    .box .kd-btn{
        margin-left: 10px
    }
</style>
```
:::
### 自定义footer
:::demo #自定义footer ##footer可以根据具体需求进行具体设置。

```html
<template>
 <div class='box'>
    <kd-button @click="show()">自定义footer内容</kd-button>
    <kd-button @click="showOther(false)">隐藏footer</kd-button>
    <kd-drawer 
            v-model='flag' 
             >
               <kd-button slot="footer">
                 自定义1
               </kd-button>
                <kd-button slot="footer">
                 自定义2
               </kd-button>
    </kd-drawer>
    <kd-drawer 
            v-model='flagOther' 
            :showFooter='footerFlag'
             >
    </kd-drawer>
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
<style scoped lang="stylus">
    .box .kd-btn{
        margin-left: 10px
    }
</style>
```
:::
### 自定义内容
:::demo #自定义内容 ##主题内容可以根据具体需求进行具体设置。

```html
<template>
 <div class='box'>
    <kd-button @click="show()">自定义内容</kd-button>
    <kd-drawer 
            v-model='flag' 
             >
             <div>
                自定义内容
             </div>
    </kd-drawer>
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
<style scoped lang="stylus">
    .box .kd-btn{
        margin-left: 10px
    }
</style>
```
:::

### 属性 {.component__content}
| 属性         | 说明                                     | 类型            | 可选值                      | 默认值 |
| ------------ | ---------------------------------------- | --------------- | --------------------------- | ------ |
| v-model      | 是否显示抽屉                             | boolean         | true / false                | false  |
| showHeader   | 是否显示header                           | boolean         | true / false                | true   |
| showFooter   | 是否显示footer                           | boolean         | true / false                | true   |
| title        | 标题                                     | string          | —                           | —      |
| cancelText   | 取消按钮文字                             | string          | —                           | —      |
| okText       | 确认按钮文字                             | string          | —                           | —      |
| mask         | 是否显示遮罩层                           | boolean         | true / false                | true   |
| maskClosable | 是否点击遮罩关闭抽屉                     | boolean         | true / false                | false  |
| width        | 抽屉宽度                               | string / number | —                           | 480    |
| height       | 抽屉高度(只有上方弹出，下方弹出时可设置) | string / number | —                           | 300    |
| top       | 抽屉出现位置距离可视区上方距离 | string / number | —                           | 0    |
| bottom       | 抽屉出现位置距离可视区下方距离 | string / number | —                           | 0    |
| let      | 抽屉出现位置距离可视区左方距离 | string / number | —                           | 0    |
| right      | 抽屉出现位置距离可视区右方距离 | string / number | —                           | 0    |
| position     | 抽屉弹出位置                             | string          | lest / bottom / right / top | right  |


### Event {.component__content}
| 属性   | 说明               | 类型     | 可选值 | 默认值 |
| ------ | ------------------ | -------- | ------ | ------ |
| ok     | 确认按钮执行的事件 | function | —      | —      |
| cancel | 取消按钮执行的事件 | function | —      | —      |
### Slot {.component__content}
| 属性   | 说明   | 类型 | 可选值 | 默认值 |
| ------ | ------ | ---- | ------ | ------ |
| header | 头部   | slot | —      | —      |
| body   | 内容区 | slot | —      | —      |
| footer | 底部   | slot | —      | —      |