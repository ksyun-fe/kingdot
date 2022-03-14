<template>
    <div
            ref="kdCascader"
            class="kd-cascader"
            :class="[{
                'kd-cascader-disabled': disabled
            }]"
            :style="{'width': inputWidth}"
    >
        <kd-tooltip
                v-model="dropDownVisible"
                placement="bottom-start"
                trigger="click"
                :showArrow="false"
                :content-class="tooltipClass"
                :width-limit="false"
                :disabled="disabled"
        >
            <div
                    ref="kdCascaderInput"
                    class="kd-cascader-input"
                    @mouseenter="inputHovering = true"
                    @mouseleave="inputHovering = false"
            >
                <i
                        v-if="clearBtnVisible"
                        key="clear"
                        class="kd-icon-close kd-cascader-clear-icon"
                        @click.stop="handleClear"
                ></i>
                <i
                        v-else
                        key="arrow-down"
                        class="kd-icon-arrow-down kd-cascader-arrow-icon"
                        :class="{'kd-cascader-arrow-icon-rotate': dropDownVisible}"
                ></i>
                <input
                        ref="kdCascaderInputInner"
                        v-model="inputLabel"
                        class="kd-cascader-input-inner"
                        :class="{'kd-cascader-input-disabled': disabled}"
                        type="text"
                        :placeholder="inputPlaceholder"
                        :readonly="!filterable"
                        :disabled="disabled"
                        @input="handleInput"
                        @focus="handleFocus"
                        @blur="handleBlur"
                />
            </div>
            <template slot="content">
                <ul
                        v-if="filterable"
                        v-show="filtering"
                        ref="kdCascaderSuggest"
                        class="kd-cascader-suggest"
                        :style="{'width': suggestWidth}"
                >
                    <li
                            v-for="(item, index) in suggestions"
                            :key="index"
                            class="kd-cascader-suggest-li"
                            :class="[{
                                'is-active': item.checked
                            }]"
                            @click="handleClickSuggest(item)"
                    >
                        <span>{{ item.labelText }}</span>
                        <i
                                v-if="item.checked"
                                class="kd-icon-success kd-cascader-checked-icon"
                        ></i>
                    </li>
                    <li
                            v-if="suggestions.length==0"
                            class="kd-cascader-suggest-no-data"
                    >无数据</li>
                </ul>
                <kd-cascader-panel
                        v-show="!filtering"
                        ref="kdPopperPanel"
                        v-model="checkedValue"
                        :options="nodeOptions"
                        :expandTrigger="expandTrigger"
                        :cascader="this"
                        :lazy="lazy"
                        :lazyMethod="lazyMethod"
                        @setValue="setValue"
                        @menuUnvisible="toggleDropDownVisible"
                ></kd-cascader-panel>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import Lang from 'src/mixin/lang.js';
    import { isEmpty, isFunction } from '../../src/utils/utils.js';
    import { cloneDeep } from 'lodash';

    export default {
        name: 'KdCascader',
        components: {
        },
        mixins: [Lang],
        props: {
            value: {
                type: Array,
                default() {
                    return [];
                }
            },
            options: {
                type: Array
            },
            disabled: {
                type: Boolean,
                default: false
            },
            width: {
                type: String,
                default: ''
            },
            filterable: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请选择'
            },
            // 次级菜单的展开方式
            expandTrigger: {
                type: String,
                default: 'click'
            },
            showAllLevels: {
                type: Boolean,
                default: true
            },
            lazy: {
                type: Boolean,
                default: false
            },
            lazyMethod: {
                type: Function
            },
            filterMethod: {
                type: Function
            }
        },
        data() {
            return {
                checkedValue: this.value,
                inputLabel: null,
                inputPlaceholder: this.placeholder,
                dropDownVisible: false,
                inputHovering: false,
                filtering: false,
                suggestions: [],
                nodeOptions: [],
                flatOpt: [],
                suggestWidth: ''
            };
        },
        computed: {
            tooltipClass() {
                return `kd-cascader-tooltip`;
            },
            inputWidth() {
                const width = this.width;
                if (width.indexOf('px') > -1 || width.indexOf('%') > -1) {
                    return width;
                } else {
                    return width + 'px';
                }
            },
            clearBtnVisible() {
                return this.clearable && !isEmpty(this.checkedValue) && this.inputHovering;
            }
        },
        watch: {
            value: {
                deep: true,
                immediate: true,
                handler(val) {
                    this.checkedValue = val;
                    this.setLabel();
                }
            },
            filtering(val) {
                if (val) {
                    this.suggestWidth = this.$refs.kdCascader.clientWidth + 'px';
                    this.updateSuggestList();
                }
            },
            dropDownVisible: {
                handler(val) {
                    if (val) {
                        this.filtering = false;
                        this.$nextTick(() => {
                            this.$refs.kdPopperPanel.scrollToView();
                        });
                    } else {
                        if (this.filterable && this.inputLabel && this.filtering) {
                            this.setLabel();
                        }
                    }
                }
            },
            inputLabel(val) {
                if (!val && this.filterable) this.filtering = false;
            }
        },
        mounted() {
            if (!isEmpty(this.options)) this.initOptions();
            this.initData();
        },
        methods: {
            initData() {
                if (!this.lazy) {
                    this.setLabel();
                    return;
                }
                // 懒加载情况
                if (isEmpty(this.options)) {
                    this.$nextTick(() => {
                        this.$refs.kdPopperPanel.lazyLoadFn();
                        return;
                    });
                }
            },
            setLabel() {
                if (!isEmpty(this.checkedValue)) {
                    this.$nextTick(() => {
                        if (this.$refs.kdPopperPanel) {
                            const presentPath = this.$refs.kdPopperPanel.getPresentPath();
                            this.inputLabel = this.getPresentLabel(presentPath);
                        }
                    });
                    // const present = this.flatOpt.find(i => arrayEquels(i.valuePath, this.checkedValue)) || {};
                    // if (this.showAllLevels) {
                    //     this.inputLabel = present.labelText;
                    // } else {
                    //     this.inputLabel = present.label;
                    // }
                } else {
                    this.inputLabel = '';
                }
            },
            getPresentLabel(path) {
                if (!path || !path.length) return '';
                let label = '';
                if (this.showAllLevels) {
                    path.forEach((item, index) => {
                        label += (index ? ' / ' : '') + item.label;
                    });
                } else {
                    const item = path.slice(-1);
                    label = item[0].label;
                }
                return label;
            },
            setValue() {
                this.setLabel();
                this.$emit('input', this.checkedValue);
                this.$emit('change', this.checkedValue);
            },
            handleClear() {
                this.checkedValue.splice(0);
                this.inputLabel = '';
                this.suggestions = [];
                this.$emit('input', this.checkedValue);
                this.$emit('change', this.checkedValue);
            },
            toggleDropDownVisible() {
                this.dropDownVisible = !this.dropDownVisible;
            },
            handleInput() {
                this.filtering = this.inputLabel || false;
            },
            updateSuggestList() {
                let method = function (node, label) {
                    return node.labelText.includes(label);
                };
                if (isFunction(this.filterMethod)) {
                    method = this.filterMethod;
                }
                this.suggestions = this.flatOpt.filter(item => {
                    if (item.disabled) return false;
                    return method(item, this.inputLabel) && item.isLeaf;
                });

                if (!isEmpty(this.checkedValue)) {
                    this.suggestions.forEach(node => {
                        node.checked = JSON.stringify(this.checkedValue) === JSON.stringify(node.valuePath);
                    });
                } else {
                    this.suggestions.forEach(node => {
                        node.checked = false;
                    });
                }
            },
            // 给所有数据加上valuePath, labelText属性，并扁平化数组
            initOptions() {
                this.nodeOptions = cloneDeep(this.options);
                this.formatNodes(this.nodeOptions);
                this.flatOpt = this.flatNodes(cloneDeep(this.nodeOptions));
            },
            formatNodes(data) {
                data.forEach(node => {
                    node.valuePath = node.valuePath ? node.valuePath.concat([node.value]) : [node.value];
                    node.labelText = node.labelText ? (node.labelText + ' / ' + node.label) : node.label;
                    node.uid = Math.floor(Math.random() * 10000);
                    if (node.children && node.children.length) {
                        node.isLeaf = false;
                        node.children.forEach(child => {
                            child.valuePath = child.valuePath ? child.valuePath.concat(node.valuePath) : node.valuePath;
                            child.labelText = child.labelText ? (child.labelText + ' / ' + node.labelText) : node.labelText;
                        });
                        this.formatNodes(node.children);
                    } else {
                        node.isLeaf = true;
                    }
                });
            },
            // 扁平化所有数据
            flatNodes(data) {
                if (!data || data.length < 1) return [];
                return data.reduce((res, node) => {
                    res.push(node);
                    if (node.children && node.children.length) {
                        res = res.concat(this.flatNodes(node.children));
                    }
                    return res;
                }, []);
            },
            handleClickSuggest(node) {
                this.checkedValue = node.valuePath;
                this.inputLabel = node.labelText;
                this.filtering = false;
                this.$emit('input', this.checkedValue);
                this.$emit('change', this.checkedValue);
                this.toggleDropDownVisible();
            },
            handleFocus(e) {
                this.$emit('focus', e);
            },
            handleBlur(e) {
                this.$emit('blur', e);
            }
        }
    };
</script>
