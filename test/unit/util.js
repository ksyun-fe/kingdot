import Vue from 'vue';
import "babel-polyfill";
import kd from '../../src/index';
import Router from 'vue-router';
Vue.use(Router);
Vue.use(kd);
import 'src/styles/theme-default/index.styl';

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

export const triggerEvent = function (el, name, ...eventData) {
    let event, eventName;

    if (/^mouse|click/.test(name)) {
        eventName = 'MouseEvents';
    } else if (/^key/.test(name)) {
        eventName = 'KeyboardEvent';
    } else {
        eventName = 'HTMLEvents';
    }

    if (document.createEvent) {
        event = document.createEvent(eventName);
        event.initEvent(name, ...eventData);
    }

    if (el.dispatchEvent) {
        el.dispatchEvent(event);
    } else if (el.fireEvent) {
        el.fireEvent(`on${name}`, event);
    }
};
