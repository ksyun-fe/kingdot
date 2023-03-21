import ContextMenu from './context-menu.vue';

ContextMenu.install = function (Vue) {
    Vue.component(ContextMenu.name, ContextMenu);
};

export default ContextMenu;
