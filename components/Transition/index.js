import Transition from './transition.js';

Transition.install = function (Vue) {
    Vue.component(Transition.name, Transition);
};

export default Transition;
