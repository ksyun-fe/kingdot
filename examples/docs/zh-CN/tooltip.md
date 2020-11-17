### Tooltip 文字提示
常用于展示鼠标 hover 时的提示信息。

:::demo #基础用法  ##使用Tooltip包裹需要展示提示的元素，使用content指定文本，设置不同位置，支持disabled、canHover、value/v-model等

```html
<template>
    <div>
        <kd-tooltip placement="top" content="">
            <span>don't show anything if content is empty</span>
        </kd-tooltip>
        <br />
        <kd-tooltip placement="top" content="disabled" disabled>
            <Button class="btn">disabled</Button>
        </kd-tooltip>
        <kd-tooltip placement="top" content="can hover" canHover>
            <Button type="primary" class="btn">canHover</Button>
        </kd-tooltip>
        <kd-tooltip placement="top" content="no arrow" :showArrow="false" effect="dark">
            <Button class="btn">no arrow</Button>
        </kd-tooltip>
        <kd-tooltip placement="top-start" content="always be by your side" effect="dark" always>
            <Button class="btn">always</Button>
        </kd-tooltip>
        <br />
        <kd-tooltip placement="top" content="show delay 1s" effect="dark" :mouseEnterDelay="1">
            <Button class="btn">show delay 1s</Button>
        </kd-tooltip>
        <kd-tooltip placement="top" content="hide delay 1s" effect="dark" :mouseLeaveDelay="1">
            <Button class="btn">hide delay 1s</Button>
        </kd-tooltip>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showTip: false
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

:::demo #触发方式  ##使用`trigger`指定触发方式，可选`hover`、`focus`、`click`，默认为`hover`，在悬浮触发情况下，鼠标离开触发器，弹层就会消失，如果我们需要鼠标能离开触发器并悬浮在弹层上，需要添加canHover属性。

```html
<template>
    <div>
        <kd-tooltip v-for="item in trigger" :key="item" placement="top" content="prompt text" :trigger="item">
            <Button type="primary" class="btn">{{ item }}</Button>
        </kd-tooltip>
        <br />
        <kd-tooltip placement="top" content="account" trigger="focus" effect="dark">
            <input class="demo-input" />
        </kd-tooltip>
        <br />
        <kd-tooltip placement="top" content="password" trigger="focus" effect="dark">
            <input class="demo-input" type="password" />
        </kd-tooltip>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                trigger: ['hover', 'focus', 'click']
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
    .demo-input
        height 32px
        margin-bottom 10px
        border 1px solid #ccc
</style>
```

:::

:::demo #主题  ##组件内置两个主题`light`、`dark`，默认为`light`。

```html
<template>
    <div>
        <kd-tooltip placement="top" content="light theme">
            <Button class="btn">light</Button>
        </kd-tooltip>
        <kd-tooltip placement="top" content="dark theme" effect="dark">
            <Button type="primary" class="btn">dark</Button>
        </kd-tooltip>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

:::demo #更多content  ##content属性、slot。

```html
<template>
    <div>
        <kd-tooltip placement="top" content="dark theme" canHover effect="dark">
            <Button type="primary" class="btn">Content</Button>
            <template slot="content">
                <kd-tooltip placement="top" content="light">
                    <Button type="primary">dark</Button>
                </kd-tooltip>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

:::demo #位置：12个不同的展示方式  ##由`placement`属性决定展示效果：`placement`属性值为：`方向-对齐位置`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为`空`。如`placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

