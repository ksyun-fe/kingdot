### 折叠面板

:::demo #基本使用 ##使用 KdCollapseItem 定义每一项， KdCollapseItem 的`title`属性是要展示的标题，`disabled`属性用来禁用该项，`value`属性是选中该项的取值，默认取_uid,可以使用 v-model 进行双向绑定。

```html
<template>
    <kd-collapse
            v-model="value"
            @change="change"
    >
        <kd-collapse-item
                title="季风气候"
                value="climate"
                disabled
        >
            <ul>
                <li>亚热带大陆东岸因地处回归线附近，故形成亚热带气候。</li>
                <li>地处副热带沿海一带，夏季受海陆气温差异影响，吹东南风，冬季受来自西伯利亚的寒风影响，吹西北风，这二者轮流控制，季节性交替，偏角超过120度，形成了季风；</li>
                <li>降水受行星风带和巨大地形影响显著，天气的非周期性变化和降水季节变化都很显著，因而形成季风气候。</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item
                title="气候特性"
                value="features"
        >
            <ul>
                <li>季风气候总体气候特征为夏热冬温，四季分明，雨热同期，季风发达；</li>
                <li>季风气候热量丰富，年平均气温为15-22摄氏度，最冷月平均气温在0-15摄氏度之间，温暖指数为135摄氏度·月至240摄氏度·月之间；</li>
                <li>季风气候降水充沛，但季风性特征明显；从地域来看，降水总量从东南沿海向西北内陆递减，东南沿海可达2000毫米，而长江流域为1000毫米；从时间来看，春季降水约占全年降水总量的20-45%，夏季为30-50%，秋季为15-20%，冬季仅有10-15%；</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="自然景观" value="landscape">
            季风气候的地带性植被为亚热带常绿阔叶林，亦称之为副热带季风林。
            壳斗科、樟科、山茶科、木兰科和金缕梅科等是常绿阔叶林中的主要树种。典型的亚热带常绿阔叶林中的树木通常具有樟科植物的特征，叶片革质全缘、表面光亮，叶面常迎向阳光照射的方向，因此，常绿阔叶林又有照叶林之称。典型的有樟树、茶树、柑橘树、甘蔗等。
        </kd-collapse-item>
        <kd-collapse-item>
            <kd-select v-model="defaultValue" placeholder="请选择内容" filterable>
                <kd-option value="">空数据</kd-option>
                <kd-option v-for="item in options" :key="item.value" :title="item.label" :value="item.value">{{ item.label }}
                </kd-option>
            </kd-select>
        </kd-collapse-item>
    </kd-collapse>
</template>
<script>
    export default {
        data() {
            return {
                value: 'features',
                defaultValue:'',
                options:[]
            };
        },
        methods: {
            change(value) {
                console.log(value);
            }
        } ,
        mounted(){
            let data = []
            for(let i = 0; i <= 1000; i++){
                data.push(
                    {
                        value:"item" + i,
                        label:"item option " + i
                    }
                )
            }
            this.options = data;
        }   
    }   
</script>
```
:::

:::demo #手风琴模式 ##通过`accordion`属性设置手风琴模式。

```html
<template>
    <kd-collapse accordion>
        <kd-collapse-item title="季风气候">
            <ul>
                <li>亚热带大陆东岸因地处回归线附近，故形成亚热带气候。</li>
                <li>地处副热带沿海一带，夏季受海陆气温差异影响，吹东南风，冬季受来自西伯利亚的寒风影响，吹西北风，这二者轮流控制，季节性交替，偏角超过120度，形成了季风；</li>
                <li>降水受行星风带和巨大地形影响显著，天气的非周期性变化和降水季节变化都很显著，因而形成季风气候。</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="气候特性">
            <ul>
                <li>季风气候总体气候特征为夏热冬温，四季分明，雨热同期，季风发达；</li>
                <li>季风气候热量丰富，年平均气温为15-22摄氏度，最冷月平均气温在0-15摄氏度之间，温暖指数为135摄氏度·月至240摄氏度·月之间；</li>
                <li>季风气候降水充沛，但季风性特征明显；从地域来看，降水总量从东南沿海向西北内陆递减，东南沿海可达2000毫米，而长江流域为1000毫米；从时间来看，春季降水约占全年降水总量的20-45%，夏季为30-50%，秋季为15-20%，冬季仅有10-15%；</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="自然景观">
            季风气候的地带性植被为亚热带常绿阔叶林，亦称之为副热带季风林。
            壳斗科、樟科、山茶科、木兰科和金缕梅科等是常绿阔叶林中的主要树种。典型的亚热带常绿阔叶林中的树木通常具有樟科植物的特征，叶片革质全缘、表面光亮，叶面常迎向阳光照射的方向，因此，常绿阔叶林又有照叶林之称。典型的有樟树、茶树、柑橘树、甘蔗等。
        </kd-collapse-item>
    </kd-collapse>
</template>
```
:::

