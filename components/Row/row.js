export default {
    name: 'KdRow',
    props: {
        gutter: {
            type: [Number, String],
            default: 0
        },
        flex: {
            type: Boolean,
            default: false
        },
        justify: {
            type: String
        },
        align: {
            type: String
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        style() {
            const style = {};

            if (this.gutter) {
                style.marginLeft = -(this.gutter / 2) + 'px';
                style.marginRight = style.marginLeft;
            }

            return style;
        },
        className() {
            const classList = [];

            if (this.flex) {
                classList.push('kd-row-flex');
            }

            ['align', 'justify'].forEach(item => {
                if (this[item]) {
                    if (!classList.includes('kd-row-flex')) {
                        classList.push('kd-row-flex');
                    }
                    classList.push(`kd-row-${item}-${this[item]}`);
                }
            });

            return classList;
        }
    },
    render(h) {
        return h(this.tag, {
            staticClass: 'kd-row',
            class: this.className,
            style: this.style
        }, this.$slots.default);
    }
};
