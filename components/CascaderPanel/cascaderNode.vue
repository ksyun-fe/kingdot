<script>
    import { arrayEquals } from '../../src/utils/utils.js';
    export default {
        name: 'KdCascaderNode',
        inject: ['panel', 'expandTrigger', 'cascader', 'lazy', 'multiple', 'checkStrictly'],
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
        computed: {
            isDisabled() {
                return this.node.isDisabled;
            },
            isLeaf() {
                return this.node.isLeaf;
            },
            pathValue() {
                return this.node.pathValue;
            },
            isActive() {
                const { node, panel, pathValue } = this;
                const activeNode = panel.activePath[node.level - 1] || {};
                const isChecked = arrayEquals(pathValue, panel.checkedValue);
                return activeNode.uid === node.uid || isChecked;
            }
        },
        methods: {
            renderPrefix() {
                const { multiple, checkStrictly } = this;
                if (multiple) {
                    return this.renderCheckbox();
                } else if (checkStrictly) {
                    return this.renderRadio();
                }
                return null;
            },
            renderCheckbox() {
                const { node, isDisabled } = this;
                const events = {
                    on: {
                        change: this.handleMultiCheckChange
                    },
                    nativeOn: {
                        // click: e => e.stopPropagation()
                    }
                };
                return (
                    <kd-checkbox
                        value={ node.checked }
                        indeterminate={ node.indeterminate }
                        disabled={ isDisabled }
                        { ...events }
                    ></kd-checkbox>
                );
            },
            renderRadio() {
                const { panel, isDisabled, pathValue} = this;
                const checked = arrayEquals(panel.checkedValue, pathValue);
                const events = {
                    on: {
                        click: () => {
                            panel.checkedValue = pathValue;
                            this.handleCheckChange();
                        }
                    }
                };
                return (
                    <div class='kd-cascader-radio'>
                        <label
                            class={[
                                'kd-radio',
                                {
                                    'kd-radio-checked': checked,
                                    'kd-radio-disabled': isDisabled
                                }
                            ]}
                        >
                            <span class='kd-radio-wrapper'>
                                <input
                                    ref='kd-cascader-radio-input'
                                    type='radio'
                                    class='kd-radio-input'
                                    value={panel.checkedValue}
                                    disabled={isDisabled}
                                    { ...events }
                                ></input>
                            </span>
                        </label>
                    </div>
                );
            },
            labelNode() {
                const { cascader, node } = this;
                return cascader.$scopedSlots.default
                    ? <span class='kd-cascader-node__label'>{ cascader.$scopedSlots.default && cascader.$scopedSlots.default(node) }</span>
                    : <span class='kd-cascader-node__label'>{ node.label }</span>;
            },
            // 右侧图标
            iconNode() {
                const { isLeaf, node, lazy } = this;
                if (!isLeaf) {
                    if (lazy && node.loading) return <i class='kd-icon-loading1 kd-cascader-loading'></i>;
                    return <i class='kd-icon-arrow-right'></i>;
                }
            },
            // 展开面板
            handleExpand() {
                const { panel, node, isDisabled, multiple, lazy, isLeaf } = this;

                if (isDisabled || node.loading) return;

                // 开启懒加载且数据未被获取过
                if (lazy && !node.loaded) {
                    panel.lazyLoadFn(node, () => {
                        if (!isLeaf) panel.handleExpand(node);

                        if (multiple) {
                            const checked = isLeaf ? node.checked : false;
                            this.handleMultiCheckChange(checked);
                        }
                    });
                } else {
                    panel.handleExpand(node);
                }
            },
            // 选中选项
            handleCheckChange() {
                const { panel, pathValue, node } = this;
                panel.handleClickNode(pathValue);
                panel.handleExpand(node);
            },
            handleMultiCheckChange(checked) {
                // 全选children
                this.node.multiCheck(checked);
                this.panel.calcMultiCheckedValue();
            }
        },
        render(h) {
            const { expandTrigger, nodeId, isLeaf, isDisabled, checkStrictly, multiple, isActive } = this;

            const events = { on: {} };

            // 展开面板
            if (expandTrigger === 'click') {
                events.on.click = e => {
                    this.handleExpand();
                };
            } else if (expandTrigger === 'hover') {
                events.on.mouseenter = e => {
                    this.handleExpand();
                    this.$emit('expand', e);
                };
                events.on.focus = e => {
                    this.handleExpand();
                    this.$emit('expand', e);
                };
            }
            // 选中选项
            if (isLeaf && !isDisabled && !checkStrictly && !multiple) {
                events.on.click = this.handleCheckChange;
            }
            return (
                <li
                    class={
                        {
                            'kd-cascader-panel-node': true,
                            'is-active': isActive,
                            'is-disabled': this.isDisabled
                        }
                    }
                    id={nodeId}
                    {...events}
                >
                    { this.renderPrefix() }
                    { this.labelNode() }
                    { this.iconNode() }
                </li>
            );
        }
    };
</script>
