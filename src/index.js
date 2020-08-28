import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Col from '../components/Col/index.js';
import Message from '../components/Message/index.js';
import Row from '../components/Row/index.js';

const components = [
    Button,
    ButtonGroup,
    Col,
    Row,
    Message
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
    Col,
    Row,
    Message
};
