### Steps步骤条
 用途： 引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法
#### 简单步骤条
>
:::demo #基础用法 简单步骤条 该条件下，position/direction/size/status,均失效
```html
<template>
    <div>
        <Steps v-model="stepIndex1" type="spot" style="margin-bottom:20px">
            <Step title="步骤一" ></Step>
            <Step title="步骤二" ></Step>
            <Step title="步骤三" ></Step>
            <Step title="完成" ></Step>
        </Steps>
        <Button @click="_next">下一步</Button>
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
                this.stepIndex1 = this.stepIndex1+1;
            }
        }
    }
</script>
```
:::
#### 有状态的步骤条
>
:::demo #基础用法 有状态的步骤条
```html
<template>
    <div>
        <Steps v-model="stepIndex1" style="margin-bottom:20px">
            <Step title="步骤一"></Step>
            <Step title="步骤二"></Step>
            <Step title="步骤三"></Step>
            <Step title="完成"></Step>
        </Steps>
        <Button @click="_next">下一步</Button>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                stepIndex1:2,
                description:'这里是描述文案，超出折行显示'
            }
        },
        methods:{
            _next(){
                this.stepIndex1 = this.stepIndex1+1;
            }
        }
    }
</script>
```
:::
#### 有描述的步骤条
>
:::demo #基础用法 有描述步骤条
```html
<template>
    <div>
        <Steps v-model="stepIndex1" style="margin-bottom:20px">
            <Step title="步骤一" :description="description"></Step>
            <Step title="步骤二" :description="description"></Step>
            <Step title="步骤三" :description="description"></Step>
            <Step title="完成" :description="description"></Step>
        </Steps>
        <Button @click="_next">下一步</Button>
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
                this.stepIndex1 = this.stepIndex1+1;
            }
        }
    }
</script>
```
:::
#### 自定义图标的步骤条
>
:::demo #基础用法 自定义图标的步骤条
```html
<template>
    <div>
        <Steps v-model="stepIndex1" style="margin-bottom:20px">
            <Step title="步骤一" icon="iconshijian"></Step>
            <Step title="步骤二" icon="iconshangchuanwenjian_wenjiantubiao"></Step>
            <Step title="步骤三" icon="icondaohangcaidan_morenbutton"></Step>
        </Steps>
        <Button @click="_next">下一步</Button>
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
                this.stepIndex1 = this.stepIndex1+1;
            }
        }
    }
</script>
```
:::
#### 简约版的步骤条
>
:::demo #基础用法 简约版的步骤条 该条件下 position / description / direction / size 都将失效
```html
<template>
    <div>
        <Steps v-model="stepIndex1" type='simple' style="margin-bottom:20px">
            <Step title="步骤一" icon="iconshijian"></Step>
            <Step title="步骤二" icon="iconshangchuanwenjian_wenjiantubiao"></Step>
            <Step title="步骤三" icon="icondaohangcaidan_morenbutton"></Step>
        </Steps>
        <Steps v-model="stepIndex1" type='simple' style="margin-bottom:20px">
            <Step title="步骤一" ></Step>
            <Step title="步骤二" ></Step>
            <Step title="步骤三" ></Step>
        </Steps>
        <Button @click="_next">下一步</Button>
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
                this.stepIndex1 = this.stepIndex1+1;
            }
        }
    }
</script>
```
:::
#### 竖时的步骤条
>
:::demo #基础用法 竖时的步骤条,其父元素一定要设置高度
```html
<template>
    <div>
    <div style="height:300px">
        <Steps v-model="stepIndex1" style="margin-bottom:40px" direction="vertical">
            <Step title="步骤一"></Step>
            <Step title="步骤二"></Step>
            <Step title="步骤三" :description="description"></Step>
        </Steps>
    </div>
        <Button @click="_next">下一步</Button>
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
                this.stepIndex1 = this.stepIndex1+1;
            }
        }
    }
</script>
```

:::

### Step属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value     | 当前激活的步骤   | string/Number    | 0 |
| title     | 标题   | string    | - |     —    |
| description  | 描述   | String  |     —     |    -   |
| position  | 标题和描述的位置   | string  |     bottom/right   |    right   |
| icon  | 自定义图标的类   | String  |     —     |    -   |
| shape  | 圆形按钮   | string  |     circle / round     |    —   |
| loading  | 设置加载中状态   | boolean  |    —      |    false   |
| icon  | 图标类名   | string  |     —     |    —   |