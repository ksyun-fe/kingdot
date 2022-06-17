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
                <div
                        v-if="multiple"
                        class="kd-cascader-tags"
                >
                    <kd-tag
                            v-for="tag in presentTags"
                            :key="tag.key"
                            size="small"
                            color="#909399"
                            backgroundColor="#f0f2f5"
                            borderColor="#e9e9eb"
                            isSolid
                            :closable="tag.closable"
                            @close.stop="deleteTag(tag)"
                    ><span>{{ tag.text }}</span></kd-tag>
                    <input
                            v-if="filterable || presentTags.length === 0"
                            ref="kdCascaderInputInnerMulti"
                            v-model="inputLabel"
                            class="kd-cascader-multi-input-inner"
                            :class="{'kd-cascader-input-disabled': disabled}"
                            type="text"
                            :placeholder="presentTags.length ? '' : inputPlaceholder"
                            :readonly="!filterable"
                            :disabled="disabled"
                            @input="handleInput"
                            @focus="handleFocus"
                            @blur="handleBlur"
                    />
                </div>
                <input
                        v-else
                        ref="kdCascaderInputInner"
                        v-model="inputLabel"
                        class="kd-cascader-input-inner"
                        :class="{'kd-cascader-input-disabled': disabled}"
                        type="text"
                        :placeholder="presentTags.length ? '' : inputPlaceholder"
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
                        :options="options"
                        :expandTrigger="expandTrigger"
                        :cascader="this"
                        :lazy="lazy"
                        :lazyMethod="lazyMethod"
                        :labelName="labelName"
                        :valueName="valueName"
                        :multiple="multiple"
                        :checkStrictly="checkStrictly"
                        @setLabel="setLabel"
                        @menuUnvisible="toggleDropDownVisible"
                ></kd-cascader-panel>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import { isEmpty, isFunction, arrayEquals } from '../../src/utils/utils.js';
    export default {
        name: 'KdCascader',
        components: {
        },
        mixins: [],
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
            },
            // 展示字段name
            labelName: {
                type: String,
                default: 'label'
            },
            // 取值字段name
            valueName: {
                type: String,
                default: 'value'
            },
            // 多选
            multiple: {
                type: Boolean,
                default: false
            },
            // 多选时是否折叠展示
            collapseTags: {
                type: Boolean,
                default: false
            },
            // 选择任意一级选项
            checkStrictly: {
                type: Boolean,
                default: false
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
                suggestWidth: '',
                presentTags: [],
                multiCheckedNodes: []
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
            },
            panel() {
                return this.$refs.kdPopperPanel;
            }
        },
        watch: {
            value: {
                deep: true,
                handler(val) {
                    if (!arrayEquals(val, this.checkedValue)) {
                        this.checkedValue = val;
                        this.setLabel();
                    }
                }
            },
            checkedValue: {
                deep: true,
                handler(val) {
                    const { value, dropDownVisible, checkStrictly, multiple } = this;

                    if (val === void 0 || !arrayEquals(val, value)) {
                        this.setLabel();
                        if (!multiple && !checkStrictly && dropDownVisible) {
                            this.toggleDropDownVisible();
                        }
                        this.$emit('input', val);
                        this.$emit('change', val);
                    }
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
                            this.panel.scrollToView();
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
            },
            options: {
                handler() {
                    this.$nextTick(this.setLabel);
                },
                deep: true
            }
        },
        mounted() {
        },
        methods: {
            setLabel() {
                this.$nextTick(() => {
                    if (this.multiple) {
                        this.computePresentTags();
                        this.inputLabel = this.presentTags.length ? '' : null;
                    } else {
                        this.getPresentLabel();
                    }
                });
            },
            getPresentLabel() {
                const { checkedValue, checkStrictly } = this;

                if (!isEmpty(checkedValue)) {
                    const node = this.panel.getNodeByValue(checkedValue);
                    if (node && (checkStrictly || node.isLeaf)) {
                        this.inputLabel = this.showAllLevels ? node.labelText : node.label;
                        return;
                    }
                }
                this.inputLabel = null;
            },
            // 可清除
            handleClear() {
                if (this.multiple) {
                    this.presentTags = [];
                    this.checkedValue = [];
                } else {
                    this.checkedValue.splice(0);
                    this.inputLabel = '';
                    this.suggestions = [];
                }
                this.$emit('input', this.checkedValue);
                this.$emit('change', this.checkedValue);
            },
            toggleDropDownVisible() {
                this.dropDownVisible = !this.dropDownVisible;
            },
            // 可搜索
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
                this.suggestions = this.panel.flatOpt.filter(item => {
                    if (item.disabled) return false;
                    return method(item, this.inputLabel) && item.isLeaf;
                });

                if (!isEmpty(this.checkedValue)) {
                    this.suggestions.forEach(node => {
                        if (this.multiple) {
                            node.checked = node.isContainNode(this.checkedValue);
                        } else {
                            node.checked = arrayEquals(this.checkedValue, node.pathValue);
                        }
                    });
                } else {
                    this.suggestions.forEach(node => {
                        node.checked = false;
                    });
                }
            },
            handleClickSuggest(node) {
                if (this.multiple) {
                    const { checked } = node;
                    node.multiCheck(!checked);
                    this.panel.calcMultiCheckedValue();
                } else {
                    this.checkedValue = node.pathValue;
                    this.inputLabel = node.labelText;
                }
                this.filtering = false;
                this.toggleDropDownVisible();
            },
            handleFocus(e) {
                this.$emit('focus', e);
            },
            handleBlur(e) {
                this.$emit('blur', e);
            },
            // 多选
            computePresentTags() {
                const tags = [];
                const nodes = this.panel.calcMultiCheckedNodes();
                const {showAllLevels, collapseTags, disabled} = this;
                const genTag = node => ({
                    node,
                    key: node.uid,
                    text: showAllLevels ? node.labelText : node.label,
                    closable: !disabled && !node.isDisabled
                });

                const len = nodes.length;
                if (len) {
                    tags.push(genTag(nodes[0]));
                    if (len > 1) {
                        if (collapseTags) {
                            tags.push({
                                key: -1,
                                text: `+ ${len - 1}`,
                                closable: false
                            });
                        } else {
                            nodes.slice(1).forEach(node => tags.push(genTag(node)));
                        }
                    }
                }
                this.multiCheckedNodes = nodes;
                this.presentTags = tags;
            },
            deleteTag(tag) {
                const { checkedValue } = this;
                this.checkedValue = checkedValue.filter(n => !arrayEquals(n, tag.node.pathValue));
                const node = checkedValue.find(n => arrayEquals(n, tag.node.pathValue));
                this.$emit('removeTag', node);
            }
        }
    };
</script>
