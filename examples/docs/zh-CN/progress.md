## Progress进度条
用于展示操作进度，告知用户当前状态和预期。

:::demo #基础用法 ##线性进度条 自定义线条宽度及进度和最终状态展示
```html
<template>
<div>
    <kd-progress
            type="line"
            :percentage="0"
            :active="true"
            :strokeWidth="20"
            :showText="true"
            color="#4fcc6f"
    />
    <kd-progress
            type="line"
            :percentage="30"
            :active="true"
            :strokeWidth="20"
            :showText="true"
            status="error"
            color="#EF4E76"
    />
    <kd-progress
            type="line"
            :percentage="30"
            :active="true"
            :strokeWidth="20"
            :showText="true"
            status="warning"
            color="#FF9A42"
    />
    <kd-progress
            type="line"
            :percentage="percentage"
            :format="formatPercentage"
            color="#4fcc6f"
            :showText="true"
            :strokeWidth="20"
    />
    <kd-progress
            type="line"
            :percentage="percentage"
            color="#4fcc6f"
            :status="status"
            :showText="true"
            :strokeWidth="20"
    />
    <kd-progress
            type="line"
            :percentage="percentage"
            color="#4fcc6f"
            :status="status"
            :showText="true"
            :strokeWidth="50"
            progressTextSize="16"
    />
</div>
   
</template>
<script >
    export default{
        data() {
            return {
                percentage: 0,
                status: '',
            }
        },
        mounted() {
            let interval = setInterval(() => {
                   this.percentage++;
                   if(this.percentage === 100) {
                   clearInterval(interval);
                    this.status = 'success';
                }
            }, 60)
        },
        methods: {
            formatPercentage(percentage) {
                return percentage === 100 ? 'fulfill' : `${ percentage }%`;
            }
        }
    }
</script>
<style>
    .kd-progress {
        margin-bottom: 10px;
    }
</style>
```
:::

:::demo #基础用法 ##可以通过字符串,数组或者函数进行自定义颜色
```html
<template>
<div>
    <kd-progress
            type="line"
            ref="strColor"
            :percentage="30"
            :strokeWidth="20"
            :showText="true"
            color="#4fcc6f"
    />
    <kd-progress
            type="line"
            ref="arrColor"
            :percentage="percentage"
            :color="customColorArray"
            :strokeWidth="20"
    />
    <kd-progress
            type="line"
            ref="funcColor"
            :percentage="percentage"
            :color="customColorFunc"
            :strokeWidth="20"
    />
</div>
   
</template>
<script >
    export default{
        data() {
            return {
                  percentage: 0,
                  customColorArray: ['#557DFC', '#FF9A42', '#EF4E76', '#38C482']
            }
        },
        mounted() {
            let interval = setInterval(() => {
                this.percentage++;
                if(this.percentage === 100) {
                    clearInterval(interval);
                    this.status = 'success';
                }
            }, 60);
        },
        methods: {
            customColorFunc(percentage) {
                if(percentage <= 25) {
                    return this.customColorArray[0];
                }else if(percentage <= 50) {
                    return this.customColorArray[1];
                }else if(percentage <= 75) {
                    return this.customColorArray[2];
                }else {
                    return this.customColorArray[3];
                }
            }
        }
    }
</script>
<style>
    .kd-progress {
        margin-bottom: 10px;
    }
</style>
```
:::


:::demo #基础用法 ##内部显示进度
```html
<template>
<div>
    <kd-progress
            type="line"
            :percentage="30"
            color="#4fcc6f"
            :showText="true"
            :textInside="true"
            :strokeWidth="30"
            :progressTextSize="16"
    />
</div>

</template>
<style>
.kd-progress {
margin-bottom: 10px;
}
</style>
```
:::

:::demo #环形进度条 ##Progress 组件可通过 type 属性来指定使用环形进度条，在环形进度条中，还可以通过 width 属性来设置其大小。
```html
<template>
<div>
    <kd-progress
            type="circle"
            :percentage="percentage"
            color="#4fcc6f"
            :showText="true"
            :progressTextSize="12"
    />
</div>
   
</template>
<script >
    export default{
        data() {
            return {
                percentage: 0
            }
        },
        mounted() {
            let interval = setInterval(() => {
                this.percentage++;
                if(this.percentage === 100) {
                    clearInterval(interval);
                }
            }, 1000)
        } 
    }
</script>
<style>
.kd-progress {
margin-bottom: 10px;
}
</style>
```
:::

:::demo #环形进度条 ##Progress 组件可通过 type 属性来指定使用环形进度条，在环形进度条中，还可以通过 width 属性来设置其大小。
```html
<template>
<div>
    <kd-progress
            type="circle"
            :percentage="percentage"
            color="#4fcc6f"
            :showText="true"
            :status="status"
    />
    <kd-progress
            type="circle"
            :percentage="20"
            color="red"
            :showText="true"
            status="error"
    />
    <kd-progress
            type="circle"
            :percentage="40"
            color="red"
            :showText="true"
            status="warning"
    />
</div>
   
</template>
<script >
    export default{
        data() {
            return {
                percentage: 0,
                status: ''
            }
        },
        mounted() {
            let interval = setInterval(() => {
                this.percentage++;
                if(this.percentage === 100) {
                    clearInterval(interval);
                    this.status = 'success'
                }
            }, 60)
        } 
    }
</script>
<style>
.kd-progress {
    margin-right: 10px;
}
</style>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type      | 类型           | string       | line/circle | line
| percentage | 百分比 | number | 0 <= percentage <= 100  |  0
| strokeWidth | 进度条宽度 | number | -- | 4
| showText | 是否显示百分比 | boolean | true/false | false
| textInside | 是否内置显示百分比 | boolean | true/false | false
| status | 进度条当前状态 | string | success/error/warning
| color | 进度条背景颜色 | string/function/array | -- | --
| width | 画布宽度(仅type为circle时可用) | number | -- | 100
| progressTextSize | 显示百分比时字体大小 | number | -- | 12
| active | 显示动态进度 | boolean | true/false | false