### Installation

#### npm
Installing with npm is recommended and it works seamlessly with webpack.
```shell
npm i kingdot -S
```

#### CDN
Import JavaScript and CSS file in your page.
```html

<!-- 引入样式 -->
<link rel="stylesheet" href="https://xxx.com/kingdot/lib/theme-default/index.css">
<!-- 引入组件库 -->
<script src="https://xxx.com/kingdot/lib/index.js"></script>

```
#### Demo
If you are using CDN, a demo page is easy with Kingdot.
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <!-- import CSS -->
  <link rel="stylesheet" href="https://xxx.com/kingdot/lib/theme-default/index.css">
</head>
<body>
  <div id="app">
    <Button type='primary'>主要按钮</Button>
  </div>
</body>
  <!-- import Vue before Kingdot -->
  <script src="https://xxx.com/vue/dist/vue.js"></script>
  <!-- import JavaScript -->
  <script src="https://xxx.com/kingdot/lib/index.js"></script>
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