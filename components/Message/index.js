import Message from './message.vue';

Message.install = (Vue) => {
    Vue.component(Message.name, Message);
};

export default Message;
