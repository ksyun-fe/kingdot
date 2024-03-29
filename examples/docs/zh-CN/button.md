:::demo #基础用法 ##按钮主要有4中类型：主要按钮，次要按钮，虚线按钮，文字按钮。

```html
<template>
    <div class='row'>
        <kd-button>默认按钮</kd-button>
        <kd-button type='dashed' clickDelay>默认按钮</kd-button>
        <!-- 有权限 -->
        <kd-button type='primary' :authid="authid">有权限按钮</kd-button>
        <!-- 有权限 但是禁用-->
        <kd-button type='primary' :authid="authid" disabled>有权限但被禁用按钮</kd-button>
        <!-- 无权限 -->
        <kd-button type='primary' :authid="authid1">无权限按钮</kd-button>
        <kd-button hollow>空心按钮</kd-button>
        <kd-button type='none'>文字按钮</kd-button>
        <kd-button type='text' href="#/zh-CN/component/installation" target="_blank">链接按钮</kd-button>
        <kd-button type='text'>链接按钮</kd-button>
        <kd-button type='text' @click="doSomething">链接按钮</kd-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                authid:'primary_btn',
                authid1: 'primary_btn1'
            }
        },
        methods:{
            doSomething(){
                location.href="http://localhost:8001/#/zh-CN/component/table"
            }
        }
    }
</script>
<style scoped>
.row .kd-btn{
    margin-left:20px
}
</style>
```
:::

:::demo #按钮使用 ##主要按钮、次要按钮、文字按钮的使用方法。

```html
<template>
    <div>
        <div class='row'>
            <kd-button>默认按钮</kd-button>
            <kd-button type='primary'>主要按钮</kd-button>
            <kd-button type='success'>成功按钮</kd-button>
            <kd-button type='warning'>警告按钮</kd-button>
            <kd-button type='danger'>危险按钮</kd-button>
        </div>
        <div class='row comp-top'>
            <kd-button hollow>空心按钮</kd-button>
            <kd-button type='primary' hollow>主要按钮</kd-button>
            <kd-button type='success' hollow>成功按钮</kd-button>
            <kd-button type='warning' hollow>警告按钮</kd-button>
            <kd-button type='danger' hollow>危险按钮</kd-button>
        </div>
    </div>
</template>
<style scoped>
.row .kd-btn{
    margin-left:20px
}
</style>
```
:::


:::demo #禁用按钮 ##使用disabled定义按钮是否可用，接受一个Boolean值。

```html
<template>
    <div class='row'>
        <kd-button @click="handleDisabledText">默认禁用按钮</kd-button>
        <kd-button disabled>默认禁用按钮</kd-button>
        <kd-button disabled type='dashed'>默认禁用按钮</kd-button>
        <kd-button disabled type='primary'>主要禁用按钮</kd-button>
        <kd-button disabled type='text'>text禁用按钮</kd-button>
        <kd-button disabled type='none'>none禁用按钮</kd-button>
        <kd-button :disabled="disabledText" type='text' href="#/zh-CN/component/installation" target="_blank">链接按钮</kd-button>
    </div>
</template>
<style scoped>
.row .kd-btn{
    margin-left:20px
}
</style>
<script>
    export default {
        data(){
            return{
                disabledText: false
            }
        },
        methods:{
            handleDisabledText(){
                this.disabledText = !this.disabledText
            }
        }
    }
</script>
```
:::

:::demo #Loading按钮 & 图标按钮 ##使用icon属性给按钮添加图标。

```html
<template>
    <div class='row'>
        <kd-button type='primary' loading></kd-button>
        <kd-button type='primary' loading>加载中</kd-button>
        <kd-button type='none' loading>文字按钮</kd-button>
        <!-- showLoading & hideLoading -->
        <kd-button type='primary' ref='loadingButon' @click="handleLoading">{{loadingText}}</kd-button>
        <kd-button type='primary' icon='kd-icon-more'></kd-button>
        <kd-button type='primary' icon='kd-icon-plus'>图标在前</kd-button>
        <kd-button type='danger'>图标在后<i class="kd-icon-right kd-icon-more"></i></kd-button>
    </div>
</template>
<style scoped>
.row .kd-btn{
    margin-left:20px
}
</style>
<script>
    export default {
        data(){
            return{
                loadingText:'按钮',
            }
        },
        methods:{
            handleLoading(){
                this.$refs.loadingButon.showLoading();
                this.loadingText = '加载中。。。'
                setTimeout(() => {
                    this.$refs.loadingButon.hideLoading();
                    this.loadingText = '加载完成'
                }, 3000)
            }
        }
    }
</script>
```

:::

:::demo #圆形按钮 ##圆形按钮有circle和round两种类型。

