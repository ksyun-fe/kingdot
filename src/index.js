import Breadcrumb from '../components/Breadcrumb/index.js';
import BreadcrumbItem from '../components/BreadcrumbItem/index.js';
import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Message from '../components/Message/index.js';
import Spin from '../components/Spin/index.js';

const components = [
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
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
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonGroup,
    Message,
    Spin
};
