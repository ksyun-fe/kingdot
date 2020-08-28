const mediaBreakSize = require('../../src/media.js').mediaBreakSize;
const mediaBreakSizeProp = mediaBreakSize.reduce((props, size) => {
    props[size] = {type: [String, Number, Object]};
    return props;
}, {});
export default {
    name: 'Col',
    props: Object.assign({}, mediaBreakSizeProp, {
        span: {
            type: [Number, String],
            default: 24
        },
        offset: {
            type: [String, Number]
        },
        push: {
            type: [String, Number]
        },
        pull: {
            type: [String, Number]
        },
        tag: {
            type: String,
            default: 'div'
        }
    }),
    computed: {
        gutter() {
            let parent = this.$parent;

            while (parent && parent.$options.name !== 'Row') {
                parent = parent.$parent;
            }

            return parent && parent.gutter;
        },
        className() {
            const classList = [];

            ['span', 'offset', 'pull', 'push'].forEach(prop => {
                if (this[prop] != null) {
                    classList.push(`kd-col-${prop}-${this[prop]}`);
                }
            });
            mediaBreakSize.forEach(size => {

                if (typeof this[size] === 'object') {
                    Object.keys(this[size]).forEach(prop => {
                        classList.push(`kd-col-${size}-${prop}-${this[size][prop]}`);
                    });
                } else if (this[size] != null) {
                    classList.push(`kd-col-${size}-span-${this[size]}`);
                }

            });
            return classList;
        },
        style() {
            let style = {};

            if (this.gutter) {
                style.paddingLeft = this.gutter / 2 + 'px';
                style.paddingRight = style.paddingLeft;
            }

            return style;
        }
    },
    render(h) {
        return h(this.tag, {
            staticClass: 'kd-col',
            class: this.className,
            style: this.style
        }, this.$slots.default);
    }
};
