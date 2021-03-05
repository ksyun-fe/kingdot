## Pagination 分页

当数据量过多时，使用分页分解数据。

### 区域加载

:::demo #区域加载 ##在表格等容器中加载数据时显示。

```html
<template>
    <div>
        <div class="page-demo">
            <kd-pagination
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
                />
        </div>
        <div>
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
                console.log('limit:',limit,'current:',current)
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
| limits     | 页面条数   | Array<Number>   |    [5, 10, 20, 50]    |
| showLimits     | 是否显示个数选择器   | Boolean  |    true    |
| noBorder     | 是否展示无边框样式，默认有边框   | Boolean   |    false    |
| prev-text     | 替代图标显示的上一页文字(字符串若以‘kd-icon’开头，则展示相应图标)   | String   |    ''    |
| next-text     | 替代图标显示的下一页文字(字符串若以‘kd-icon’开头，则展示相应图标)   | String   |    ''    |

### 方法 {.component__content}

| 属性      | 说明    | 类型      |
|:---------- |:-------- |:---------- |
| changePage     | 切换页码   |  Function  |
| prev     | 上一页   |  Function  |
| next     | 下一页   |  Function  |

### 事件 {.component__content}

| 时间名称      | 说明    |
|:---------- |:-------- |
| change     | current和limit变化时触发，同时变化不会重复触发   |
