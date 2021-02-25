## kd-table
表格

### 结合使用

:::demo #基础用法 ##单独table

```html
<template>
    <div>
        <p style="margin-bottom: 10px">
            <kd-button @click="prevPage">上一页</kd-button>
            <kd-button @click="nextPage">下一页</kd-button>
        </p>
        <kd-table :data="data" 
                stored nodeKey="id" columnFilter
                :disableRow="disableRow" 
                @loadExpand="lazyLoad"
                :treeProps="{children: 'children', hasChildren: 'hasChildren'}"
                :treeLoad="load"
                :disableCache="true"
                >
            <!--<kd-table-column type="expand">
                            <template slot-scope="scope">
                                <div>
                                    <span>id: </span><span>{{ scope.row.id }},</span>
                                    <span>name: </span><span>{{ scope.row.name }},</span>
                                    <span>msg: </span><span>{{ scope.row.msg }},</span>
                                </div>
                            </template>
                        </kd-table-column> -->
            <kd-table-column fixed width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" sortable />
            <kd-table-column width="200" title="信息" 
                         props="msg" 
                         :group="[
                            {label: '非托管私有', value: 10},
                            {label: '非托管只读', value: 20},
                            {label: '非托管读写', value: 30},
                            {label: '完全托管', value: 32767}
                         ]" 
                         :filter="filter" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column width="200" title="地址2" props="efg" />
            <kd-table-column width="200" title="地址3" props="efg" />
            <kd-table-column title="地址" props="efg" />
            <kd-table-column fixed="right" width="100" title="操作">
                <template slot-scope="scope">
                    <a @click="test(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                                 {
                                     id: 1, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                    children: [
                                        {
                                            id: 101, name: 'name41', msg: 'msg41', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                        },
                                        {
                                            id: 102, name: 'name42', msg: 'msg42', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                            children: [
                                                {
                                                    id: 1021, name: 'name43', msg: 'msg43', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                }
                                            ]
                                        },
                                    ]
                                 },
                                 {
                                     id: 2, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                     children: [
                                                                             {
                                                                                 id: 201, name: 'name51', msg: 'msg41', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                                             },
                                                                             {
                                                                                 id: 202, name: 'name52', msg: 'msg42', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                                                 children: [
                                                                                     {
                                                                                         id: 2021, name: 'name53', msg: 'msg43', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                                                     }
                                                                                 ]
                                                                             },
                                                                         ]
                                 },
                                 {
                                     id: 3, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                        children: [
                                            {
                                                id: 301, name: 'name61', msg: 'msg41', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                            },
                                            {
                                                id: 302, name: 'name62', msg: 'msg42', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                children: [
                                                    {
                                                        id: 3021, name: 'name63', msg: 'msg43', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                    }
                                                ]
                                            },
                                        ]
                                 },
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                     hasChildren: true
                                 },
                                 {
                                     id: 7, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 8, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 }, 
                                 {
                                     id: 9, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 10, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },
                                 {
                                     id: 11, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 12, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },
                                 {
                                     id: 13, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 14, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },  
                                 {
                                     id: 15, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 16, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },
                                 {
                                     id: 17, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 18, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 }, 
                                 {
                                     id: 19, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 20, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },
                                 {
                                     id: 21, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 22, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 }, 
                                 {
                                     id: 23, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 24, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },
                                 {
                                     id: 25, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 26, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },
                                 {
                                     id: 27, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 28, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg'
                                 },    
               
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            nextPage(){
                this.data = [
                    {
                        id: 29, name: 'name3', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                    },
                    {
                        id: 30, name: 'name4', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                    {
                        id: 31, name: 'name5', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                    {
                        id: 32, name: 'name6', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                    {
                        id: 33, name: 'name7', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                ]       
            },
            prevPage(){
                this.data = data;
            },
            filter({props, value}){
                console.log(props, value)
            },
            disableRow(item, index){
                return item.id == 2
            },
            lazyLoad(row, index){
                console.log(row, index)
            },
            test(scope){
                console.log(scope)
            },
            load(parentData, rowData, resolve){
                console.log(parentData, rowData)
                setTimeout(() => {
                    resolve(
                        this.clickCount == 1 ? 
                            [
                                {
                                    id: 601, name: 'name61', msg: 'msg61', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                },   
                                {
                                    id: 602, name: 'name62', msg: 'msg62', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf', hasChildren: true
                                },                
                            ]
                            :
                            [
                                {
                                    id: 6021, name: 'name621', msg: 'msg621', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                },   
                                              
                            ]
                    );
                    this.clickCount += 1;
                    if(this.clickCount >= 3){this.clickCount = 1}
                }, 1500);
            }   
        }
    }
</script>
```
:::

### 基础用法

:::demo #基础用法 ##kd-table-column可以设置'width'

```html
<template>
    <div>
        
        <kd-table :data="data" :overFlowAuto="false">
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            }
        }
    }
</script>
```
:::

### radio用法

:::demo #基础用法 ##kd-table-column可以设置'checkboxType'

