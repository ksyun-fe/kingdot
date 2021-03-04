import Popover from '../Tooltip/popover.js';

Popover.install = function (Vue) {
    Vue.component(Popover.name, Popover);
};

export default Popover;
