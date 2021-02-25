### 基本使用
:::demo #穿梭框 ##穿梭框的基本使用

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

### 带搜索框
:::demo #穿梭框 ##带搜索框的，可以自定义搜索函数。

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

### 自定义内容
:::demo #穿梭框 ##自定义操作按钮和渲染数据项。

```html
<template>
    <kd-transfer v-model="value" :data="defaultData" buttonLevel :dataKey="keys">
        <ul slot-scope="scope" slot="content">
            <li v-for="item in scope.targetData" class='kd-transfer-content-item'>
                <kd-checkbox
                        v-model="item.checked"
                        :disabled="item.disabled"
                        @change="itemInputChange(item)"
                ></kd-checkbox>
                <span>{{item.name}}</span>
                <i class="icon kd-icon-more"></i>
            </li>
        </ul>
    </kd-transfer>
</template>
<script>
    import KdCheckbox from './../../../components/Checkbox/index.js';
    export default{
        components:{
            KdCheckbox
        },
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
            itemInputChange(item){
                console.log(item)
            }
        }
    }
</script>
```
:::

### 事件回调
:::demo #穿梭框 ##自定义事件回调,标题和按钮更改文字。

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
| children-label | 数据项的内容 |


### 事件 {.component__content}
| 属性      | 说明    | 参数 |
|---------- |-------- |-------- |
| change | 左侧或右侧列表数据发生变化 | direction:返回'left'或者'right' \| keys:当前选中的key数组 \| moveKeys:返回移动后的数组
| checkChange | 左侧或右侧数据发生变化 | 返回'left'或者'right' \| 当前选中状态的数组 []
