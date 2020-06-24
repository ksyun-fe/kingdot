<template>
    <div class="container">
        <div
                class="left-menu"
                :class="{'active-menu': isShowMenu}"
        >
            <side-nav
                    :data="navData[lang]"
                    :base-path="`/${ lang }/component`"
                    @showMenu="showMenu"
                    @hideMenu="hideMenu"
            />
        </div>
        <div
                class="main-container"
        >
            <router-view
                    class="component-doc-content"
            />
        </div>
    </div>
</template>

<script>
    import navData from 'examples/i18n/config/components.json';
    import {expandMenu} from 'examples/js/mixin';
    export default {
        name: 'Components',
        mixins: [expandMenu],
        data() {
            return {
                lang: this.$route.meta.lang,
                navData
            };
        }
    };
</script>
