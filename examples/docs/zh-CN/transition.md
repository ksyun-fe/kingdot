### 过渡动画
基于Vue原生transiton组件封装的动画组件。

:::demo #基本使用 ##元素展示或消失时候使用

```html
<template>
    <div>
        <span>类型：</span>
        <select v-model="type">
            <option v-for="(item, index) in types" :value="item" :key="index">{{ item }}</option>
        </select>

        <span>动作：</span>
        <select v-model="motion">
            <option v-for="(item, index) in motions" :value="item" :key="index">{{ item }}</option>
        </select>

        <Button @click="handleClick">{{ isShow ? '隐藏' : '展示' }}</Button>

        <div class="demo-main">
            <kd-transition :type="type" :motion="motion">
                <div class="big-text" v-show="isShow">
                    <div>xxxxxxxxx</div>
                    <span v-text="type" />&nbsp;<span v-text="motion" />
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
</style>
```
:::

### 属性 {.component__content}
|   属性    |   说明    |   类型    |   默认值  |
|---------- |-------- |---------- |-------------  |-------- |
| type     | 动画类型   | `String`    |     —    |
| motion     | 动画动作(部分可不填)   | `String` |    —    |
### 动画参数 {.component__content}
| slide        | zoom        | move        | swing        |fade        |collapse        |
|--------------|-------------|--------------|--------------|--------------|--------------|
| up           | 空值        | up           | 空值        | 空值        |空值        |
| down         | big         | down           |           |           |           |
| left         | big-fast    | left           |           |           |            |
| right        | up          | right           |           |           |            |
|              | down          |              |           |           |             |
|              | left          |              |           |           |             |
|              | right          |              |           |           |            |
