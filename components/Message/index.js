import Vue from 'vue';
import Message from './message.vue';
import nextZIndex from '../../src/utils/zIndex.js';

const messageTypes = ['success', 'warning', 'info', 'error'];

const Ctor = Vue.extend(Message);
const messages = [];
const defaultTop = 20;
const defaultMargin = 16;
const defaultDuration = 5000;

const isVNode = (node) => {
    return node !== null && typeof node === 'object' && Object.prototype.hasOwnProperty.call(node, 'componentOptions');
};

const getTop = (index, offset) => {
    let top = 0;
    let vm;

    offset = offset == null ? defaultTop : offset;

    for (let i = 0; i < index; i++) {
        vm = messages[i];
        if (vm && vm.$el.offsetHeight) {
            if (vm.offset != null && vm.offset > top) {
                offset = vm.offset;
            }

            top += vm.$el.offsetHeight + defaultMargin;
        } else if (vm) {
            nextTickRefreshTop();
        }
    }

    return top + offset + 'px';
};

const nextTickRefreshTop = (function () {
    let flag = false;
    return () => {
        if (flag) return;
        flag = true;
        Vue.prototype.$nextTick(() => {
            refreshTop();
            flag = false;
        });
    };
})();

const refreshTop = () => {
    messages.forEach((i, index) => {
        i.$el.style.top = getTop(index, i.offset);
    });
};

const close = (vm) => {
    const _index = messages.findIndex(i => i === vm);

    if (_index < 0) return;

    messages.splice(_index, 1);
    refreshTop();
};

const stopAllTimer = () => {
    messages.forEach(vm => vm.clearTimer());
};

const starAllTimer = () => {
    messages.forEach(vm => vm.startTimer());
};

const createMessage = (type, options, duration) => {
    const props = {
        fixed: {
            default: true
        }
    };

    if (typeof options === 'string') {
        options = {
            content: options
        };
    }

    options = {...options};

    if (type) {
        options.type = type;
    }

    if (duration != null) {
        options.duration = duration;
    }

    if (options.duration == null) {
        options.duration = defaultDuration;
    }

    if (typeof options.content === 'function') {
        options.content = options.content();
    }

    Object.keys(options).forEach(i => {
        if (i === 'content' && isVNode(options[i])) {
            return;
        }

        props[i] = {
            default() {
                return options[i];
            }
        };
    });

    const vm = new Ctor({
        props: props,
        data: {
            isShow: false
        }
    });

    if (isVNode(options.content)) {
        vm.$slots.default = options.content;
    }

    vm.$on('close', () => {
        close(vm);
    });
    vm.$on('mouseover', () => {
        stopAllTimer(vm);
    });
    vm.$on('mouseout', () => {
        starAllTimer(vm);
    });

    vm.$mount();
    vm.$el.style.zIndex = nextZIndex();
    vm.$el.style.top = getTop(messages.length, options.offset);
    vm.isShow = true;

    document.body.appendChild(vm.$el);
    messages.push(vm);
    return vm;
};

Message.creators = function (...res) {
    return createMessage(null, ...res);
};

messageTypes.forEach(type => {
    Message.creators[type] = function (...res) {
        return createMessage(type, ...res);
    };
});

export default Message;
