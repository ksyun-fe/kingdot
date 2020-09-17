import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Drawer from '../components/Drawer/index.js';
import Message from '../components/Message/index.js';
import Spin from '../components/Spin/index.js';

const components = [
    Button,
    ButtonGroup,
    Drawer,
    Message,
    Spin
];

const install = (Vue) => {
    Vue.prototype.$message = Message.install;
    components.forEach(c => {
        Vue.component(c.name, c);
    });
};
export default {
    version: undefined,
    install: install,
    Button,
    ButtonGroup,
    Drawer,
    Message,
    Spin
};
