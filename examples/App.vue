<template>
    <div id="app">
        <header-area/>
        <div class="main-area">
            <router-view/>
        </div>
    </div>
</template>
<script>
    /* import { use } from '../lib/lang/index.js';
    import zhComponentWords from '../lib/lang/zh-CN/index.js';
    import enComponentWords from '../lib/lang/en-US/index.js';*/
    import { use } from 'src/lang/index.js';
    import zhComponentWords from 'src/lang/zh-CN/index.js';
    import enComponentWords from 'src/lang/en-US/index.js';
    export default {
        name: 'KDot',
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
