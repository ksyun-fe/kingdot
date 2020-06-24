<template>
    <div class="container">
        <div
                class="left-menu"
                :class="{'active-menu': isShowMenu}"
        >
            <side-nav
                    :data="navsData"
                    :base-path="`/${ lang }/design`"
                    @showMenu="showMenu"
                    @hideMenu="hideMenu"
            />
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
                        name: '设计原则'
                    },
                    {
                        path: '/color',
                        name: '颜色'
                    },
                    {
                        path: '/updatelog',
                        name: '更新日志'
                    }
                ]
            };
        }
    };
</script>
