import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Checkbox from '../components/Checkbox/index.js';
import Col from '../components/Col/index.js';
import Collapse from '../components/Collapse/index.js';
import CollapseItem from '../components/CollapseItem/index.js';
import Form from '../components/Form/index.js';
import FormItem from '../components/FormItem/index.js';
import Input from '../components/Input/index.js';
import Message from '../components/Message/index.js';
import Progress from '../components/Progress/index.js';
import Radio from '../components/Radio/index.js';
import Row from '../components/Row/index.js';
import Spin from '../components/Spin/index.js';
import Switch from '../components/Switch/index.js';

const components = [
    Button,
    ButtonGroup,
    Checkbox,
    Col,
    Collapse,
    CollapseItem,
    Form,
    FormItem,
    Input,
    Message,
    Progress,
    Radio,
    Row,
    Spin,
    Switch
];

const install = (Vue, opts = {}) => {
    Vue.prototype.$message = Message.creators;
    components.forEach(c => {
        Vue.component(c.name, c);
    });
    Vue.prototype.$KD = {
        zIndex: opts.zIndex || 2000
    };
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '0.0.1',
    install,
    Button,
    ButtonGroup,
    Checkbox,
    Col,
    Collapse,
    CollapseItem,
    Form,
    FormItem,
    Input,
    Message,
    Progress,
    Radio,
    Row,
    Spin,
    Switch
};
