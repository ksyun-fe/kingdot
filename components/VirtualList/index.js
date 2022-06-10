import VirtualList from './list.js';

VirtualList.install = function (Vue) {
    Vue.component(VirtualList.name, VirtualList);
};

export default VirtualList;
