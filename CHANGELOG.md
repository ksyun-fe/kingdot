## 更新日志

*2021-07-05*
## v1.0.11
### Bug fixes

* button
  * 修改空心按钮禁用状态样式问题以及禁用属性和权限属性逻辑关系



*2021-07-05*
## v1.0.10
### Bug fixes

* Input
  * 修复输入框显示同value不一致的问题
* Slider
  * 修复输入框model无效的问题

* button
  * 修改权限authid与disabled的逻辑关系

### New features

* FormItem
    v-model支持传入数组
    label默认在首行

### Optimization

* drawer
    优化代码
* tabs
    优化代码，避免初始化触发click event

*2021-06-17*

## v1.0.9

### New features

* DateTimePicker
    新增日期时间选择器
    支持范围选择, 支持配置快捷选项, 支持自定义禁用日期

### Optimization

* Steps
  * 优化Steps中各step之间连线样式，动态获取连线位置
* Dialog
  * dialog.md文档优化
  * dialog 样式优化
* TimePicker
  * 时间面板中的滚动选择器支持拖动
* transfer
  * style样式优化
* 官网
  * style样式优化

## v1.0.8

*2021-06-08*

### New features

* Button
  * add authid/clickDelay/delayTime attribute
* Table
  * 新增切换全选反选方法
    * 新增切换全选反选方法
  * 新增切换全选反选方法

### Bug fixes

* transfer
  * 修复设置selectedKeys属性，向右穿梭按钮激活
* 弹层zIndex层级
  * 修复弹层zIndex自定义无效
* Button
  * 修复disabled的value变更失效问题

### Optimization

* Button
  * 优化Button中authid的判断方法，增加全局配置：getEnabledStatus方法
  * 优化【快速上手】文档
  * 测试用例优化以及增加延时和权限的测试用力

## v1.0.7

*2021-05-07*

### Bug fixes

* Offline
  * 修复显示层级bug
    * 修复显示层级bug
  * 修复显示层级bug
* transfer
  * 修复showFilter不传filter-method会报错
  * 优化初始化代码
* dropdown
  * 卸载组件之前解绑方法

## v1.0.6

*2021-04-29*

### New features

* Offline
  * add Offline component

### Bug fixes

* Select
  * 修改延迟赋值value不显示label
    * 修改延迟赋值value不显示label
  * 修改延迟赋值value不显示label
  * 添加单测用例
* Button
  * 默认原生type修改成button
* Upload
  * 测试用例fix bug
* Spinner
  * 测试用例fix bug
* dropdown
  * 测试用例fix bug
    * 测试用例fix bug
  * 测试用例fix bug

## v1.0.5

*2021-04-01*

### New features

* TimePicker
  * 发布时间选择器
* transfer
  * 新增全局禁用功能

### Bug fixes

* Dialog
  * 测试用例修改
* Tabs
  * 测试用例修改
* button
  * 修改找父级button-group报错

### Optimization

* Dialog
  * 滚动条增加宽度样式
* Select
  * 初始化label显示问题

## v1.0.4

*2021-03-29*

### New features

* Select
  * 新增懒加载功能
* transfer
  * 新增全局禁用功能

### Bug fixes

* Datepicker
  * 范围日期模式允许选择一天范围.如: 2021-01-01 ~ 2021-01-01

### Optimization

* Docs
  * Button 修改loading示例
