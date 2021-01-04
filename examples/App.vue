<template>
    <div id="app">
        <header-area @toggleTheme="toggleTheme"/>
        <div class="main-area">
            <router-view
                    ref="routerView"
                    :theme="theme"
            />
        </div>
    </div>
</template>
<script>
    import { use } from 'src/lang/index.js';
    import zhComponentWords from 'src/lang/zh-CN/index.js';
    import enComponentWords from 'src/lang/en-US/index.js';
    export default {
        name: 'KDot',
        data() {
            return {
                theme: ''
            };
        },
        computed: {
            currentLang() {
                return this.$route.path.split('/')[1] || 'zh-CN';
            }
        },
        watch: {
            currentLang(val) {
                switch (val) {
                    case 'zh-CN':
                        use(zhComponentWords);
                        break;
                    case 'en-US':
                        use(enComponentWords);
                        break;
                    default:
                        break;
                }
            }
        },
        methods: {
            toggleTheme(theme) {
                this.theme = theme;
            }
        }
    };
</script>
<style ref="stylesheet/stylus" lang="stylus" type="text/stylus">
    @import "./styl/common.styl"
    #app
        height: 100%
        .main-area
            height calc(100% - 74px)
    body.dark
        #app
            .main-area
                background: #1B2338;
</style>
