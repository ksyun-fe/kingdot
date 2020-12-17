<template>
    <div>
        <ul class="side-nav">
            <li
                    v-for="(item, key) in data"
                    :key="key"
                    class="type-item"
                    @click="hideMenu"
            >
                <div
                        v-if="item.path"
                        class="nav-item"
                        :class="{'comp-title': !item.path}"
                >
                    <router-link
                            v-if="item.path"
                            class="type-route-title"
                            active-class="active"
                            tag="div"
                            :to="basePath + item.path"
                            exact
                            v-text="item.name"
                    />
                </div>
                <span
                        v-else
                        class="type-title"
                >{{ item.name }}</span>
                <div
                        v-for="(group, index) in item.children || []"
                        :key="index"
                >
                    <div v-if="group.children.length > 0">
                        <span
                                v-if="group.name"
                                class="group-title"
                        >{{ group.name }}</span>
                        <div
                                v-for="(component, cIndex) in group.children"
                                :key="cIndex"
                                class="nav-item"
                                :class="{'comp-title': !component.path}"
                        >
                            <router-link
                                    v-if="component.path"
                                    active-class="active"
                                    tag="div"
                                    :to="basePath + component.path"
                                    exact
                                    v-text="component.name"
                            />
                        </div>
                    </div>

                </div>
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
    body.dark
        .side-nav
            color #8D919B
            background: #1B2338;
            box-shadow: 2px 0 12px 0 rgba(0,0,0,0.10)
            .nav-item
                div.active
                    background-image linear-gradient(90deg, #F8334C 0%, #4E284D 100%)
    .side-nav
        position relative
        box-sizing border-box
        padding 20px 24px 20px 12px
        height: 100%
        overflow auto

        .type-item .type-route-title
            font-size 16px
        .type-title
            font-weight bold
        .type-title,.group-title,.nav-item
            width 165px
            height 37px
            line-height @height
        .group-title,.nav-item
            padding-left 16px
        .nav-item
            cursor pointer
            div
                font-size 12px
                padding-left 16px
                border-radius 4px

                &.active
                    background-color: #557DFC
                    color: #fff

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