:::demo #简洁样式 ##通过`concise`设置简洁样式。

```html
<template>
    <kd-collapse concise>
        <kd-collapse-item title="季风气候">
            <ul>
                <li>亚热带大陆东岸因地处回归线附近，故形成亚热带气候。</li>
                <li>地处副热带沿海一带，夏季受海陆气温差异影响，吹东南风，冬季受来自西伯利亚的寒风影响，吹西北风，这二者轮流控制，季节性交替，偏角超过120度，形成了季风；</li>
                <li>降水受行星风带和巨大地形影响显著，天气的非周期性变化和降水季节变化都很显著，因而形成季风气候。</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="气候特性">
            <ul>
                <li>季风气候总体气候特征为夏热冬温，四季分明，雨热同期，季风发达；</li>
                <li>季风气候热量丰富，年平均气温为15-22摄氏度，最冷月平均气温在0-15摄氏度之间，温暖指数为135摄氏度·月至240摄氏度·月之间；</li>
                <li>季风气候降水充沛，但季风性特征明显；从地域来看，降水总量从东南沿海向西北内陆递减，东南沿海可达2000毫米，而长江流域为1000毫米；从时间来看，春季降水约占全年降水总量的20-45%，夏季为30-50%，秋季为15-20%，冬季仅有10-15%；</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="自然景观">
            季风气候的地带性植被为亚热带常绿阔叶林，亦称之为副热带季风林。
            壳斗科、樟科、山茶科、木兰科和金缕梅科等是常绿阔叶林中的主要树种。典型的亚热带常绿阔叶林中的树木通常具有樟科植物的特征，叶片革质全缘、表面光亮，叶面常迎向阳光照射的方向，因此，常绿阔叶林又有照叶林之称。典型的有樟树、茶树、柑橘树、甘蔗等。
        </kd-collapse-item>
    </kd-collapse>
</template>
```
:::

:::demo #自定义标题 ##通过slot自定义标题。

```html
<template>
    <kd-collapse>
        <kd-collapse-item>
            <template slot="icon">
                <i class="kd-icon-arrow-down kd-collapse-title-icon"></i>
            </template>
            <template slot="title">
                <div>季风气候</div>
            </template>
            <ul>
                <li>亚热带大陆东岸因地处回归线附近，故形成亚热带气候。</li>
                <li>地处副热带沿海一带，夏季受海陆气温差异影响，吹东南风，冬季受来自西伯利亚的寒风影响，吹西北风，这二者轮流控制，季节性交替，偏角超过120度，形成了季风；</li>
                <li>降水受行星风带和巨大地形影响显著，天气的非周期性变化和降水季节变化都很显著，因而形成季风气候。</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="气候特性">
            <ul>
                <li>季风气候总体气候特征为夏热冬温，四季分明，雨热同期，季风发达；</li>
                <li>季风气候热量丰富，年平均气温为15-22摄氏度，最冷月平均气温在0-15摄氏度之间，温暖指数为135摄氏度·月至240摄氏度·月之间；</li>
                <li>季风气候降水充沛，但季风性特征明显；从地域来看，降水总量从东南沿海向西北内陆递减，东南沿海可达2000毫米，而长江流域为1000毫米；从时间来看，春季降水约占全年降水总量的20-45%，夏季为30-50%，秋季为15-20%，冬季仅有10-15%；</li>
            </ul>
        </kd-collapse-item>
        <kd-collapse-item title="自然景观">
            季风气候的地带性植被为亚热带常绿阔叶林，亦称之为副热带季风林。
            壳斗科、樟科、山茶科、木兰科和金缕梅科等是常绿阔叶林中的主要树种。典型的亚热带常绿阔叶林中的树木通常具有樟科植物的特征，叶片革质全缘、表面光亮，叶面常迎向阳光照射的方向，因此，常绿阔叶林又有照叶林之称。典型的有樟树、茶树、柑橘树、甘蔗等。
        </kd-collapse-item>
    </kd-collapse>
</template>
```
:::
### Collase属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value/v-model  |  当前展开的CollapseItem取值  | string / number / Array   |     —     |    —   |
| concise     | 简洁样式(无边框)  | Boolean    |  — | false
| accordion     | 是否手风琴模式   | Boolean   | — |     false    |


### Collase事件
| 属性      | 说明    | 参数   |
|---------- |--------|--------|
| change  |  当用户点击触发的事件  |   更新后的值   |

### CollaseItem属性
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  |  当前CollapseItem的取值，默认会使用_uid值  | string  |     —     |    —   |
| title     | 面板标题   | string    |  — | — 
| disabled  | 禁用   | boolean  |     —     |    false   |


### CollaseItem事件
| 属性      | 说明    | 参数   |
|---------- |--------|--------|
| change  |  激活面板改变时触发  |   激活面板值   |
