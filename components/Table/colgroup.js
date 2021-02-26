export default {
    name: 'my-colgroup',
    props: {
        store: {
            type: Object,
            default: {}
        }
    },
    computed: {
        columns() {
            return this.store.states.columns;
        }
    },
    methods: {
        getWidth(data) {
            // return Number.parseInt(item.width || item.minWidth) + Number.parseInt(item.deviation)
            let num = Number.parseInt(data.autoColumnWidth || this.store.states._autoColumnWidth) + data.deviation
            return (isNaN(num) || num == 0) ? '' : num
        }
    },
    render() {
        return (
            <colgroup>
                {
                    this.columns.map(item => {
                        return (
                            <col name={item.key} width={this.getWidth(item)}></col>
                        );
                    })
                }
            </colgroup>
        );
    }
}