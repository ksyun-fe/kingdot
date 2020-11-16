import TooltipMixin from './_mixin/tooltip.js';

export default {
    name: 'KdTooltip',
    mixins: [TooltipMixin],
    props: {
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
                    <div class='kd-tooltip-inner'>{ data.$slots.content || data.content }</div>
                );
            }
        }
    }
};
