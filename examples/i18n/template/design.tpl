<template>
    <div class="container">
        <div
                class="left-menu"
                :class="{'active-menu': isShowMenu}"
        >
            <div class="menu-wrap">
                <side-nav
                        :data="navsData"
                        :base-path="`/${ lang }/design`"
                        @showMenu="showMenu"
                        @hideMenu="hideMenu"
                />
            </div>

        </div>
        <div class="main-container">
            <router-view
                    class="content"
            />
        </div>
    </div>
</template>

<script>
    import {expandMenu} from 'examples/js/mixin';
    export default {
        name: 'Design',
        mixins: [expandMenu],
        data() {
            return {
                lang: this.$route.meta.lang,
                navsData: [
                    {
                        path: '/lang',
                        name: '<%= 1 >'
                    },
                    {
                        path: '/color',
                        name: '<%= 2 >'
                    }
                ]
            };
        }
    };
</script>
