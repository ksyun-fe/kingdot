## 更新日志

### Optimization
  * button
    * modify type='text'时，href的默认值
  * tree
    * 选中时增加class


## v1.0.57

*2023-01-12*
### Optimization
  * iconfont
    * modify iconfont build
### Bug fixes

  * Table
    * 修复 拖拽改变列宽度时title会重叠bug
## v1.0.56

*2022-12-19*

### New features

  * Select
    * add collapseTags prop

### Bug fixes

  * Select
    * 懒加载动态计算高度影响group分组的高度计算

## v1.0.55
*2022-08-30*
### Bugfix
  * Button
    * 修复primary Button Hover时backgroundColor
  * FormItem
    * 修复labelWidth 是否有单位问题
  * Tooltip
    * 修复 tooltips 提示不消失异常
  * Popconfirm
    * fix confirm Button disabled
  * FormItem
    * fix the validate error border color for select
### Optimization
  * input
    * modify suffix icon style
  * Button 
    * add setBtnEnableType全局方法，用于设置没有权限的按钮的表现形式（隐藏hide或置灰disabled）

## v1.0.54
*2022-07-19*
### New features
  * VirtualList
    * add VirtualList(虚拟列表)
  * SelectV2 
    * add SelectV2(虚拟化选择器)
### Bugfix
  * Tree
    * 修复treeul未使用nodeKey作为key

### Optimization
  * Steps
    * 优化 steps style

## v1.0.53
*2022-06-24*
### Optimization
  * TimePicker
    * optimize footer style

## v1.0.52
*2022-06-22*
### New features
  * TimePicker
    * add confirm/cancel features
  * DateTimePicker
    * add confirm/cancel features
### bug fix
  * Tabs
    * 修复默认Tabs close事件执行时，当tab被删除为空，伪类元素不消失问题
  * FormItem
    * 修复FormItem 自定义labelWidth不生效问题

## v1.0.51
*2022-06-09*

### New features
  * TimePicker
    * add multiple features
### bug fix
  * Select
    * 修复搜索过滤后显示数量较少时，弹层高度异常的问题
  * Tabs
    * 修复Tabs click事件执行两次问题
  * Upload
    * 删除文件时，onRemove方法传入file参数

## v1.0.50
*2022-04-26*
### bug fix
  * Dialog
    * dialog fix 遮罩层失效问题
  * Tabs
    * 修复handleTabMove属性在default tabs上伪类元素失效问题

## v1.0.49
*2022-04-22*
### New features
  * dialog
    * dialog add open method;

## v1.0.48
*2022-04-22*
### New features
  * Tabs
    * 新增resize动态显示左右切换button;
### bug fix
  * Tabs
    * 修复handleTabMove属性在 default tabs上失效问题
## v1.0.47
*2022-04-21*
## bug fix
  * Select
    * 优化搜索过滤情况下，placholder样式问题
## v1.0.46
*2022-04-15*
## bug fix
  * Select
    * Option增加属性：opIndex，优化在开启大数据量优化的时候，动态改变Option时候，造成下拉框展示空白
    * 开启大数据量优化时候，option数量过少造成的样式问题
    * Option属性label兼容number类型
## v1.0.45
*2022-03-25*
### bug fix
  * Dialog
    * 多个Dialog时，移动问题修复
  * Form
    * submit事件增加preventDefault

## v1.0.44
*2022-03-15*
### New features
  * Tag
    * 新增Tag组件
### bug fix
  * Tooltip
    * popper增加点击阻止冒泡
### Optimization
  * TimePicker & DatePicker
    * click 事件 阻止事件冒泡

### bug fix
  * Tree
    * 触发node-mouse-over鼠标滑过节点事件
## v1.0.43
*2022-03-04*
### New features
  * Table
    * 增加table tree 默认展开功能

### bug fix
  * Table
    * fixHeader 修复计算动态高度bug
    * 零时key导致slot插入别的组件更新状态导致 tr重新渲染


