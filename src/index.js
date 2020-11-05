import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Checkbox from '../components/Checkbox/index.js';
import Form from '../components/Form/index.js';
import FormItem from '../components/FormItem/index.js';
import Input from '../components/Input/index.js';
import Message from '../components/Message/index.js';
import Radio from '../components/Radio/index.js';
import Switch from '../components/Switch/index.js';
import Timeline from '../components/Timeline/index.js';
import TimelineItem from '../components/TimelineItem/index.js';
import Transition from '../components/Transition/index.js';
import Tree from '../components/Tree/index.js';

const components = [
    Button,
    ButtonGroup,
    Checkbox,
    Form,
    FormItem,
    Input,
    Message,
    Radio,
    Switch,
    Timeline,
    TimelineItem,
    Transition,
    Tree
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
    Checkbox,
    Form,
    FormItem,
    Input,
    Message,
    Radio,
    Switch,
    Timeline,
    TimelineItem,
    Transition,
    Tree
};
