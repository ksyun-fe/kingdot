import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Input from '../components/Input/index.js';
import Message from '../components/Message/index.js';
import Switch from '../components/Switch/index.js';

const components = [
    Button,
    ButtonGroup,
    Input,
    Message,
    Switch
];

const install = (Vue, opts = {}) => {
    Vue.prototype.$message = Message.install;
    components.forEach(c => {
        Vue.component(c.name, c);
    });
    Vue.prototype.$KD = {
        zIndex: opts.zIndex || 2000
    };
};
export default {
    version: undefined,
    install: install,
    Button,
    ButtonGroup,
    Input,
    Message,
    Switch
};
