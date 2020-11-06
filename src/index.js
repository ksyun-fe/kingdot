import Button from '../components/Button/index.js';
import ButtonGroup from '../components/ButtonGroup/index.js';
import Drawer from '../components/Drawer/index.js';
import Message from '../components/Message/index.js';
<<<<<<< HEAD
import Spin from '../components/Spin/index.js';
import Switch from '../components/Switch/index.js';
import Tab from '../components/Tab/index.js';
import Tabs from '../components/Tabs/index.js';
=======
>>>>>>> 1d16c7cd6c498928e3baf0f757afc777f37c4162

const components = [
    Button,
    ButtonGroup,
<<<<<<< HEAD
    Drawer,
    Message,
    Spin,
    Switch,
    Tab,
    Tabs
=======
    Message
>>>>>>> 1d16c7cd6c498928e3baf0f757afc777f37c4162
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
<<<<<<< HEAD
    Drawer,
    Message,
    Spin,
    Switch,
    Tab,
    Tabs
=======
    Message
>>>>>>> 1d16c7cd6c498928e3baf0f757afc777f37c4162
};
