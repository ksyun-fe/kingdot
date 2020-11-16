<template>
    <div>
        <ul class="side-nav">
            <li
                    v-for="(item, key) in data"
                    :key="key"
                    class="nav-item"
                    :class="{'comp-title': !item.path}"
                    @click="hideMenu"
            >
                <router-link
                        v-if="item.path"
                        active-class="active"
                        tag="div"
                        :to="basePath + item.path"
                        exact
                        v-text="item.name"
                />
                <span
                        v-else
                        class="comp-title"
                >{{ item.name }}</span>
            </li>
        </ul>
        <span
                class="mini-menu"
                @click="showMenu"
        />
    </div>

</template>

<script>
    export default {
        name: 'SideNav',
        props: {
            basePath: {
                type: String,
                default: ''
            },
            data: {
                type: Array,
                default: () => {
                    return [];
                }
            }
        },
        methods: {
            showMenu() {
                this.$emit('showMenu');
            },
            hideMenu() {
                this.$emit('hideMenu');
            }
        }
    };
</script>

<style scoped ref="stylesheet/stylus" lang="stylus" type="text/stylus">
    .side-nav
        position relative
        box-sizing border-box
        padding 20px 24px 20px 12px
        height: 100%
        overflow auto
        font-size 12px
        li.nav-item
            width: 165px
            height: 37px
            line-height @height
            cursor pointer

            &.comp-title
                cursor default

            div
                padding-left 16px
                border-radius 4px

                &.active
                    background-color: #557DFC
                    color: #fff

            .comp-title
                font-weight 600

    @media (max-width 780px)
        .mini-menu
            display block
            position absolute
            left 100%
            top 20px
            width: 30px
            height: 30px
            border-radius 0 4px 4px 0
            /*background-color: pink*/
            cursor pointer
            box-shadow 3px 0 4px 0 rgba(0, 0, 0, .3)
            color #999

            &:hover
                color #0091ea

            &:after
                display block
                content: ''
                position absolute
                width: 20px;
                height 4px
                left 5px
                top 7px
                border-top: 10px double;
                border-bottom: 3px solid;
</style>
