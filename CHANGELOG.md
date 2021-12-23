## 更新日志

### Optimization
  * Button
      增加height,解决父元素设置flex布局时，高度随这个父元素变的问题
  * Table
      增加筛选列用法中是否默认选中功能      

*2021-12-03*
## v1.0.34

## Bugfix
* tabs
      修复tab自定义文字变换时伪类元素不自动跟随更新
### New features
  * Tooltip
      新增属性sameWidth：弹层宽度与参考元素宽度相同
  * Tree
    * 新增加icon slot：支持在名称前插入自定义图标

*2021-11-24*
## v1.0.33

### Optimization
  * Button
      type为text时，a标签改为行内块
## Bugfix
* Radio
      修改样式
* checkbox
      修改样式

*2021-11-19*
## v1.0.32
## Bugfix
* Form
      hideLabel场景下,fix content样式 bug
* Radio
      修改样式
* checkbox
      修改样式
*2021-11-19*
## v1.0.31

## Bugfix
* Form
      hideLabel场景下,fix content样式 bug

*2021-11-19*
## v1.0.30

## Bugfix
 * Select
      修复内部input的值导致的样式问题
### New features
  * Table
      合并表头增加插槽功能
### Optimization
  * Form
    优化Form样式
  * Checkbox
    优化Checkbox样式


*2021-11-17*
## v1.0.29
### New features
  * Button
      通过jsx的形式开发，实现链接按钮的【href】【target】属性，增加setButtonLink方法，设置button的href

*2021-11-17*
## v1.0.28
 ## revert
  * Button
      回滚：去掉href相关功能，下一版重新开发

*2021-11-17*
## v1.0.27

## Bugfix
 * Button
      链接类型button增加click事件

*2021-11-16*
## v1.0.26

### Optimization
  * Select
      优化禁用状态样式
  * checkbox
    修改默认字体大小

## Bugfix
  * tooltip
      model可直接操作弹层显示，不受disabled影响

### New features
  * skeleton
    add skeleton
  * Button
    链接按钮增加【href】【target】属性，增加setButtonLink方法，设置button的href
  * Form
    增加静态方法 addValidateMethod, 支持在 Form 扩展验证规则
  * Input
    增加 length-limit(prop), 开启后 Input 最大输入长度为 512
  * Upload
    增加 name(prop), 上传的文件字段名



*2021-11-04*
## v1.0.25

## Bugfix
* Drawer
    修复drawer自定义footer插槽层级问题

*2021-11-01*
## v1.0.24

### Bugfix
* Transfer
    fix filter list bug

*2021-11-01*
## v1.0.23

### Bugfix
* Spinner
    修复触发blur事件时，value值未更新的问题
* Select
    优化value非空值判断

*2021-10-27*
## v1.0.22

### Bugfix
* Select
    修复宽度问题


*2021-10-25*
## v1.0.21

### New features
* Transfer
    filterPlaceholder 搜索框占位文字 Array 类型参数

### Bugfix
* Select
    修复在filterable下空数据显示异常问题（临时解决）

### New features
* Timepicker
    disableTime 条件禁用支持 Array 类型参数
* Datepicker
    disableDate 条件禁用支持 Array 类型参数
### Bugfix
* Timepicker
    修复 disableTime 对于滚动选择器未生效问题
    修复首次选时间可以选中被禁止的时间

*2021-10-08*
## v1.0.20
### New features
* tooltip
    add the way to communicate with popper vm
* menu
    add menu

*2021-09-30*
## v1.0.19
### New features
* Table
    支持表头自定义
### Bugfix
* Radio
    修复单选按钮禁用状态下，光标的形状

*2021-09-17*
## v1.0.18
### Bugfix
* Select
    修复单选可过滤条件下，placeholder错误赋值的问题

### Optimization
* buttonGroup
    disabled状态时，选中的button增加50%的透明度，表示置灰

*2021-09-09*
## v1.0.17
### Optimization
* step
    样式优化


*2021-09-07*
## v1.0.16

### New features
* step
    支持没有title功能
* Datepicker
    feat 支持日历模式
* Timepicker
    perf 支持通过禁用列的方式控制精度
### Bug fixes
* FormItem
  * 修复validate时,bug

*2021-08-25*
## v1.0.15
### New features
* buttonGroup
  add disabled attribute


*2021-08-19*
## v1.0.14
### New features
* Editable
    add Editable component
* Progress
    feat 支持环形进度条中自定义内容
### Bug fixes
* Select
    修复group options中搜索过滤问题
    优化过滤后无数据的展示
### Optimization
* dependencies
    repair modified dependencies

*2021-08-13*
## v1.0.13
### Bug fixes
* Button
    fixed button 权限 disabled
* Table
    fixed table 展示列columnFilter key值
* Spinner
    fixed spinner 监听属性min,max的变化
### Optimization
* zIndex
    可初始化为函数，支持外部设定zIndex

*2021-08-05*
## v1.0.12

### New features
* DropDown
    add showArrow pop
* TimePicker, DateTimePicker
    支持分钟精度
* DatePicker, DateTimePicker
    扩展 shoutcuts 和 disabledDate 方法

### Optimization
*Steps
  样式优化
* TimePicker, DatePicker, DateTimePicker
    样式优化

### Bug fixes

* DateTimePicker
  * 未完成选择时, value和innerValue 不一致问题



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
