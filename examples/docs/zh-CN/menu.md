## Menu 菜单

### 基础用法
:::demo #基础用法 ##`submenu` 组件可以生成二级菜单, `trigger` 可以设置子菜单打开的触发方式，`disabled` 属性可以设置禁用

```html
<template>
    <div class="menu-demo">
        <kd-button @click="collapseChange" type="primary">{{ collapse ? '展开' : '收起' }}</kd-button>
        当前选中的菜单:{{selectedMenu}}
        <kd-menu
            class="demo-menu-block"
            :collapse="collapse"
            :selectedMenu.sync="selectedMenu" 
            :defaultOpeneds="defaultOpeneds"
        >
            <kd-menu-item
                v-for="(item, index) in menuList"
                :key="index"
                :tips="item.name"
                :disabled="item.disabled"
                :name="item.key"
            >
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </kd-menu-item>
            <kd-submenu name="2">
                <template slot="title">
                    <i class="kd-icon-menu-more"></i>
                    <span slot="title">子菜单</span>
                </template>
                <kd-menu-item name="2-1" tips="子菜单1">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单1</span>
                </kd-menu-item>
                <kd-menu-item disabled name="2-2" tips="子菜单2">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单2</span>
                </kd-menu-item>
                <kd-submenu
                    popperAppendToBody
                    trigger="click"
                    name="3"
                >
                    <template slot="title">
                        <i class="kd-icon-menu-more"></i>
                        <span slot="title">子子菜单</span>
                    </template>
                    <kd-menu-item name="2-3-1" tips="子菜单1">
                        <i class="kd-icon-menu-more"></i>
                        <span>子菜单1</span>
                    </kd-menu-item>
                    <kd-menu-item disabled name="2-3-2" tips="子菜单2">
                        <i class="kd-icon-menu-more"></i>
                        <span>子菜单2</span>
                    </kd-menu-item>
                    <kd-menu-item name="2-3-3" tips="子菜单3">
                        <i class="kd-icon-menu-more"></i>
                        <span>子菜单3</span>
                    </kd-menu-item>
                </kd-submenu>
            </kd-submenu>
        </kd-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                collapse: false,
                selectedMenu: '',
                defaultOpeneds: [],
                menuList: [{
                    name: '菜单1',
                    icon: 'kd-icon-menu-more',
                    key: '1'
                }, {
                    name: '菜单2',
                    disabled: true,
                    icon: 'kd-icon-menu-more',
                    key: '2'
                }, {
                    name: '菜单3',
                    icon: 'kd-icon-menu-more',
                    key: '3'
                }]
            };
        },
        methods: {
            collapseChange() {
                this.collapse = !this.collapse;
            },
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
.demo-menu-block
    width 400px
    margin-top 10px
    border-right 1px solid #ddd
</style>
```

:::


:::demo #横向模式 ##导航菜单默认垂直模式,`mode` 属性可设置为横向模式

```html
<template>
    <kd-menu
        class="demo-menu-block"
        mode="horizontal"
        :selectedMenu.sync="selectedMenu" 
        :defaultOpeneds="defaultOpeneds"
    >
        <kd-menu-item
            v-for="(item, index) in menuList"
            :key="index"
            :disabled="item.disabled"
            :name="item.key"
        >
            <i :class="item.icon"></i>
            <span>{{ item.name }}</span>
        </kd-menu-item>
        <kd-submenu name="2">
            <template slot="title">
                <i class="kd-icon-menu-more"></i>
                <span slot="title">子菜单</span>
            </template>
            <kd-menu-item name="2-1">
                <i class="kd-icon-menu-more"></i>
                <span>子菜单1</span>
            </kd-menu-item>
            <kd-menu-item disabled name="2-2">
                <i class="kd-icon-menu-more"></i>
                <span>子菜单2</span>
            </kd-menu-item>
            <kd-submenu
                popperAppendToBody
                trigger="click"
                name="3"
            >
                <template slot="title">
                    <i class="kd-icon-menu-more"></i>
                    <span slot="title">子子菜单</span>
                </template>
                <kd-menu-item name="2-3-1">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单1</span>
                </kd-menu-item>
                <kd-menu-item disabled name="2-3-2">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单2</span>
                </kd-menu-item>
                <kd-menu-item name="2-3-3">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单3</span>
                </kd-menu-item>
            </kd-submenu>
        </kd-submenu>
    </kd-menu>
</template>
<script>
    export default {
        data() {
            return {
                selectedMenu: '1',
                defaultOpeneds: [],
                menuList: [{
                    name: '菜单1',
                    icon: 'kd-icon-menu-more',
                    key: '1'
                }, {
                    name: '菜单2',
                    disabled: true,
                    icon: 'kd-icon-menu-more',
                    key: '2'
                }, {
                    name: '菜单3',
                    icon: 'kd-icon-menu-more',
                    key: '3'
                }]
            };
        },
        methods: {
        
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">

</style>
```

