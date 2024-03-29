### Dropdown
移入或点击按钮，向下弹窗菜单。

:::demo #基本使用 ##选择器最简单的基本使用
```html
<template>
    <div class="dropdown-md">
        <kd-dropdown type="primary">
            <kd-button type="text">下拉菜单<i class="kdicon kd-icon-right kd-icon-arrow-down"></i></kd-button>
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item> 1 item </kd-dropdown-item>
                <kd-dropdown-item> 2 item </kd-dropdown-item>
                <kd-dropdown-item> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
        <kd-dropdown split-button>
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
    </div>
</template>
<style>
.dropdown-md > div:not(:first-child){
    margin-left:20px
}
</style>
```
:::


:::demo #事件用法 ##提供hover和click事件。默认为hover事件。

```html
<template>
    <div class="dropdown-md">
        <kd-dropdown split-button>
            菜单
            <kd-dropdown-menu slot="dropdown" @click="menuClick">
                <kd-dropdown-item value="1 menu item" @click="handleClick"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" @click="handleClick"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
        <kd-dropdown split-button trigger="click" @click="menuClick" >
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" @click="handleClick"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" @click="handleClick"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
    </div>
</template>
<script>
    export default{
        methods:{
            handleClick(value){
                console.log(value)
            },
            menuClick(){
                console.log('menuClick');
            }
        }
    }
</script>
```
:::

### 位置用法
:::demo #用法介绍 ##提供top和bottom两个方向的位置。

```html
<template>
    <div class="dropdown-md">
        <kd-dropdown split-button>
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" @click="handleClick"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" @click="handleClick"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu >
        </kd-dropdown>
        
        <kd-dropdown split-button trigger="click" @click="handBtnClick" placement="top">
            菜单
            <kd-dropdown-menu slot="dropdown">

                <kd-dropdown-item value="1 menu item" @click="handleClick"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" @click="handleClick"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
    </div>
</template>
<script>
    export default{
        methods:{
            handleClick(value){
                console.log(value)
            },
            handBtnClick(){
                console.log('menuClick');
            }
        }
    }
</script>
```
:::

### 隐藏方式用法
:::demo #用法介绍 ##click事件隐藏方式默认是点击菜单隐藏。

```html
<template>
    <div class="dropdown-md">
        <kd-dropdown trigger="click" split-button>
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" @click="handleClick"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" @click="handleClick"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
        
        <kd-dropdown split-button trigger="click" @click="handBtnClick" :click-hide="false">
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" @click="handleClick"> 1 item test button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" @click="handleClick"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                menuShow:true
            }
        },
        methods:{
            handleClick(value){
                console.log(value)
            },
            handBtnClick(){
                console.log('handBtnClick');
            }
        }
    }
</script>
```
:::

### 大小用法
:::demo #用法介绍 ##和button一样拥有test和small类型。

```html
<template>
    <div class="dropdown-md">
        <kd-dropdown split-button size="large"> 
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item"> 1 item large button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item"> 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
        <kd-dropdown split-button> 
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" > 1 item default button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" > 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
        <kd-dropdown split-button size="small"> 
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" > 1 item small button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" > 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
        <kd-dropdown split-button size="mini"> 
            菜单
            <kd-dropdown-menu slot="dropdown">
                <kd-dropdown-item value="1 menu item" > 1 item mini button </kd-dropdown-item>
                <kd-dropdown-item value="2 menu item" > 2 item </kd-dropdown-item>
                <kd-dropdown-item value="3 menu item" disabled dividedLine> 3 item </kd-dropdown-item>
            </kd-dropdown-menu>
        </kd-dropdown>
    </div>
</template>
```
:::


### Dropdown Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 按钮类型，同button一样   | string    | default / dashed / primary / warning / danger / success
| size     | 按钮尺寸,同button一样   | string    | large / default / small / mini |     —   |
| trigger  | 触发按钮的下拉操作   | string |     hover / click     |    hover   
| splitButton  | 按钮组合   | boolean |   —    |    false   
| clickHide  | 点击item是否隐藏菜单   | boolean |   —    |    true   
| showArrow  | 是否显示箭头   | boolean |   true｜false    |    true   
| placement  | 菜单显示的位置   | string |   top / bottom    |    bottom   
| contentClass | 	弹层内容添加类名 |	String | — | —  | 
| hideDestroy    | 弹层隐藏后是否销毁dom   |  Boolean    |  —  | false |

### Dropdown Events {.component__content}
| 属性      | 说明    | 回调   |
|---------- |-------- |---------- |
| click  | split-button为true，左侧按钮点击的回调   | — |
| menuChange | 菜单展示/隐藏事件的回调 | — |


### Dropdown Item Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled  | 禁用   | boolean |     —     |    false
| dividedLine  | 分割线   | boolean |   —    |    false   
| value  | 绑定值   | number / string / object |   —    |    —   

### Dropdown Item Events {.component__content}
| 属性      | 说明    | 回调   |
|---------- |-------- | ---------- |
| click | 菜单项点击事件的回调 | Event,value |