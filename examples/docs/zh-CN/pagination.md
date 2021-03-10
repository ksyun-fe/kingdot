## Pagination 分页

### 示例

:::demo #基本用法 ##`Pagination`的基本用法，通过`total`指定数据总条数，`limit`指定每页数据条数，`limits`数组定义可供选择的条数，`limitsIcon`指定个数选择器的Icon。可以通过`change`事件来监听组件`current`和`limit`的变化，组件会将`current`和`limit`以对象的方式传给事件回调函数。

```html
<template>
    <div>
        <div class="page-demo">
            <kd-pagination
                    ref="pagination"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    prevText="上一页"
                    nextText="下一页"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    prevText="kd-icon-arrow-left"
                    nextText="kd-icon-arrow-right"
                    limitsIcon="kd-icon-arrow-down"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    prevText="kd-icon-arrow-left"
                    nextText="kd-icon-arrow-right"
                    noBorder
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    :showGoto="false"
                    :showTotal="false"
                    :showPageCount="false"
                    :showLimits="false"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    superMini
                    noBorder
                    :total="total"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    superMini
                    :showPageNum="false"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                total: 120,
                limits: [5, 10, 20, 50],
                limit: 10,
                current: 1,
            }
        },
        methods:{
            change({ limit, current }) {
                this.current = current;
                this.limit = limit;
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .page-demo
        margin-bottom 10px
</style>
```

:::

### 是否展示快速跳转框、总条数、总页码、每页条数选择框

:::demo #用法 ##通过`showGoto`指定是否展示快速跳转框，`showTotal`指定是否展示总条数，`showPageCount`指定是否展示总页码，`showLimits`是否展示每页条数选择框。

```html
<template>
    <div>
        <div class="page-demo">
            <kd-pagination
                    prevText="kd-icon-arrow-left"
                    nextText="kd-icon-arrow-right"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    showPageCount
                    @change="change"
                />
        </div>
        <div>
            <kd-pagination
                    prevText="kd-icon-arrow-left"
                    nextText="kd-icon-arrow-right"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    :showGoto="false"
                    :showTotal="false"
                    :showLimits="false"
                    @change="change"
                />
        </div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                total: 60,
                limits: [5, 10, 20, 50],
                limit: 10,
                current: 1,
            }
        },
        methods:{
            change({ limit, current }) {
                this.current = current;
                this.limit = limit;
                console.log(this.current,this.limit)
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .page-demo
        margin-bottom 10px
</style>
```

:::

### 自定义上一页、下一页

:::demo #用法 ##通过`prevText`指定上一页，`nextText`指定下一页。（指定为icon时，使用icon的Class即可，例：`kd-icon-arrow-left`）

```html
<template>
    <div>
        <div class="page-demo">
            <kd-pagination
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    :showGoto="false"
                    :showTotal="false"
                    :showLimits="false"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    prevText="kd-icon-arrow-left"
                    nextText="kd-icon-arrow-right"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    :showGoto="false"
                    :showTotal="false"
                    :showLimits="false"
                    @change="change"
                />
        </div>
        <div>
            <kd-pagination
                    prevText="上一页"
                    nextText="下一页"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :limits="limits"
                    :showGoto="false"
                    :showTotal="false"
                    :showLimits="false"
                    @change="change"
                />
        </div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                total: 60,
                limits: [5, 10, 20, 50],
                limit: 10,
                current: 1,
            }
        },
        methods:{
            change({ limit, current }) {
                this.current = current;
                this.limit = limit;
                console.log(this.current,this.limit)
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .page-demo
        margin-bottom 10px
</style>
```

:::

### 改变翻页按钮数量

:::demo #用法 ##组件默认会展示7个翻页按钮（包括省略号···)，通过`counts`属性我们可以指定按钮个数（最好不要小于7个，否则影响体验。使用奇数可以使页码对称分布）。

```html
<template>
    <div>
        <div class="page-demo">
            <kd-pagination
                    :total="total"
                    :limit="limit"
                    :current="current"
                    :counts="9"
                    @change="change"
                />
        </div>
        <div class="page-demo">
            <kd-pagination
                    :total="total"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
        <div>
            <kd-pagination
                    :total="0"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                total: 220,
                limits: [5, 10, 20, 50],
                limit: 10,
                current: 1,
            }
        },
        methods:{
            change({ limit, current }) {
                this.current = current;
                this.limit = limit;
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .page-demo
        margin-bottom 10px
</style>
```

:::

### 简洁版

:::demo #用法 ##通过`noBorder`指定是否展示边框，`superMini`指定是否是简洁版，`showPageNum`指定是否展示页码。

```html
<template>
    <div>
        <div>
            <kd-pagination
                    superMini
                    noBorder
                    :total="total"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
        <div>
            <kd-pagination
                    superMini
                    noBorder
                    :showPageNum="false"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
        <div>
            <kd-pagination
                    superMini
                    prevText="kd-icon-arrow-left"
                    nextText="kd-icon-arrow-right"
                    :showPageNum="false"
                    :total="total"
                    :limit="limit"
                    :current="current"
                    @change="change"
                />
        </div>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                total: 120,
                limits: [5, 10, 20, 50],
                limit: 10,
                current: 1,
            }
        },
        methods:{
            change({ limit, current }) {
                this.current = current;
                this.limit = limit;
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .page-demo
        margin-bottom 10px
</style>
```

:::


### 属性 {.component__content}

| 属性      | 说明    | 类型     | 默认值   |
|:---------- |:-------- |:---------- |:-------- |
| counts     | 展示按钮个数（大于等于 5 且小于等于 21 的奇数）   | Number   |    7    |
| total     | 数据总条数   | Number   |    0    |
| showTotal     | 是否展示数据总条数   | Boolean   |    true    |
| current     | 当前页码   | Number   |    1    |
| limit     | 页面条数   | Number   |    10    |
| limits     | 页面条数选择框   | Array<Number>   |    [5, 10, 20, 50]    |
| showLimits     | 是否显示个数选择器   | Boolean  |    true    |
| limitsIcon     | 个数选择器icon   | String  |      kd-pagination-limits-icon    |
| noBorder     | 是否展示无边框样式，默认有边框   | Boolean   |    false    |
| prev-text     | 替代图标显示的上一页文字(字符串若以‘kd-icon’开头，则展示相应图标)   | String   |    ''    |
| next-text     | 替代图标显示的下一页文字(字符串若以‘kd-icon’开头，则展示相应图标)   | String   |    ''    |
| superMini     | 是否使用小型分页样式   | Boolean   |    false    |
| showPageNum     | 是否展示页码   | Boolean   |    true    |
| showPageCount     | 是否展示总页数   | Boolean   |    false    |
| showGoto     | 是否展示快速跳转框   | Boolean   |    true    |

### 方法 {.component__content}

| 属性      | 说明    | 类型      | 参数      |
|:---------- |:-------- |:---------- |:---------- |
| changePage     | 切换页码   |  Function  | `{value: 2, label: 2}` |
| prev     | 上一页   |  Function  |  -  |
| next     | 下一页   |  Function  |  -  |

### 事件 {.component__content}

| 时间名称      | 说明    |
|:---------- |:-------- |
| change     | current和limit变化时触发，同时变化不会重复触发   |
