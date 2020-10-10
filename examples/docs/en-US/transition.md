### Transition
Base on Vue native transition component.

:::demo #Basic Usage ##Use transition when element hide or show

```html
<template>
    <div>
        <span>type：</span>
        <select v-model="type">
            <option v-for="(item, index) in types" :value="item" :key="index">{{ item }}</option>
        </select>

        <span>motion：</span>
        <select v-model="motion">
            <option v-for="(item, index) in motions" :value="item" :key="index">{{ item }}</option>
        </select>

        <Button @click="handleClick">{{ isShow ? 'hide' : 'show' }}</Button>

        <div class="demo-main">
            <kd-transition :type="type" :motion="motion">
                <div class="big-text" v-show="isShow">
                    <div class="demo-content">
                        <span v-text="type" />&nbsp;<span v-text="motion" />
                    </div>
                </div>
            </kd-transition>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isShow: true,
                type: "collapse",
                types: ['collapse', 'fade', 'move', 'slide', 'swing', 'zoom'],
                motion: "",
                motions: [],
            }
        },
        watch: {
            type(v) {
                if (v === "collapse" || v === 'swing' || v === 'fade') {
                    this.motion = "";
                    this.motions = [''];
                } else if (v === "slide" || v === 'move') {
                    this.motion = "up";
                    this.motions = ['up', 'down', 'left', 'right'];
                } else if (v === 'zoom') {
                    this.motion = "";
                    this.motions = ['', 'big', 'big-fast', 'up', 'down', 'left', 'right'];
                }
                this.isShow = true;
            },
        },
        methods: {
            handleClick() {
                this.isShow = !this.isShow;
            },
        }
    }
</script>
<style lang="stylus" scoped>
    .demo-main
        height 120px
        margin 20px
    .big-text
        font-size 36px
        font-weight 900
        padding 24px 48px
        border-radius 8px
        border 1px solid #ccc
        /* .demo-content
            padding 24px 48px */
</style>
```
:::

### Attributes {.component__content}
|   Attribute    |   Description    |   Type    |   Default  |
|---------- |-------- |---------- |-------------  |-------- |
| type     | transition type   | string    |     —    |
| motion     | transition motion(Part is optional)   | string |    —    |
### Animation parameters {.component__content}
| slide        | zoom        | move        | swing        |fade        |collapse        |
|--------------|-------------|--------------|--------------|--------------|--------------|
| up           | --        | up           | --        | --        |--        |
| down         | big         | down           |           |           |           |
| left         | big-fast    | left           |           |           |            |
| right        | up          | right           |           |           |            |
|              | down          |              |           |           |             |
|              | left          |              |           |           |             |
|              | right          |              |           |           |            |
