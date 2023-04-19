## Select-V2 虚拟选择器

在某些使用情况下，单个选择器可能最终加载数万行数据。 将这么多的数据渲染至 DOM 中可能会给浏览器带来负担，从而造成性能问题。 为了更好的用户和开发者体验，我们决定添加此组件。

:::demo #基本使用 ##适用广泛的基础选择器

```html
<template>
  <div>
    <div class="btn">
      <kd-button @click="randomData(1000)">1k</kd-button>
      <kd-button @click="randomData(10000)">10k</kd-button>
      <kd-button @click="randomData(100000)">10w</kd-button>
      <kd-button @click="randomData(300000)">30w</kd-button>
      <kd-button @click="randomData(500000)">50w</kd-button>
      length: {{ length }}
    </div>
    <kd-select-v2
      v-model="defaultValue"
      :data="dataSources"
      placeholder="请选择内容"
      size="large"
      width="200px"
      label-key="name"
      activeIcon
      @optionClick="optionClick"
    />
    <kd-select-v2
      v-model="defaultValue"
      :data="dataSources"
      placeholder="请选择内容"
      width="200px"
      label-key="label"
    />
    <kd-select-v2
      v-model="defaultValue"
      :data="dataSources"
      placeholder="请选择内容"
      size="small"
      width="200px"
    />
    <kd-select-v2
      v-model="defaultValue"
      :data="dataSources"
      placeholder="请选择内容"
      size="mini"
      width="200px"
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultValue: "a0",
        dataSources: [],
        count: 3000,
        length: 0,
      };
    },
    watch: {
      count() {
        this.randomData(this.count);
      },
    },
    created() {
      this.randomData(this.count);
    },
    methods: {
      randomData(length) {
        const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        let arr = Array.from({ length: length }).map((_, idx) => ({
          name: `name: ${initials[idx % 10]}${idx}`,
          value: `${initials[idx % 10]}${idx}`,
          label: ` ${initials[idx % 10]}${idx}`,
        }));
        this.dataSources = arr;
        setTimeout(() => {
          this.length = length;
        }, 0);
      },
      optionClick(v) {
        console.log("optionClick", v);
      },
    },
  };
</script>
<style lang="stylus">
  .btn
      margin-bottom 20px
      .kd-btn
          margin-right 20px
  .kd-select
      margin-right 5px
  .types
      margin 10px 0
</style>
```

:::

:::demo #多选 ##最基础的多选选择器

```html
<template>
  <div>
    <kd-select-v2
      v-model="defaultValue"
      placeholder="请选择内容"
      :data="dataSources"
      multiple
    />
    <div class="types">开启collapseTags</div>
    <kd-select-v2
      v-model="defaultValue"
      placeholder="请选择内容"
      :data="dataSources"
      multiple
      collapseTags
    />
    <div class="types">开启collapseTagsTooltip</div>
    <kd-select-v2
      v-model="defaultValue"
      placeholder="请选择内容"
      :data="dataSources"
      multiple
      collapseTags
      collapseTagsTooltip
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultValue: ["a0", "b1", "c2"],
        dataSources: [],
        count: 3000,
      };
    },
    watch: {
      count() {
        this.randomData(this.count);
      },
    },
    created() {
      this.randomData(this.count);
    },
    methods: {
      randomData(length) {
        const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        let arr = Array.from({ length: length }).map((_, idx) => ({
          value: `${initials[idx % 10]}${idx}`,
          label: `${initials[idx % 10]}${idx}`,
        }));
        this.dataSources = arr;
      },
    },
  };
</script>
```

:::

:::demo #可过滤的多选 ##当选项太多时，你可以使用 filterable 选项来启用过滤功能来找到所需的选项。

```html
<template>
  <kd-select-v2
    v-model="defaultValue"
    placeholder="请选择内容"
    :data="dataSources"
    multiple
    filterable
  />
</template>
<script>
  export default {
    data() {
      return {
        defaultValue: ["a0", "b1", "c2"],
        dataSources: [],
        count: 3000,
      };
    },
    watch: {
      count() {
        this.randomData(this.count);
      },
    },
    created() {
      this.randomData(this.count);
    },
    methods: {
      randomData(length) {
        const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        let arr = Array.from({ length: length }).map((_, idx) => ({
          value: `${initials[idx % 10]}${idx}`,
          label: `${initials[idx % 10]}${idx}`,
        }));
        this.dataSources = arr;
      },
    },
  };
</script>
```

