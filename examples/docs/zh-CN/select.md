## Select 选择器
选项过多时，下拉显示数据并选择数据。


:::demo #基本使用 ##选择器的基本使用

```html
<template>
        <div>
            <kd-select v-model="defaultValue" placeholder="请选择内容">
                <kd-option value="">空数据</kd-option>
                <kd-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}
                </kd-option>
            </kd-select>
            <kd-select v-model="defaultValue1" placeholder="请选择内容" width="200px" multiple  class="select-ml">
                <kd-option value="">空数据</kd-option>
                <kd-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}
                </kd-option>
            </kd-select>
        </div>
</template>
<script>
export default{
    data(){
        return{
            options: [],
            defaultValue: "",
            defaultValue1: ['item1'],

        }
    },
    mounted(){
        setTimeout(()=>{
            this.options = [{
                value:"item1",
                label:"item option 1"
            },
            {
                value:"item2",
                label:"item option 2"
            },
            {
                value:"item3",
                label:"item option 3"
            }]
        },1000)
    }
}
</script>
<style>
.select-ml{
    margin-left:20px
}
</style>
```

:::

:::demo #懒加载 ##懒加载使用

```html
<template>
        <div>
            <kd-select lazy lazy-load-count="10" v-model="defaultValue" placeholder="请选择内容">
                <kd-option v-for="item in options" :key="item.value" :value="item.value">{{ item.value }}
                </kd-option>
            </kd-select>
            
        </div>
</template>
<script>
export default{
    data(){
        return{
            options: [],
            options1: [],
            defaultValue: "",
            defaultValue1: "",

        }   
    },
    watch:{
        
    },
    methods:{
        
    },
    mounted(){
        const that = this;
        for(let i = 0; i <= 100; i++){
            that.options.push(
                {
                    value:"item" + i,
                    label:"item option " + i
                }
            )
        }
    }
}
</script>
<style>
.select-ml{
    margin-left:20px
}
</style>
```
:::

:::demo #可搜索 ##可搜索筛选的选择器，filterable属性为true变为可搜索。

```html
<template>
    <kd-select v-model="defaultValue" placeholder="请选择内容" filterable :filter-method="filterMethod">
        <kd-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}
        </kd-option>
    </kd-select>

</template>
<script>
export default{
    data(){
        return{
            options: [
                {
                    value:"item1",
                    label:"item option 1"
                },
                {
                    value:"item2",
                    label:"item option 2"
                }
            ],
            defaultValue: "item2"
        }
    },
    watch: {
        defaultValue(v){
            console.log('md', v)
        }
    },
    methods:{
        filterMethod(v,currentOption){
            return currentOption.label.indexOf(v) > -1
        }
    }
}
</script>
```

:::


:::demo #远程搜索 ##远程搜索需要传递remote-method方法属性。

```html
<template>
    <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple :remoteMethod="remoteMethod">
        <kd-option v-for="item in optionList" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
    </kd-select>
</template>
<script>
export default{
    data(){
        return{
            options: [
                {
                    value:"item1",
                    label:"item option 1"
                },
                {
                    value:"item2",
                    label:"item option 2"
                },
                {
                    value:"item3",
                    label:"item option 3"
                }
            ],
            optionList:[],
            defaultValue: []
        }
    },
    methods:{
        remoteMethod(v){
            if(v == ''){
                return this.optionList = []
            }
            setTimeout(()=>{
                this.optionList = this.options.filter((item)=> item.label.indexOf(v) > -1)
            },300)

        }
    }
}
</script>
```

:::

:::demo #禁用 ##select禁用选择器和option禁用。在标签上添加disaled

```html
<template>
    <div>
        <kd-select v-model="defaultValue" placeholder="请选择内容" filterable disabled>
            <kd-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}
            </kd-option>
        </kd-select>
        <kd-select v-model="defaultValue" placeholder="请选择内容" filterable class="select-ml">
            <kd-option v-for="item in options" :key="item.value" :value="item.value" :disabled="item.disabled">{{ item.label }}
            </kd-option>
        </kd-select>
    </div>
</template>
<script>
export default{
    data(){
        return{
            options: [
                {
                    value:"item1",
                    label:"item option 1"
                },
                {
                    value:"item2",
                    label:"item option 2",
                    disabled:true
                }
            ],
            defaultValue: ""
        }
    }
}
</script>
```

:::

:::demo #多选 ##可以重复点击菜单，多次选择值。使用multiple属性控制。

```html
<template>
    <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple clearAll>
        <kd-option v-for="item in options" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
    </kd-select>
</template>
<script>
export default{
    data(){
        const options = () =>{
            const data = [];
            for(let i = 0; i < 50; i++){
                data.push({
                    value: 'item' + i,
                    label:`option${i}`,
                })
            }
            return data;
        }
        return{
            options: options(),
            defaultValue: ['item1','item2']
        }
    }
}
</script>
```

