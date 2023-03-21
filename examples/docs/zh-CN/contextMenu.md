## ContextMenu 自定义右键菜单

:::demo #基础用法 ##目标上点击右键显示自定义菜单

```html
<template>
        <div>
            <div class="demo-btn" @contextmenu.prevent="showMenu">右键点击</div>
            <kd-context-menu
                ref="contextMenu"
                :options="contextMenus"
                @select="contextClick"
            ></kd-context-menu>
        </div>
</template>
<script>
export default{
    data() {
        return{
            contextMenus: [
                {
                    label: '新建',
                    type: 'add',
                    icon: 'kd-icon-circle-plus-outline',
                    authid: ''
                },
                {
                    label: '编辑',
                    type: 'edit',
                    icon: 'kd-icon-edit',
                    authid: ''
                },
                {
                    label: '删除',
                    type: 'delete',
                    icon: 'kd-icon-delete',
                    authid: 'xxxx'
                },
                {
                    label: '上移',
                    type: 'moveUp',
                    icon: 'kd-icon-arrow-top',
                    authid: ''
                },
                {
                    label: '下移',
                    type: 'moveDown',
                    icon: 'kd-icon-arrow-down1',
                    authid: '',
                    disabled: true
                }
            ],
        }
    },
    mounted() {},
    methods: {
        contextClick(type) {
            console.log(type);
        },
        showMenu(event) {
            this.$refs.contextMenu.show(event.clientX, event.clientY);
        }
    }
}
</script>
<style scoped>
    .demo-btn {
        cursor: pointer;
    }
</style>
```
:::

:::demo #使用分组 ##目标上点击右键显示分组自定义菜单

```html
<template>
        <div>
            <div class="demo-btn" @contextmenu.prevent="showMenu">右键点击</div>
            <kd-context-menu
                ref="contextMenu"
                :options="contextMenus"
                :group="true"
                @select="contextClick"
            ></kd-context-menu>
        </div>
</template>
<script>
export default{
    data() {
        return{
            contextMenus: [[
                {
                    label: '新建',
                    type: 'add',
                    icon: 'ksicon-xinjian',
                    authid: ''
                },
                {
                    label: '编辑',
                    type: 'edit',
                    icon: 'ksicon-bianji1',
                    authid: '',
                    disabled: true
                }],
                [{
                    label: '删除',
                    type: 'delete',
                    icon: 'ksicon-delete',
                    authid: 'xxxx'
                },
                {
                    label: '上移',
                    type: 'moveUp',
                    icon: 'ksicon-shangyi',
                    authid: ''
                },
                {
                    label: '下移',
                    type: 'moveDown',
                    icon: 'ksicon-xiayi',
                    authid: '',
                    disabled: true
                }]
            ],
        }
    },
    mounted() {},
    methods: {
        contextClick(type) {
            console.log(type);
        },
        showMenu(event) {
            this.$refs.contextMenu.show(event.clientX, event.clientY);
        }
    }
}
</script>
<style scoped>
    .demo-btn {
        cursor: pointer;
    }
</style>
```

:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| options     | 选项列表    |  array | —         |  []
| group         | 分组展示      | boolean  |  —       |  false
| maxWidth          | 最大宽度              | number / string     |     —     |   220 
| maxHeight | 最大高度 | number / string     |     —     |   260 

### Events {.component__content}
| 事件名称      | 说明    | 回调参数 |
|---------- |-------- |---------- |
| select | 选中列表项时触发	 | 选中项的type

