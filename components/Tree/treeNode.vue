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
            level: Number,
            checkbox: Boolean
        },
        inject: ['TREE'],
        render(h, ctx) {
            // const { TREE } = ctx.injections;
            // const { mode, dragInfo } = TREE;
            // const dragNodeKey = dragInfo.dragKey;
            // const targetKey = dragInfo.targetKey;

            const { node, parent, tpl, index, nodeMouseOver, level, checkbox } = ctx.props;
            const { selected, selDisabled = false, loading, expanded } = node;
            const _tree = ctx.injections.TREE;

            let titleClass, nodeTitleTextClass; let nodeClass = 'kd-tree-node';
            if (selDisabled) {
                titleClass = 'node-title-disabled';
                nodeClass = 'kd-tree-node kd-tree-node-disabled';
            }
            if (expanded && loading) {
                nodeClass += ' kd-tree-node-loading';
            }
            titleClass += selected ? ' node-selected' : '';
            nodeClass += selected ? ' kd-tree-node-selected' : '';
            if (checkbox) {
                nodeClass += ' kd-tree-node-checkbox';
            }
            if (node.searched) titleClass += ' node-searched';
            if (!_tree.$scopedSlots.default) {
                titleClass = titleClass + ' kd-tree-node-title';
            }
            if (_tree.$scopedSlots.icon) {
                nodeTitleTextClass = 'node-title-text';
            }
            // postponed
            // if (
            //     mode &&
            //     targetKey === node.__key__ &&
            //     targetKey !== dragNodeKey
            // ) {
            //     titleClass += ` kd-tree-insert-${mode}`;
            // }
            const nodeItem = () => (
                <span
                    title={node[_tree.titleKey]}
                    class={titleClass}
                    onMouseover={() => nodeMouseOver(node, index, parent)}
                    onClick={() => {
                        if (selDisabled) return;
                        _tree.nodeSelected(node, { level, index });
                    }}
                    onDblclick={(e) => {
                        e.stopPropagation();
                        if (selDisabled) return;
                        _tree.nodedblclick(node, { level, index });
                    }}
                >
                {_tree.$scopedSlots.icon && _tree.$scopedSlots.icon(node)}
                <span class={nodeTitleTextClass}>{node[_tree.titleKey]}</span>
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
