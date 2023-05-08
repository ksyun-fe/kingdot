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
                :placeholder="leftPlaceholder"
                :disabled="disabled"
                :data-key="dataKey"
                :virtual-scroll="virtualScroll"
                @checkChange="sourceCheckChange"
        >

            <template slot="children-label">
                <slot></slot>
            </template>
            <template slot="panel-bottom">
                <slot name="left-bottom"></slot>
            </template>
        </transfer-panel>
        <!-- 中间按钮 -->
        <div
                class="kd-transfer-btn-wrap"
                :class="{'kd-transfer-btn-vertical': !buttonLevel}"
        >
            <kd-button
                    :disabled="toTargetDisabled || disabled"
                    type="primary"
                    :shape="buttonTexts[0]?'':'circle'"
                    icon="kd-icon-arrow-left"
                    @click="toSourceClick"
            >{{ buttonTexts[0] }}</kd-button>
            <!-- 图标按钮在后 -->
            <kd-button
                    v-if="!buttonTexts[1]"
                    :disabled="toSourceDisabled || disabled"
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
                :placeholder="rightPlaceholder"
                :filter-method="filterMethod"
                :data-key="dataKey"
                :disabled="disabled"
                :virtual-scroll="virtualScroll"
                @checkChange="targetCheckChange"
        >
            <template slot="children-label">
                <slot></slot>
            </template>
            <template slot="panel-bottom">
                <slot name="right-bottom"></slot>
            </template>
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
            virtualScroll: {
                type: Boolean,
                defautl: false
            },
            dataKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        label: 'label'
                    };
                }
            },
            disabled: {
                type: Boolean,
                defautl: false
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
            filterPlaceholder: {
                type: Array,
                default() {
                    return ['请输入搜索内容', '请输入搜索内容'];
                }
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
                leftcheck: [],
                leftcheckedData: [],
                rightcheck: [],
                rightcheckedData: [],
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
            leftPlaceholder() {
                return this.filterPlaceholder[0] || '请输入搜索内容';
            },
            rightPlaceholder() {
                return this.filterPlaceholder[1] || '请输入搜索内容';
            },
            //  左侧初始化数据
            sourceData() {
                return this.leftcheckedData;
            },
            targetData() {
                return this.rightcheckedData;
            }
        },
        watch: {
            data: {
                immediate: true,
                handler(v) {
                    this.leftcheckedData = this.data.filter(item => this.value.indexOf(item[this.dataKey.key]) === -1);
                    this.rightcheckedData = this.data.filter(item => this.value.indexOf(item[this.dataKey.key]) > -1);
                }
            },
            //  初始化所有选中的key
            selectedKeys: {
                immediate: true,
                handler(v) {
                    this.data.forEach(item => {
                        if (!item.checked) {
                            if (v.indexOf(item[this.dataKey.key]) > -1 && !item.disabled) {
                                item.checked = true;
                                this.toSourceDisabled = false;
                            } else {
                                item.checked = false;
                            }
                        }
                    });
                    this.leftcheck = this.data.filter((item) => !item.checked);
                    this.rightcheck = this.data.filter((item) => !item.disabled && item.checked);
                }
            }
        },
        methods: {
            //  左侧选中状态检查
            sourceCheckChange(checkedData, checkedNoneData, currentKey) {
                this.leftcheck = checkedNoneData;
                this.rightcheck = checkedData;
                this.toSourceDisabled = checkedData.length === 0;
                this.$emit('checkChange', 'left', checkedData);
            },
            //  右侧选中状态检查
            targetCheckChange(checkedData, checkedNoneData, currentKey) {
                this.leftcheck = checkedData;
                this.rightcheck = checkedNoneData;
                this.toTargetDisabled = checkedData.length === 0;
                this.$emit('checkChange', 'right', checkedData);
            },
            //  点击到左侧按钮
            toSourceClick() {
                this.toTargetDisabled = true;
                const selectedData = this.$refs.targetPanel.getSelectedData();
                this.leftcheck.map(item => {
                    this.leftcheckedData.push(item);
                });
                this.value.length = 0;
                this.rightcheckedData = this.rightcheck;
                this.rightcheckedData.map(item => {
                    this.value.push(item[this.dataKey.key]);
                });
                this.$emit('change', 'left', selectedData, this.value);
            },
            toTargetClick() {
                this.leftcheckedData = this.leftcheck;
                this.rightcheck.map(item => {
                    this.rightcheckedData.push(item);
                });
                this.toSourceDisabled = true;
                const selectedData = this.$refs.sourcePanel.getSelectedData();
                selectedData.map((item) => {
                    this.value.push(item);
                });
                this.$emit('change', 'right', selectedData, this.value);
            },
            leftItemClick(data, index) {
                this.$refs.sourcePanel.itemHandleClick(data, index);
            },

            rightItemClick(data, index) {
                this.$refs.targetPanel.itemHandleClick(data, index);
            },
            rightCheckboxChange(data) {
                this.$refs.targetPanel.itemInputChange(data);
            }
        }
    };
</script>
