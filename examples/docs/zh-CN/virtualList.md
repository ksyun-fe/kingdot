## VirtualList 虚拟列表
:::demo #基础用法 ##常规用法，固定尺寸的，垂直滚动。直接给传数组，需要指定key。

```html
<template>
    <div class='row'>
        <div class="btn">
            <kd-button @click="randomData(1000)">1k</kd-button>
            <kd-button @click="randomData(10000)">10k</kd-button>
            <kd-button @click="randomData(100000)">10w</kd-button>
            <kd-button @click="randomData(300000)">30w</kd-button>
            <kd-button @click="randomData(500000)">50w</kd-button>
            length: {{ length }}
        </div>
        <div>
            <kd-virtual-list
                class="list-test"
                data-key="value"
                :data-sources="dataSources"
                item-class="list-item"
                :estimate-size="30"
            >
                <template #item="{item, index, scope}">{{ item.name }}</template>
            </kd-virtual-list>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                dataSources: [],
                length: 0
            }
        },
        created() {
            this.randomData(1000);
        },
        methods:{
            randomData(length) {
                const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                let arr = Array.from({ length: length }).map((_, idx) => ({
                    value: `${initials[idx % 10]}${idx}`,
                    name: `${initials[idx % 10]}${idx}`,
                }))
                this.dataSources = arr;
                setTimeout(() => {
                    this.length = length;
                }, 0);
            }
        }
    }
</script>
<style lang="stylus">
.btn
    margin-bottom 20px
    .kd-btn
        margin-right 20px
.list-test
    height 300px
    border 2px solid #696969
    width 100%
    overflow-y auto
.list-item
    padding-left 10px
    height 30px
    display flex
    align-items center
    border-bottom 1px solid #d3d3d3
    box-sizing border-box
    &:hover
        background-color #f5f7fa
</style>
```
:::


:::demo #水平模式 ##支持水平滚动。

```html
<template>
    <div class='row'>
        <div class="btn">
            <kd-button @click="randomData(1000)">1k</kd-button>
            <kd-button @click="randomData(10000)">10k</kd-button>
            <kd-button @click="randomData(100000)">10w</kd-button>
            <kd-button @click="randomData(300000)">30w</kd-button>
            <kd-button @click="randomData(500000)">50w</kd-button>
            length: {{ length }}
        </div>
        <div>
            <kd-virtual-list
                class="list-test2"
                data-key="value"
                :data-sources="dataSources"
                item-class="list-item2"
                :estimate-size="100"
                direction="horizontal"
                wrap-class="wrapper"
                :keeps="100"
            >
                <template #item="{item}">{{ item.name }}</template>
            </kd-virtual-list>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                dataSources: [],
                length: 0
            }
        },
        created() {
            this.randomData(1000);
        },
        methods:{
            randomData(length) {
                const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
                let arr = Array.from({ length: length }).map((_, idx) => ({
                    value: `${initials[idx % 10]}${idx}`,
                    name: `${initials[idx % 10]}${idx}`,
                }))
                this.dataSources = arr;
                setTimeout(() => {
                    this.length = length;
                }, 0);
            }
        }
    }
</script>
<style lang="stylus">
.btn
    margin-bottom 20px
    .kd-btn
        margin-right 20px
.list-test2
    display flex
    height 100px
    border 2px solid #696969
    width 100%
    overflow-x auto
.list-item2
    padding 0 10px
    height 100%
    display flex
    align-items center
    border-right 1px solid #d3d3d3
    box-sizing border-box
    &:hover
        background-color #f5f7fa
    div
        width 100%
        text-align center
.wrapper
    display flex
    flex-direction row
</style>
```
:::

### Virtual-List Attributes

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| dataKey | 唯一标识的键名，字符串或者返回字符串的函数   | `String|Function`    | — | —
| dataSources | 列表的数据，每个对象中需包含dataKey对应的键名   | `Array[Object]`    | — | —
| dataComponent | 由vue创建/声明的渲染组件，接受dataSources中的数据对象作为自己一个props，名称为source（优先级低于slot=item） | `Component`    | — | —
| keeps | 在真实DOM中保持渲染的项目数   | `Number`    | — | 30
| extraProps | 额外的props分配给dataComponent（默认存在index，source） | `Object`    | — | {}
| estimateSize | 列表每一项的估计大小；越接近平均值，滚动条看起来会更准确 | `Number`    | — | 50
| direction | 滚动方向 | `String`    | `vertical|horizontal` | vertical
| pageMode | 让虚拟列表使用全局document滚动列表 | `Boolean`    | - | false
| start | 设置滚动位置停留开始索引   | `Number`    | — | 0
| offset | 设置滚动位置停留偏移   | `Number`    | — | 0
| topThreshold | 触发totop事件的阈值(滚动偏移量)   | `Number`    | — | 0
| bottomThreshold | 设置滚动位置停留偏移(滚动偏移量)   | `Number`    | — | 0
| rootTag | 根元素标签名称 | `String`    | — | div
| wrapTag | 列表wrapper元素(role=group)标签名称 | `String`    | — | div
| wrapClass | 列表wrapper元素类名 | `String`    | — | -
| wrapStyle | 列表wrapper元素内联样式 | `Object`    | — | {}
| itemTag | 每项wrapper元素(role=item)标签名称 | `String`    | — | div
| itemClass | 每项wrapper元素类名 | `String`    | — | -
| itemStyle | 每项wrapper元素内联样式 | `Object`    | — | {}
| itemClassAdd | 将额外的类名添加到itemClass上，参数（index） | `Function`    | — | -
| itemScopedSlots | 每项item组件的$scopedSlots | `Object`    | — | {}
| headerTag | 包裹header插槽的元素(role=header)标签名称 | `String`    | — | div
| headerClass | 包裹header插槽的元素类名 | `String`    | — | -
| headerStyle | 包裹header插槽的元素内联样式 | `Object`    | — | {}
| footerTag | 包裹footer插槽的元素(role=hfootereader)标签名称 | `String`    | — | div
| footerClass | 包裹footer插槽的元素类名 | `String`    | — | -
| footerStyle | 包裹footer插槽的元素内联样式 | `Object`    | — | {}

### Virtual-List Events

| 事件      | 说明    | 回调参数
|---------- |-------- |---------- |-------------  |-------- |
| scroll    | 滚动时触发   |  (event,range)    |
| totop    | 滚动到顶部或最左侧   |  -    |
| tobottom  | 滚动到底部或最右侧   |  —    |
| resized  | 当每一项尺寸变化时触发   |  (id,size)  |

### Virtual-List Methods

| 属性      | 说明    | 参数      |
|---------- |-------- |---------- |
| reset | 将所有状态重置为初始状态 |  —
| scrollToBottom | 手动将滚动位置设置为底部 | -
| scrollToIndex | 手动设置滚动位置到指定索引 | (index)
| scrollToOffset | 手动将滚动位置设置为指定的偏移量 | (offset)
| getSizes | 获取渲染项目的总数 | -
| getSize | 通过id获取指定的项目size | (id)
| getOffset | 获取当前滚动偏移量 | -
| getClientSize | 获取wrapper元素的视窗大小（clientWidth或clientHeight） | -
| getScrollSize | 获取所有滚动大小（scrollWidth或scrollHeight） | -
| updatePageModeFront | 页面模式下，当根元素的offsetTop或offsetLeft变化时，需手动调用 | -

### Virtual-List Slot

| 名称       | 说明           |
|---------- |--------        |
| item | `自定义每项的插槽，参数#item="{item,index,scope}"` |
| header | `自定义hedader的插槽` |
| footer | `自定义footer的插槽` |
