### Layout 布局
通过基础的 24 分栏，迅速简便地创建布局。

:::demo #基础布局 ##将`Col`嵌套在`Row`中，然后用`span`属性定义所占的宽度，宽度为百分比，每一份是1/24

```html
<template>
    <div>
        <kd-row class="demo-layout">
            <kd-col :span="12">
                <div class="col-content bg-blue-dark">col-12</div>
            </kd-col>
            <kd-col :span="12">
                <div class="col-content bg-blue-light">col-12</div>
            </kd-col>
        </kd-row>
        <kd-row class="demo-layout">
            <kd-col :span="4">
                <div class="col-content bg-blue-dark">col-2</div>
            </kd-col>
            <kd-col :span="8">
                <div class="col-content bg-blue-light">col-10</div>
            </kd-col>
            <kd-col :span="12">
                <div class="col-content bg-blue-dark">col-12</div>
            </kd-col>
        </kd-row>
    </div>
</template>
<style scoped lang="stylus" type="text/stylus">
    .demo-layout
        margin-bottom 20px
    .bg-blue-dark
        background: #0a5eee;
    .bg-blue-light
        background: #4f8df8;
    .col-content
        line-height: 40px;
        text-align: center;
        color: #fff;
</style>
```
:::

:::demo #间距 ##给`Row`添加`gutter`，可以定义`Col`之间的间距，单位为`px`；

```html
<template>
    <div>
        <kd-row gutter="16" class="demo-layout">
            <kd-col span="12"><div class="col-content bg-blue-light">col-12</div></kd-col>
            <kd-col span="12"><div class="col-content bg-blue-dark">col-12</div></kd-col>
        </kd-row>
        <kd-row gutter="8">
            <kd-col span="4"><div class="col-content bg-blue-light">col-4</div></kd-col>
            <kd-col span="6"><div class="col-content bg-blue-dark">col-6</div></kd-col>
            <kd-col span="8"><div class="col-content bg-blue-light">col-8</div></kd-col>
            <kd-col span="6"><div class="col-content bg-blue-dark">col-6</div></kd-col>
        </kd-row>
      
    </div>
</template>
<style scoped lang="stylus" type="text/stylus">
    .demo-layout
        margin-bottom 20px
    .bg-blue-dark
        background #0a5eee
    .bg-blue-light
        background #4f8df8
    .col-content
        line-height 40px
        text-align center
        color #fff
</style>
```
:::

:::demo #偏移 ##给`Col`添加`offset`属性可以使列相对本来的位置向右偏移相应的列数
```html
<template>
    <div>
        <kd-row gutter="16" class="demo-layout">
            <kd-col span="6" offset="4"><div class="col-content bg-blue-light">col-12</div></kd-col>
            <kd-col span="6" offset="6"><div class="col-content bg-blue-dark">col-12</div></kd-col>
        </kd-row>
        <kd-row gutter="16">
            <kd-col span="4" offset="3"><div class="col-content bg-blue-light">col-4</div></kd-col>
            <kd-col span="6" offset="4"><div class="col-content bg-blue-dark">col-6</div></kd-col>
        </kd-row>
    </div>
</template>
<style scoped lang="stylus" type="text/stylus">
    .demo-layout
        margin-bottom 20px
    .bg-blue-dark
        background #0a5eee
    .bg-blue-light
        background #4f8df8
    .col-content
        line-height 40px
        text-align center
        color #fff
</style>
```
:::

:::demo #flex布局 ##给`Row`添加`justify`属性，即可自动启用`flex`布局来定义`Col`水平方向的排列方式，它的可选值为：start end center between around evenly
```html
<template>
    <div>
        <h5 class="title">居左 start</h5>
        <kd-row class="demo-layout" justify="start"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
        <h5 class="title">居右 end</h5>
        <kd-row class="demo-layout" justify="end"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
        <h5 class="title">居中 center</h5>
        <kd-row class="demo-layout" justify="center"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
        <h5 class="title">平均分布，顶边 between</h5>
        <kd-row class="demo-layout" justify="between"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
        <h5 class="title">平均分布，与边界的距离是两个子元素的一半 around</h5>
        <kd-row class="demo-layout" justify="around"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
        <h5 class="title">平均分布，间距（包括边界）相等 evenly</h5>
        <kd-row class="demo-layout" justify="evenly"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
    </div>
</template>
<style scoped lang="stylus" type="text/stylus">
    .title
        line-height 1.5
    .demo-layout
        margin-bottom 20px
        padding 10px 0
        background #f2f2f2
    .bg-blue-dark
        background #0a5eee
    .bg-blue-light
        background #4f8df8
    .col-content
        line-height 40px
        text-align center
        color #fff
</style>
```
:::


