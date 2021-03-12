<template>
    <div
            class="kd-select-dropdown"
            :style="{ width:defaultWidth }"
    >
        <ul>
            <slot><li class="kd-select-no-data">无数据</li></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'KdSelectDropdown',
        props: {
            value: {
                type: [String, Array],
                default: ''
            },
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
            }
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
            }

        }
    };
</script>