:::

:::demo #自定义option ##自定义的菜单项,需要在option组件传入label参数。

```html
<template>
    <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple clearAll>
        <kd-option v-for="item in options" :key="item.value" :value="item.value" :activeIcon="activeIcon" :label="item.label">
            <div>
                <span>{{ item.label }}</span>
                <span style="float:right;color:#ccc">{{ item.value }}</span>
            </div>
        </kd-option>
    </kd-select>
</template>
<script>
export default{
    data(){
        return{
            activeIcon: false,
            options: [
                {
                    value:"item1",
                    label:"item option 1"
                },
                {
                    value:"item2",
                    label:"item option 2"
                },
                 {
                    value:"item333",
                    label:"item 3"
                }
            ],
            defaultValue: ['item1','item2']
        }
    }
}
</script>
```

:::

:::demo #分组 ##带有分组的选择器，使用kd-option-group组件。

```html
<template>
    <kd-select v-model="defaultValue" placeholder="请选择内容" filterable>
        <kd-option-group v-for="child in options" :key="child.value" :scope="child">
            <kd-option v-for="item in child.options" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
        </kd-option-group>
    </kd-select>
</template>
<script>
export default{
    data(){
        const options = () =>{
            const data = [];
            for(let i = 0; i < 2; i++){
                data.push({
                    value: 'item' + i,
                    label:`item option${i}`,
                    options:[]
                })
                for(let j = 0; j<3; j++){
                    data[i].options.push({
                        value: 'item' + i + j,
                        label:`item option${i}${j}`,
                        disabled: i % 2 === 1
                    })
                }
            }
            return data;
        }
        return{
            options:options(),
            defaultValue: 'item11'
        }
    }
}
</script>
```
:::

:::demo #选择器 ##不同大小的选择器。使用size属性控制。

```html
<template>
    <div class="md-select-row">
        <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple clearAll size="large">
            <kd-option v-for="item in options" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
        </kd-select>
        <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple clearAll >
            <kd-option v-for="item in options" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
        </kd-select>
        <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple clearAll size="small">
            <kd-option v-for="item in options" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
        </kd-select>
        <kd-select v-model="defaultValue" placeholder="请选择内容" filterable multiple clearAll size="mini">
            <kd-option v-for="item in options" :key="item.value" :value="item.value" >{{item.label}}</kd-option>
        </kd-select>
    </div>
</template>
<script>
export default{
    data(){
        const options = () =>{
            const data = [];
            for(let i = 0; i < 50; i++){
                data.push({
                    value: 'item' + i,
                    label:`option${i}`,
                })
            }
            return data;
        }
        return{
            options: options(),
            defaultValue: ['item1','item2']
        }
    }
}
</script>
<style>
.md-select-row > div{
    margin:20px 20px 0 0;

}
</style>
```

:::

### Select Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model     | 绑定值   | string / array    | — | —
| placeholder    | 占位符   |  string    | —  | —
| filterable    | 是否可以搜索   |  boolean    | —  | false
| filter-method    | 自定义搜索方法   |  function    | —  | —
| multiple    | 多选   |  boolean    | —  | false
| clearAll    | 全部清除按钮   |  boolean    | —  | false
| remote    | 是否远程   |  boolean    | —  | false
| remote-method    | 远程搜索方法   |  function    | —  | —
| disabled    | 禁用   |  boolean    | —  | false
| size    | 大小   |  string    | large / default / small / mini | default
| width    | 宽度   |  string    |  —  | — |
| hideDestroy    | 弹层隐藏后是否销毁dom   |  Boolean    |  —  | false |
| lazy    | 是否开启懒加载   |  Boolean    |  —  | false |
| lazyLoadCount    | 触发懒加载时每次加载数，和lazy属性一起使用  |  String / Number    |  —  | 10 |


### Select Events {.component__content}
| 事件      | 说明    | 回调参数
|---------- |-------- |---------- |-------------  |-------- | 
| change    | 选中值发生变化时触发   |  选中值    |
| remove-tag    | 多选移除tag触发   |  移除的tag值    |
| clear  | 单选清空内容，多选清空tag   |  —    |
| focus  | 当 input 获得焦点时触发	   |  —    |
| blur  | 当 input 失去焦点时触发   |  —    |

### Option Group Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值      | 默认值   |
|---------- |-------- |---------- |-------------  |-------- | 
| label     | 分组的别名   | string  | — | —

### Option Attributes {.component__content}
| 属性      | 说明    | 类型      | 可选值      | 默认值   |
|---------- |-------- |---------- |-------------  |-------- | 
| label     | 选项的别名   | string  | — | —
| value     | 选项值   | string  / object  | — | —
| disabled     | 是否禁用该选项   | boolean  | — |  false
