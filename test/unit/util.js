import Vue from 'vue';

import kd from '../../src/index';
Vue.use(kd);
import 'src/styles/themes/theme-default/src/index.styl';

let id = 0;

// 创建挂载dom
const createEl = function () {
    const el = document.createElement('div');
    el.id = 'app' + id;
    id++;
    document.body.appendChild(el);
    return el;
};

// 创建Vue实例
export const createVue = function (Component, mounted = true) {
    if (typeof Component === 'string') {
        Component = { template: Component };
    }
    return new Vue(Component).$mount(mounted ? createEl() : null);
};

// 创建组件实例
export const createCons = function (Component, propsData = {}, mounted = true) {
    if (typeof propsData === 'boolean') {
        mounted = propsData;
        propsData = {};
    }
    const Constructor = Vue.extend(Component);
    return new Constructor({ propsData }).$mount(mounted ? createEl() : null);
};

// 回收vm
export const destroyVM = function (vm) {
    vm.$destroy && vm.$destroy();
    vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
};
