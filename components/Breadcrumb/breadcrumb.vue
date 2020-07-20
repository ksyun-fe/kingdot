<template>
    <div class="kd-breadcrumb">
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'Breadcrumb',
        components: {

        },
        props: {
            separator: {
                type: String,
                default: ''
            },
            separatorClass: {
                type: String,
                default: 'iconchuansuokuang_anniu1'
            }
        },
        data() {
            return {
                children: []
            };
        },
        created() {
            this.children = [];
        },
        methods: {
            getChildren(child) {
                if (child) {
                    this.children.push(child);
                }
                return this.children.length;
            }
        }
    };
</script>

<style scoped>
</style>
