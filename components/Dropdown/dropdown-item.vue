<template>
    <div
            ref="dropdownItem"
            class="kd-dropdown-item"
            :class="{'kd-dropdown-dividedLine-item':dividedLine,'kd-dropdown-disabled-item':disabled}"
            @click.stop="handleClick"
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
        data() {
            return {};
        },
        computed: {
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
