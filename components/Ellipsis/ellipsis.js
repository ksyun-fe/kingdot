export default {
    name: 'KdEllipsis',
    props: {
        type: {
            type: String,
            default: 'title'
        }
    },
    data() {
        return {};
    },
    computed: {
        allClassList() {
            return {
                'kd-ellipsis-wrap': true,
                'kd-ellipsis-wrap-move': this.type === 'move'
            };
        },
        text() {
            return this.$slots.default[0].text;
        }
    },
    watch: {
    },
    mounted() {
    },
    methods: {
    },
    render(h, ctx) {
        return (
            <div
                class={ this.allClassList }
            >
                {
                    <span
                        class='kd-ellipsis-txt'
                        title={this.type === 'title' ? this.text : null}
                    >{ this.$slots.default }</span>
                }
                {
                    <span
                        class='kd-ellipsis-title'
                        title={this.type === 'title' ? this.text : null}
                        data-title={this.text}
                    >{ this.$slots.default }</span>
                }
            </div>
        );
    }
};
