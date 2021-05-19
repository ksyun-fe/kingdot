### 快速上手

本节将介绍在项目中如何使用King Dot组件。

### 使用插件

使用 vue-cli 可以通过可视化的方式快速构建 King Dot 工程。

### 引入King Dot

在引入 king Dot 时，可以传入一个全局配置对象。该对象目前支持 zIndex 与 getEnabledStatus 字段。zIndex 设置弹框的初始 z-index（默认值：2000）；部分组件可通过getEnabledStatus方法的返回值（Boolean）来判断启用还是禁用。

#### 全部引入

```js
import Vue from 'vue';
import kingdot from 'kingdot';
import 'kingdot/lib/theme-default/index.css';
import App from './App.vue';

Vue.use(kingdot, {
  zIndex: 2000,
  getEnabledStatus: (authid)=>{
    ...
    return true;
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});
```

#### 按需引入

借助 babel-plugin-component，只引入需要的组件，以达到减少文件体积。先安装babel-plugin-component：

```js
npm install babel-plugin-component -D
```

然后将 .babelrc 修改为：

```js
{
    "presets": [
        [
            "env",
            {
                "modules": false,
                "targets": {
                    "browsers": [
                        "> 1%",
                        "last 2 versions",
                        "not ie <= 8"
                    ]
              }
            }
        ],
        "stage-2"
    ],
    "plugins": [
    [
      "component",
      {
        "libraryName": "kingdot",
        "styleLibraryName": "theme-default",
        "base": false
      }
    ]
    ]
}
```

接下来在main.js中引入Button组件，实例如下：

```js
import Vue from 'vue';
import { Button } from 'kingdot';
import App from './App.vue';

Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */
Vue.prototype.$KD = {
  zIndex: 2000,
  getEnabledStatus: (authid)=>{
    ...
    return true;
  }
}
new Vue({
  el: '#app',
  render: h => h(App)
});

```

以下是完整组件列表和引入方式：

```js
import Vue from 'vue';
import {
  Dialog,
  Input,
  Radio,
  Checkbox,
  Switch,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  Icon,
  Row,
  Col,
  Progress,
  Spinner,
  Steps,
  Step,
  Collapse,
  CollapseItem,
  Timeline,
  TimelineItem,
  Message,
} from 'kingdot';


Vue.use(Dialog);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Switch);
Vue.use(Table);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Progress);
Vue.use(Spinner);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Timeline);
Vue.use(TimelineItem);

```
###  权限功能
#### 全部引入

```js
import Vue from 'vue';
import kingdot from 'kingdot';
import 'kingdot/lib/theme-default/index.css';
import App from './App.vue';

Vue.use(kingdot, {
  zIndex: 2000
});
// 调用changeAuthList注入权限列表
kingdot.changeAuthList(list);

// 如需自定义权限逻辑处理方法，可通过全局配置参数getEnabledStatus
Vue.use(kingdot, {
  getEnabledStatus: (authList, authid)=>{
    ...
    return true;
  }
});

new Vue({
  el: '#app',
  render: h => h(App)
});
```
#### 按需引入

```js
import Vue from 'vue';
import { Button, enable} from 'kingdot';
import App from './App.vue';

Vue.component(Button.name, Button);
/* 或写为
 * Vue.use(Button)
 */
Vue.prototype.$KD = {
  zIndex: 2000,
  getEnabledStatus: enable.createEnabled()
  // 或者
  // getEnabledStatus: enable.createEnabled((authid)=>{
  //   ...
  //   return true;
  // }
}
// 调用changeAuthList注入权限列表
enable.changeAuthList(list);

new Vue({
  el: '#app',
  render: h => h(App)
});

```
