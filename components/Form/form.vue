<template>
    <form
            class="kd-form"
            @submit="submit"
    >
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'Form',
        provide() {
            return { 'form': this };
        },
        props: {
            labelWidth: {
                type: [String, Number],
                default: '200'
            }
        },
        data: function () {
            return {
                formItems: []
            };
        },
        methods: {
            submit(e) {
                this.validate()
                    .then((isValid) => {
                        isValid ? this.$emit('submit', e, this) : this.$emit('validateFail', e, this);
                    })
                    .catch(error => {
                        console.error('form submit: ', error);
                    });
            },
            validate() {
                const items = this.formItems || [];
                return Promise.all(items.map(item => {
                    return item.validate();
                }))
                    .then(values => values.every(value => value))
                    .catch(error => {
                        console.error('form validate: ', error);
                    });
            }
        }

    };
</script>
