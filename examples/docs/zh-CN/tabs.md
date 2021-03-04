### 基础用法
:::demo #基础用法 ##基础的、简洁的标签页。
```html
<template>
 <div>
 <kd-tabs  v-model='key'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2'>标签页二</kd-tab>
    <kd-tab value='3'>标签页三</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::
### pagination标签 
:::demo #pagination标签 ##小型的，具有基础功能的标签页。
```html
<template>
 <div>
 <kd-tabs  v-model='key' type='pagination'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2'>标签页二</kd-tab>
    <kd-tab value='3'>标签页三</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::
### block标签 
:::demo #基础用法 ##大型的的标签页。
```html
<template>
 <div>
 <kd-tabs  v-model='key' type='block'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2'>标签页二</kd-tab>
    <kd-tab value='3'>标签页三</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::
### card标签 
:::demo #基础用法 ##卡片标签页。
```html
<template>
 <div>
 <kd-tabs  v-model='key' type='card'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2'>标签页二</kd-tab>
    <kd-tab value='3'>标签页三</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::
### 纵向标签页
:::demo #基础用法 ##纵向的标签页。
```html
<template>
 <div>
 <kd-tabs  v-model='key' type='vertical'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2'>标签页二</kd-tab>
    <kd-tab value='3'>标签页三</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::
### 标签页的禁用
:::demo #基础用法 ##disabled来控制标签页的禁用。
```html
<template>
 <div>
 <kd-tabs  v-model='key'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2' disabled>标签页二</kd-tab>
    <kd-tab value='3' disabled>标签页三</kd-tab>
 </kd-tabs>   
 <br>
 <kd-tabs  v-model='key' type='block'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2' disabled>标签页二</kd-tab>
    <kd-tab value='3' disabled>标签页三</kd-tab>
 </kd-tabs> 
 <br>  
 <kd-tabs  v-model='key'  type='vertical'>
    <kd-tab value='1'>标签页一</kd-tab>
    <kd-tab value='2' disabled>标签页二</kd-tab>
    <kd-tab value='3' disabled>标签页三</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::
### 标签的增加删除
:::demo #基础用法 ##可增加删除灵活控制标签个数。
```html
<template> 
<div>
 <kd-tabs  
      v-model='editableTabsValue'
      type='block'
      @addTab='addTab' 
      @close='closeTab'
      :closable=true 
      :addable=true
      >

      <kd-tab
       v-for="item in editableTabs" 
       :value='item.name' 
       :key='item.name'
       > 

       {{item.title}}  

       </kd-tab>

 </kd-tabs>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
               editableTabsValue: '1',
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
:::demo #基础用法 ##根具自己需求自定义内容的标签页。
```html
<template>
 <div>
 <kd-tabs  v-model='key' type='card'>
    <kd-tab value='1'> <i class='kd-icon-upload-file'></i> 标签页一</kd-tab>
    <kd-tab value='2'> <i class='kd-icon-date'></i> 标签页二</kd-tab>
    <kd-tab value='3'>自定义</kd-tab>
 </kd-tabs>   
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        }
   }
</script>
```
:::

### Tabs属性
| 属性            | 说明                | 类型    | 可选值                               | 默认值         |
| --------------- | ------------------- | ------- | ------------------------------------ | -------------- |
| value / v-model | 当前tabs的绑定值    | —       | —                                    | —              |
| isVertical      | tabs是否竖直        | boolean | —                                    | false          |
| type            | tabs的类型          | string  | pagination / block / card / vertical |
| closable        | tab是否可关闭       | boolean | —                                    | false          |
| handleTabMove   | tab是否移动到最前面 | boolean | —                                    | false          |
| movingDistance  | 左右移动距离        |         | —                                    | Tabs可视区宽度 |
| addable         | Tab是否可添加       | boolean | —                                    | false          |
### Tab属性
| 属性     | 说明               | 类型    | 可选值 | 默认值 |
| -------- | ------------------ | ------- | ------ | ------ |
| value    | 当前tab的绑定值    | —       | —      | —      |
| disabled | 标签页是否不可点击 | boolean | —      | false  |
### Events
| 属性  | 说明         | 类型     | 可选值 | 默认值 |
| ----- | ------------ | -------- | ------ | ------ |
| close | 关闭tabs回调 | function | —      | —      |
### Slot
| 属性    | 说明           | 类型 | 可选值 | 默认值 |
| ------- | -------------- | ---- | ------ | ------ |
| addable | 自定义添加按钮 | —    | —      | —      |

