<template>
    <div
            :class="{
                'kd-collapse': true,
                'kd-collapse-concise': concise
            }"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'KdCollapse',
        props: {
            value: {
                type: [String, Number, Array]
            },
            accordion: {
                type: Boolean,
                default: false
            },
            concise: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                activeValues: [].concat(this.value === '' ? [] : this.value)
            };
        },
        provide() {
            return {
                KdCollapse: this
            };
        },
        watch: {
            value(value) {
                this.activeValues = [].concat(value === '' ? [] : this.value);
            }
        },
        created() {
            this.$on('toggleItemValue', this.changeValue);
        },
        methods: {
            changeValue(item) {
                let value = this.value;
                const index = this.activeValues.findIndex(i => i === item);

                if (~index) {
                    this.activeValues.splice(index, 1);
                } else if (this.accordion) {
                    this.activeValues = [item];
                } else {
                    this.activeValues.push(item);
                }

                value = this.accordion ? this.activeValues[0] : this.activeValues;

                this.$emit('input', value);
                this.$emit('change', value);
            }
        }
    };
</script>
