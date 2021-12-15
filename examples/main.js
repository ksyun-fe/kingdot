import 'promise-polyfill/src/polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import HeaderArea from './components/header-area';
import SideNav from './components/side-nav';
import ComponentDemo from './components/component-demo';
import components from '../src/index.js';
import Highlight from './directives/highlight.js';
import resource from 'vue-resource';
import mixin from './js/mixin.js';
Vue.use(resource);
// Vue.use(components);
Vue.use(components, {
    setButtonLink: (href) => {
        return href;
    }
});
Vue.use(Highlight);
Vue.mixin(mixin);
Vue.component('header-area', HeaderArea);
Vue.component('side-nav', SideNav);
Vue.component('component-demo', ComponentDemo);
Vue.config.productionTip = false;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