```html
<template>
    <div class="position">
        <div class="top">
            <kd-tooltip placement="top-start" content="position: topLeft">
                <Button type="primary" class="btn">上左</Button>
            </kd-tooltip>
            <kd-tooltip placement="top" content="position: top">
                <Button type="primary" class="btn">上边</Button>
            </kd-tooltip>
            <kd-tooltip placement="top-end" content="position: topRight">
                <Button type="primary" class="btn">上右</Button>
            </kd-tooltip>
        </div>
        <div class="left">
            <kd-tooltip placement="left-start">
                <Button type="primary" class="btn">左上</Button>
                <template slot="content">
                    <div>position:</div>
                    <div>left-start</div>
                </template>
            </kd-tooltip>
            <kd-tooltip placement="left">
                <Button type="primary" class="btn">左边</Button>
                <template slot="content">
                    <div>position:</div>
                    <div>left</div>
                </template>
            </kd-tooltip>
            <kd-tooltip placement="left-end">
                <Button type="primary" class="btn">左下</Button>
                <template slot="content">
                    <div>position:</div>
                    <div>left-end</div>
                </template>
            </kd-tooltip>
        </div>
        <div class="right">
            <kd-tooltip placement="right-start">
                <Button type="primary" class="btn">右上</Button>
                <template slot="content">
                    <div>position:</div>
                    <div>right-start</div>
                </template>
            </kd-tooltip>
            <kd-tooltip placement="right">
                <Button type="primary" class="btn">右边</Button>
                <template slot="content">
                    <div>position:</div>
                    <div>right</div>
                </template>
            </kd-tooltip>
            <kd-tooltip placement="right-end">
                <Button type="primary" class="btn">右下</Button>
                <template slot="content">
                    <div>position:</div>
                    <div>right-end</div>
                </template>
            </kd-tooltip>
        </div>
        <div class="bottom">
            <kd-tooltip placement="bottom-start" content="position: bottom-start">
                <Button type="primary" class="btn">下左</Button>
            </kd-tooltip>
            <kd-tooltip placement="bottom" content="position: bottom">
                <Button type="primary" class="btn">下边</Button>
            </kd-tooltip>
            <kd-tooltip placement="bottom-end" content="position: bottom-end">
                <Button type="primary" class="btn">下右</Button>
            </kd-tooltip>
        </div>
    </div>
</template>
<script>
    export default {}
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
    .position
        width 400px
        .top
            text-align center
        .left
            width 80px
            float left
        .right
            width 80px
            float right
        .bottom
            clear both
            text-align center
</style>
```

:::

:::demo #高级扩展  ##组件使用了[Pooperjs](https://popper.js.org/docs/v2/modifiers/)弹层定位引擎，可以自定义出更多高级用法。属性popperModifiers可指定弹层的修饰器。

```html
<template>
    <div>
        <kd-tooltip
            placement="bottom"
            content="hello world"
            trigger="click"
            canHover
            :showArrow="false"
            effect="dark"
            :popperModifiers="popperModifiers"
        >
            <Button type="primary" class="btn">click</Button>
            <template slot="content">
                <div>menu1</div>
                <div>menu2</div>
                <div>menu3</div>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                popperModifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, -8] // [沿着参考元素移动的距离，沿着弹层放置方向移动的距离]
                        }
                    },
                    {
                        name: 'topLogger',
                        enabled: true,
                        phase: 'main', // popper分三个阶段：read，main，write，每个还可细分出before、after阶段
                        fn({ state }) {
                            console.log(`Popper is on the ${state.placement}`);
                        }
                    }
                ]
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .btn
        margin 10px
</style>
```

:::

### Tooltip属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value/v-model    | 是否展示的绑定值 | `Boolean` | `true|false` | `false` |
| effect    | 默认提供的主题 | `String` | `dark|light` | `light` |
| placement    | 不同位置展示效果 | `String` | `top, top-start, top-end, right, right-start, right-end, bottom, bottom-start, bottom-end, left, left-start, left-end` | `top` |
| trigger    | 触发方式 | `String` | `hover|focus|click` | `hover` |
| content    | 内容 | `String` | `--` | `--` |
| disabled    | 是否禁用（禁用不显示） | `Boolean` | `true|false` | `false` |
| canHover    | 对于hover模式，鼠标在进入弹层后弹层不会消失 | `Boolean` | `true|false` | `false` |
| showArrow    | 是否显示箭头 | `Boolean` | `true|false` | `true` |
| mouseEnterDelay    | 弹层延迟显示时间，单位s | `Number` | `-` | `0` |
| mouseLeaveDelay    | 弹层延迟隐藏时间，单位s | `Number` | `-` | `0` |
| popperModifiers    | 弹层修饰器 | `Object[]` | `[]` | `[]` |
| always    | 是否一直展示弹层 | `Boolean` | `true|false` | `false` |

### Tooltip slot {.component__content}

| 属性       | 说明           |
|---------- |--------        |
| default   | 弹层的参考元素（参考元素需要能接受mouseenter、mouseleave、foucus、click等事件）   |
| content   | 弹层内容        |

### 注意
参考元素需要能接受mouseenter、mouseleave、foucus、click等事件
