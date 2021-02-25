### 基础用法
:::demo #基础用法 ##Dialog主要有3种类型：默认弹窗、message类弹窗、提示弹窗。

```html
<template>
    <div>
        <kd-button @click="openDialog">点击打开默认Dialog</kd-button>
        <kd-dialog v-model="showDialog" :disableOk="disableOk" :ok="OK" width="800" height="800">{{num}}</kd-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                showDialog:false,
                disableOk:false,
                num:1
            }
        },
        methods:{
            openDialog(){
                this.showDialog = true;
            },
            OK(dialog){
                dialog.showLoading()
                this.num++
                setTimeout(function(){ 
                    dialog.hideLoading()
                }, 2000);
            }
        }
    }
</script>
```

:::
### Dialog使用
:::demo #Dialog使用 ##message类弹窗、提示弹窗的使用方法。

```html
<template>
    <div>
        <div class='row'>
            <kd-button @click="openMessageDialog">提示信息居中Dialog</kd-button>
            <kd-button @click="openMessageDialogNoFooter">提示信息居中无底部Dialog</kd-button>
            <kd-button @click="openMessageConfirmDialog">二次确认无标题类型Dialog</kd-button>
            <kd-button @click="openMessageConfirmTitleDialog">二次确认有标题类型Dialog</kd-button>
        </div>
        <div class='row'>
            <kd-button @click="openTipsDialog">提示类不居中Dialog</kd-button>
            <kd-button @click="openDialog">自定义body类Dialog</kd-button>
        </div>
        <kd-dialog v-model="showMessageDialog"
                type="tips"
                :showTitle="false" 
                icon="success"
                tipsTitle="操作成功"
                :tipsMessage="additionalTips"
                :tipsIsCenter="true"></kd-dialog>
        <kd-dialog v-model="showMessageDialog_noBottom"
                type="tips"
                :showTitle="false" 
                icon="warning"
                tipsTitle="警告"
                :tipsMessage="additionalTips"
                :showFooter="false"
                :tipsIsCenter="true"></kd-dialog>
        <kd-dialog v-model="showMessageDialog_confirm"
                type="confirm"
                :showTitle="false" 
                icon="warning"
                :confirmTips="confirmTips">
                
            <div slot="footer">
                <kd-button type="primary" @click="()=>{showMessageDialog_confirm=false}">确定</kd-button>
            </div>
        </kd-dialog>
        <kd-dialog v-model="showMessageDialog_confirmTitle"
                type="confirm"
                :showTitle="false" 
                icon="failed"
                :confirmTips="confirmTips"
                :confirmTitle="confirmTitle">
            <!-- <div slot="footer">
                <kd-button type="primary" @click="()=>{showMessageDialog_confirmTitle=false}">确定</kd-button>
            </div> -->
        </kd-dialog>

        <kd-dialog v-model="showTipsDialog" 
                type="tips" 
                :showTitle="false" 
                icon="success"
                tipsTitle="这是一条成功通知信息"
                tipsMessage="提示信息"
                ></kd-dialog>
         <kd-dialog title="创建提醒" v-model="showDialog">
            <p style="text-align:left">该任务暂未创建tensorboard</p>
            <p style="text-align:left; color:red">是否要创建？</p>
         </kd-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                showMessageDialog:false,
                additionalTips:'附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。',
                showMessageDialog_noBottom:false,
                confirmTips:'还可以自定义底部哟！！！',
                showMessageDialog_confirm:false,
                confirmTitle:'二次确认标题',
                showMessageDialog_confirmTitle:false,

                //提示类
                showTipsDialog:false,
                showDialog:false,
            }
        },
        methods:{
            openMessageDialog(){
                this.showMessageDialog = true;
            },
            openMessageDialogNoFooter(){
                this.showMessageDialog_noBottom = true
            },
            openMessageConfirmDialog(){
                this.showMessageDialog_confirm = true
            },
            openMessageConfirmTitleDialog(){
                this.showMessageDialog_confirmTitle = true;
            },
            openTipsDialog(){
                this.showTipsDialog = true;
            },
            openDialog(){
                this.showDialog = true
            }
        }
    }
</script>
<style scoped lang="stylus">
    .row .kd-btn{
        margin-left: 10px
    }

</style>
```

:::
### 内容部分增加滚动
:::demo #增加滚动的Dialog使用 ##该属性需结合height一起使用。设置一定的高度，超出部分增加滚动
```html
<template>
    <div>
        <kd-button @click="openMessageDialog">增加滚动的Dialog</kd-button>
        <kd-dialog title="创建提醒" v-model="showDialog" height="200" :isScroll="true">
            <div>
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
                附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。
            </div>
         </kd-dialog>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                showDialog:false
            }
        },
        methods:{
            openMessageDialog(){
                this.showDialog = true
            }
        }
    }
</script>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | dialog的显示与隐藏   | string    | false/true | false |
| title  | 标题   | String  |     —     |    -   |
| showTitle  |  是否显示标题  | Boolean  |     true/false     |    true   |
| modal     | 是否显示遮罩层   | Boolean    | true/false |     true    |
| showClose  | 是否显示关闭按钮   | Boolean  |     true/false    |    true   |
| showFooter  | 是否显示底部   | Boolean  |     true/false     |    true   |
| type  | 类型   | String  |     default/message/tips     |    default   |
| icon  | 图标类名 type为message，tips   | string  |     —     |    —   |
| width | 宽度 | String/Number | - |-|
| height | 内容部分高度 | String/Number | - |-|
| isScroll | dialog的内容部分，是否滚动，需与height结合使用 | Boolean | true/false | false|
| center | 是否对头部和底部采用居中布局 | Boolean | true/false | false |
| clickModalToClose| 点击遮罩，关闭对话框 | Boolean | true/false | false |
| cancelText | 取消按钮的文案 | String | - | 取消 |
| okText | 确认按钮的文案 | String | - | 确认 |
| disableOk | 确认按钮是否禁用 | Boolean | true/false | false |
| confirmTitle | 二次确认的标题，type为message | String | - | - |
| confirmTips | 二次确认的附加消息，type为message | String | - | - |
| tipsTitle | 图标的标题 | String | - | - |
| tipsMessage | 附加信息 | String | - | - |

### 事件 {.component__content}
| 事件名 | 说明|
|---------- |-------- |
| cancel | dialog取消按钮回调 | 
| ok | dialog确认按钮回调|

### 方法 {.component__content}
| 方法 | 说明|
|---------- |-------- |
| showLoading | 展示加载图标 | 
| hideLoading | 隐藏加载图标 |