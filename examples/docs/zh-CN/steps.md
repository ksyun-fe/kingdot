## Steps步骤条
 用途： 引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

#### 简单步骤条

:::demo #基础用法 ##简单步骤条 该条件下，position/direction/size/status,均失效

```html
<template>
    <div>
        <kd-steps v-model="stepIndex1" type="spot" :isClick="true">
            <kd-step title="步骤一" ></kd-step>
            <kd-step title="步骤二" ></kd-step>
            <kd-step title="步骤三" ></kd-step>
            <kd-step title="完成" ></kd-step>
        </kd-steps>
        <kd-button @click="_next">下一步</kd-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:2
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1<=4 ? this.stepIndex1+1:1;
            }
        }
    }
</script>
```
:::
#### 有状态的步骤条

:::demo #基础用法 ##有状态的步骤条  状态可以通过 Steps的finishStatus属性控制，也可以单独对Step的status属性进行设置，进而控制状态
```html
<template>
<div>
    <div>
        <kd-steps v-model="stepIndex1" finishStatus='finished'>
            <kd-step title="步骤一" status="wait"></kd-step>
            <kd-step title="步骤二" status="error"></kd-step>
            <kd-step title="步骤三" status="active"></kd-step>
            <kd-step title="完成完成完成完成"></kd-step>
        </kd-steps>
        <kd-button @click="_next">下一步</kd-button>
    </div>
    <div>
        <kd-steps v-model="stepIndex2" size="small">
            <kd-step title="步骤一" ></kd-step>
            <kd-step title="步骤二" ></kd-step>
            <kd-step title="步骤三" ></kd-step>
            <kd-step title="完成完成完成完成"></kd-step>
        </kd-steps>
        <kd-button @click="_next1">下一步</kd-button>
    </div>
</div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:2,
                stepIndex2:2,
                description:'这里是描述文案，超出折行显示'
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1<=4 ? this.stepIndex1+1:1;
                
            },
            _next1(){
                this.stepIndex2 = this.stepIndex2<=4 ? this.stepIndex2+1:1;
            }
        }
    }
</script>
```
:::
#### 有描述的步骤条

:::demo #基础用法 ##有描述步骤条 描述的位置和标题的位置始终保持一致
```html
<template>
    <div>
        <kd-steps v-model="stepIndex1">
            <kd-step title="步骤一" :description="description"></kd-step>
            <kd-step title="步骤二" :description="description"></kd-step>
            <kd-step title="步骤三" :description="description"></kd-step>
            <kd-step title="完成" :description="description"></kd-step>
        </kd-steps>
        <kd-steps v-model="stepIndex1" position="bottom">
            <kd-step title="步骤一" :description="description"></kd-step>
            <kd-step title="步骤二" :description="description"></kd-step>
            <kd-step title="步骤三" :description="description"></kd-step>
            <kd-step title="完成" :description="description"></kd-step>
        </kd-steps>
        <kd-button @click="_next">下一步</kd-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:1,
                description:'这里是描述文案，超出折行显示'
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1<=4 ? this.stepIndex1+1:1;
            }
        }
    }
</script>
```
:::
#### 自定义图标的步骤条

:::demo #基础用法 ##自定义图标的步骤条 通过icon属性直接传图标类名即可
```html
<template>
    <div>
        <kd-steps v-model="stepIndex1">
            <kd-step title="步骤一" icon="kd-icon-upload-file"></kd-step>
            <kd-step title="步骤二" icon="kd-icon-menu-more"></kd-step>
            <kd-step title="步骤三" icon="kd-icon-success-circle"></kd-step>
        </kd-steps>
        <kd-button @click="_next">下一步</kd-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:1,
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1<=3 ? this.stepIndex1+1:1;
            }
        }
    }
</script>
```
:::
#### 简约版的步骤条

:::demo #基础用法 ##简约版的步骤条 该条件下 position / description / direction / size 都将失效
```html
<template>
    <div>
        <kd-steps v-model="stepIndex1" type='simple'>
            <kd-step title="步骤一" icon="kd-icon-upload-file"></kd-step>
            <kd-step title="步骤二" icon="kd-icon-menu-more"></kd-step>
            <kd-step title="步骤三" icon="kd-icon-success-circle"></kd-step>
        </kd-steps>
        <kd-steps v-model="stepIndex1" type='simple'>
            <kd-step title="步骤一" ></kd-step>
            <kd-step title="步骤二" ></kd-step>
            <kd-step title="步骤三" ></kd-step>
        </kd-steps>
        <kd-button @click="_next">下一步</kd-button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:1,
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1<=3 ? this.stepIndex1+1:1;
            }
        }
    }
</script>
```
:::
#### 竖式的步骤条

:::demo #基础用法 ##竖式的步骤条,其父元素一定要设置高度
```html
<template>
    <div>
        <kd-button @click="_next">下一步</kd-button>
        <div style="height:300px">
            <kd-steps v-model="stepIndex1" style="margin-bottom:40px" direction="vertical">
                <kd-step title="步骤一"></kd-step>
                <kd-step title="步骤二"></kd-step>
                <kd-step title="步骤三" :description="description"></kd-step>
            </kd-steps>
        </div>
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:1,
                description:'这里是描述文案，超出折行显示'
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1<=3 ? this.stepIndex1+1:1;
            }
        }
    }
</script>
```

:::

### Step属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 标题   | string    | - |     —    |
| description  | 描述   | String  |     —     |    -   |
| icon  | 自定义图标的类   | String  |     —     |    -   |
| status  | 当前步骤的状态   | string  |     wait/finished/error / active     |    —   |
| isClick | 是否启用点击功能 | boolean | true/false | false |

### Steps属性 {.component__content}
| 属性       | 说明              | 类型          | 可选值       | 默认值   |
|---------- |------------------|---------------|---------------|-------- |
| value     | 当前激活的步骤,v-model绑定     | string/Number  |    _          | 1       |
| type      |  steps的类型      | String         | default/simple/spot | default |
| direction |  steps的整体方向   | String         | horizontal/vertical  | horizontal |
| position  | 控制step标题和描述的位置 | String   | bottom/right  | right   |
| width     | steps的宽度       | Sring/Number |  -            |  -       |
| size      | step的大小        | String      | default/small | default   |
| finishStatus | 已完成步骤的状态 | String      | wait/finished/error/active | finished |
|currentStatus  | 当前激活步骤的状态 | String  | wait/finished/error/active | active |
### Step事件 {.component__content}
|    事件名    | 说明              |
|---------- |------------------|
| onClick | 当前step的点击事件 |