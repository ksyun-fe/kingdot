## Tag标签
 用途： 用于标记和选择。
### 基础用法
:::demo #基础用法 ##基础的、简洁的Tag标签。
```html
<template>
    <div>
        <div class="tag-demo-item">
            <kd-tag>标签一</kd-tag>
            <kd-tag type="success">标签二</kd-tag>
            <kd-tag type="info">标签三</kd-tag>
            <kd-tag type="warning">标签四</kd-tag>
            <kd-tag type="danger">标签五</kd-tag>
            <kd-tag disabled>标签五</kd-tag>
        </div>
        <div class="tag-demo-item">
            <kd-tag type="success" isSolid>success标签</kd-tag>
            <kd-tag type="info" isSolid>info标签</kd-tag>
            <kd-tag type="warning" isSolid>warning标签</kd-tag>
            <kd-tag type="danger" isSolid>danger标签</kd-tag>
        </div>
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
<style>
    .tag-demo-item + .tag-demo-item {
        margin-top: 20px
    }
    .kd-tag {
        margin-right: 10px
    }

</style>
```
:::

### 不同大小
:::demo #size ## size除默认以外，还提供了两种：large、small
```html
<template>
    <div>
        <div class="tag-demo-item">
            <kd-tag size="large" type="info">标签二</kd-tag>
            <kd-tag type="info">标签三</kd-tag>
            <kd-tag size="small" type="info">标签四</kd-tag>
        </div>
    </div>   
</template>   
<script>
   export default {
        data(){
            return{
            }
        }
   }
</script>
<style>
    .tag-demo-item + .tag-demo-item {
        margin-top: 20px
    }
    .kd-tag {
        margin-right: 10px
    }

</style>
```
:::

### 自定义样式
:::demo #自定义样式 ##可以自定义背景色，边框颜色，字体颜色
```html
<template>
    <div>
        <div class="tag-demo-item">
            <kd-tag :backgroundColor="backgroundColor" :color="color" :borderColor="borderColor" closable>标签一</kd-tag>
        </div>
    </div>   
</template>   
<script>
   export default {
        data(){
            return{
              backgroundColor: '#905bb5',
              color: '#fff',
              borderColor: '#8814da'
            }
        }
   }
</script>
<style>
    .tag-demo-item + .tag-demo-item {
        margin-top: 20px
    }
    .kd-tag {
        margin-right: 10px
    }

</style>
```
:::

### 可移除标签

:::demo #可移除标签 ##设置closable属性可以定义一个标签是否可移除。默认的标签移除时会附带渐变动画，如果不想使用，可以设置disableAnimation属性，它接受一个Boolean，true 为关闭。
```html
<template>
    <div>
        <div class="tag-demo-item">
            <kd-tag closable>标签一</kd-tag>
            <kd-tag type="success" closable>标签二</kd-tag>
            <kd-tag type="info" closable>标签三</kd-tag>
            <kd-tag type="warning" closable>标签四</kd-tag>
            <kd-tag type="danger" closable>标签五</kd-tag>
            <kd-tag disabled closable @click="handlerClick">标签五</kd-tag>
        </div>
        <div class="tag-demo-item">
            <kd-tag type="success" isSolid closable>success标签</kd-tag>
            <kd-tag type="info" isSolid closable>info标签</kd-tag>
            <kd-tag type="warning" isSolid closable>warning标签</kd-tag>
            <kd-tag type="danger" isSolid closable @click="handlerClick">danger标签</kd-tag>
        </div>
    </div>   
</template>   
<script>
   export default {
        data(){
            return{
              key:'1',
            }
        },
        methods: {
            handlerClick(e) {
                console.log(e)
            }
        }
   }
</script>
<style>
    .tag-demo-item + .tag-demo-item {
        margin-top: 20px
    }
    .kd-tag {
        margin-right: 10px
    }

</style>
```

:::

### 动态编辑标签
:::demo #动态编辑标签 ##动态增加删除Tag标签
```html
<template>
    <div>
        <div class="tag-demo-item">
            <kd-tag v-for="(tag,index) in tagList" :key="index" :type="tag.type" closable @close="closeTag(index)">{{tag.name}}</kd-tag>
            <kd-input v-if="isShowInput" v-model="newTagValue" class="tag-input" ref="newTagInput"  @blur="handleInputConfirm"/>
            <kd-button type='primary' v-if="!isShowInput" hollow @click="showInput">new Tag</kd-button>
        </div>
    </div>   
</template>   
<script>
   export default {
        data(){
            return{
              tagList:[{
                  type: 'info',
                  name: '标签一'
              },{
                  type: 'info',
                  name: '标签二'
              }],
              newTagValue: '',
              isShowInput: false
            }
        },
        methods: {
            handlerClick(e) {
                console.log(e)
            },
            showInput() {
                this.isShowInput = true;
                this.$nextTick(()=> {
                    this.$refs.newTagInput.focus();
                })
            },
            handleInputConfirm() {
                let inputValue = this.newTagValue;
                if(inputValue) {
                    this.tagList.push({
                        type: 'info',
                        name: inputValue
                    })
                }
                this.isShowInput = false;
                this.newTagValue = ''
            },
            closeTag(index) {
                this.tagList.splice(index,1)
            }
        }
   }
</script>
<style>
    .tag-demo-item + .tag-demo-item {
        margin-top: 20px
    }
    .kd-tag {
        margin-right: 10px
    }
    .tag-input {
        width: 90px;
        margin-left: 10px;
        vertical-align: middle;
    }
</style>
```
:::

### Tabs属性
| 属性            | 说明                | 类型    | 可选值                               | 默认值         |
| --------------- | ------------------- | ------- | ------------------------------------ | -------------- |
| closable        | 是否可关闭            | —       | true/false                           |false           |
| type            | 类型                 | String   | success 、 info 、warning、danger    |                |
| disabled        | 是否禁用              | Boolean  | true/false                          | false
| isSolid         | 是否是实心的标签，仅适用于4种类型    | boolean | true/false                | false          |
| disableAnimation| 是否禁用渐变动画       | boolean  | true/false                           | false          |
| color           | 字体颜色        |    String      |                                     |                 |
| backgroundColor | 标签背景颜色       | String       |                                     |                 |
| borderColor     | 标签边框颜色       | String       |                                     |                 |
| size            | 标签大小           | String       | large/small                         |                 |