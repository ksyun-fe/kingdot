<template>
    <div class="kd-transfer">
        <!-- 左侧面板 -->
        <transfer-panel
                ref="sourcePanel"
                :data="sourceData"
                :title="leftTitle"
                :select-all="selectAll"
                :show-filter="showFilter"
                :filter-method="filterMethod"
                :data-key="dataKey"
                @checkChange="sourceCheckChange"
        >
            <slot name="left-bottom"></slot>
        </transfer-panel>
        <!-- 中间按钮 -->
        <div
                class="kd-transfer-btn-wrap"
                :class="{'kd-transfer-btn-vertical': !buttonLevel}"
        >
            <kd-button
                    :disabled="toTargetDisabled"
                    type="primary"
                    :shape="buttonTexts[0]?'':'circle'"
                    icon="kd-icon-arrow-left"
                    @click="toSourceClick"
            >{{ buttonTexts[0] }}</kd-button>
            <!-- 图标按钮在后 -->
            <kd-button
                    v-if="!buttonTexts[1]"
                    :disabled="toSourceDisabled"
                    type="primary"
                    :shape="'circle'"
                    icon="kd-icon-arrow-right"
                    @click="toTargetClick"
            ></kd-button>
            <kd-button
                    v-else
                    :disabled="toSourceDisabled"
                    type="primary"
                    @click="toTargetClick"
            >
                {{ buttonTexts[1] }}<i class="kdicon kd-icon-right kd-icon-arrow-right"></i>
            </kd-button>
        </div>
        <!-- 右侧面板 -->
        <transfer-panel
                ref="targetPanel"
                :data="targetData"
                :title="rightTitle"
                :select-all="selectAll"
                :show-filter="showFilter"
                :filter-method="filterMethod"
                :data-key="dataKey"
                @checkChange="targetCheckChange"
        >
            <div slot="content">
                <slot
                        name="content"
                        :targetData="targetData"
                >
                </slot>
            </div>
            <slot name="right-bottom"></slot>
        </transfer-panel>
    </div>
</template>
<script>
    import KdButton from '../Button/index';
    import TransferPanel from './transfer-panel.vue';
    export default {
        name: 'KdTransfer',
        components: {
            TransferPanel,
            KdButton
        },
        props: {
            dataKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        label: 'label'
                    };
                }
            },
            value: {
                type: Array,
                default() {
                    return [];
                }
            },
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            showFilter: {
                type: Boolean,
                default: false
            },
            filterMethod: {
                type: Function
            },
            buttonTexts: {
                type: Array,
                default() {
                    return [];
                }
            },
            titles: {
                type: Array,
                default() {
                    return ['source', 'target'];
                }
            },
            buttonLevel: {
                type: Boolean,
                default: false
            },
            selectedKeys: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectAll: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                //  左侧初始化选中checkbox
                toTargetDisabled: true,
                toSourceDisabled: true
            };
        },
        computed: {
            leftTitle() {
                return this.titles[0];
            },
            rightTitle() {
                return this.titles[1];
            },
            //  左侧初始化数据
            sourceData() {
                return this.data.filter(item => this.value.indexOf(item[this.dataKey.key]) === -1);
            },
            targetData() {
                return this.data.filter(item => this.value.indexOf(item[this.dataKey.key]) > -1);
            }
        },
        watch: {
            //  初始化所有选中的key
            selectedKeys: {
                immediate: true,
                handler(v) {
                    this.data.forEach(item => {
                        if (!item.checked) {
                            if (v.indexOf(item[this.dataKey.key]) > -1 && !item.disabled) {
                                item.checked = true;
                            } else {
                                item.checked = false;
                            }
                        }
                    });
                }
            }
        },
        methods: {
            //  左侧选中状态检查
            sourceCheckChange(checkedData, currentKey) {
                this.toSourceDisabled = checkedData.length === 0;
                this.$emit('checkChange', 'left', checkedData);
            },
            //  右侧选中状态检查
            targetCheckChange(checkedData, currentKey) {
                this.toTargetDisabled = checkedData.length === 0;
                this.$emit('checkChange', 'right', checkedData);
            },
            //  点击到左侧按钮
            toSourceClick() {
                this.toTargetDisabled = true;
                const selectedData = this.$refs.targetPanel.getSelectedData();
                selectedData.forEach((item) => {
                    const index = this.value.indexOf(item);
                    if (index > -1) {
                        this.value.splice(index, 1);
                    }
                });
                this.$emit('change', 'left', selectedData, this.value);
            },
            toTargetClick() {
                this.toSourceDisabled = true;
                const selectedData = this.$refs.sourcePanel.getSelectedData();
                this.value.push(...selectedData);
                this.$emit('input', this.value);
                this.$emit('change', 'right', selectedData, this.value);
            }
        }
    };
</script>
