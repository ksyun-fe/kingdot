import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Message from '../components/Message/index.js';
import Spin from '../components/Spin/index.js';
import Tab from '../components/Tab/index.js';
import Tabs from '../components/Tabs/index.js';

const components = [
    Button,
    ButtonGroup,
    Message,
    Spin,
    Tab,
    Tabs
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
    Message,
    Spin,
    Tab,
    Tabs
};