```html
<template>
    <div class='row'>
        <kd-button icon='kd-icon-arrow-right' shape='circle'></kd-button>
        <kd-button type='primary' icon='kd-icon-arrow-right' shape='circle'></kd-button>
        <kd-button type='primary' shape='round'>按钮</kd-button>
    </div>
</template>
<style scoped>
.row .kd-btn{
    margin-left:20px
}
</style>
```
:::

:::demo #按钮大小 ##图标大小有两种类型，large、small。

```html
<template>
    <div>
        <div class='row'>
            <kd-button type='primary' size='large'>大按钮</kd-button>
            <kd-button type='primary'>默认按钮</kd-button>
            <kd-button type='primary' size='small'>小按钮</kd-button>
            <kd-button type='primary' size='mini'>小按钮</kd-button>
        </div>
        <div class='row comp-top'>
            <kd-button type='primary' size='large' shape='round'>大按钮</kd-button>
            <kd-button type='primary' shape='round'>默认按钮</kd-button>
            <kd-button type='primary' size='small' shape='round'>小按钮</kd-button>
            <kd-button type='primary' size='mini' shape='round'>小按钮</kd-button>
        </div>
        <div class='row comp-top'>
            <kd-button type='primary' size='large' icon='kd-icon-arrow-right' shape='circle'></kd-button>
            <kd-button type='primary' icon='kd-icon-arrow-right' shape='circle'></kd-button>
            <kd-button type='primary' size='small' icon='kd-icon-arrow-right' shape='circle'></kd-button>
            <kd-button type='primary' size='mini' icon='kd-icon-arrow-right' shape='circle'></kd-button>
        </div>
    </div>
</template>
<style scoped>
.row .kd-btn{
    margin-left:20px
}
</style>
```
:::

:::demo #按钮组合 ##button-group的按钮组合。

```html
<template>
    <div>
        <div>
            <kd-button-group>
                <kd-button type='primary' @click='handleClick'>菜单</kd-button>
                <kd-button type='primary' split icon='kd-icon-arrow-down'></kd-button>
            </kd-button-group>
        </div>
        <div class='comp-top'>
            <kd-button-group>
                <kd-button type='primary'>按钮1</kd-button>
                <kd-button type='primary' icon='iconmoren_xinzeng'>按钮2</kd-button>
                <kd-button type='primary' icon='iconmoren_xinzeng'>按钮3</kd-button>
            </kd-button-group>
        </div>
        <div class='comp-top'>
            <kd-button-group>
                <kd-button>按钮1</kd-button>
                <kd-button>按钮2</kd-button>
                <kd-button>按钮3</kd-button>
            </kd-button-group>
        </div>
        <div class='comp-top'>
            <kd-button-group checkType="radio" v-model="radioValue" >
                <kd-button value="1" >按钮1</kd-button>
                <kd-button value="2">按钮2</kd-button>
                <kd-button value="3" >按钮3</kd-button>
            </kd-button-group>
        </div>
        <div class='comp-top'>
            <kd-button-group checkType="checkbox" v-model="checkboxValue" :disabled="disabled">
                <kd-button value="1" >按钮1</kd-button>
                <kd-button value="2">按钮2</kd-button>
                <kd-button value="3">按钮3</kd-button>
            </kd-button-group>
        </div>
         <kd-button @click="handleClick">按钮1</kd-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                radioValue:'1',
                checkboxValue:['1'],
                disabled:true,
            }
        },
        methods:{
            handleClick(e){
                console.log('handleClick');
                this.disabled = false
            }

        },
        watch:{
            checkboxValue(v){
                console.log(v)
            },
            radioValue(v){
                console.log(v)
            }
        }
    }
</script>
<style scoped>
.comp-top{
    margin-top:20px
}
</style>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 按钮类型   | string    | default / dashed / primary / warning / danger / success / none /text | default
| size     | 按钮尺寸   | string    | large / default / small / mini |     —    |
| disabled  | 设置禁用状态   | boolean  |     —     |    false   |
| hollow  | 设置空心类型   | boolean  |     —     |    false   |
| shape  | 圆形按钮   | string  |     circle / round     |    —   |
| loading  | 设置加载中状态   | boolean  |    —      |    false   |
| icon  | 图标类名   | string  |     —     |    —   |
| split  | 按钮组合icon的样式   | boolean  |     —     |    false   |
| check-type  | 按钮组合样式只能在group中使用   | string  |    radio/checkbox     |    false   |
| native-type  | 原生type属性   | string  |    submit / button / reset     |    —   |
| clickDelay  | 延时属性：点击按钮后有delayTime毫秒，按钮处于禁用状态   | Boolean  |    true/false     |    false   |
| delayTime  | 延时时长属性：点击按钮后，按钮处于禁用状态的时长   | Number  |    -     |    3000   |
| authid  | 权限属性   | String  |    -     |    -   |
