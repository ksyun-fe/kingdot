## Pagination 分页

当数据量过多时，使用分页分解数据。

### 区域加载

:::demo #区域加载 ##在表格等容器中加载数据时显示。

```html
<template>
    <div>
        <kd-pagination
              :total="total"
              :limit="limit"
              :current="current"
              :limits="limits"
              size="mini"
              @change="change"
            />
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                total: 800,
                limits: [5, 10, 20, 50],
                limit: 10,
                current: 3,
                count: 6,
            }
        },
        methods:{
            change({ limit, current }) {
                this.current = current;
                console.log('limit:',limit)
                console.log('current:',current)
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
</style>
```

:::
