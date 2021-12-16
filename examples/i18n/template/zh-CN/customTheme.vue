<template>
    <div class="container">
        <div class="custom-theme">
            <div
                    v-if="!showEditTheme"
                    class=""
                    :style="{padding: '20px'}"
            >
                <div>
                    <H2>官方主题</H2>
                    <ul
                            class="custom-item-wrap"
                    >
                        <li
                                class="custom-item"
                                @click="editTheme()"
                        >
                            <div class="preview">
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-text-dark-color')}"
                                ></div>
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-text-light-color')}"
                                ></div>
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-primary-color')}"
                                ></div>
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-success-color')}"
                                ></div>
                            </div>
                            <div class="info">
                                <div>默认主题</div>
                                <!--<kd-button-->
                                <!--        type="none"-->
                                <!--        class="info-btn"-->
                                <!--        @click="editTheme()"-->
                                <!--&gt;查看</kd-button>-->
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <H2>我的主题</H2>
                    <ul
                            class="custom-item-wrap"
                    >
                        <li
                                v-for="(item, index) in custumThemes"
                                :key="item.uuid"
                                class="custom-item"
                                @click="editTheme(item)"
                        >
                            <div class="preview">
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-text-dark-color', item.variable)}"
                                ></div>
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-text-light-color', item.variable)}"
                                ></div>
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-primary-color', item.variable)}"
                                ></div>
                                <div
                                        class="color-bg"
                                        :style="{background: getVarColor('$-success-color', item.variable)}"
                                ></div>
                            </div>
                            <div class="info">
                                <div>Theme {{ index + 1 }}</div>
                                <!--<kd-button-->
                                <!--        type="none"-->
                                <!--        class="info-btn"-->
                                <!--        @click="editTheme(item)"-->
                                <!--&gt;查看</kd-button>-->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                    v-if="showEditTheme"
                    class="edit-theme-wrap"
                    :style="{padding: '20px'}"
            >
                <kd-button
                        type="none"
                        class="goBack-btn"
                        @click="goback"
                ><i class="kd-icon-arrow-down1 goback-icon"></i>返回</kd-button>
                <EtitorTheme
                        :themeUuid="currentEditorTheme && currentEditorTheme.uuid"
                ></EtitorTheme>
            </div>
        </div>
    </div>
</template>

<script>
    import {expandMenu} from 'examples/js/mixin';
    import EtitorTheme from 'examples/components/editorTheme.vue';
    import {kingDotKey} from 'examples/components/editorTheme.vue';
    export default {
        name: 'CustomTheme',
        components: {
            EtitorTheme
        },
        mixins: [expandMenu],
        data() {
            return {
                showEditTheme: false,
                currentEditorTheme: null,
                custumThemes: []
            };
        },
        computed: {
            defaultKeyColor() {
                return {
                    '$-text-dark-color': '#262626',
                    '$-text-light-color': '#4c4c4c',
                    '$-primary-color': '#557dfc',
                    '$-success-color': '#38c482'
                };
            }
        },
        created() {
            const themeStorage = window.localStorage.getItem(kingDotKey);
            this.custumThemes = themeStorage ? JSON.parse(themeStorage) : [];
        },
        methods: {
            editTheme(theme) {
                this.showEditTheme = true;
                this.currentEditorTheme = theme;
            },
            goback() {
                this.showEditTheme = false;
            },
            getVarColor(key, theme) {
                const common = theme && theme.find(item => item.name === 'common');
                const config = common && common.config.find(item => item.key === key);
                return config && config.value || this.defaultKeyColor[key];
            }
        }
    };
</script>
<style lang="stylus" scoped type="text/stylus">
.custom-theme
    width 1200px
    margin 0 auto
.custom-item-wrap
    display flex
    flex-direction row
    flex-wrap wrap
.custom-item
    width 300px
    height 200px
    display flex
    flex-direction column
    margin-right 10px
    margin-bottom 10px
    background #ccc
    position relative
    cursor pointer
    .preview
        display flex
        flex-grow 1
        flex-direction row
        justify-content stretch
    .color-bg
        display flex
        flex-grow 1
    .info
        /*display flex*/
        /*flex-direction column*/
        /*justify-content center*/
        /*align-items center*/
        width 100%
        height 32px
        line-height 32px
        text-align center
        /*border-radius 50% 50% 50% 50%*/
        /*padding 10px*/
        background #fff
        /*opacity 0*/
        position absolute
        bottom 0
        left 0
        /*top 50%*/
        /*left 50%*/
        // transform translate(-50%, -50%)
        // transform-origin -5% -5%
        // transition all 0.5s
    .info-btn
        padding 0
    /*&:hover*/
        /*.info*/
            /*opacity 0.5*/
            // transform scale(1.6) translate(-50%, -50%)
.goBack-btn
    padding 0
    font-size 16px
.goback-icon
    font-size 16px
    display inline-block
    transform-origin center center
    transform rotate(90deg)
    margin-right 10px
</style>