:::


:::demo #分组 ##`menu-item-group` 组件可以为菜单分组

```html
<template>
    <kd-menu
        class="demo-menu-block"
        :selectedMenu.sync="selectedMenu" 
        :defaultOpeneds="defaultOpeneds"
    >
        <kd-menu-item-group>
            <template slot="title">分组一</template>
            <kd-menu-item
                v-for="(item, index) in menuList"
                :key="index"
                :disabled="item.disabled"
                :name="item.key"
            >
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </kd-menu-item>
        </kd-menu-item-group>
        <kd-menu-item-group>
            <template slot="title">分组二</template>
            <kd-submenu>
                <template slot="title">
                    <i class="kd-icon-menu-more"></i>
                    <span slot="title">子菜单</span>
                </template>
                <kd-menu-item name="2-1">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单1</span>
                </kd-menu-item>
                <kd-menu-item disabled name="2-2">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单2</span>
                </kd-menu-item>
                <kd-menu-item name="2-3">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单3</span>
                </kd-menu-item>
            </kd-submenu>
        </kd-menu-item-group>
    </kd-menu>
</template>
<script>
    export default {
        data() {
            return {
                selectedMenu: '',
                defaultOpeneds: [],
                menuList: [{
                    name: '菜单1',
                    icon: 'kd-icon-menu-more',
                    key: '1'
                }, {
                    name: '菜单2',
                    disabled: true,
                    icon: 'kd-icon-menu-more',
                    key: '2'
                }, {
                    name: '菜单3',
                    icon: 'kd-icon-menu-more',
                    key: '3'
                }]
            };
        },
        methods: {
        
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
.demo-menu-block
    width 400px
</style>
```

:::

:::demo #自定义颜色 ##`backgroundColor` `textColor` `activeTextColor` `activeBackgroundColor` `hoverTextColor` `hoverBackgroundColor` 自定义显示的颜色

