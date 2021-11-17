### 基础用法

:::demo #基础用法 ##基本的页面骨架。

```html
<template>
  <kd-skeleton v-model="flag" />
</template>
<script>
  export default {
    data() {
      return {
        flag: true,
      };
    },
  };
</script>
<style scoped lang="stylus"></style>
```

:::

### 多段落骨架

:::demo #多行段落骨架 ##可以通过 rows 属性配置行数。

```html
<template>
  <kd-skeleton v-model="flag" :rows="rows" />
</template>
<script>
  export default {
    data() {
      return {
        flag: true,
        rows: 5,
      };
    },
  };
</script>
<style scoped lang="stylus"></style>
```

:::

### 动画效果

:::demo #动画效果 ##通过 active 属性可以配置骨架流光效果

```html
<template>
  <kd-skeleton v-model="flag" :active="flag" />
</template>
<script>
  export default {
    data() {
      return {
        flag: true,
      };
    },
  };
</script>
<style scoped lang="stylus"></style>
```

:::

### 各种类型占位

:::demo #各种类型占位 ##通过type来展示各种不同类型的骨架样式

```html
<template>
  <kd-skeleton v-model="flag">
    <div slot="skeleton"  class="box">
      <kd-skeleton-item type="button" />
      <kd-skeleton-item type="box" />
      <kd-skeleton-item type="round" />
      <kd-skeleton-item type="title" />
      <kd-skeleton-item type="img" />
    </div>
  </kd-skeleton>
</template>

<script>
  export default {
    data() {
      return {
        flag: true,
      };
    },
  };
</script>
<style scoped lang="stylus">
    .box
      display:flex;
      div
       margin-left 20px
</style>
```

:::

### 场景示例

:::demo #基本页面示例 ##基本表格骨架示例

```html
<template>
  <kd-skeleton v-model="flag" active>
    <div slot="skeleton" class="box">
      <kd-skeleton-item type="box" class="left-menu-box" />
      <div class="content">
        <div class="header">
          <kd-skeleton-item type="title" />
          <kd-skeleton-item type="title" />
          <kd-skeleton-item type="title" />
          <kd-skeleton-item type="button" class="button" />
        </div>
        <div class="table">
          <kd-skeleton-item type="p" class="tablecolumn" v-for="i in rows" />
        </div>
      </div>
    </div>
  </kd-skeleton>
</template>

<script>
  export default {
    data() {
      return {
        flag: true,
        rows: 7,
      };
    },
  };
</script>
<style scoped lang="stylus">
  .box
    display flex
    border 2px solid #f2f2f2
  .left-menu-box
     width 200px !important
     height 500px !important
  .content
    border-left 2px solid #f2f2f2
    width calc( 100% - 200px )
    height 500px
    .header
      display:flex
      width: 100%
      height : 60px
      border-bottom 2px solid #f2f2f2
      div
        margin 20px 0 0 20px;
      .button 
        margin-top 10px  
    .table
      width: 100%
      height : calc(100% - 80px);
      padding 0 20px
      .tablecolumn
         height 40px
         width calc(100% - 40px)
</style>
```

:::

### 效果切换

:::demo #切换效果示例 ##动态切换效果展示

```html
<template>
  <div>
    <kd-switch @change="changeFlag" class="sleleton-switch"/>
    <kd-skeleton v-model="flag" active>
      <div slot="skeleton">
        <kd-skeleton-item type="img"   :width='styleNum' :height='styleNum'/>
      </div>
      <div>
        <img
          style="width:300px;height:300px"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2F1208%2F0721%2Fbizhi-0721-9326.jpg&refer=http%3A%2F%2Fimg2.niutuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639208066&t=abbc5735c8112e75874771d5a973400d"
        />
      </div>
    </kd-skeleton>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: true,
        styleNum:300
      };
    },
    methods: {
      changeFlag() {
        this.flag = !this.flag;
      },
    },
  };
</script>
<style scoped lang="stylus">
  .sleleton-switch
      margin-bottom 10px
</style>
```

:::

### Skeleton 属性 {.component\_\_content}

| 属性    | 说明             | 类型    | 可选值       | 默认值 |
| ------- | ---------------- | ------- | ------------ | ------ |
| v-model | 是否显示骨架屏   | boolean | true / false | false  |
| rows    | 占位行数         | number  | -            | 3      |
| active  | 是否显示动画效果 | boolean | true / false | false  |

### SkeletonItem 属性 {.component\_\_content}

| 属性   | 说明         | 类型   | 可选值                       | 默认值 |
| ------ | ------------ | ------ | ---------------------------- | ------ |
| type   | 占位显示类型 | string | p/round/box/title/img/button | p      |
| width  | 占位元素宽度 | number/string | -                            | -      |
| height | 占位元素高度 | number/string | -                            | -      |

### Slot {.component\_\_content}

| 属性     | 说明                           | 类型 | 可选值 | 默认值 |
| -------- | ------------------------------ | ---- | ------ | ------ |
| skeleton | 自定义骨架屏                   | slot | —      | —      |
| 默认     | 数据请求成功后要展示的真实页面 | slot | —      | —      |
