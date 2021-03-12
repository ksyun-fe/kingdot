<template>
    <div
            ref="kdSelect"
            class="kd-select"
            :class="[{
                'kd-select-disabled':disabled,
                'kd-select-clear-hover': clearAll,
                'kd-select-active': clickOption,
            }]"
            :style="{'width': width}"
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
                                v-for="item in tagList"
                                :key="item.value"
                                class="kd-select-tags-item"
                        >
                            <span>{{ item.label }}</span>
                            <span
                                    class="kd-select-tag-close kd-icon-close"
                                    @click.stop="deleteTag(item)"
                            ></span>
                        </span>
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
                        :readonly="!filterable"
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
                        :multiple="multiple"
                        :default-width="defaultWidth"
                        :filter-data="filterData"
                        @setValue="setValue"
                >
                    <slot/>
                </kd-select-dropdown>
            </template>
        </kd-tooltip>
    </div>
</template>
<script>
    import KdSelectDropdown from './select-dropdown.vue';
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'KdSelect',
        components: {
            KdSelectDropdown
        },
        mixins: [Lang],
        props: {
            width: {
                type: String,
                default: ''
            },
            value: {
                type: [String, Array],
                default: ''
            },
            placeholder: {
                type: String,
                default: ''
            },
            filterable: {
                type: Boolean,
                default: false
            },
            filterMethod: {
                type: Function
            },
            disabled: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            ellipsisTags: {
                type: Boolean,
                default: false
            },
            clearAll: {
                type: Boolean,
                default: false
            },
            remoteMethod: {
                type: Function
            },
            size: {
                type: String,
                default: ''
            },
            contentClass: {
                type: String,
                default: ''
            },
            hideDestroy: {
                type: Boolean,
                default: false
            }

        },
        data() {
            return {
                isFocus: false,
                inputLabel: '',
                tagList: [],
                oldinputLabel: '',
                inputPlaceholder: '',
                clickOption: false,
                dropdownMenu: false,
                isDropdown: false,
                searchTime: 200,
                serachTimeout: {},
                multipleSerach: '',
                init: true,
                options: [],
                selected: [],
                scope: {},
                defaultWidth: '',
                filterData: {}
            };
        },
        computed: {
            tooltipClass() {
                return `kd-dropdown-tooltip`;
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    this.$nextTick(() => {
                        this.initData(v);
                    });
                }
            },
            dropdownMenu: {
                handler(v, old) {
                    if (v) {
                        if (this.filterable && this.inputLabel && !this.multiple) {
                            this.inputPlaceholder = this.inputLabel;
                            this.inputLabel = '';
                        }
                    } else {
                        if (this.multiple && this.multipleSerach) {
                            this.multipleSerach = '';
                            this.optionFilter('');
                        } else if (!this.multiple && this.filterable) {
                            this.inputLabel = this.inputPlaceholder;
                            this.inputPlaceholder = this.placeholder;
                            this.optionFilter('');
                        }
                    }
                }
            }
        },
        mounted() {
            this.defaultWidth = this.$refs.kdSelect.clientWidth + 'px';
        },
        methods: {
            initData(v) {
                if (!this.$slots.default) return;
                if (this.multiple) {
                    const tagList = [];
                    // 多选初始化添加tags
                    v.forEach((vItem) => {
                        this.$slots.default.forEach((item) => {
                            const options = item.componentOptions;
                            const value = options.propsData.value;
                            if (value === vItem) {
                                const label = options.propsData.label || (item.componentInstance && this.labelFomat(item.componentInstance.labelText));
                                tagList.push({
                                    value: value,
                                    label: label
                                });
                            }
                        });
                    });
                    this.selected = v;
                    this.tagList = tagList;
                    this.inputPlaceholder = v.length > 0 ? '' : this.placeholder;
                } else {
                    // 获取label
                    this.$slots.default.forEach((item) => {
                        if (item.componentOptions.tag === 'kd-option') {
                            this.initLabel(item, v);
                        } else {
                            // 如果是group在遍历一遍
                            item.componentOptions.children.forEach((item) => {
                                this.initLabel(item, v);
                            });
                        }
                    });
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
            initLabel(item, v) {
                const options = item.componentOptions;
                const value = options.propsData.value;
                const label = options.propsData.label || (item.componentInstance && this.labelFomat(item.componentInstance.labelText));
                console.log(options.propsData.label);
                console.log(item.componentInstance);
                if (value === v) {
                    this.inputLabel = label;
                }
            },
            labelFomat(label) {
                if (!label) return '';
                return label.replace(/\n/g, '').trim();
            },
            optionFilter(v) {
                clearTimeout(this.serachTimeout);
                this.serachTimeout = setTimeout(() => {
                    //  远程搜索
                    if (typeof this.remoteMethod === 'function') {
                        this.remoteMethod(v);
                    } else {
                        this.filterData = { value: v, method: this.filterMethod };
                    }
                }, this.searchTime);
            },
            selectClick(e) {
                // e.stopPropagation();
                if (this.disabled) return;
                if (typeof this.remoteMethod === 'function') return;
                if (this.filterable || this.remoteMethod) {
                    this.$refs.input.focus();
                }
            },
            setValue({ scope, active }) {
                if (scope.value === this.value) {
                    this.dropdownMenu = false;
                    return;
                }
                if (this.multiple) {
                    if (active) {
                        this.deleteTag(scope);
                    } else {
                        this.tagList.push(scope);
                        this.$emit('input', [...this.selected, scope.value]);
                    }
                    this.$refs.kdDropdownTooltip.updatePopper();
                    this.$refs.input.focus();
                } else {
                    this.$emit('input', scope.value);
                }
                this.$emit('change', scope);
            },
            deleteTag(scope) {
                this.selected.forEach((item, index) => {
                    if (item === scope.value) {
                        this.selected.splice(index, 1);
                    }
                });
                this.$emit('remove-tag', scope);
                this.$emit('input', this.selected);
                this.$refs.kdDropdownTooltip.updatePopper();
                this.inputFocus();
                this.$emit('change', scope);
            },
            inputFocus() {
                this.$refs.input.focus();
            },
            clear() {
                this.$emit('input', []);
                this.$emit('clear');
                this.$emit('change', []);
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