## v1.0.42
*2022-02-23*
### bug fix
  * Table
    * tree 展开层级错误

## v1.0.41
*2022-02-14*
### bug fix
  * Tabs
    * Tabs测试用例&样式优化
## v1.0.40
*2022-02-11*
### Optimization
* Docs
    * Form submit事件说明更新
### bug fix
  * Spinner
    * 修改手动输入时候，同步处理数据，改为失焦后处理数据（问题：存最大最小值时，输入2位数可能会引起数值变化异常）
## v1.0.39
*2022-01-27*
### bug fix
  * Select
    * clearAll重置后的值未根据是否多选
### Optimization
  * Button
    * type为none ,text height设为auto
  * Docs
      * Input 修改密码框示例

## v1.0.38
*2022-01-21*
### New features
  * Drawer
    * 解除最大宽度限制，可以更改出现位置
## v1.0.37
*2022-01-20*
### New features
  * Drawer
    * 解除最大宽度限制，可以更改出现位置
  * Form
    * 增加自定义规则描述
### fix
  * tabs
    * vertical类型tabs，伪类高度自适应
  * Tree
    * 将节点根元素由span改为div
  * Select
    * 优化兼容multiple下value为string的用法
## v1.0.36
*2022-01-06*
### bug fix
  * datepicker
    * 修复拾取其他日期单位,时间限制失效问题

  * Table
     修复tree模式下折叠bug

## v1.0.35
*2022-01-06*

### Optimization
  * Button
      * 增加height,解决父元素设置flex布局时，高度随这个父元素变的问题
  * Table
      * 增加筛选列用法中是否默认选中功能
  * Datepicker
      * 日期选择器支持拾取年, 月单位时间
### bug fix
  * Dropdown
      * 修复按钮size样式

## v1.0.34
*2021-12-03*
### bug fix
  * tabs
    * 修复tab自定义文字变换时伪类元素不自动跟随更新
### New features
  * Tooltip
    * 新增属性sameWidth：弹层宽度与参考元素宽度相同
  * Tree
    * 新增加icon slot：支持在名称前插入自定义图标


## v1.0.33
*2021-11-24*

### Optimization
  * Button
    * type为text时，a标签改为行内块
### bug fix
  * Radio
    * 修改样式
  * checkbox
    * 修改样式

*2021-11-19*
## v1.0.32
### bug fix
  * Form
    * hideLabel场景下,fix content样式 bug
  * Radio
    * 修改样式
  * checkbox
    * 修改样式

## v1.0.31
*2021-11-19*

### bug fix
  * Form
    * hideLabel场景下,fix content样式 bug


## v1.0.30
*2021-11-19*

### bug fix
  * Select
    * 修复内部input的值导致的样式问题
### New features
  * Table
    * 合并表头增加插槽功能
### Optimization
  * Form
     * 优化Form样式
  * Checkbox
    * 优化Checkbox样式



## v1.0.29
*2021-11-17*
### New features
  * Button
    * 通过jsx的形式开发，实现链接按钮的【href】【target】属性，增加setButtonLink方法，设置button的href


## v1.0.28
*2021-11-17*
### bug fix
  * Button
    * 回滚：去掉href相关功能，下一版重新开发


## v1.0.27
*2021-11-17*
### bug fix
  * Button
    * 链接类型button增加click事件


## v1.0.26
*2021-11-16*

### Optimization
  * Select
    * 优化禁用状态样式
  * checkbox
    * 修改默认字体大小

### bug fix
  * tooltip
    * model可直接操作弹层显示，不受disabled影响

### New features
  * skeleton
    * add skeleton
  * Button
    * 链接按钮增加【href】【target】属性，增加setButtonLink方法，设置button的href
  * Form
    * 增加静态方法 addValidateMethod, 支持在 Form 扩展验证规则
  * Input
    * 增加 length-limit(prop), 开启后 Input 最大输入长度为 512
  * Upload
    * 增加 name(prop), 上传的文件字段名




