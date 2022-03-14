<script>
    export default {
        name: 'KdCascaderNode',
        functional: true,
        inject: ['panel', 'expandTrigger', 'cascader', 'lazy', 'labelName', 'valueName'],
        props: {
            nodeId: {
                type: String
            },
            node: {
                type: Object,
                default() {
                    return {};
                }
            },
            level: {
                type: [Number, String],
                default: 0
            }
        },
        methods: {
        },
        render(h, ctx) {
            const { node, level, nodeId } = ctx.props;
            const { expandTrigger, panel, cascader, lazy, labelName, valueName } = ctx.injections;
            const isChecked = panel.isActiveNode(node, level);
            // 点击节点
            const selectNode = (node, type) => {
                if (node.disabled || node.loading) return;

                // 开启懒加载且数据未被获取过
                if (lazy && !node.loaded) {
                    panel.lazyLoadFn(node, () => {
                        if (!node.isLeaf) panel.handleExpand(node, level);
                    }, 'select');
                } else {
                    panel.handleExpand(node, level);
                }

                // 如果为叶子结点
                if (panel.isLeaf(node) && type === 'click') panel.handleClickNode(node, level);
            };
            // 右侧图标
            const iconNode = () => {
                if (!panel.isLeaf(node)) {
                    if (lazy && node.loading) return <i class='kd-icon-loading1 kd-cascader-loading'></i>;
                    return <i class='kd-icon-arrow-right'></i>;
                }
            };

            const labelNode = () => {
                return cascader.$scopedSlots.default
                    ? <span class='kd-cascader-node__label'>{ cascader.$scopedSlots.default && cascader.$scopedSlots.default(node) }</span>
                    : <span class='kd-cascader-node__label'>{ node[labelName] }</span>;
            };
            return (
                <li
                    class={
                        {
                            'kd-cascader-panel-node': true,
                            'is-active': isChecked,
                            'is-disabled': node.disabled
                        }
                    }
                    value={node[valueName]}
                    id={nodeId}
                    on-click={() => {
                        if (expandTrigger === 'click' || panel.isLeaf(node)) selectNode(node, 'click');
                    }}
                    on-mouseenter={() => {
                        if (expandTrigger === 'hover') selectNode(node, 'hover');
                    }}
                >
                    {labelNode()}
                    {iconNode()}
                </li>
            );
        }
    };
</script>
