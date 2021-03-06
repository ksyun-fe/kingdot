<template>
    <div class="kd-transfer-panel">
        <div class="kd-transfer-panel-row">
            <!-- 顶部 -->
            <kd-checkbox
                    v-if="selectAll"
                    v-model="allChecked"
                    :disabled="disabled"
                    @change="inputChange"
            >
                <div>
                    <span>{{ title }}</span>
                    <span class="kd-transfer-panel-count">{{ checkedList.length }}/{{ panelData.length }}</span>
                </div>
            </kd-checkbox>
        </div>
        <div class="kd-transfer-content">
            <!-- 搜索 -->
            <div
                    v-if="showFilter"
                    class="kd-transfer-filter"
            >
                <kd-input
                        v-model="serachText"
                        :disabled="disabled"
                        class="kd-transfer-search"
                        name="serach"
                        @input="handleChange"
                />
            </div>
            <!-- 内容 -->
            <div class="kd-transfer-content-wrap">
                <!-- 无数据 -->
                <p
                        v-show="panelData.length <= 0"
                        class="kd-transfer-content-nonedata"
                >无数据</p>
                <ul v-show="panelData.length > 0">
                    <li
                            v-for="(item,index) in panelData"
                            :key="item[dataKey.key]"
                            class="kd-transfer-content-item"
                            :class="{'kd-transfer-active':item.checked}"
                    >
                        <kd-checkbox
                                v-model="item.checked"
                                :disabled="item.disabled"
                                @change="itemCheckboxChange(item,index)"
                        ></kd-checkbox>
                        <div
                                class="kd-transfer-content-temp"
                                @click="itemHandleClick(item,index)"
                        >
                            <content-label
                                    class="kd-transfer-content-label"
                                    :class="{'kd-transfer-label-disabled':item.disabled}"
                                    :scope="item"
                                    :data-key="dataKey"
                            ></content-label>
                        </div>

                    </li>
                </ul>
            </div>

        </div>
        <!-- 按钮区 -->
        <div
                v-if="$slots['panel-bottom']"
                class="kd-transfer-panel-footer"
        >
            <slot name="panel-bottom"/>
        </div>
    </div>
</template>
<script>
    import KdInput from './../Input/index.js';
    import KdCheckbox from './../Checkbox/index.js';
    export default {
        name: 'TransferPanel',
        components: {
            KdInput,
            KdCheckbox,
            contentLabel: {
                props: {
                    scope: Object,
                    dataKey: Object
                },
                render(h) {
                    // slot自定义数据项内容
                    const transfer = this.$parent.$parent;
                    const childrenLabel = transfer.$scopedSlots.default;
                    return childrenLabel ? (
                        transfer.$scopedSlots.default(this.scope, this.dataKey)
                    ) : (
                    <span>{this.scope[this.dataKey.label]}</span>
                    );
                }
            }
        },
        props: {
            dataKey: {
                type: Object,
                default() {
                    return {
                        key: 'key',
                        label: 'label',
                        disabled: 'disabled',
                        checked: 'checked'
                    };
                }
            },
            disabled: {
                type: Boolean,
                defautl: false
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
            title: {
                type: [String, Number],
                default: ''
            },
            selectAll: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                panelData: [],
                serachText: '',
                allChecked: false
            };
        },
        computed: {
            checkedList() {
                return this.panelData.filter(
                    (item) => !item.disabled && item.checked
                );
            }
        },
        watch: {
            //  panelData初始化数据
            data: {
                handler(v) {
                    this.panelData = v;
                },
                immediate: true
            },
            disabled: {
                immediate: true,
                handler(v) {
                    if (v) {
                        this.panelData.forEach((item) => {
                            item.disabled = true;
                        });
                    }
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            // 初始化回调函数
            init() {
                this.allCheckedChange();
            },
            handleChange() {
                //  是否执行自定义过滤
                this.panelData = this.data.filter((item) => {
                    if (this.filterMethod) {
                        const result = this.filterMethod(item, this.serachText);
                        return result;
                    } else {
                        return (
                            item[this.dataKey.label].indexOf(this.serachText) > -1
                        );
                    }
                });
            },
            // 顶部checked值改变
            inputChange() {
                const allSelect = [];
                this.panelData.forEach((item, index) => {
                    if (!item.disabled) {
                        allSelect.push(item[this.dataKey.key]);
                        item.checked = this.allChecked;
                        this.$set(this.panelData, index, item);
                    }
                });
                this.$emit('checkChange', this.checkedList, allSelect);
            },
            //  内容input改变
            itemInputChange(item) {
                const changeKeys = [item[this.dataKey.key]];
                this.allCheckedChange();
                this.$emit('checkChange', this.checkedList, changeKeys);
            },
            allCheckedChange() {
                const noramlData = this.panelData.filter((child) => !child.disabled);
                this.allChecked =
                    noramlData.length === this.checkedList.length &&
                    this.checkedList.length !== 0;
            },
            //  内容一行的点击 事件
            itemHandleClick(data, index) {
                if (data.disabled) return;
                data.checked = !data.checked;
                this.$set(this.panelData, index, data);
                this.itemInputChange(data);
            },
            itemCheckboxChange(data, index) {
                this.$set(this.panelData, index, data);
                this.itemInputChange(data);
            },
            //  获取当前点击的数据
            getSelectedData() {
                const data = [];
                this.panelData.forEach((item) => {
                    if (item.checked === true && !item.disabled) {
                        item.checked = false;
                        data.push(item[this.dataKey.key]);
                    }
                });
                this.allChecked = false;
                return data;
            },
            // 获取当前所有点击的数据
            getAllSelectedData() {
                return this.panelData.filter(
                    (item) => !item.disabled && item.checked
                );
            }
        }
    };
</script>
