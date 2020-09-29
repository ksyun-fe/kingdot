import Transition from './transition.vue';

Transition.install = function (Vue) {
    Vue.component(Transition.name, Transition);
};

export default Transition;
