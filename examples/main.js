import Vue from 'vue';
import App from './App';
import router from './router';
import HeaderArea from './components/header-area';
import SideNav from './components/side-nav';
import ComponentDemo from './components/component-demo';
import components from '../src/index.js';
import iconList from './icon.json';
// import components from '../lib/kingdot';
import Highlight from './directives/highlight.js';
// 开发时用的样式
import '../src/styles/themes/theme-default/src/index.styl'; // theme1
// import '../src/styles/themes/theme/src/index.styl'; // theme1
// import '../src/styles/themes/theme/src/index.styl'; // theme2
// 项目中用到的样式
// import '../lib/theme-default/index.css'; // theme1
// import '../lib/theme/index.css'; // theme2

// import { use } from '../lib/lang/index.js';
// import enComponentWords from '../lib/lang/en-US/index.js';
// use(enComponentWords);
Vue.use(components);
Vue.use(Highlight);

Vue.component('header-area', HeaderArea);
Vue.component('side-nav', SideNav);
Vue.component('component-demo', ComponentDemo);
Vue.config.productionTip = false;
Vue.prototype.$iconList = iconList; // Icon列表
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
