### DraggablePanel 可拖拽面板
    用途： 面板可以向左或向右或向下或向上拖拽来改变面板的宽高。

#### 横向左右拖拽
:::demo #基础用法 ## 向左右拖拽
```html
<template>
 <div class='container'>
    <kd-draggable-panel 
        horizontal
        :minWidth="280"
        :maxWidth="688"
        :width.sync="contentWidth"
        :height="300"
    >
        <template slot="content">
            <div>向右侧拖拽</div>
        </template>
    </kd-draggable-panel> 
    <div class="left-content">
         <kd-draggable-panel 
            horizontal
            :minWidth="280"
            :maxWidth="688"
            :width.sync="contentWidthleft"
            :height="300"
            moveDirection='left'
        >
            <template slot="content">
                <div>向左侧拖拽</div>
            </template>
        </kd-draggable-panel> 
    </div>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              contentWidth:280,
              contentWidthleft: 280
            }
        }
   }
</script>
<style scope lang="stylus">
    .left-content {
        position: absolute;
        right: 0;
        top: 0
    }

</style>
```
:::
#### 竖向上下拖拽
:::demo #基础用法 ## 向上下拖拽
```html
<template>
 <div class='container'>
    <kd-draggable-panel 
        vertical
        :minHeight="280"
        :maxHeight="388"
        :height.sync="contentHeight"
        :width="300"
    >
        <template slot="content">
            <div>向上拖拽</div>
        </template>
    </kd-draggable-panel> 
    <div class="left-content">
         <kd-draggable-panel 
            vertical
            :minHeight="180"
            :maxHeight="288"
            :height.sync="contentHeightBottom"
            :width="300"
            moveDirection='bottom'
        >
            <template slot="content">
                <div>向下拖拽</div>
            </template>
        </kd-draggable-panel> 
    </div>
 </div>   
</template>   
<script>
   export default {
        data(){
            return{
              contentHeight:280,
              contentHeightBottom: 180
            }
        }
   }
</script>
<style scope lang="stylus">
    .left-content {
        position: absolute;
        right: 0;
        top: 0
    }

</style>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| width     | 面板宽度    |  number / string    |  —         |  - |
| height    | 面板高度    | number / string     |  —       |  - |
| maxWidth  | 最大宽度    | number / string     |  —         |  - |  
| minWidth  | 最小宽度    | number / string     |  —         |  - |
| maxHeight | 最大宽度    | number / string     |  —         |  - |  
| minHeight | 最大宽度    | number / string     |  —         |  - |
| vertical  | 是否是竖向拖拽 | boolean           | false/true |  false | 
| horizontal| 是否是横向拖拽 | boolean           | false/true |  false | 
| moveDirection | 拖拽方向  | string    |  right/left/top/bottom     | vertical时，默认是top,horizontal时默认是right  |