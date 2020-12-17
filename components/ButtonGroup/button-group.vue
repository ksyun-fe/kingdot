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
                type: [String, Number, Array, Boolean],
                default: null
            },
            checkType: {
                type: String
            }
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
                    this.$nextTick(() => {
                        if (this.checkType === 'checkbox') {
                            this.$slots.default.forEach((item) => {
                                const some = v.some(value => {
                                    return value === item.componentOptions.propsData.value;
                                });
                                if (some) {
                                    item.componentInstance.active();
                                } else {
                                    item.componentInstance.isActive = false;
                                }
                            });
                        } else if (this.checkType === 'radio') {
                            this.$slots.default.forEach((item) => {
                                if (v === item.componentOptions.propsData.value) {
                                    item.componentInstance.active();
                                } else {
                                    item.componentInstance.isActive = false;
                                }
                            });
                        }
                    });
                }
            }
        },
        methods: {
            emit(v, active) {
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