```html
<template>
    <div>
        
        <kd-table :data="data" :overFlowAuto="false" checkboxType="radio">
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            }
        }
    }
</script>
```
:::

### 合并单元格用法

:::demo #基础用法 ##kd-table-column可以设置'spanMethod'，参数:row, column, rowIndex, columnIndex

```html
<template>
    <div>
        
        <kd-table :data="data" :overFlowAuto="false" checkboxType="none" :spanMethod="fn" border>
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                                    ,
                                 {
                                     id: 7, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 },
                                  {
                                     id: 8, name: 'name3', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            },
            fn({ row, column, rowIndex, columnIndex }){
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        }
                    }
                    else{
                        return {
                            rowspan: 0,
                            colspan: 0
                        }
                    }
                }
            },
            fn2({ row, column, rowIndex, columnIndex }){
                if (rowIndex % 2 === 0) {
                      if (columnIndex === 0) {
                        return [1, 2];
                      } else if (columnIndex === 1) {
                        return [0, 0];
                      }
                    }
            }
        }
    }
</script>
```
:::

### 合并表头用法

:::demo #基础用法 ##kd-table-column可以设置'spanMethod'，参数:row, column, rowIndex, columnIndex

```html
<template>
    <div>
        
        <kd-table :data="data" :overFlowAuto="false" checkboxType="none" border>
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column title="基础信息">
                <kd-table-column width="200" title="名称" props="name" />
                <kd-table-column title="内容集合">
                    <kd-table-column title="规划" props="tbl" />
                    <kd-table-column title="内容" props="abc" />
                    <kd-table-column title="邮编" props="def" />
                    <kd-table-column width="400" title="地址1" props="efg" />
                </kd-table-column>
            </kd-table-column>
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                                    ,
                                 {
                                     id: 7, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 },
                                  {
                                     id: 8, name: 'name3', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            }
        }
    }
</script>
```
:::

### disable用法

:::demo #基础用法 ##kd-table可以设置'disableRow'

```html
<template>
    <div>
        
        <kd-table :data="data" :disableRow="disableRow" :overFlowAuto="false">
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            },
            disableRow(item, index){
                return item.id == 5
            },        
        }
    }
</script>
```
:::

:::

### 筛选列用法

:::demo #基础用法 ##kd-table可以设置'columnFilter'

```html
<template>
    <div>
        
        <kd-table :data="data" columnFilter checkboxType="none" :overFlowAuto="false">
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            }
        }
    }
</script>
```
:::



### 固定列用法

:::demo #基础用法 ##kd-table-column设置'fixed'

```html
<template>
    <div>
        
        <kd-table :data="data" :overFlowAuto="false">
            <kd-table-column fixed width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column width="200" title="信息" props="msg"/>
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column width="200" title="地址2" props="efg" />
            <kd-table-column width="200" title="地址3" props="efg" />
            <kd-table-column fixed="right" title="地址" props="efg" />
            <kd-table-column fixed="right" title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            }
        }
    }
</script>
```
:::

### stored用法

:::demo #基础用法 ##kd-table可以设置'stored', 'nodeKey'

```html
<template>
    <div>
        <button @click="prevPage">上一页</button>
        <button @click="nextPage">下一页</button>
        <button @click="getCheckData">获取选中数据</button>
        <kd-table ref="storekd-table" stored nodeKey="id" :data="data" :overFlowAuto="false">
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            },
            nextPage(){
                this.data = [
                    {
                        id: 29, name: 'name3', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                    },
                    {
                        id: 30, name: 'name4', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                    {
                        id: 31, name: 'name5', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                    {
                        id: 32, name: 'name6', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                    {
                        id: 33, name: 'name7', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                    },
                ]       
            },
            prevPage(){
                this.data = data;
            },
            getCheckData(){
                console.log(this.$refs.storekd-table.getCheckedData())
            }        
        }
    }
</script>
```
:::



### 排序筛选

:::demo #基础用法 ##kd-table-column设置'sortable', 'group'

```html
<template>
    <div>
        
        <kd-table :data="data" :overFlowAuto="false">
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" sortable />
            <kd-table-column width="200" title="信息" props="msg"/>
            <kd-table-column 
                title="规划" 
                props="tbl"
                :group="[
                            {label: '非托管私有', value: 10},
                            {label: '非托管只读', value: 20},
                            {label: '非托管读写', value: 30},
                            {label: '完全托管', value: 32767}
                ]"
                :filter="filter" 
             />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column title="地址" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            },
            filter({props, value}){
                console.log(props, value)
            },
        }
    }
</script>
```
:::

### expand用法

:::demo #基础用法 ##kd-table-column可以设置'type'

```html
<template>
    <div>
        
        <kd-table :data="data" @loadExpand="lazyLoad" :overFlowAuto="false">
            <kd-table-column type="expand">
                <template slot-scope="scope">
                    <div>
                        <span>id: </span><span>{{ scope.row.id }},</span>
                        <span>name: </span><span>{{ scope.row.name }},</span>
                        <span>msg: </span><span>{{ scope.row.msg }},</span>
                    </div>
                </template>
            </kd-table-column>
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                              
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }
                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            },
            lazyLoad(row, index, flag){
                console.log(row, index, flag)
            },
        }
    }
</script>
```
:::