:::

:::demo #禁用选择器本身或选项 ##您可以选择禁用 Select 或者 Select 中的某个选项。

```html
<template>
  <div>
    <kd-select-v2
      v-model="defaultValue"
      placeholder="请选择内容"
      :data="dataSources"
      multiple
      filterable
      disabled
    />
    <kd-select-v2
      v-model="defaultValue"
      placeholder="请选择内容"
      :data="dataSources"
      multiple
      filterable
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultValue: ["a0", "b1", "c2"],
        dataSources: [],
        count: 3000,
      };
    },
    watch: {
      count() {
        this.randomData(this.count);
      },
    },
    created() {
      this.randomData(this.count);
    },
    methods: {
      randomData(length) {
        const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        let arr = Array.from({ length: length }).map((_, idx) => ({
          value: `${initials[idx % 10]}${idx}`,
          label: `${initials[idx % 10]}${idx}`,
          disabled: idx % 10 === 0,
        }));
        this.dataSources = arr;
      },
    },
  };
</script>
```

:::

:::demo #一键清除 ##我们可以同时清除所有选定的选项。此设定也可适用于单选。

```html
<template>
  <div>
    <kd-select-v2
      v-model="defaultValue1"
      placeholder="请选择内容"
      :data="dataSources"
      clearAll
    />
    <kd-select-v2
      v-model="defaultValue2"
      placeholder="请选择内容"
      :data="dataSources"
      multiple
      clearAll
    />
  </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultValue1: "ao",
        defaultValue2: ["a0", "b1", "c2"],
        dataSources: [],
        count: 3000,
      };
    },
    watch: {
      count() {
        this.randomData(this.count);
      },
    },
    created() {
      this.randomData(this.count);
    },
    methods: {
      randomData(length) {
        const initials = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
        let arr = Array.from({ length: length }).map((_, idx) => ({
          value: `${initials[idx % 10]}${idx}`,
          label: `${initials[idx % 10]}${idx}`,
        }));
        this.dataSources = arr;
      },
    },
  };
</script>
```

:::

### Select-V2 Attributes {.component\_\_content}

| 属性                | 说明                                                                                                  | 类型           | 可选值                         | 默认值  |
| ------------------- | ----------------------------------------------------------------------------------------------------- | -------------- | ------------------------------ | ------- |
| value / v-model     | 绑定值                                                                                                | string / array | —                              | —       |
| data                | 下拉选项数据                                                                                          | array          | —                              | —       |
| valueKey            | 作为 value 唯一标识的键名                                                                             | string         | —                              | value   |
| labelKey            | 展示的数据的键名                                                                                      | string         | —                              | label   |
| placeholder         | 占位符                                                                                                | string         | —                              | —       |
| filterable          | 是否可以搜索                                                                                          | boolean        | —                              | false   |
| multiple            | 多选                                                                                                  | boolean        | —                              | false   |
| clearAll            | 全部清除按钮                                                                                          | boolean        | —                              | false   |
| activeIcon          | 选中的选项后面展示 icon                                                                               | boolean        | —                              | true    |
| disabled            | 禁用                                                                                                  | boolean        | —                              | false   |
| size                | 大小                                                                                                  | string         | large / default / small / mini | default |
| fluid               | 宽度是否 100%                                                                                         | boolean        | —                              | false   |
| width               | 宽度                                                                                                  | string         | —                              | —       |
| hideDestroy         | 弹层隐藏后是否销毁 dom                                                                                | Boolean        | —                              | false   |
| collapseTags        | 多选时是否将选中值按数字的形式展示                                                                    | Boolean        | —                              | false   |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags 属性必须设定为 true | Boolean        | —                              | false   |

### Select-V2 Events {.component\_\_content}

| 事件       | 说明                       | 回调参数      |
| ---------- | -------------------------- | ------------- |
| change     | 选中值发生变化时触发       | 选中值        |
| remove-tag | 多选移除 tag 触发          | 移除的 tag 值 |
| clear      | 单选清空内容，多选清空 tag | —             |
| focus      | 当 input 获得焦点时触发    | —             |
| blur       | 当 input 失去焦点时触发    | —             |