:::demo #flex对齐 ##给`Row`添加`align`属性，即可自动启用`flex`布局来定义`Col`垂直方向的排列方式，它的可选值为：`top` `bottom` `middle` `stretch` `baseline`
```html
<template>
    <div>
        <h5 class="title">顶端对齐 top</h5>
        <kd-row class="demo-layout" align="top" justify="center"> 
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '60px'}">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '50px'}">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '20px'}">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '40px'}">col-4</kd-col>
        </kd-row>
        <h5 class="title">底部对齐 bottom</h5>
        <kd-row class="demo-layout" align="bottom" justify="center"> 
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '60px'}">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '50px'}">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '20px'}">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '40px'}">col-4</kd-col>
        </kd-row>
        <h5 class="title">居中对齐 middle</h5>
        <kd-row class="demo-layout" align="middle" justify="center"> 
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '60px'}">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '50px'}">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '20px'}">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '40px'}">col-4</kd-col>
        </kd-row>
        <h5 class="title">撑开成容器高度 stretch</h5>
        <kd-row class="demo-layout" align="stretch" justify="center"> 
            <kd-col class="col-content bg-blue-dark" span="4">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4">col-4</kd-col>
        </kd-row>
        <h5 class="title">基线对齐 baseline</h5>
        <kd-row class="demo-layout" align="baseline" justify="center"> 
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '60px'}">col-1</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '50px', fontSize: '30px'}">col-2</kd-col>
            <kd-col class="col-content bg-blue-dark" span="4" :style="{height: '20px'}">col-3</kd-col>
            <kd-col class="col-content bg-blue-light" span="4" :style="{height: '40px'}">col-4</kd-col>
        </kd-row>
    </div>
</template>
<style scoped lang="stylus" type="text/stylus">
    .title
        line-height 1.5
    .h-60
        height 60px
    .h-80
        height 40px
    .h-40
        height 20px
    .demo-layout
        margin-bottom 20px
        padding 10px 0
        background #f2f2f2
        height 100px
    .bg-blue-dark
        background #0a5eee
    .bg-blue-light
        background #4f8df8
    .col-content
        /*line-height 40px*/
        text-align center
        color #fff
</style>
```
:::


:::demo #响应式布局 ##响应式布局参考`bootstrap`，分为5个等级：`xs` `sm` `md` `lg` `xl`。你也可以对象的方式指定多个属性(包括：`span` `offset` `pull` `push`)的响应式，其中`xs="2"`等价于`xs={span: 2}`

```html
<template>
    <div>
        <h5 class="title">指定每一个断点Col所占的栅格数</h5>
        <kd-row class="demo-layout">
            <kd-col class="col-content bg-blue-dark" xs="24" sm="6" md="6" lg="4" xl="10">col</kd-col>
            <kd-col class="col-content bg-blue-light" xs="24" sm="8" md="12" lg="8" xl="2">col</kd-col>
            <kd-col class="col-content bg-blue-dark" xs="24" sm="6" md="4" lg="4" xl="10">col</kd-col>
            <kd-col class="col-content bg-blue-light" xs="24" sm="4" md="2" lg="8" xl="2">col</kd-col>
        </kd-row>
        <h5 class="title">指定一个断点，当宽度小于该断点时，Col将以100%宽度纵向排列</h5>
        <kd-row class="demo-layout"> 
            <kd-col class="col-content bg-blue-dark" md="16">col-md-18</kd-col>
            <kd-col class="col-content bg-blue-light" md="8">col-md-8</kd-col>
        </kd-row>
        <h5 class="title">同时指定多个属性</h5>
        <kd-row>
            <kd-col class="col-content bg-blue-dark" :md="{span: 4, offset: 4}" :lg="{span: 8, offset: 8}">1 col</kd-col>
            <kd-col class="col-content bg-blue-light" :md="{span: 8, offset: 8}" :lg="{span: 4, offset: 4}">2 col</kd-col>
        </kd-row>
    </div>
</template>
<style scoped lang="stylus" type="text/stylus">
    .title
        line-height 1.5
    .demo-layout
        margin-bottom 20px
    .bg-blue-dark
        background #0a5eee
    .bg-blue-light
        background #4f8df8
    .col-content
        line-height 40px
        text-align center
        color #fff
</style>
```
:::

### Row属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| gutter     | 栅格间距，单位px   | Number    | —  | 0
| justify     | 水平方向对其方式（启用flex布局）   | string    | start / end / center / between / around /evenly |   undefined   |
| align  | 垂直方向对其方式（启用flex布局）  | string  | top / bottom / middle / stretch /  baseline  |    undefined  |
| tag  | 元素标签类型   | string  |     —     |    div   |


### Col属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| span     | 栅格占据的列数   | Number    | —  | 24
| offset    | 栅格左侧偏移   | String / Number  | — |   undefined   |
| push  | 定义列距离左边界的栅格数  | String / Number  |   —  |    undefined    | 
| pull  | 定义列距离右边界的栅格数   | String / Number  |     —     |    undefined   |
| xs  | 响应式宽度 <768px   | String / Number / Object  |     —     |    undefined   |
| sm  | 响应式宽度 >768px   | String / Number / Object  |     —     |    undefined   |
| md  |  响应式宽度 >992px   | String / Number / Object  |     —     |    undefined   |
| lg  |  响应式宽度 >1200px   | String / Number / Object  |     —     |    undefined   |
| xl  |  响应式宽度 >1920px   | String / Number / Object  |     —     |    undefined   |
| tag  | 元素标签类型   | string  |     —     |    div   |

