<script>
    export default {
        name: 'KdTimeline',
        props: {
            reverse: {
                type: Boolean,
                default: false
            }
        },
        render(h) {
            const classes = {
                'k-timeline': true
            };
            let slots = this.$slots.default || [];
            if (this.reverse) {
                slots = slots.reverse();
            }

            // return h(
            //     'ul',
            //     {
            //         class: classes
            //     },
            //     slots
            // );
            return (<ul class={ classes }>
                { slots }
            </ul>);
        }
    };
</script>
