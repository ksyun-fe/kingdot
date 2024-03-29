<template>
    <div
            ref="kdSelect"
            class="kd-select"
            :class="[{
                'kd-select-disabled':disabled,
                'kd-select-clear-hover': clearAll && !disabled,
                'kd-select-active': clickOption,
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
                    <span
                            v-if="collapseTags && tagList.length"
                            class="kd-select-tags-content"
                    >
                        <span
                                class="kd-select-tags-item"
                        >
                            <span class="kd-select-tag-label" :title="tagList[0].label">{{ tagList[0].label }}</span>
                            <span
                                    v-if="!disabled"
                                    class="kd-select-tag-close kd-icon-close"
                                    @click.stop="deleteTag(tagList[0])"
                            ></span>
                        </span>
                        <span
                                v-if="tagList.length > 1"
                                class="kd-select-tags-item"
                        >
                            <span class="kd-select-tag-label">+ {{ tagList.length - 1 }}</span>
                        </span>
                    </span>
                    <span 
                            v-else
                            class="kd-select-tags-content"
                    >
                        <span
                                v-for="item in tagList"
                                :key="item.value"
                                class="kd-select-tags-item"
                        >
                            <span class="kd-select-tag-label" :title="item.label">{{ item.label }}</span>
                            <span
                                    v-if="!disabled"
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
                        :multiple="multiple"
                        :default-width="defaultWidth"
                        :filter-data="filterData"
                        :lazy="lazy"
                        :lazy-load-count="lazyLoadCount"
                        :optimize-scroll="optimizeScroll"
                        :dropdownMenu="dropdownMenu"
                        @setValue="setValue"
                        @updateLabel="updateLabel"
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
            },
            lazy: {
                type: Boolean,
                default: false
            },
            lazyLoadCount: {
                type: [String, Number],
                default: 10
            },
            optimizeScroll: {
                type: Boolean,
                default: false
            },
            collapseTags: {
                type: Boolean,
                default: false
            },
            fluid: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isFocus: false,
                inputLabel: '',
                tagList: [],
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
            },
            inputWidth(){
                let width = this.width
                if(width.indexOf('px') > -1 || width.indexOf('%') > -1){
                    return width
                }else {
                    return width + 'px'
                }
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    let val = v;
                    if (this.multiple && !Array.isArray(v)) {
                        val = [];
                        console.error('select value should be Array while is multiple!')
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
                            if (this.value !== null
                                && this.value !== ''
                                && this.value !== undefined
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
            this.defaultWidth = this.$refs.kdSelect.clientWidth + 'px';
        },
        methods: {
            initData(v) {
                let defSlot = this.$slots.default || [];
                if (this.multiple) {
                    const tagList = [];
                    // 多选初始化添加tags
                    v.forEach((vItem) => {
                        defSlot.forEach((item) => {
                            const options = item.componentOptions;
                            if (options) {
                                const value = options.propsData.value;
                                if (value === vItem) {
                                    const label = options.propsData.label || (item.componentInstance && this.labelFomat(item.componentInstance.labelText));
                                    tagList.push({
                                        value: value,
                                        label: label
                                    });
                                }
                            }
                        });
                    });
                    this.selected = v;
                    this.tagList = tagList;
                    this.inputPlaceholder = v.length > 0 ? '' : this.placeholder;
                } else {
                    // 获取label
                    this.inputLabel = '';
                    defSlot.forEach((item) => {
                        if (item.componentOptions) {
                            if (item.componentOptions.tag === 'kd-option') {
                                this.initLabel(item, v);
                            } else {
                                // 如果是group在遍历一遍
                                item.componentOptions.children.forEach((item) => {
                                    this.initLabel(item, v);
                                });
                            }
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
                    this.inputPlaceholder = this.tagList.length > 0 ? '' : this.placeholder;
                    this.$refs.kdDropdownTooltip.updatePopper();
                    this.$refs.input.focus();
                } else {
                    this.inputPlaceholder = scope.label;
                    this.dropdownMenu = false;
                    this.$emit('input', scope.value);
                }
                this.$emit('change', scope);
            },
            updateLabel(v) {
                if (this.multiple) {
                    this.tagList.push(v);
                } else {
                    this.inputLabel = v.label;
                }
            },
            deleteTag(scope) {
                this.selected.forEach((item, index) => {
                    if (item === scope.value) {
                        this.selected.splice(index, 1);
                    }
                });
                this.tagList.forEach((item, index) => {
                    if (item.value === scope.value) {
                        this.tagList.splice(index, 1);
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
                let val = this.multiple ? [] : '';
                this.$emit('input', val);
                this.$emit('clear');
                this.$emit('change', val);
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
