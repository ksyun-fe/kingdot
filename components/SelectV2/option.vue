<template>
    <li
            class="kd-option"
            :class="{'kd-option-active': active,'kd-option-disabled': !!source.disabled}"
            :style="{'height': '32px'}"
            :title="source[labelKey]"
            @click.stop="optionClick"
    >
        <i
                v-if="active && activeIcon"
                class="kd-option-icon kd-icon-success"
        />
        <slot>
            {{ source[labelKey] }}
        </slot>
    </li>
</template>
<script>
    export default {
        name: 'KdOption',
        props: {
            activeIcon: {
                type: Boolean,
                default: false
            },
            source: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            parent: {
                type: Object,
                default: () => {
                    return {};
                }
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
        computed: {
            active() {
                // 初始化是否为选择状态
                const parent = this.parent;
                if (parent.multiple) {
                    const value = Array.isArray(parent.value) ? parent.value : [];
                    return value.some(item => {
                        return item === this.source[this.valueKey];
                    });
                } else {
                    return parent.value === this.source[this.valueKey];
                }
            }
        },
        methods: {
            optionClick() {
                if (this.source.disabled) {
                    return;
                }
                const data = {
                    scope: this.source,
                    active: this.active
                };
                this.parent.setValue(data);
                this.parent.optionClick(data);
            }
        }
    };
</script>
