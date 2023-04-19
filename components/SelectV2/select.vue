<template>
    <div
            ref="kdSelect"
            class="kd-select"
            :class="[{
                'kd-select-disabled':disabled,
                'kd-select-clear-hover': clearAll && !disabled,
                'kd-select-fluid': fluid
            }]"
            :style="{'width': inputWidth}"
    >
        <kd-tooltip
                ref="kdDropdownTooltip"
                v-model="dropdownMenu"
                trigger="click"
                placement="bottom"
                :disabled="disabled"
                :hide-destroy="hideDestroy"
                :width-limit="false"
                :content-class="tooltipClass"
        >
            <div
                    ref="kdSelectInput"
                    class="kd-select-input"
                    :class="[{ 'kd-select-multiple':multiple },'kd-select-' + size]"
                    @click="selectClick"
            >
                <i
                        class="kd-icon-arrow-down kd-select-arrow-icon"
                        :class="{'kd-select-arrow-icon-rotate':dropdownMenu}"
                />
                <i
                        v-if="!disabled"
                        class="kd-icon-close kd-select-clear-icon"
                        @click.stop="clear"
                ></i>
                <!-- tags -->
                <div
                        v-if="multiple"
                        class="kd-select-tags"
                >
                    <span class="kd-select-tags-content">
                        <span
                                v-for="item in (collapseTags ? (tagList.length > 0 ? [tagList[0]] : []) : tagList)"
                                :key="item[valueKey]"
                                class="kd-select-tags-item"
                        >
                            <span
                                    class="kd-select-tag-label"
                                    :title="item[labelKey]"
                            >{{ item[labelKey] }}</span>
                            <span
                                    v-if="!disabled"
                                    class="kd-select-tag-close kd-icon-close"
                                    @click.stop="deleteTag(item)"
                            ></span>
                        </span>
                        <template v-if="!dropdownMenu && collapseTags && collapseTagsTooltip && tagList.length > 1">
                            <kd-tooltip
                                    can-hover
                                    :width-limit="false"
                                    placement="top-start"
                            >
                                <div
                                        v-if="collapseTags && tagList.length > 1"
                                        class="kd-select-tags-item"
                                >+{{ tagList.length - 1 }}</div>
                                <template slot="content">
                                    <div
                                            class="kd-select-tag-tip kd-select-tags"
                                            :style="{maxWidth: defaultWidth, maxHeight: '200px', overflow: 'auto'}"
                                    >
                                        <span
                                                v-for="item in tagList"
                                                :key="item[valueKey]"
                                                class="kd-select-tags-item"
                                        >
                                            <span
                                                    class="kd-select-tag-label"
                                                    :title="item[labelKey]"
                                            >{{ item[labelKey] }}</span>
                                            <span
                                                    v-if="!disabled"
                                                    class="kd-select-tag-close kd-icon-close"
                                                    @click.stop="deleteTag(item)"
                                            ></span>
                                        </span>
                                    </div>
                                </template>
                            </kd-tooltip>
                        </template>
                        <template v-else>
                            <span
                                    v-if="collapseTags && tagList.length > 1"
                                    class="kd-select-tags-item"
                            >+{{ tagList.length - 1 }}</span>
                        </template>
                    </span>
                    <!-- 多选 -->
                    <input
                            v-if="multiple"
                            ref="input"
                            v-model="multipleSerach"
                            :readonly="!filterable"
                            type="text"
                            :disabled="disabled"
                            class="kd-select-input-wrap kd-select-input-inner"
                            :class="{'kd-select-input-disabled':disabled }"
                            :placeholder="inputPlaceholder"
                            @blur="handleBlur"
                            @focus="multipleInputFocus"
                            @input="handleInput"
                    />
                </div>
                <!-- 单选 -->
                <input
                        v-if="!multiple"
                        ref="input"
                        v-model="inputLabel"
                        :readonly="!filterable || !dropdownMenu"
                        type="text"
                        :disabled="disabled"
                        class="kd-select-input-inner"
                        :class="{'kd-select-input-disabled':disabled }"
                        :placeholder="inputPlaceholder"
                        @input="handleInput"
                        @focus="handleFocus"
                        @blur="handleBlur"
                />
            </div>
            <template slot="content">
                <kd-select-dropdown
                        v-model="value"
                        :data="innerData"
                        :multiple="multiple"
                        :default-width="defaultWidth"
                        :dropdownMenu="dropdownMenu"
                        :activeIcon="activeIcon"
                        :valueKey="valueKey"
                        :labelKey="labelKey"
                        @setValue="setValue"
                        @optionClick="optionClick"
                />
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import KdSelectDropdown from './select-dropdown.vue';
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'KdSelectV2',
        components: {
            KdSelectDropdown
        },
        mixins: [Lang],
        props: {
            data: {
                type: Array,
                default: () => []
            },
            valueKey: {
                type: String,
                default: 'value'
            },
            labelKey: {
                type: String,
                default: 'label'
            },
            width: {
                type: String,
                default: ''
            },
            // eslint-disable-next-line vue/require-prop-type-constructor
            value: null,
            placeholder: {
                type: String,
                default: ''
            },
            filterable: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            clearAll: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            hideDestroy: {
                type: Boolean,
                default: false
            },
            fluid: {
                type: Boolean,
                default: false
            },
            activeIcon: {
                type: Boolean,
                default: false
            },
            collapseTags: {
                type: Boolean,
                default: false
            },
            collapseTagsTooltip: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                inputLabel: '',
                tagList: [],
                inputPlaceholder: '',
                dropdownMenu: false,
                multipleSerach: '',
                innerData: [],
                selected: [],
                defaultWidth: ''
            };
        },
        computed: {
            tooltipClass() {
                return `kd-dropdown-tooltip`;
            },
            inputWidth() {
                const width = this.width;
                if (width.indexOf('px') > -1 || width.indexOf('%') > -1) {
                    return width;
                } else {
                    return width + 'px';
                }
            }
        },
        watch: {
            data: {
                immediate: true,
                handler(v) {
                    this.innerData = v;
                    this.$nextTick(function () {
                        this.initData(this.selected);
                    });
                }
            },
            value: {
                immediate: true,
                handler(v) {
                    let val = v;
                    if (this.multiple && !Array.isArray(v)) {
                        val = [];
                        // eslint-disable-next-line no-console
                        console.error('select value should be Array while is multiple!');
                    }
                    this.selected = val;
                    this.$nextTick(() => {
                        this.initData(val);
                    });
                }
            },
            placeholder: {
                immediate: true,
                handler(v) {
                    if (this.multiple) {
                        this.inputPlaceholder = this.value.length > 0 ? '' : v;
                    } else {
                        this.inputPlaceholder = v;
                    }
                }
            },
            dropdownMenu: {
                handler(v, old) {
                    this.defaultWidth = this.$refs.kdSelect.clientWidth + 'px';
                    if (v) {
                        if (this.filterable && this.inputLabel && !this.multiple) {
                            this.inputPlaceholder = this.inputLabel;
                            this.inputLabel = '';
                        }
                    } else {
                        if (this.multiple) {
                            this.multipleSerach = '';
                        } else if (this.filterable) {
                            if (this.value !== null &&
                                this.value !== '' &&
                                this.value !== undefined
                            ) {
                                this.inputLabel = this.inputPlaceholder;
                            }
                            this.inputPlaceholder = this.placeholder;
                        }
                    }
                    this.optionFilter('');
                }
            }
        },
        mounted() {
            // console.log('xxxxxx2', this.$refs.kdSelect);
            this.defaultWidth = this.$refs.kdSelect.clientWidth + 'px';
        },
        methods: {
            initData(v) {
                if (this.multiple) {
                    // 多选初始化添加tags
                    const tagList = this.data.filter(item => {
                        return v.includes(item[this.valueKey]);
                    });
                    this.selected = v;
                    this.tagList = tagList;
                    this.inputPlaceholder = v.length > 0 ? '' : this.placeholder;
                } else {
                    // 获取label
                    const selectItem = this.data.find(item => {
                        return v === item[this.valueKey];
                    });
                    this.inputLabel = selectItem ? selectItem[this.labelKey] : '';
                    this.inputPlaceholder = this.inputLabel || this.placeholder;
                    this.dropdownMenu = false;
                }
            },
            handleInput() {
                if (!this.multiple) {
                    this.optionFilter(this.inputLabel);
                } else {
                    this.optionFilter(this.multipleSerach);
                }
            },
            optionFilter(v) {
                this.innerData = this.data.filter(item => {
                    return item[[this.labelKey]].includes(v);
                });
            },
            selectClick(e) {
                if (this.disabled) return;
                if (this.filterable) {
                    this.$refs.input.focus();
                }
            },
            setValue({ scope, active }) {
                if (scope[this.valueKey] === this.value) {
                    this.dropdownMenu = false;
                    return;
                }
                if (this.multiple) {
                    if (active) {
                        this.deleteTag(scope);
                        return;
                    } else {
                        this.tagList.push(scope);
                        this.$emit('input', [...this.selected, scope[this.valueKey]]);
                    }
                    this.inputPlaceholder = this.tagList.length > 0 ? '' : this.placeholder;
                    this.$refs.kdDropdownTooltip.updatePopper();
                    this.$refs.input.focus();
                } else {
                    this.inputPlaceholder = scope[this.labelKey];
                    this.dropdownMenu = false;
                    this.$emit('input', scope[this.valueKey]);
                }
                this.$emit('change', scope);
            },
            optionClick(data) {
                this.$emit('optionClick', data);
            },
            deleteTag(scope) {
                this.selected.forEach((item, index) => {
                    if (item === scope[this.valueKey]) {
                        this.selected.splice(index, 1);
                    }
                });
                this.tagList.forEach((item, index) => {
                    if (item[this.valueKey] === scope[this.valueKey]) {
                        this.tagList.splice(index, 1);
                    }
                });
                this.$emit('remove-tag', scope);
                this.$emit('input', this.selected);
                this.$refs.kdDropdownTooltip.updatePopper();
                this.inputFocus();
                this.$emit('change', scope);
                if (this.tagList.length === 0) {
                    this.inputPlaceholder = this.placeholder;
                    this.inputLabel = this.inputPlaceholder;
                }
            },
            inputFocus() {
                this.$refs.input.focus();
            },
            clear() {
                const val = this.multiple ? [] : '';
                this.$emit('input', val);
                this.$emit('clear');
                this.$emit('change', val);
                this.tagList = [];
                this.inputPlaceholder = this.placeholder;
                this.inputLabel = this.inputPlaceholder;
            },
            handleFocus() {
                this.$emit('focus');
            },
            handleBlur() {
                this.$emit('blur');
            },
            multipleInputFocus() {
                this.$emit('focus');
            }
        }
    };
</script>
