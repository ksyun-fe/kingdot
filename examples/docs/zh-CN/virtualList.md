### 虚拟列表
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
                <template slot="item" slot-scope="{item}">{{ item.name }}</template>
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
                <template slot="item" slot-scope="{item}">{{ item.name }}</template>
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