```html
<template>
    <div class="menu-demo">
        <kd-button @click="collapseChange" type="primary">{{ collapse ? '展开' : '收起' }}</kd-button>
        当前选中的菜单:{{selectedMenu}}
        <kd-menu
            class="demo-menu-block"
            :collapse="collapse"
            :selectedMenu.sync="selectedMenu" 
            :defaultOpeneds="defaultOpeneds"
            backgroundColor="rgb(84, 92, 100)"
            textColor="#fff"
            activeTextColor="rgb(255, 208, 75)"
            activeBackgroundColor="rgb(67, 74, 100)"
            activeBackgroundImage="linear-gradient(90deg, #5399FF 0%, #4E284D 100%)"
            hoverTextColor="rgb(255, 208, 75)"
            hoverBackgroundColor="rgb(67, 74, 80)"
        >
            <kd-menu-item
                v-for="(item, index) in menuList"
                :key="index"
                :tips="item.name"
                :disabled="item.disabled"
                :name="item.key"
            >
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
            </kd-menu-item>
            <kd-submenu name="2">
                <template slot="title">
                    <i class="kd-icon-menu-more"></i>
                    <span slot="title">子菜单</span>
                </template>
                <kd-menu-item name="2-1" tips="子菜单1">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单1</span>
                </kd-menu-item>
                <kd-menu-item disabled name="2-2" tips="子菜单2">
                    <i class="kd-icon-menu-more"></i>
                    <span>子菜单2</span>
                </kd-menu-item>
                <kd-submenu
                    popperAppendToBody
                    trigger="click"
                    name="3"
                >
                    <template slot="title">
                        <i class="kd-icon-menu-more"></i>
                        <span slot="title">子子菜单</span>
                    </template>
                    <kd-menu-item name="2-3-1" tips="子菜单1">
                        <i class="kd-icon-menu-more"></i>
                        <span>子菜单1</span>
                    </kd-menu-item>
                    <kd-menu-item disabled name="2-3-2" tips="子菜单2">
                        <i class="kd-icon-menu-more"></i>
                        <span>子菜单2</span>
                    </kd-menu-item>
                    <kd-menu-item name="2-3-3" tips="子菜单3">
                        <i class="kd-icon-menu-more"></i>
                        <span>子菜单3</span>
                    </kd-menu-item>
                </kd-submenu>
            </kd-submenu>
        </kd-menu>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                collapse: false,
                selectedMenu: '',
                defaultOpeneds: [],
                menuList: [{
                    name: '菜单1',
                    icon: 'kd-icon-menu-more',
                    key: '1'
                }, {
                    name: '菜单2',
                    disabled: true,
                    icon: 'kd-icon-menu-more',
                    key: '2'
                }, {
                    name: '菜单3',
                    icon: 'kd-icon-menu-more',
                    key: '3'
                }]
            };
        },
        methods: {
            collapseChange() {
                this.collapse = !this.collapse;
            }   
        }
    }
</script>
<style type="text/stylus" scoped rel="stylesheet/stylus" lang="stylus">
.demo-menu-block
    width 400px
    margin-top 10px
</style>
```

:::

### Menu 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| mode     |  模式   | string    |  horizontal / vertical  |    vertical    |
| collapse  |   水平折叠收起菜单（仅在 mode 为 vertical 时可用）   | Boolean  |     —     |   false    |
| selectedMenu  |   选中的值   | String / Number  |     —     |   ''    |
| defaultOpeneds  |   打开的 sub-menu   | Array  |     —     |   []    |
| accordion  |   是否只允许打开一个sub-menu   | Array  |     —     |   []    |
| backgroundColor     |  背景颜色   | string    |  String  |    -    |
| textColor     |  字体颜色   | string    |  String  |    -    |
| activeTextColor     |  选中字体颜色   | string    |  String  |    -    |
| activeBackgroundColor     |  选中背景颜色   | string    |  String  |    -    |
| hoverTextColor     |  hover字体颜色   | string    |  String  |    -    |
| hoverBackgroundColor     |  hover背景颜色   | string    |  String  |    -    |

### Menu 事件 {.component__content}

| 时间名称      | 说明    | 回调参数      |
|:---------- |:-------- |:---------- |
| open     | sub-menu 展开的回调   | sub-menu 的 name   |
| close     | sub-menu 关闭的回调   | sub-menu 的 name   |

### SubMenu 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| name     |  唯一标识   | string    |  String / Number  |    vertical    |
| disabled  |   是否禁用   | Boolean  |     —     |   false    |
| trigger  |   子菜单打开的触发方式   | String  |     click / hover     |   click    |
| popperClass  |   弹出菜单类名   | String  |     —     |   ''    |
| popperAppendToBody  |   是否将弹出菜单插入至 body 元素   | Boolean  |     —     |   false    |

### MenuGroup 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| title     |  分组标题   | string    |  String / Number  |    vertical    |


### MenuItem 属性 {.component__content}

| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| name     |  唯一标识   | string    |  String / Number  |    vertical    |
| disabled  |   是否禁用   | Boolean  |     —     |   false    |
| tips  |   菜单折叠时hover提示文案   | String  |     —     |   ''    |
