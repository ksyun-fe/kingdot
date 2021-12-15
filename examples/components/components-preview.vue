<template>
    <div class="demo-preview-wrap flex-row">
        <div class="flex-grow">
            <h4>Breadcrumb</h4>
            <div class="">
                <kd-breadcrumb separator="/">
                    <kd-breadcrumb-item>一级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>二级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
                </kd-breadcrumb>
                <kd-breadcrumb>
                    <kd-breadcrumb-item to="/">一级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item href="/">二级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
                </kd-breadcrumb>
            </div>
            <h4>Button</h4>
            <div class="preview-demo">
                <kd-button>defult</kd-button>
                <kd-button type="primary">primary</kd-button>
                <kd-button type="success">Success</kd-button>
                <kd-button type="info">Info</kd-button>
                <kd-button type="warning">Warning</kd-button>
                <kd-button type="danger">Danger</kd-button>
                <kd-button type="none">文字按钮</kd-button>
            </div>
            <h4>Checkbox</h4>
            <div class="">
                <kd-checkbox>checkbox</kd-checkbox>
                <kd-checkbox disabled>checkbox</kd-checkbox>
            </div>
            <h4>Radio</h4>
            <div class="">
                <kd-radio>radio</kd-radio>
                <kd-radio disabled>radio</kd-radio>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ComponentPreview',
        data() {
            return {

            };
        },
        computed: {

        },
        watch: {

        },
        created() {

        },
        methods: {

        }
    };
</script>
<style lang="stylus" scoped type="text/stylus">
.flex-row
    display flex
    flex-direction row
.flex-col
    display flex
    flex-direction column
.flex-shrink
    flex-shrink 0
.flex-grow
    flex-grow 1
.mr-mini
    margin-right 10px
.editor-theme-wrap
    display flex
    flex-direction row
.editor-var
    width 300px
.demo-preview-wrap >>>
    .kd-btn, .kd-checkbox, .kd-radio
        margin-right 10px

</style>
