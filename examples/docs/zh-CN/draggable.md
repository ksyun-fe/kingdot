### 基础用法
:::demo #基础用法 ##基础的draggable
```html
<template>
<div class="lists">
    <kd-draggable 
                :list="items"
                :options="{
                    group: 'listGroup',
                    animation: 100,
                    filter: '.list-value'
                }"
                @start="drag=true" 
                @end="drag=false"
    >
            <div 
                class="list" 
                v-for="item in items" 
                :key="'num_' + item"
            >
                <span class="list-drag  kd-icon-checkbox-disabled"></span>
                <span class="list-value">I am NO.{{ item }}</span>
            </div>
    </kd-draggable>
    </div>
</template>   
<script>
   export default {
        data(){
            return{
              drag: false,
              items: [1, 2, 3, 4, 5]
            }
        }
   }
</script>
<style lang="stylus">
.lists
    width 800px
    list-style none

    .list
        display flex
        width 560px
        height 40px
        border 1px solid #ececec
        padding-left 20px
        margin-bottom 10px
        background-color #fff
        align-items center

        .list-drag
            display flex
            margin-right 40px
            cursor move

        .list-value
            display flex
            flex 1
            padding-right 20px
            line-height 40px
</style>
```

:::

### 属性
| 属性            | 说明                | 类型    | 可选值                               | 默认值         |
| --------------- | ------------------- | ------- | ------------------------------------ | -------------- |
| list | v-model            | 当前拖拽值    | array       | —                                    | —              |
| options      | 配置        | object |   group(该组唯一标识) ，animation（拖拽动画时间），filter（不触发拖拽区域），delay（鼠标按住多久可以触发拖拽） | -                                | false          |
### Events
| 属性  | 说明         | 类型     | 可选值 | 默认值 |
| ----- | ------------ | -------- | ------ | ------ |
| start | 开始拖拽 | function | —      | —      |
| end   | 结束拖拽 | function | —      | —      |
| move  | 拖拽中 | function | —      | —      |


