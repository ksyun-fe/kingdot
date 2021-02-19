### 消息提示
:::demo #基础用法 ##`KingDot`注册了一个`$message`方法用于调用,用来显示成功、警告、消息、错误类的操作反馈。从顶部出现，5 秒后自动消失。可点击关闭按钮提前关闭，鼠标移入会暂停自动关闭，鼠标移出，自动关闭重新计时。

```html
<template>
    <div>
        <KdButton
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type || '默认提示'}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning', '']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type] ? this.$message[type](type) : this.$message('默认提示');
            }
        }
    }
</script>
```
:::


:::demo #自定义自动关闭时长 ##使用`duration`属性自定义自动关闭时长， 也可以作为第二参数传入。

```html
<template>
    <div>
        <KdButton 
                v-for="time in typeList"
                :key="time"
                style="margin-right: 10px; margin-bottom: 16px"
                @click="showMessage('success', time + 's', time)"
        >{{time + 's'}}</KdButton>

        <br>

        <KdButton 
                v-for="time in typeList"
                :key="'key' + time"
                style="margin-right: 10px"
                @click="showMessage2('success', time + 's', time)"
        >{{time + 's'}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: [1, 2, 3]
            }
        },
        methods: {
            showMessage(type, content, time) {
                this.$message[type](content, time * 1000 );
            },
            showMessage2(type, content, time) {
                this.$message[type]({
                    content,
                    duration: time * 1000
                });
            },
        }
    }
</script>
```
:::


:::demo #隐藏关闭按钮 ##使用`closable`属性隐藏关闭按钮;

```html
<template>
    <div>
        <KdButton 
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: '成功',
                    closable: false
                });
            }
        }
    }
</script>
```
:::

:::demo #自定义icon ##使用`iconClass`属性自定义 icon 类名;

```html
<template>
    <div>
        <KdButton 
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: type,
                    iconClass: "kd-icon-view"
                });
            },
        }
    }
</script>
```
:::



:::demo #位置调整 ##使用`center` 属性让文字居中，使用`offset` 属性设置顶部的偏移量;

```html
<template>
    <div>
        <KdButton 
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: type,
                    center: true,
                    offset: 200
                });
            },
        }
    }
</script>
```
:::


:::demo #隐藏文字前面的icon ##使用`hideIcon` 属性隐藏文字前面的 icon ;

```html
<template>
    <div>
        <KdButton 
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: type,
                    hideIcon: true
                });
            },
        }
    }
</script>
```
:::

:::demo #关闭的回调函数 ##使用`onClose`属性设置关闭时的回调函数, 参数为 message 实例;

```html
<template>
    <div>
        <KdButton
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: type,
                    onClose: (vm) => {
                        alert(vm.content + '关闭了');
                    }   
                });
            },
        }
    }
</script>
```
:::

:::demo #自定义类名 ##使用`customClass`属性增加自定义类名;

```html
<template>
    <div>
        <KdButton 
                v-for="type in typeList"
                :key="type"
                style="margin-right: 10px"
                @click="showMessage(type)"
        >{{type}}</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: 'KingDot注册了一个$message方法用于调用,用来显示成功dfdfgdf、警告、消息、错误类的操作反馈。从顶部出现，5 秒后自动消失。可点击关闭按钮提前关闭',
                    customClass: 'my-message-class-name'
                });
            },
        }
    }
</script>
<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .my-message-class-name
        box-shadow darkgrey 0 3px 5px 0
</style>
```
:::

:::demo #自定义展示内容 ##`content`属性可定义为函数返回 vnode 作为`content`内容；当`dangerouslyUseHTMLString`属性设置为 true，`content`就会被当作 HTML 片段处理，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击;

```html
<template>
    <div>
        <KdButton 
                style="margin-right: 10px"
                @click="showMessage('success')"
        >自定义展示内容VNode</KdButton>
        <KdButton 
                @click="showHtmlMessage('success')"
        >自定义展示内容Html</KdButton>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                typeList: ['success', 'error', 'info', 'warning']
            }
        },
        methods: {
            showMessage(type) {
                this.$message[type]({
                    content: () =>  {
                        const h = this.$createElement;
                        return h(
                            'div', 
                            { class: "my-message" },
                            '自定义展示内容'
                        );            
                    }
                });
            },
            showHtmlMessage(type) {
                this.$message[type]({
                    dangerouslyUseHTMLString: true,
                    content: '<div class="my-message">自定义展示内容Html</div>'
                });
            }
        }
    }
</script>
<style type="text/stylus" rel="stylesheet/stylus" lang="stylus">
    .my-message
        color blue
</style> 
```
:::

:::demo #当做组件使用 ##将 Message 当做组件定义在模板中，而非调用它的静态方法。`width`属性可自定义宽度

```html
<template>
    <div>
        <KdMessage style="margin-bottom: 10px">Message</KdMessage>
        <KdMessage :width="200" type="warning" style="margin-bottom: 10px">Message</KdMessage>
        <KdMessage width="300" type="success" style="margin-bottom: 10px">Message</KdMessage>
        <KdMessage width="auto" type="error">Message</KdMessage>
    </div>
</template>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| content     | 提示内容   | String / VNode    | - | undefined
| duration     | 提示展示多长时间后自动关闭，当传入0时，提示将会一直展示。单位ms   | Number    | - |     5000    |
| type  | 提示类型   | String  |     "info" / "error" / "success" / "warning"	 |    info   |
| closable  | 是否展示关闭按钮   | boolean  |     —     |    true   |
| hideIcon  | 是否隐藏文字前面的icon   | boolean  |     —     |    false   |
| offset  | Message 距离窗口顶部的偏移量, 只有静态方法有效  | Number  |     -     |    20   |
| center  | 文字是否居中   | boolean  |    —      |    false   |
| customClass  | 自定义类名   | string  |     —     |    —   |
| iconClass  | 自定义图标的类名   | string  |     —     |    —   |
| width  | 自定义宽度   | string/nunber  |     —     |    400   |
| dangerouslyUseHTMLString  | 是否将content属性作为HTML片段处理(v-html)   | boolean  |     —     |    false   |
| onClose  | 关闭时的回调函数, 参数为message 实例  | function  |     —     |    -  |

### 静态方法 {.component__content}
| 属性      | 说明             | 参数   |   返回值
|---------- |--------   |-------- |-------- 
| info     | 普通提示(Vm.$messages.info)  | content, duration / config(props对象) |   vm
| error     | 错误提示(Vm.$messages.error)  | content, duration / config(props对象) |   vm
| success     | 成功提示(Vm.$messages.success)  | content, duration / config(props对象) |   vm
| warning     | 警告提示(Vm.$messages.warning) | content, duration / config(props对象) |   vm
| close     | Message的实例方法，可以手动关闭实例 | - |   -

### 事件 {.component__content}
| 属性      | 说明             | 参数   |
|---------- |--------   |-------- |
| close     | 关闭当前的 Message  | vm

