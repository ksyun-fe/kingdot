<script>
    export default {
        name: 'TreeNode',
        functional: true,
        props: {
            node: Object,
            parent: null,
            tpl: Function,
            index: Number,
            nodeMouseOver: Function,
            level: Number
        },
        inject: ['TREE'],
        render(h, ctx) {
            // const { TREE } = ctx.injections;
            // const { mode, dragInfo } = TREE;
            // const dragNodeKey = dragInfo.dragKey;
            // const targetKey = dragInfo.targetKey;

            const { node, parent, tpl, index, nodeMouseOver, level } = ctx.props;
            const { selected, selDisabled = false } = node;

            let titleClass;
            if (selDisabled) {
                titleClass = 'node-title-disabled';
            } else {
                titleClass = selected ? 'node-title node-selected' : 'node-title';
            }
            if (node.searched) titleClass += ' node-searched';

            // postponed
            // if (
            //     mode &&
            //     targetKey === node.__key__ &&
            //     targetKey !== dragNodeKey
            // ) {
            //     titleClass += ` kd-tree-insert-${mode}`;
            // }

            const _tree = ctx.injections.TREE;
            return tpl
                ? tpl(node, ctx, parent, index, ctx.props)
                : _tree.$scopedSlots.default
                    ? _tree.$scopedSlots.default(node)
                    : (
                        <span
                            domPropsInnerHTML={node.title}
                            title={node.title}
                            class={titleClass}
                            onMouseover={() => nodeMouseOver(node, index, parent)}
                            onClick={() => {
                                if (selDisabled) return;
                                ctx.parent.nodeSelected(node, { level, index });
                            }}
                        ></span>
            );
        }
    };
</script>
