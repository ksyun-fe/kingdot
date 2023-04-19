<template>
    <div
            ref="kdDropdown"
            class="kd-select-dropdown"
            :style="{
                width: defaultWidth
            }"
    >
        <kd-virtual-list
                v-if="dropdownMenu"
                :style="{
                    'height': `${listHeight}px`,
                    'overflow-y': 'auto'
                }"
                :data-key="valueKey"
                :data-sources="data"
                :estimate-size="20"
                :data-component="itemComponent"
                :extra-props="{
                    parent: {value, multiple, setValue,optionClick},
                    activeIcon,
                    valueKey, labelKey
                }"
        >
        </kd-virtual-list>
        <ul v-if="data.length === 0">
            <li class="kd-select-no-data">无数据</li>
        </ul>
    </div>
</template>

<script>
    import Item from './option.vue';
    export default {
        name: 'KdSelectDropdown',
        props: {
            // eslint-disable-next-line vue/require-prop-type-constructor
            value: '',
            data: {
                type: Array,
                default: () => []
            },
            multiple: {
                type: Boolean,
                default: false
            },
            defaultWidth: {
                type: String,
                default: ''
            },
            dropdownMenu: {
                type: Boolean
            },
            activeIcon: {
                type: Boolean,
                default: false
            },
            valueKey: {
                type: String,
                default: 'value'
            },
            labelKey: {
                type: String,
                default: 'label'
            }
        },
        data() {
            return {
                // 每个option的渲染组件
                itemComponent: Item,
                // 每个option高度
                itemSize: 32,
                // option list总高度
                listHeight: 0
            };
        },
        updated() {
            if (this.data.length >= 9) {
                this.listHeight = this.itemSize * 9;
            } else {
                this.listHeight = this.itemSize * this.data.length;
            }
        },
        methods: {
            setValue(v) {
                this.$emit('setValue', v);
            },
            optionClick(v) {
                this.$emit('optionClick', v);
            }
        }
    };
</script>
