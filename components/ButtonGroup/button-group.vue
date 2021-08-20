<!--
 * @Description:
 * @Author:
 * @Date: 2021-07-05 15:34:00
 * @LastEditTime: 2021-08-20 16:15:56
 * @LastEditors: fangwenjing
 * @Usage:
-->
<template>
    <div
            ref="kdBtnGroup"
            class="kd-btn-group"
            :class="checkStyle"
    >
        <slot/>
    </div>
</template>
<script>
    export default {
        name: 'KdButtonGroup',
        props: {
            value: {
                type: [String, Number, Array, Boolean]
            },
            checkType: {
                type: String
            },
            disabled: {
                type: Boolean
            }
        },
        data() {
            return {
                disabledStatus: false
            };
        },
        computed: {
            checkStyle() {
                return {
                    'kd-btn-group-radio': this.checkType === 'radio',
                    'kd-btn-group-checkbox': this.checkType === 'checkbox'
                };
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    this.init(v);
                }
            },
            disabled: {
                immediate: true,
                handler(v) {
                    this.disabledStatus = v;
                    if (this.$children.length > 0) {
                        this.$children.forEach(child => {
                            child.disabledStatus = v;
                        });
                    }
                }
            }
        },
        methods: {
            init(v) {
                this.$nextTick(() => {
                    if (!this.$slots.default) return;
                    if (this.checkType === 'checkbox') {
                        this.$slots.default.forEach((item) => {
                            if (item.componentOptions) {
                                const some = v.some(value => {
                                    return value === item.componentOptions.propsData.value;
                                });
                                if (some) {
                                    item.componentInstance.active();
                                } else {
                                    item.componentInstance.isActive = false;
                                }
                            }
                        });
                    } else if (this.checkType === 'radio') {
                        this.$slots.default.forEach((item) => {
                            if (item.componentOptions) {
                                if (v === item.componentOptions.propsData.value) {
                                    item.componentInstance.active();
                                } else {
                                    item.componentInstance.isActive = false;
                                }
                            }
                        });
                    }
                });
            },
            emit(v, active) {
                if (this.disabled) return;
                let value = '';
                if (this.checkType === 'checkbox') {
                    if (active) {
                        value = this.value;
                        const index = value.findIndex(item => item === v);
                        value.splice(index, 1);
                    } else {
                        value = [...this.value, v];
                    }
                } else if (this.checkType === 'radio') {
                    value = v;
                }
                this.$emit('input', value);
            }
        }
    };
</script>
