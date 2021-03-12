<template>
    <div
            ref="dropdownItem"
            class="kd-dropdown-item"
            :class="{'kd-dropdown-dividedline-item':dividedLine,'kd-dropdown-disabled-item':disabled}"
            @click="handleClick"
    >
        <slot/>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';
    import bus from 'src/mixin/bus.js';
    export default {
        name: 'KdDropdownItem',
        mixins: [Lang],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            clickHide: {
                type: Boolean,
                default: true
            },
            dividedLine: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number, Object],
                default: ''
            }
        },
        methods: {
            handleClick(e) {
                if (this.disabled) return;
                bus.$emit('item-click');
                this.$emit('click', this.value);
            }
        }
    };

</script>
