import TooltipMixin from './_mixin/tooltip.js';

export default {
    name: 'KdTooltip',
    mixins: [TooltipMixin],
    components: {
        KdTooltipContent: {
            functional: true,
            render(h, ctx) {
                const data = ctx.props;
                return (
                    <div class='kd-tooltip-inner'>{ data.content }</div>
                );
            }
        }
    }
};
