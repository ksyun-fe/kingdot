### 基础用法
:::demo #基础用法 基础的、简洁的标签页。
```html
<template>
 <div>
 <Tabs  v-model='key'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2'>标签页二</Tab>
    <Tab value='3'>标签页三</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### pagination标签 
:::demo #pagination标签 小型的，具有基础功能的标签页。
```html
<template>
 <div>
 <Tabs  v-model='key' type='pagination'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2'>标签页二</Tab>
    <Tab value='3'>标签页三</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### block标签 
:::demo #基础用法 大型的的标签页。
```html
<template>
 <div>
 <Tabs  v-model='key' type='block'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2'>标签页二</Tab>
    <Tab value='3'>标签页三</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### card标签 
:::demo #基础用法 卡片标签页。
```html
<template>
 <div>
 <Tabs  v-model='key' type='card'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2'>标签页二</Tab>
    <Tab value='3'>标签页三</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### 纵向标签页
:::demo #基础用法 纵向的标签页。
```html
<template>
 <div>
 <Tabs  v-model='key' type='vertical'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2'>标签页二</Tab>
    <Tab value='3'>标签页三</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### 标签页的禁用
:::demo #基础用法 disabled来控制标签页的禁用。
```html
<template>
 <div>
 <Tabs  v-model='key'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2' disabled>标签页二</Tab>
    <Tab value='3' disabled>标签页三</Tab>
 </Tabs>   
 <br>
 <Tabs  v-model='key' type='block'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2' disabled>标签页二</Tab>
    <Tab value='3' disabled>标签页三</Tab>
 </Tabs> 
 <br>  
 <Tabs  v-model='key'  type='vertical'>
    <Tab value='1'>标签页一</Tab>
    <Tab value='2' disabled>标签页二</Tab>
    <Tab value='3' disabled>标签页三</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### 标签的增加删除
:::demo #基础用法 可增加删除灵活控制标签个数。
```html
<template> 
<div>
 <Tabs v-model='editableTabsValue' type='block' @addTab='addTab' :closable=true  @close='closeTab' :addable=true>
      <Tab v-for="item in editableTabs" :value='item.name' :key='item.name'>  {{item.title}}  </Tab>
 </Tabs>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
               editableTabsValue: '2',
               editableTabs: [{
                    title: 'Tab 1',
                    name: '1',
               }, {
                   title: 'Tab 2',
                   name: '2',
                   }],
                 tabIndex: 2
            }
        },
        methods: {
        addTab(){
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
          });
          this.editableTabsValue = newTabName;
        },
        closeTab(targetName){
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          this.editableTabsValue = activeName;
        }
    },
   }
</script>
```
:::
### 自定义标签 
:::demo #基础用法 根具自己需求自定义内容的标签页。
```html
<template>
 <div>
 <Tabs  v-model='key' type='card'>
    <Tab value='1'> <i class='kd-icon-upload-file'></i> 标签页一</Tab>
    <Tab value='2'> <i class='kd-icon-date'></i> 标签页二</Tab>
    <Tab value='3'>自定义</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::
### 自定义标签 
:::demo #基础用法 根具自己需求自定义内容的标签页。
```html
<template>
 <div>
 <Tabs  v-model='key' type='card'>
    <Tab value='1'> <i class='kd-icon-upload-file'></i> 标签页一</Tab>
    <Tab value='2'> <i class='kd-icon-date'></i> 标签页二</Tab>
    <Tab value='3'>自定义</Tab>
 </Tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:1,
            }
        }
   }
</script>
```
:::

### Tabs属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model | 当前tabs的绑定值                   |  — | —         |  —
| isVertical           | tabs是否竖直     | boolean                    |  —       |  false
| type           | tabs的类型              | string                    | card / border-card |  
| closable          | tab是否可关闭              | boolean           |     —     |    false 
| size         | tabs的尺寸              |  string           |    default / large / small    |    default   
### Tab属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 当前tab的绑定值                   |  — | —         |  —
| disabled           | 标签页是否不可点击     | boolean                    |  —       |  false
### Events
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| close | 关闭tabs回调                 |  function | —         |  —

