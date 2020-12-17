### Basic usage
:::demo #Basic usage There are four types of buttons: main button, secondary button, dotted button and text button.

```html
<template>
    <div>
        <Button>Default</Button>
        <Button type='dashed'>Default</Button>
        <Button type='primary'>Main</Button>
        <Button hollow>Hollow</Button>
        <Button text>Text</Button>
    </div>
</template>
```
:::

### Button use
:::demo #Button use How to use the main button, secondary button and text button.

```html
<template>
    <div>
        <div class='row'>
            <Button>Default</Button>
            <Button type='primary'>Main</Button>
            <Button type='success'>Success</Button>
            <Button type='warning'>Warning</Button>
            <Button type='danger'>Danger</Button>
        </div>
        <div class='row'>
            <Button hollow>Hollow</Button>
            <Button type='primary' hollow>Main</Button>
            <Button type='success' hollow>Success</Button>
            <Button type='warning' hollow>Warning</Button>
            <Button type='danger' hollow>Danger</Button>
        </div>
        <div class='row'>
            <Button text>Text</Button>
            <Button type='primary' text>Main</Button>
            <Button type='success' text>Success</Button>
            <Button type='warning' text>Warning</Button>
            <Button type='danger' text>Danger</Button>
        </div>
    </div>
</template>
```
:::


### Disable Button
:::demo #Disable Button Use disabled to define whether the button is available and accept a Boolean value.



```html
<template>
    <div>
        <Button disabled>Disable</Button>
        <Button disabled type='dashed'>Disable</Button>
        <Button disabled type='primary'>Main Disable</Button>
        <Button disabled text>Text Disable</Button>
    </div>
</template>
```
:::



### Icon Button
:::demo #Icon Button Use the icon property to add an icon to the button.

```html
<template>
    <div>
        <Button type='primary' loading></Button>
        <Button type='primary' loading>Loading</Button>
        <Button type='primary' icon='iconcuowu_tubiaoji'></Button>
        <Button type='primary' icon='iconzhengque_tubiaoji'>Icon before</Button>
        <Button type='success' icon='iconmimaxianshi'>Icon before</Button>
        <Button type='danger'>Icon after<i class="kdicon kd-icon-right iconsousuo"></i></Button>
    </div>
</template>
```

:::

### Round Button 
:::demo #Round There are two types of round buttons: circle and round.

```html
<template>
    <div>
        <Button icon='iconmoren_xinzeng' shape='circle'></Button>
        <Button type='primary' icon='iconmoren_xinzeng' shape='circle'></Button>
        <Button type='primary' icon='iconmoren_xinzeng' shape='round'>button</Button>
        <Button type='primary' shape='round'>button</Button> 
    </div>
</template>
```
:::

### Size
:::demo #Size There are two types of icon sizes: large and small.

```html
<template>
    <div>
        <div class='row'>
            <Button type='primary' size='large'>Large</Button>
            <Button type='primary'>Default</Button>
            <Button type='primary' size='small'>Small</Button>
        </div>
        <div class='row'>
            <Button type='primary' size='large' icon='iconmoren_xinzeng' shape='round'>Large</Button>
            <Button type='primary' icon='iconmoren_xinzeng' shape='round'>Default</Button>
            <Button type='primary' size='small' icon='iconmoren_xinzeng' shape='round'>Small</Button>
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

### Button group
:::demo #group An example of button group.

```html
<template>
    <div>
        <div class='row'>
            <Button-group>
                <Button type='primary' @click='test'>Menu</Button>
                <Button type='primary' icon='iconmoren_xinzeng' line></Button>
            </Button-group>
        </div>
        <div class='row'>
            <Button-group>
                <Button type='primary'>Menu1</Button>
                <Button type='primary' icon='iconmoren_xinzeng' line>Menu2</Button>
                <Button type='primary' icon='iconmoren_xinzeng' line>Menu3</Button>
            </Button-group>
        </div>
        <div class='row'>
            <Button-group>
                <Button>Menu1</Button>
                <Button icon='iconmoren_xinzeng'>Menu2</Button>
                <Button icon='iconmoren_xinzeng'>Menu3</Button>
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
| type     | Button type   | string    | default / primary / warning /danger / success | default
| size     | Button size   | string    | large / small |     —    |
| disabled  | Set disable status   | boolean  |     —     |    false   |
| text  | Set text type   | boolean  |     —     |    false   |
| hollow  | Set hollow type   | boolean  |     —     |    false   |
| shape  | Set shape type   | string  |     circle / round     |    —   |
| loading  | Set loading status   | boolean  |    —      |    false   |
| icon  | Icon class   | string  |     —     |    —   |
