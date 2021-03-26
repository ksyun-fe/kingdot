<template>
    <div
            ref="kdDropdown"
            class="kd-select-dropdown"
            @scroll="scroll"
            :style="{ width:defaultWidth }"
    >
        <ul ref="kdDropdownContent">
            <slot><li class="kd-select-no-data">无数据</li></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'KdSelectDropdown',
        props: {
            // eslint-disable-next-line vue/require-prop-type-constructor
            value: '',
            isDropdown: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            defaultWidth: {
                type: String,
                default: ''
            },
            filterData: {
                type: Object
            },
            lazy: {
                type: Boolean,
                default: false
            },
            lazyLoadCount: {
                type: [String, Number],
                default: 10
            }
        },
        data() {
            return {
                optionIndex: 0,
                loadCount: 30
            };
        },
        watch: {
            'filterData': function (v) {
                if (this.$children) {
                    if (this.$children[0].$options._componentTag === 'kd-option') {
                        this.$children.forEach(item => {
                            item.isShow(v);
                        });
                    } else {
                        this.$children.forEach(child => {
                            const test = child.$children.every(item => {
                                return !item.isShow(v);
                            });
                            child.isGroup = !test;
                        });
                    }
                }
            }
        },
        methods: {
            setValue(v) {
                this.$emit('setValue', v);
            },
            getOptionIndex() {
                this.optionIndex += 1;
                return this.optionIndex;
            },
            scroll() {
                if (!this.lazy) return false;
                let scrollTop = this.$refs.kdDropdown.scrollTop;
                let contentHeight = this.$refs.kdDropdownContent.offsetHeight;
                if (contentHeight - scrollTop <= 390) {
                    this.loadCount += parseInt(this.lazyLoadCount);
                }
            }
        }
    };
</script>
