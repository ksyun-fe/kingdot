<template>
    <form
            class="kd-form"
            @submit="submit"
    >
        <slot></slot>
    </form>
</template>

<script>
    import {defaultMessage, methods} from '../FormItem/ruleHandlers';
    export default {
        name: 'KdForm',
        addValidateMethod: (name, method, message) => {
            methods[name] = method;
            defaultMessage[name] = message !== undefined ? message : defaultMessage[name];
        },
        provide() {
            return { 'form': this };
        },
        props: {
            labelWidth: {
                type: [String, Number],
                default: '200'
            },
            fluid: {
                type: Boolean,
                default: false
            }
        },
        data: function () {
            return {
                formItems: []
            };
        },
        computed: {
            labelStyle() {
                return this.labelWidth + 'px';
            }
        },
        methods: {
            submit(e) {
                e && e.preventDefault();
                this.validate()
                    .then((isValid) => {
                        isValid ? this.$emit('submit', e, this) : this.$emit('validateFail', e, this);
                    });
            },
            validate() {
                const items = this.formItems || [];
                return Promise.all(items.map(item => {
                    return item.validate();
                }))
                    .then(values => values.every(value => value));
            }
        }

    };
</script>
