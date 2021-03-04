import TooltipMixin from './_mixin/tooltip';

export default {
    name: 'KdPopover',
    mixins: [TooltipMixin],
    props: {
        title: {
            type: String
        },
        content: {
            type: String
        }
    },
    components: {
        KdTooltipContent: {
            functional: true,
            render(h, ctx) {
                const data = ctx.data;
                return (
                    <div class='kd-tooltip-inner'>
                        <div class='kd-popover-title'>{ data.$slots.title || data.title }</div>
                        <div class='kd-popover-content'>{ data.$slots.content || data.content }</div>
                    </div>
                );
            }
        }
    }
};
