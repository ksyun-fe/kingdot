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

            let titleClass; let nodeClass = 'kd-tree-node';
            if (selDisabled) {
                titleClass = 'node-title-disabled';
                nodeClass = 'kd-tree-node kd-tree-node-disabled';
            } else {
                titleClass = selected ? 'node-title node-selected' : 'node-title';
                nodeClass = selected ? 'kd-tree-node kd-tree-node-selected' : 'kd-tree-node';
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
            const nodeItem = () => (
                <span
                    title={node[_tree.titleKey]}
                    class={titleClass}
                    onMouseover={() => nodeMouseOver(node, index, parent)}
                    onClick={() => {
                        if (selDisabled) return;
                        _tree.nodeSelected(node, { level, index });
                    }}
                >
                {_tree.$scopedSlots.icon && _tree.$scopedSlots.icon(node)}
                {node[_tree.titleKey]}
                </span>
            );
            return tpl
                ? tpl(node, ctx, parent, index, ctx.props)
                : _tree.$scopedSlots.default
                    ? <div class={nodeClass}>{nodeItem()}{_tree.$scopedSlots.default && _tree.$scopedSlots.default(node)}</div>
                    : nodeItem()
            ;
        }
    };
</script>
