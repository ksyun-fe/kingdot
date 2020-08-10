### Basic usage
:::demo #Basic usage There are four types of buttons: main button, secondary button, dotted button and text button.

```html
<template>
<div>
    <Input
            v-model="age"
    />
    <Input
            v-model="birthday"
            name="birthday"
    >
        <template v-slot:prefix>
            <p>wq</p>
        </template>
        <template v-slot:suffix>
            <p>wq</p>
        </template>
    </Input>
    <Input
            style="margin-top: 10px"
            v-model="url"
            name="url"    
    >
        <template v-slot:prepend>
                <span>http://</span>
        </template>
        <template v-slot:append>
                <span>.com</span>
        </template>
    </Input>
</div>
</template>
<script >
    export default{
        data() {
            return {
                birthday: '1993-02-03',
                age: 27,
                value: 278,
                url: 'baidu'
            }   
        },
       
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
