## Switch 
Switch is used for switching between two opposing states.

### Basic usage

:::demo  # Basic usage Bind v-model to a Boolean typed variable. The active-color and inactive-color attribute decides the background color in two states.Besides `default` size,Use attribute `size` to set additional sizes with `large`, `small` or `mini`。

```html
<template>
    <div>
        <KdSwitch v-model="val" size="mini"></KdSwitch>
        <KdSwitch v-model="val" size="small"></KdSwitch>
        <KdSwitch v-model="val" size="default"></KdSwitch>
        <KdSwitch v-model="val" size="large"></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: 'false',
            }
        }
    }
</script>
```
:::

### Text description

:::demo #Text description You can add `active-text` and `inactive-text` and `font-size` attribute to show texts。

```html
<template>
    <div>
        <KdSwitch
                v-model="val"
                active-text="open"
                inactive-text="close"
                font-size="14"
            ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: 'false',
            }
        }
    }
</script>
```
:::

### Extended value types

:::demo #Extended `value` types You can set `active-value` and `inactive-value` attributes. They both receive a `Boolean`, `String` or `Number` typed value.

```html
<template>
    <div>
        <KdSwitch
                v-model="val1"
                activeText="open"
                inactiveText="close"
                active-value="open"
                inactive-value="close"
            ></KdSwitch>
        <KdSwitch
            v-model="val2"
            activeText="open"
            inactiveText="close"
            :active-value="100"
            :inactive-value="10"
        ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val1: 'open',
                val2: 10
            }
        }
    }
</script>
```
:::

### custom size

:::demo #custom size Set the `width` and `height` properties to accept a `number` or `string` type.

```html
<template>
    <div>
        <KdSwitch
            v-model="val"
            :width="80"
            :height="32"
        ></KdSwitch>
        <KdSwitch
            v-model="val"
            :width="60"
            :height="18"
            @change="changeHandler"
        ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: true
            }
        },
        methods: {
            changeHandler(val) {
                console.log(`current status: ${val}`);
            }
        }
    }
</script>
```
:::

### Disabled

:::demo #Disabled Adding the `disabled` attribute disables Switch.

```html
<template>
    <div>
        <KdSwitch
                v-model="val"
                :disabled="true"
            ></KdSwitch>
        <KdSwitch
            v-model="val1"
            :disabled="true"
        ></KdSwitch>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                val: true,
                val1: false
            }
        }
    }
</script>
```
:::
### Attributes {.component__content}
| Attribute      | Description    | Type      | Accepted Values       | Default   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | binding value                   | boolean / number / string | —         |  —
| name           | switch 对应的 name属性     | string                    |  —       |  —
| size           | switch的尺寸              | string                    | mini / small / default / large |     default    
| width          | width of Switch              | number / string           |     —     |    —   
| height         | height of Switch              | number / string           |     —     |    —   
| activeValue    | switch value when in on state          | boolean / string / number |     —     |    —   
| inactiveValue  | switch value when in off state          | boolean / string / number |     —     |    —   
| active-text    | text displayed when in on state     | string	                 |     —     |   —
| inactive-text  | text displayed when in off state      | number / string           |     —     |    —   
| disabled  | whether Switch is disabled   | boolean  |     —     |    false   |

### Events {.component__content}
| Event Name      | Description    | Parameters |
|---------- |-------- |---------- |
| change | triggers when value changes | value after changing