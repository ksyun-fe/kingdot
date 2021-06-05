## Menu 菜单

### 基础用法

:::demo #基础用法 ##`Menu`的基本用法，及禁用状态。通过`v-model`进行数据双向绑定。由于`trueValue`的默认值为`true`，所以可以直接传入`value=true`来指定选中状态。

```html
<template>
    <div class="menu-demo">
        <kd-menu :selectedIndex="selectedIndex">
            <kd-menu-item
                v-for="(value,key) in menuList"
                :key="key"
                :disabled="value.disabled"
                index="select"
            >
                <i :class="value.icon"></i>{{ value.name }}
            </kd-menu-item>
            <kd-submenu>
                <template slot="title">
                    <i class="kd-icon-menu-more"></i>子菜单
                </template>
                <kd-menu-item disabled index="1">
                    <i class="kd-icon-menu-more"></i>1
                </kd-menu-item>
                <kd-menu-item index="2">
                    <i class="kd-icon-menu-more"></i>2
                </kd-menu-item>
                <kd-menu-item index="3">
                    <i class="kd-icon-menu-more"></i>3
                </kd-menu-item>
            </kd-submenu>
            <kd-submenu>
                <template slot="title">分组导航一</template>
                <kd-menu-item-group>
                    <template slot="title">分组一</template>
                    <kd-menu-item index="4">
                        <i class="kd-icon-menu-more"></i>分组菜单1
                    </kd-menu-item>
                </kd-menu-item-group>
                <kd-menu-item-group title="分组二">
                    <kd-menu-item index="5">
                        <i class="kd-icon-menu-more"></i>分组菜单2
                    </kd-menu-item>
                </kd-menu-item-group>
            </kd-submenu>
        </kd-menu>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                menuList: [
                    {
                        name: '菜单1',
                        disabled: true,
                        icon: 'kd-icon-menu-more',
                        children:[]
                    },{
                        name: '菜单2',
                        icon: 'kd-icon-menu-more',
                        children:[{
                            name: '菜单2-1',
                            disabled: true,
                            icon: 'kd-icon-menu-more'
                        },{
                            name: '菜单2-2',
                            icon: 'kd-icon-menu-more'
                        }]
                    }
                ],
                selectedIndex: 'select'
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
    .menu-demo
        width 400px
</style>
```

:::

:::demo #基础用法 ##`Menu`的基本用法，及禁用状态。

```html
<template>
    <div>
        <kd-menu
            mode="horizontal"
            hoverTextColor="#557DFC"
            hoverBackgroundColor="#FFF">
            <kd-menu-item
                v-for="(v,k) in menuList"
                :key="k"
                :disabled="v.disabled"
            ><i :class="v.icon"></i>{{ v.name }}</kd-menu-item>
        </kd-menu>
    </div>
</template>
<script>
    export default  {
        data() {
            return {
                menuList: [
                    {
                        name: '菜单1',
                        disabled: true,
                        icon: 'kd-icon-menu-more',
                        children:[]
                    },{
                        name: '菜单2',
                        icon: 'kd-icon-menu-more',
                        children:[{
                            name: '菜单2-1',
                            disabled: true,
                            icon: 'kd-icon-menu-more'
                        },{
                            name: '菜单2-2',
                            icon: 'kd-icon-menu-more'
                        }]
                    }
                ]
            }
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus</style>
```

:::

### 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| value     | 单选框的取值，用于v-model进行双向绑定   | Boolean / String / Number    |  —  |    —    |
| trueValue  |   单选框选中后的值   | Boolean / String / Number  |     —     |   true    |
| disabled     | 是否禁用   | Boolean    |     true / false     |    false     |
| type  |   定义radio的排列方式：垂直、水平   | String  |     "vertical" / "horizontal"    |    "horizontal"    |

### 事件 {.component__content}

| 时间名称      | 说明    | 回调参数      |
|:---------- |:-------- |:---------- |
| change     | 绑定值变化时触发的事件   | 选中的 Radio 值   |
