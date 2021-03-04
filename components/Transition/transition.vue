<script>
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
            this.on = {
                beforeEnter(el) {
                    if (!el.dataset) el.dataset = {};

                    el.dataset.oldPaddingTop = window.getComputedStyle(el).paddingTop;
                    el.dataset.oldPaddingBottom = window.getComputedStyle(el).paddingBottom;

                    el.style.height = '0';
                    el.style.paddingTop = 0;
                    el.style.paddingBottom = 0;

                    el.classList.add('kd-collapse-transition');
                },
                enter(el) {
                    el.dataset.oldOverflow = el.style.overflow;
                    if (el.scrollHeight !== 0) {
                        el.style.height = el.scrollHeight + 'px';
                        el.style.paddingTop = el.dataset.oldPaddingTop;
                        el.style.paddingBottom = el.dataset.oldPaddingBottom;
                    } else {
                        el.style.height = '';
                        el.style.paddingTop = el.dataset.oldPaddingTop;
                        el.style.paddingBottom = el.dataset.oldPaddingBottom;
                    }
                    el.style.overflow = 'hidden';
                },
                afterEnter(el) {
                    // for safari: remove class then reset height is necessary
                    el.classList.remove('kd-collapse-transition');
                    el.style.height = '';
                    el.style.overflow = el.dataset.oldOverflow;
                },
                beforeLeave(el) {
                    if (!el.dataset) el.dataset = {};
                    el.dataset.oldPaddingTop = window.getComputedStyle(el).paddingTop;
                    el.dataset.oldPaddingBottom = window.getComputedStyle(el).paddingBottom;
                    el.dataset.oldOverflow = el.style.overflow;

                    // el.style.height = el.scrollHeight + "px";
                    el.style.height =
                        el.scrollHeight -
                        parseFloat(el.dataset.oldPaddingTop) -
                        parseFloat(el.dataset.oldPaddingBottom) +
                        'px';
                    el.style.overflow = 'hidden';
                    el.classList.add('kd-collapse-transition');
                },
                leave(el) {
                    if (el.scrollHeight !== 0) {
                        // for safari: add class after set height, or it will jump to zero height suddenly, weired
                        el.style.height = 0;
                        el.style.paddingTop = 0;
                        el.style.paddingBottom = 0;
                        el.classList.add('kd-collapse-transition');
                    }
                },
                afterLeave(el) {
                    el.classList.remove('kd-collapse-transition');
                    el.style.height = '';
                    el.style.overflow = el.dataset.oldOverflow;
                    el.style.paddingTop = el.dataset.oldPaddingTop || 0;
                    el.style.paddingBottom = el.dataset.oldPaddingBottom || 0;
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
                return oneOf(type, ['fade', 'move', 'slide', 'swing', 'zoom'])
                    ? new Normal(attrs)
                    : oneOf(type, ['collapse'])
                        ? new Collapse()
                        : {};
            };
            const data = Object.assign({}, ctx.data, motion(type));
            return h('transition', data, ctx.children);
        }
    };
</script>
