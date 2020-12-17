<template>
    <div
            ref="header"
            class="header-area"
    >
        <div class="logo-wrapper">
            <router-link
                    :to="`/${currentLang}`"
                    tag="span"
                    class="logo"
                    exact
            />
            <!--<input
                    class="search"
                    type="text"
                    placeholder="请输入组件名称"
            >-->
        </div>
        <ul class="nav-wrapper">
            <li
                    class="nav-item"
                    :class="{'active' : activeIndex === 0 }"
                    @click="activeIndex = 0"
            >
                <router-link
                        :to="`/${currentLang}/design`"
                        tag="div"
                >
                    {{ words['header']['design'] }}
                </router-link>
            </li>
            <li
                    class="nav-item"
                    :class="{'active' : activeIndex === 1 }"
                    @click="activeIndex = 1"
            >
                <router-link
                        :to="`/${currentLang}/component`"
                        tag="div"
                >
                    {{ words['header']['components'] }}
                </router-link>
            </li>
            <!-- 切换主题 -->
            <li
                    class="nav-item"
                    :class="{'active' : activeIndex === 2 }"
                    @click="changeTheme"
            >
                {{ themeText }}
            </li>
            <!--     切换语言       -->
            <!--<li-->
            <!--        class="nav-item"-->
            <!--        :class="{'active' : activeIndex === 3 }"-->
            <!--        @click="changeLang"-->
            <!--&gt;-->
            <!--    {{ nextLang }}-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
    import wordsConfig from '../i18n/config/words.json';
    const themes = require('../../src/styles/themes.js');
    const getThemeCss = (theme) => {
        // eslint-disable-next-line no-undef
        return publicPath + theme + '.' + version + '.css';
    };
    export default {
        data() {
            return {
                langs: {
                    'zh-CN': '中文',
                    'en-US': 'English'
                },
                nextLang: 'English',
                // eslint-disable-next-line no-undef
                firstTheme: themes.findIndex(i => i === devTheme) || 0,
                activeIndex: 0
            };
        },
        computed: {
            currentLang() {
                return this.$route.path.split('/')[1] || 'zh-CN';
            },
            words() {
                return wordsConfig.find(elem => elem.lang === this.currentLang);
            },
            themeText() {
                if (this.firstTheme === 0) return this.words.header.theme[0];
                return this.words.header.theme[1];
            }
        },
        watch: {
            firstTheme: {
                immediate: true,
                handler(v) {
                    const theme = themes[v];
                    let link = document.getElementById('theme_str');
                    const toggleThemeClass = () => {
                        if (theme === 'theme') {
                            document.body.classList.add('dark');
                        } else {
                            document.body.classList.remove('dark');
                        }
                    };
                    // eslint-disable-next-line no-undef
                    if (!isProd) {
                        toggleThemeClass();
                        return;
                    }

                    if (!link) {
                        link = document.createElement('link');
                        link.setAttribute('id', 'theme_str');
                        link.setAttribute('rel', 'stylesheet');
                        document.getElementsByTagName('head')[0].appendChild(link);
                    }
                    link.href = getThemeCss(theme);
                    link.onload = function () {
                        toggleThemeClass();
                    };
                }
            }
        },
        methods: {
            switchLang(targetLang) {
                if (this.currentLang === targetLang) return;
                localStorage.setItem('lang', targetLang);
                this.$router.push(this.$route.path.replace(this.currentLang, targetLang));
            },
            changeLang() {
                if (this.currentLang === 'zh-CN') {
                    this.switchLang('en-US');
                    this.nextLang = '中文';
                } else {
                    this.switchLang('zh-CN');
                    this.nextLang = 'English';
                }
            },
            // change theme
            changeTheme() {
                this.activeIndex = 2;
                this.firstTheme = this.firstTheme === 0 ? 1 : 0;
            }
        }
    };
</script>

<style scoped ref="stylesheet/stylus" lang="stylus" type="text/stylus">
    $headerHeight = 74px
    .header-area
        height: $headerHeight
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05)

        .logo-wrapper
            line-height $headerHeight
            float left
            cursor pointer
            .logo
                display inline-block
                padding 18px 24px
                width: 34px
                height: 38px
                background url('~examples/images/logo.png') no-repeat center
                background-size 34px 38px
                vertical-align middle

            .search
                width: 220px
                height: 34px
                padding-left 20px
                border-radius (@height / 2)
                background-color: #F2F2F2
                outline none
                vertical-align middle

        .nav-wrapper
            display flex
            float right
            height: $headerHeight

            .nav-item
                position relative
                width: 110px
                line-height @height
                text-align center
                cursor pointer
                color #778088

                div
                    position relative

                    &:after
                        content ''
                        position absolute
                        left 0
                        bottom 0
                        width: 100%
                        border-bottom 2px solid
                        border-color transparent
                        transition all .3s

                    &.router-link-active
                        color #557DFC

                        &:after
                            border-color #557DFC
    //dark
    body.dark
        background: #1B2338;
        .header-area
            color #8D919B
            background: #222A41
            box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05)
            .logo
                background url('~examples/images/logo-dark.png') no-repeat center
            .nav-wrapper .nav-item div.router-link-active
                color #fff
                &:after
                    border-color #ED3351
        /*.container
            .left-menu
                background: #1B2338;
                box-shadow: 2px 0 12px 0 rgba(0,0,0,0.10)*/
    @media (max-width: 780px)
        .header-area
            display flex
            justify-content space-between

            .logo-wrapper
                flex 0
                width 100px

                .search
                    display none

            .nav-wrapper
                .nav-item
                    width auto
                    padding 0 20px

        .container
            position relative

            .left-menu
                position absolute
                top 0
                bottom 0
                width 213px
                left -(@width)
                background: #fff
                transition left ease-in-out 0.3s
                z-index 1
                &.active-menu
                    left 0

    @media (max-width: 414px)
        .header-area
            display flex
            justify-content space-between

            .logo-wrapper
                flex 0
                width 100px
                .search
                    display none

            .nav-wrapper
                flex 1

                .nav-item
                    width 25%
                    padding 0
                    overflow hidden
</style>
