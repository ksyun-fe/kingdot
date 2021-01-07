<template>
    <div class="kd-breadcrumb">
        <slot></slot>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'KdBreadcrumb',
        components: {

        },
        props: {
            separator: {
                type: String,
                default: ''
            },
            separatorClass: {
                type: String,
                default: 'kd-icon-arrow-right'
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
