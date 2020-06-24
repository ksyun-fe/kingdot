export default {
    name: 'Spin',
    props: {
        size: {
            type: String,
            default: 'default'
        },
        center: {
            type: Boolean,
            default: false
        },
        overlay: {
            type: Boolean,
            default: false
        },
        canvas: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: '加载中'
        },
        background: {
            type: String,
            default: 'rgba(255, 255, 255, .5)'
        },
        spinner: {
            type: Boolean,
            default: false
        },
        local: {
            type: Boolean,
            default: false
        }
    }
};
