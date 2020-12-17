<template>
    <div
            :class="{
                'kd-collapse-item': true,
                'kd-collapse-item-active': isActive,
                'kd-collapse-item-disabled': disabled
            }"
    >
        <div
                class="kd-collapse-title"
                @click="titleClick"
        >
            <slot name="icon">
                <i class="kd-icon-arrow-down-solid kd-collapse-title-icon"></i>
            </slot>
            <slot name="title">{{ title }}</slot>
        </div>
        <kd-transition
                type="collapse"
        >
            <div
                    v-show="isActive"
                    class="kd-collapse-content"
            >
                <slot></slot>
            </div>
        </kd-transition>
    </div>
</template>

<script>
    export default {
        name: 'KdCollapseItem',
        props: {
            value: {
                type: [String, Number],
                default() {
                    return this._uid;
                }
            },
            title: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            isActive() {
                return this.KdCollapse.activeValues.includes(this.value);
            }
        },
        methods: {
            titleClick() {
                if (this.disabled) return;
                this.KdCollapse.$emit('toggleItemValue', this.value);
                this.$emit('change', this.isActive);
            }
        },
        inject: ['KdCollapse']
    };
</script>
