### 基础用法
:::demo #基础用法 ##按钮主要有4中类型：主要按钮，次要按钮，虚线按钮，文字按钮。

```html
<template>
    <div>
        <Button>默认按钮</Button>
        <Button type='dashed'>默认按钮</Button>
        <Button type='primary'>主要按钮</Button>
        <Button hollow>空心按钮</Button>
        <Button text>文字按钮</Button>
    </div>
</template>
```
:::

### 按钮使用
:::demo #按钮使用 ##主要按钮、次要按钮、文字按钮的使用方法。

```html
<template>
    <div>
        <div class='row'>
            <Button>默认按钮</Button>
            <Button type='primary'>主要按钮</Button>
            <Button type='success'>成功按钮</Button>
            <Button type='warning'>警告按钮</Button>
            <Button type='danger'>危险按钮</Button>
        </div>
        <div class='row'>
            <Button hollow>空心按钮</Button>
            <Button type='primary' hollow>主要按钮</Button>
            <Button type='success' hollow>成功按钮</Button>
            <Button type='warning' hollow>警告按钮</Button>
            <Button type='danger' hollow>危险按钮</Button>
        </div>
        <div class='row'>
            <Button text>文字按钮</Button>
            <Button type='primary' text>主要按钮</Button>
            <Button type='success' text>成功按钮</Button>
            <Button type='warning' text>警告按钮</Button>
            <Button type='danger' text>危险按钮</Button>
        </div>
    </div>
</template>
```
:::


### 禁用按钮
:::demo #禁用按钮 ##使用disabled定义按钮是否可用，接受一个Boolean值。

```html
<template>
    <div>
        <Button disabled>默认禁用按钮</Button>
        <Button disabled type='dashed'>默认禁用按钮</Button>
        <Button disabled type='primary'>主要禁用按钮</Button>
        <Button disabled text>text禁用按钮</Button>
    </div>
</template>
```
:::



### 图标按钮
:::demo #图标按钮 ##使用icon属性给按钮添加图标。

```html
<template>
    <div>
        <Button loading></Button>
        <Button type='primary' loading></Button>
        <Button type='primary' loading>加载中</Button>
        <Button type='primary' icon='iconcuowu_tubiaoji'></Button>
        <Button type='primary' icon='iconzhengque_tubiaoji'>图标在前</Button>
        <Button type='success' icon='iconmimaxianshi'>图标在前</Button>
        <Button type='danger'>图标在后<i class="kdicon kd-icon-right iconsousuo"></i></Button>
    </div>
</template>
```

:::

### 圆形按钮
:::demo #图标按钮 ##圆形按钮有circle和round两种类型。

```html
<template>
    <div>
        <Button icon='iconmoren_xinzeng' shape='circle'></Button>
        <Button type='primary' icon='iconmoren_xinzeng' shape='circle'></Button>
        <Button type='primary' icon='iconmoren_xinzeng' shape='round'>按钮</Button>
        <Button type='primary' shape='round'>按钮</Button>
    </div>
</template>
```
:::

### 按钮大小
:::demo #按钮大小 ##图标大小有两种类型，large、small。

```html
<template>
    <div>
        <div class='row'>
            <Button type='primary' size='large'>大按钮</Button>
            <Button type='primary'>默认按钮</Button>
            <Button type='primary' size='small'>小按钮</Button>
        </div>
        <div class='row'>
            <Button type='primary' size='large' icon='iconmoren_xinzeng' shape='round'>大按钮</Button>
            <Button type='primary' icon='iconmoren_xinzeng' shape='round'>默认按钮</Button>
            <Button type='primary' size='small' icon='iconmoren_xinzeng' shape='round'>小按钮</Button>
        </div>
        <div class='row'>
            <Button type='primary' size='large' icon='iconmoren_xinzeng' shape='circle'></Button>
            <Button type='primary' icon='iconmoren_xinzeng' shape='circle'></Button>
            <Button type='primary' size='small' icon='iconmoren_xinzeng' shape='circle'></Button>
        </div>
    </div>
</template>
```
:::

### 按钮组合
:::demo #按钮组合 ##button-group的按钮组合。

```html
<template>
    <div>
        <div class='row'>
            <Button-group>
                <Button type='primary' @click='test'>菜单</Button>
                <Button type='primary' icon='iconmoren_xinzeng' line></Button>
            </Button-group>
        </div>
        <div class='row'>
            <Button-group>
                <Button type='primary'>按钮1</Button>
                <Button type='primary' icon='iconmoren_xinzeng' line>按钮2</Button>
                <Button type='primary' icon='iconmoren_xinzeng' line>按钮3</Button>
            </Button-group>
        </div>
        <div class='row'>
            <Button-group>
                <Button>按钮1</Button>
                <Button icon='iconmoren_xinzeng'>按钮2</Button>
                <Button icon='iconmoren_xinzeng'>按钮3</Button>
            </Button-group>
        </div>
    </div>
</template>
<script>
    export default {
        methods:{
            test(e){
                console.log('test')
            }
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
| disabled  | 设置禁用状态   | boolean  |     —     |    false   |
| text  | 设置文字类型   | boolean  |     —     |    false   |
| hollow  | 设置空心类型   | boolean  |     —     |    false   |
| shape  | 圆形按钮   | string  |     circle / round     |    —   |
| loading  | 设置加载中状态   | boolean  |    —      |    false   |
| icon  | 图标类名   | string  |     —     |    —   |
