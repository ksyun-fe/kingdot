### Transfer 穿梭框
双栏穿梭选择框

:::demo #基本使用 ##穿梭框的基本使用

```html
<template>
    <kd-transfer v-model="value" :data="defaultData" :selectedKeys="selectedKeys">
    </kd-transfer>

</template>
<script>
    export default{
        data(){
            const defaultData = () =>{
                const data = [];
                for(let i = 0;i<12;i++){
                    data.push({
                        key:i,
                        label:`item${i}`,
                        disabled: i % 5 === 1,
                        checked: true
                    })
                }
                return data;
            }
            return{
                defaultData:defaultData(),
                value:[1],
                selectedKeys:[1,5,2]
            }
        }
    }
</script>
```
:::

:::demo #带搜索框 ##带搜索框的，showFilter属性控制搜索框显示隐藏，使用自定义需要传入filter-method方法属性。

```html
<template>
    <kd-transfer v-model="value" :data="defaultData" showFilter :filter-method="filterMethod">
    </kd-transfer>
</template>
<script>
    export default{
        data(){
            const defaultData = () =>{
                const data = [];
                for(let i = 0;i<12;i++){
                    data.push({
                        key:i,
                        label:`item${i}`,
                        disabled:false
                    })
                }
                return data;
            }
            return{
                defaultData:defaultData(),
                value:[1],
                filterMethod(item, serachText){
                    return item.label.indexOf(serachText) > -1;
                }
            }
        },
    }
</script>
```
:::
:::demo #禁用 ##禁用所有可点击选项,选中所有值、搜索框、文本、 按钮

```html
<template>
    <kd-transfer v-model="value" :data="defaultData" showFilter :filter-method="filterMethod" disabled>
    </kd-transfer>
</template>
<script>
    export default{
        data(){
            const defaultData = () =>{
                const data = [];
                for(let i = 0;i<12;i++){
                    data.push({
                        key:i,
                        label:`item${i}`,
                        disabled:false
                    })
                }
                return data;
            }
            return{
                defaultData:defaultData(),
                value:[1],
                filterMethod(item, serachText){
                    return item.label.indexOf(serachText) > -1;
                }
            }
        },
    }
</script>
```
:::
:::demo #自定义内容 ##自定义操作按钮和渲染数据项。

```html
<template>
    <kd-transfer v-model="value" :data="defaultData" buttonLevel :dataKey="keys">
        <span slot-scope="option">{{option.name}}...</span>
        <kd-button slot="left-bottom" @click='more'>更多</kd-button>
        <kd-button slot="right-bottom" @click='more'>更多</kd-button>
    </kd-transfer>
</template>
<script>
    export default{

        data(){
            const defaultData = () =>{
                const data = [];
                for(let i = 0;i<10;i++){
                    data.push({
                        id:i,
                        name:`item${i}`,
                    })
                }
                return data;
            }
            return{
                defaultData:defaultData(),
                value:[1,3,5],
                keys: {
                    key: 'id',
                    label:'name',
                }
            }
        },
        methods: {
            more(){
                console.log('button click')
            }
        }
    }
</script>
```
:::

:::demo #事件回调 ##自定义事件回调,标题和按钮更改文字。

```html
<template>
    <kd-transfer 
        v-model="value" 
        :data="defaultData" 
        buttonLevel 
        :titles="titles" 
        :buttonTexts="buttonTexts"
        @change="handleChange"
        @checkChange="handleCheckChange"
        >
    </kd-transfer>

</template>
<script>
    export default{
        data(){
            const defaultData = () =>{
                const data = [];
                for(let i = 0;i<10;i++){
                    data.push({
                        key:i,
                        label:`item${i}`,
                    })
                }
                return data;
            }
            return{
                defaultData:defaultData(),
                value:[1],
                vertical:false,
                titles:['列表1','列表2'],
                buttonTexts:['到左边','到右边'],
            }
        },
        methods:{
            handleChange(direction,keys,moveKeys){
                console.log(direction)
                console.log(keys)
                console.log(moveKeys)
            },
            handleCheckChange(direction,checked){
                console.log(direction,checked)
            }
        }
    }
</script>
<style>
.icon{
    marign-left: 5px
}
</style>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value/v-model | 更新值 | array  | —            | —     |
| data | 默认数据 | array  |     —        |    []  |
| disabled | 禁用 | boolean  |     —        |    false  |
| dataKey | 数据的key值 | object  |     —        |   key:'key',label:'label' 
| titles |	定义列表标题 |	array	|  —    |   —   |
| button-texts |	定义按钮文字    |	array   |   —   |		[]
|   showFilter  |	是否显示搜索框|	boolean	| — |	false
|   filter-methods  |	自定义搜索方法|	function	|	—   |   —
|   filter-placeholder	|   搜索框占位文字  |    text	|   —	|   请输入搜索内容
|   select-all  |	是否显示全选勾选框    |	boolean |   —  |  true
|   buttonLevel |   按钮横向排序    |   boolean |   —   |   false
|   selectedKeys |  哪些选择项被选中    |   array   |   —   |   []

### slot属性 {.component__content}
| 属性      | 说明    |
|---------- |-------- |
| left-bottom | 左侧底部的内容 |
| right-bottom | 右侧底部的内容 |


### 事件 {.component__content}
| 属性      | 说明    | 参数 |
|---------- |-------- |-------- |
| change | 左侧或右侧列表数据发生变化 | direction:返回'left'或者'right' \| keys:当前选中的key数组 \| moveKeys:返回移动后的数组
| checkChange | 左侧或右侧数据发生变化 | 返回'left'或者'right' \| 当前选中状态的数组 []
