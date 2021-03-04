import TooltipMixin from './_mixin/tooltip.js';
import Button from '../Button';

export default {
    name: 'KdPopconfirm',
    mixins: [TooltipMixin],
    props: {
        title: {
            type: String
        },
        content: {
            type: String
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        okType: {
            type: String,
            default: 'primary'
        },
        okText: {
            type: String,
            default: '确定'
        },
        trigger: {
            type: String,
            default: 'click'
        },
        titleLine: {
            type: Boolean,
            default: true
        },
        disableOk: {
            type: Boolean,
            default: false
        },
        confirm: {
            type: Function,
            default: undefined
        },
        cancel: {
            type: Function,
            default: undefined
        }
    },
    methods: {
        close() {
            this.closePopper();
        },
        _confirm() {
            if (this.disableOk) return;
            const callback = this.confirm;
            if (typeof callback === 'function') {
                callback.call(this, this);
            } else {
                this.close();
                this.$emit('confirm');
            }
        },
        _cancel() {
            if (this.disableOk) return;
            const callback = this.cancel;
            if (typeof callback === 'function') {
                callback.call(this, this);
            } else {
                this.close();
                this.$emit('cancel');
            }
        }
    },
    components: {
        Button,
        KdTooltipContent: {
            functional: true,
            render(h, ctx) {
                const data = ctx.data;
                return (
                    <div class='kd-tooltip-inner'>
                        <div class='kd-popover-title'>{data.$slots.title || data.title}</div>
                        <div class='kd-popover-title-line' v-show={data.$props.titleLine}></div>
                        <div class='kd-popover-content'>{data.$slots.content || data.content}</div>
                        {
                            data.$scopedSlots.footer
                                ? <div class='kd-popover-footer'>{data.$scopedSlots.footer()}</div>
                                : (
                                    <div class='kd-popover-footer'>
                                        <Button class='btn-cancel' onClick={data._cancel} size='mini'>{data.cancelText}</Button>
                                        <Button class='btn-confirm' onClick={data._confirm} size='mini' type={data.okType} disableOk={data.disableOk}>{data.okText}</Button>
                                    </div>
                                )
                        }
                    </div>
                );
            }
        }
    }
};
