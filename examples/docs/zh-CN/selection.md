### 基础用法
:::demo #基础用法 ##selection和draggable结合使用，点击框选区域的空白处解除框选
```html
<template>
            <div class="table-container">
                <div class="each-table-content"
                     v-for="(item, index) in blocks">
                        <div class="each-table-title">{{ item.name }}</div>
                        <div class="each-table-blocks">
                            <kd-selection 
                                            v-model="item.blocks"
                                            :no-trigger-class="['each-table-block', 'each-table-edite']"
                                            select-class="each-table-block"
                                            @select="(data) => {selectDom(data, index)}">
                                <div class="table-blocks-content">
                                    <kd-draggable 
                                                    :list="item.blocks"
                                                    :key="item.name"
                                                    :options="{group:item.name, animation:150}"
                                                    @start="drag=true"
                                                    @end="drag=false"
                                    >
                                        <div v-for="(inner, _index) in item.blocks"
                                             @click="clickBlock(inner, index, _index)"
                                             :class="{
                                                'each-table-block': true,
                                                'select': inner.select
                                             }"
                                             :key="'block_' + inner.id"
                                        >
                                            {{ inner.name }}
                                        </div>
                                    </kd-draggable>
                                </div>
                            </kd-selection>
                        </div>
                </div>
            </div>
</template>   
<script>
   export default {
        data(){
            return{
              drag: false,
              blocks: [
                              {
                                  id: 'name_1',
                                  name: '框选右侧集合',
                                  blocks: [
                                      {
                                          id: 1,
                                          name: 'NO.1-1'
                                      },
                                      {
                                          id: 2,
                                          name: 'NO.1-2'
                                      },
                                      {
                                          id: 3,
                                          name: 'NO.1-3'
                                      },
                                      {
                                          id: 4,
                                          name: 'NO.1-4'
                                      },
                                      {
                                          id: 5,
                                          name: 'NO.1-5'
                                      },
                                      {
                                          id: 6,
                                          name: 'NO.1-6'
                                      },
                                      {
                                          id: 7,
                                          name: 'NO.1-7'
                                      },
                                      {
                                          id: 8,
                                          name: 'NO.1-8'
                                      },
                                      {
                                          id: 9,
                                          name: 'NO.1-9'
                                      },
                                      {
                                          id: 10,
                                          name: 'NO.1-10'
                                      },
                                      {
                                          id: 11,
                                          name: 'NO.1-11'
                                      },
                                      {
                                          id: 12,
                                          name: 'NO.1-12'
                                      },
                                      {
                                          id: 13,
                                          name: 'NO.1-13'
                                      },
                                      {
                                          id: 14,
                                          name: 'NO.1-14'
                                      },
                                      {
                                          id: 15,
                                          name: 'NO.1-15'
                                      },
                                      {
                                          id: 16,
                                          name: 'NO.1-16'
                                      },
                                      {
                                          id: 17,
                                          name: 'NO.1-17'
                                      },
                                      {
                                          id: 18,
                                          name: 'NO.1-18'
                                      },
                                      {
                                          id: 19,
                                          name: 'NO.1-19'
                                      },
                                      {
                                          id: 20,
                                          name: 'NO.1-20'
                                      }
                                  ]
                              }
                          ],
              checkedData: [],
            }
        },
        methods: {
            initBlock(index) {
                this.blocks[index].blocks.forEach(item => {
                    this.$set(item, 'select', false);
                    })
            },
            selectDom(data, index) {
                this.initBlock(index);
                this.blocks[index].blocks.forEach(item => {
                    data.forEach(inner => {
                        if (item == inner) {
                            item.select = true;
                        }
                    })
                });
                this.checkedData = [];
                this.blocks.forEach(item => {
                    let selectData = item.blocks.filter(item => item.select);
                    this.checkedData = this.checkedData.concat(selectData);
                })
            },
            clickBlock(item, index, childrenIndex) {
                this.selectDom([item], index);
            },
        }
   }
</script>
<style lang="stylus">
.table-container
    width 1300px
    height 200px
    border 1px solid #ececec

    .each-table-content
        display flex
        flex 1
        height 200px
        border-bottom 1px solid #ececec

        &:last-child
            border-bottom none

        .each-table-title
            display flex
            border-right 1px solid #ececec
            width 320px
            font-size 24px
            align-items center
            justify-content center

        .each-table-blocks
            display flex
            flex 1

            .table-blocks-content
                width 100%
                height 190px
                padding 5px
                overflow-y auto

                .each-table-block
                    width 160px
                    height 30px
                    float left
                    border 1px solid #ececec
                    background-color #fff
                    margin 5px
                    line-height 30px
                    padding 0 10px
                    position relative
                    .each-table-edite
                        width 160px
                        height 26px
                        position absolute
                        top 1px
                        left 10px
                        border none
                        display none

                    &.select
                        border-color #c4c3c3

.inner-content-draging
    .each-table-block
        user-select none
</style>
```

:::

### 属性
| 属性            | 说明                | 类型    | 可选值                               | 默认值         |
| --------------- | ------------------- | ------- | ------------------------------------ | -------------- |
| v-model            | 当前框选值    | array       | —                                    | —              |
| no-trigger-class      | 不触发框选的值（className）        | array |    | -                                
| select-class      | 框选中的内容（className）        | string |  -  | -                                
### Events
| 属性  | 说明         | 类型     | 可选值 | 默认值 |
| ----- | ------------ | -------- | ------ | ------ |
| select | 框选结果 | function | —      | item, index |