### tree用法

:::demo #基础用法 ##kd-table可以设置'treeProps', 'treeLoad', 'disableCache'

```html
<template>
    <div>
        
        <kd-table 
            :data="data"
            :treeProps="{children: 'children', hasChildren: 'hasChildren'}"
            :treeLoad="load"
            :disableCache="true"
            :overFlowAuto="false"
            >
            <kd-table-column width="300" title="ID" props="id" />
            <kd-table-column width="200" title="名称" props="name" />
            <kd-table-column title="规划" props="tbl" />
            <kd-table-column title="内容" props="abc" />
            <kd-table-column title="邮编" props="def" />
            <kd-table-column width="400" title="地址1" props="efg" />
            <kd-table-column title="操作">
                <template slot-scope="scope">
                    <a @click="btn(scope)">btn</a>
                </template>
            </kd-table-column>
        </kd-table>
    </div>
</template>
<script>
    const data = [
                                {
                                     id: 3, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                        children: [
                                            {
                                                id: 301, name: 'name61', msg: 'msg41', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                            },
                                            {
                                                id: 302, name: 'name62', msg: 'msg42', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                children: [
                                                    {
                                                        id: 3021, name: 'name63', msg: 'msg43', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf',
                                                    }
                                                ]
                                            },
                                        ]
                                 },
                                 {
                                     id: 4, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                 }, 
                                 {
                                     id: 5, name: 'name1', msg: 'msg1', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                 },
                                 {
                                     id: 6, name: 'name2', msg: 'msg2', tbl: 'hive', abc: 'dasds', def: 'ddsadas', efg: 'efg',
                                     hasChildren: true
                                 },                             ]
    export default {
        data() {
            return {
                data: data,
                clickCount: 1,
            }
        },
        methods: {
            btn(scope){
                console.log(scope.row, scope.$index)
            },
            load(parentData, rowData, resolve){
                console.log(parentData, rowData)
                setTimeout(() => {
                    resolve(
                        this.clickCount == 1 ? 
                            [
                                {
                                    id: 601, name: 'name61', msg: 'msg61', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                },   
                                {
                                    id: 602, name: 'name62', msg: 'msg62', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf', hasChildren: true
                                },                
                            ]
                            :
                            [
                                {
                                    id: 6021, name: 'name621', msg: 'msg621', tbl: 'kafka', abc: 'ccc', def: 'test', efg: 'xdf'
                                },   
                                              
                            ]
                    );
                    this.clickCount += 1;
                    if(this.clickCount >= 3){this.clickCount = 1}
                }, 1500);        
            }
        }
    }
</script>
```
:::





### kd-table属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| data     | 数据   | array    | — | —
| border     | 是否显示border   | boolean    | false / true | false
| height     | table高度   | string / number    | — |     —    |
| checkboxType     |  table多选单选  | string    | none / radio |     checkbox    |
| columnFilter  | 设置显示列   | boolean  |     true / false     |    false   |
| overFlowAuto  | 横向滚动条是否随屏幕滑动移动   | boolean  |     true / false     |    true   |
| scrollBarHeight  | 横向滚动条高度   | string / number  |     —     |    12   |
| disableRow  | 设置不可选的列   | function  |    —      |    —   |
| spanMethod  | 合并行列方法   | function  |    —      |    -   |
| stored  | 是否存储选中的历史   | boolean  |     true / false     |    false   |
| nodeKey  | 行数据的唯一标识   | string  |     —     |    —   |
| treeProps  | 渲染嵌套tree数据的配置选项   | object  |     —     |    —   |
| treeLoad  | 加载tree子节点数据的函数   | function  |     —     |    —   |
| disableCache  | 是否清除加载tree子节点缓存   | boolean  |     true / false     |    false   |

### kd-table事件
| 属性      | 说明    | 参数      |
|---------- |-------- |---------- |
| loadExpand     | 用户触发显示 expand列  | row, index, flag    

### kd-table Methods
| 属性      | 说明    | 参数      |
|---------- |-------- |---------- |
| getCheckedData     | 获取选中的数据  |    — 

### kd-table-column属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width     | 列宽   | string / number    | — | —
| title     | 显示的标题   | string    | — |     —    |
| props  | 对应列内容的字段名   | string  |     —     |    —   |
| fixed  | 固定列，true 表示固定在左侧   | boolean / string  |     true / right     |    -   |
| sortable  |  对应列是否可以排序  | boolean  |     true / false     |    -   |
| group  | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。   | Array[{ label, value }]  |    —      |    —   |
| filter  | 数据过滤回调   | function  |     —     |    —   |
| type  | 对应列的类型，如果设置了 expand 则显示为一个可展开的按钮   | string  |     default / expand     |    default   |









