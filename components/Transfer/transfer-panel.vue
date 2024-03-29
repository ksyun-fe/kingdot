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
                        :placeholder="placeholder"
                        @input="handleChange"
                />
            </div>
            <!-- 内容 -->
            <div
                    v-if="!virtualScroll"
                    class="kd-transfer-content-wrap"
            >
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
            <div
                    v-if="virtualScroll"
                    class="kd-transfer-content-wrap"
            >
                <!-- 无数据 -->
                <p
                        v-show="panelData.length <= 0"
                        class="kd-transfer-content-nonedata"
                >无数据</p>
                <ul
                        v-show="panelData.length > 0"
                        ref="list"
                        style="height:100%"
                >
                    <kd-virtual-list
                            :data-key="dataKey.key"
                            :data-sources="panelData"
                            :estimate-size="30"
                            class="kd-transfer-content-virtual"
                    >
                        <template #item="{item, index}">
                            <li
                                    :key="item[dataKey.key]"
                                    ref="contentItem"
                                    class="kd-transfer-content-item"
                                    :class="{'kd-transfer-active':item.checked}"
                            >
                                <kd-checkbox
                                        :key="keyValue"
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
                        </template>
                    </kd-virtual-list>
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
            virtualScroll: {
                type: Boolean,
                defautl: false
            },
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
            placeholder: {
                type: String,
                default: '请输入搜索内容'
            },
            selectAll: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                keyValue: null,
                panelData: [],
                serachText: '',
                allChecked: false,
                timer: null
            };
        },
        computed: {
            checkedList() {
                return this.panelData.filter(
                    (item) => !item.disabled && item.checked
                );
            },
            checkedListNone: {
                cache: false,
                get: function () {
                    return this.data.filter(
                        (item) => item.checked == false || !item.checked
                    );
                }

            },
            isCheckedAll() {
                return this.panelData.length > 0 && this.panelData.every(i => i.checked || i.disabled);
            }
        },
        watch: {
            //  panelData初始化数据
            data: {
                handler() {
                    this.handleChanges();
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
            },
            isCheckedAll: {
                immediate: true,
                handler(v) {
                    this.allChecked = !!v;
                }
            }
        },
        methods: {
            handleChanges() {
                // 初始化
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
            handleChange() {
                //  是否执行自定义过滤
                if (this.virtualScroll == true) {
                    if (this.timer !== null)clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
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
                    }, 500);
                } else {
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
                }
            },
            // 顶部checked值改变
            inputChange() {
                const allSelect = [];
                this.panelData.forEach((item, index) => {
                    if (!item.disabled) {
                        if (this.allChecked === true && item.checked === false) {
                            this.keyValue = `${item[this.dataKey.label]}_${this.allChecked}`;
                        } else {
                            this.keyValue = `${index}_${this.allChecked}`;
                        }
                        allSelect.push(item[this.dataKey.key]);
                        item.checked = this.allChecked;
                        this.$set(this.panelData, index, item);
                    }
                });
                this.$emit('checkChange', this.checkedList, this.checkedListNone, allSelect);
            },
            //  内容input改变
            itemInputChange(item) {
                const changeKeys = [item[this.dataKey.key]];
                this.$emit('checkChange', this.checkedList, this.checkedListNone, changeKeys);
            },
            //  内容一行的点击 事件
            itemHandleClick(data, index) {
                if (data.disabled) return;
                this.$nextTick(() => {
                    this.keyValue = `${data[this.dataKey.label]}_${!data.checked}`;
                    data.checked = !data.checked;
                    this.$set(this.panelData, index, data);
                    this.data.map((item, indexs) => {
                        if (item[this.dataKey.label] == data[this.dataKey.label]) {
                            this.$set(this.data, indexs, data);
                        }
                    });
                    this.itemInputChange(data);
                });
            },
            itemCheckboxChange(data, index) {
                this.$set(this.panelData, index, data);
                this.data.map((item, indexs) => {
                    if (item[this.dataKey.label] == data[this.dataKey.label]) {
                        this.$set(this.data, indexs, data);
                    }
                });
                this.itemInputChange(data);
            },
            //  获取当前点击的数据
            getSelectedData() {
                const data = [];
                this.data.forEach((item) => {
                    if (item.checked === true && !item.disabled) {
                        item.checked = false;
                        data.push(item[this.dataKey.key]);
                    }
                });
                return data;
            }
        }
    };
</script>