## v1.0.25
*2021-11-04*
### bug fix
  * Drawer
    * 修复drawer自定义footer插槽层级问题


## v1.0.24
*2021-11-01*
### bug fix
  * Transfer
    * fix filter list bug


## v1.0.23
*2021-11-01*
### bug fix
  * Spinner
    * 修复触发blur事件时，value值未更新的问题
  * Select
    * 优化value非空值判断


## v1.0.22
*2021-10-27*
### bug fix
  * Select
    * 修复宽度问题



## v1.0.21
*2021-10-25*
### New features
  * Transfer
    * filterPlaceholder 搜索框占位文字 Array 类型参数
  * Timepicker
    * disableTime 条件禁用支持 Array 类型参数
  * Datepicker
    * disableDate 条件禁用支持 Array 类型参数
### bug fix
  * Timepicker
    * 修复 disableTime 对于滚动选择器未生效问题
    * 修复首次选时间可以选中被禁止的时间
  * Select
    * 修复在filterable下空数据显示异常问题（临时解决）


## v1.0.20
*2021-10-08*
### New features
  * tooltip
    * add the way to communicate with popper vm
  * menu
    * add menu


## v1.0.19
*2021-09-30*
### New features
  * Table
    * 支持表头自定义
### bug fix
  * Radio
    * 修复单选按钮禁用状态下，光标的形状


## v1.0.18
*2021-09-17*
### bug fix
  * Select
    * 修复单选可过滤条件下，placeholder错误赋值的问题

### Optimization
  * buttonGroup
    * disabled状态时，选中的button增加50%的透明度，表示置灰


## v1.0.17
*2021-09-09*
### Optimization
  * step
    * 样式优化



## v1.0.16
*2021-09-07*
### New features
  * step
    * 支持没有title功能
  * Datepicker
    * feat 支持日历模式
  * Timepicker
    * perf 支持通过禁用列的方式控制精度
### Bug fixes
  * FormItem
    * 修复validate时,bug


## v1.0.15
*2021-08-25*
### New features
  * buttonGroup
    * add disabled attribute



## v1.0.14
*2021-08-19*
### New features
  * Editable
    * add Editable component
  * Progress
    * feat 支持环形进度条中自定义内容
### Bug fixes
  * Select
    * 修复group options中搜索过滤问题
    * 优化过滤后无数据的展示
### Optimization
  * dependencies
    * repair modified dependencies


## v1.0.13
*2021-08-13*
### Bug fixes
  * Button
    * fixed button 权限 disabled
  * Table
    * fixed table 展示列columnFilter key值
  * Spinner
    * fixed spinner 监听属性min,max的变化
### Optimization
  * zIndex
    * 可初始化为函数，支持外部设定zIndex


## v1.0.12
*2021-08-05*
### New features
  * DropDown
    * add showArrow pop
  * TimePicker, DateTimePicker
    * 支持分钟精度
  * DatePicker, DateTimePicker
    * 扩展 shoutcuts 和 disabledDate 方法

### Optimization
  * Steps
    * 样式优化
  * TimePicker, DatePicker, DateTimePicker
    * 样式优化

### Bug fixes

  * DateTimePicker
    * 未完成选择时, value和innerValue 不一致问题




## v1.0.11
*2021-07-05*
### Bug fixes

  * button
    * 修改空心按钮禁用状态样式问题以及禁用属性和权限属性逻辑关系




## v1.0.10
*2021-07-05*
### Bug fixes

  * Input
    * 修复输入框显示同value不一致的问题
  * Slider
    * 修复输入框model无效的问题

  * button
    * 修改权限authid与disabled的逻辑关系

### New features

  * FormItem
    * v-model支持传入数组
    * label默认在首行

### Optimization

  * drawer
    * 优化代码
  * tabs
    * 优化代码，避免初始化触发click event



## v1.0.9
*2021-06-17*
### New features

  * DateTimePicker
    * 新增日期时间选择器
    * 支持范围选择, 支持配置快捷选项, 支持自定义禁用日期

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
