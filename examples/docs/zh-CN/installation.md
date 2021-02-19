### 安装

#### npm 安装
推荐使用 npm 的方式安装，它能更好地和 webpack 打包工具配合使用。
```shell
npm i kingdot -S
```

#### CDN
目前在页面上引入 js 和 css 文件即可开始使用。
```html

<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/kingdot/lib/theme-default/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/kingdot/lib/index.js"></script>

```
#### Demo
通过CDN的方式我们可以很容易的使用 Kingdot 写出一个页面。
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/kingdot/lib/theme-default/index.css">
</head>
<body>
  <div id="app">
    <Button type='primary'>主要按钮</Button>
  </div>
</body>
  <!-- import Vue before Kingdot -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- import JavaScript -->
  <script src="https://unpkg.com/kingdot/lib/index.js"></script>
  <script>
    new Vue({
      el: '#app',
      data: function() {
        return { }
      }
    })
  </script>
</html>
```