const oneOf = (value, validList) => validList.indexOf(value) > -1;
class Normal {
    constructor({ type, motion }) {
        const cls = motion ? `${type}-${motion}` : type;
        this.props = {
            'enter-active-class': `${cls}-enter ${cls}-enter-active`,
            'leave-active-class': `${cls}-leave ${cls}-leave-active`
        };
    }
}
class Collapse {
    constructor() {
        this.props = {
            'enter-active-class': 'kd-motion-collapse kd-motion-collapse-active',
            'leave-active-class': 'kd-motion-collapse kd-motion-collapse-active'
        };
        this.on = {
            beforeEnter(el) {
                el.style.height = 0;
                el.style.opacity = 0;
            },
            enter(el) {
                el.style.height = `${el.scrollHeight}px`;
                el.style.opacity = 1;
            },
            afterEnter(el) {
                el.style.height = '';
                el.style.opacity = '';
            },
            beforeLeave(el) {
                el.style.height = `${el.offsetHeight}px`;
                el.style.opacity = 1;
            },
            leave(el) {
                el.scrollHeight && (el.style.height = 0);
            },
            afterLeave(el) {
                el.style.height = '';
                el.style.opacity = '';
            }
        };
    }
}

export default {
    name: 'KdTransition',
    functional: true,
    render(h, ctx) {
        const attrs = ctx.props;
        const type = attrs.type;
        const motion = (type) => {
            return oneOf(type, ['fade', 'move', 'slide', 'swing', 'zoom']) ? new Normal(attrs)
                : oneOf(type, ['collapse']) ? new Collapse()
                    : {};
        };
        const data = Object.assign({}, ctx.data, motion(type));
        return h('transition', data, ctx.children);
    }
};
