<template>
    <div class="container">
        <Progress ref="progress"></Progress>
        <div class="custom-theme">
            <div
                    v-if="!showEditTheme"
                    class="custom-theme-guid"
            >
                <div>
                    <H2 class="title">官方主题</H2>
                    <ul
                            class="custom-item-wrap"
                    >
                        <li
                                class="custom-item"
                                @click="editTheme()"
                        >
                            <div class="preview"></div>
                            <div
                                    class="color-bg bg4"
                                    :style="{background: getVarColor('$-border-base-color', baseVariable)}"
                            ></div>
                            <div
                                    class="color-bg bg3"
                                    :style="{background: getVarColor('$-warning-color', baseVariable)}"
                            ></div>
                            <div
                                    class="color-bg bg2"
                                    :style="{background: getVarColor('$-primary-color', baseVariable)}"
                            ></div>
                            <div
                                    class="color-bg bg1"
                                    :style="{background: getVarColor('$-success-color', baseVariable)}"
                            ></div>
                            <div class="info">
                                <div>默认主题</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <H2 class="title">我的主题</H2>
                    <ul
                            class="custom-item-wrap"
                    >
                        <li class="custom-item">
                            <kd-upload
                                    :file-change="hanleFileChange"
                                    :auto-upload="false"
                                    :show-file-list="false"
                                    class="upload"
                            >
                                <i class="kd-upload-add-icon kdicon kd-icon-plus"></i>
                            </kd-upload>
                        </li>
                        <li
                                v-for="(item, index) in custumThemes"
                                :key="item.uuid"
                                class="custom-item"
                                @click="editTheme(item)"
                        >
                            <div class="preview"></div>
                            <div
                                    class="color-bg bg4"
                                    :style="{background: getVarColor('$-border-base-color', item.variable)}"
                            ></div>
                            <div
                                    class="color-bg bg3"
                                    :style="{background: getVarColor('$-warning-color', item.variable)}"
                            ></div>
                            <div
                                    class="color-bg bg2"
                                    :style="{background: getVarColor('$-primary-color', item.variable)}"
                            ></div>
                            <div
                                    class="color-bg bg1"
                                    :style="{background: getVarColor('$-success-color', item.variable)}"
                            ></div>
                            <div class="info">
                                <div>主题-{{ index + 1 }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                    v-if="showEditTheme"
                    class="edit-theme-wrap"
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
    import { kingDotCustomConfig, kingDotThemeConfig, mergeConfig } from 'examples/components/editorTheme.vue';
    import Progress from 'examples/components/progress.vue';
    import kingdot from '../../../../src/index.js';
    import requstConfig from '../../../js/backInterfaceConfig';
    const uuidv4 = require('uuid/v4');
    export default {
        name: 'CustomTheme',
        components: {
            EtitorTheme,
            Progress
        },
        mixins: [expandMenu],
        data() {
            return {
                showEditTheme: false,
                currentEditorTheme: null,
                baseVariable: [],
                custumThemes: []
            };
        },
        computed: {
            defaultKeyColor() {
                return {
                    // '$-text-dark-color': '#262626',
                    // '$-text-light-color': '#4c4c4c',
                    // '$-primary-color': '#557dfc',
                    // '$-success-color': '#38c482'
                    '$-border-base-color': 'rgb(204, 204, 204)',
                    '$-warning-color': 'rgb(255, 154, 66)',
                    '$-primary-color': 'rgb(85, 125, 252)',
                    '$-success-color': 'rgb(56, 196, 130)'
                };
            }
        },
        mounted() {
            this.getVariable();
        },
        methods: {
            setCustumThemes() {
                const themeStorage = window.localStorage.getItem(kingDotCustomConfig);
                this.custumThemes = themeStorage ? JSON.parse(themeStorage) : [];
                this.custumThemes.forEach(item => {
                    item.variable = mergeConfig([], this.baseVariable, item.variable);
                });
            },
            setBaseVariable(variable) {
                this.baseVariable = variable;
                this.setCustumThemes();
            },
            getVariable() {
                let kingDotTheme = window.localStorage.getItem(kingDotThemeConfig);
                kingDotTheme = kingDotTheme && JSON.parse(kingDotTheme);
                if (kingDotTheme && kingDotTheme.version === kingdot.version) {
                    this.setBaseVariable(kingDotTheme.variable);
                    return Promise.resolve(kingDotTheme.variable);
                }
                this.$refs.progress.start();
                return this._request({
                    url: requstConfig.getVariable,
                    params: {
                        uuid: uuidv4()
                    }
                }).then((res) => {
                    if (res.body.status === 200) {
                        this.setBaseVariable(res.body.result);
                        window.localStorage.setItem(kingDotThemeConfig, JSON.stringify({
                            version: kingdot.version,
                            variable: res.body.result
                        }));
                        return res.body.result;
                    } else {
                        this.$message.error(res.body.message);
                    }
                }).catch(e => {
                    this.$message.error('获取主题变量失败');
                }).finally(() => {
                    this.$refs.progress.finish();
                });
            },
            editTheme(theme) {
                this.showEditTheme = true;
                this.currentEditorTheme = theme;
            },
            goback() {
                this.showEditTheme = false;
                this.setCustumThemes();
            },
            getVarColor(key, theme) {
                const common = theme && theme.find(item => item.name === 'common');
                const config = common && common.config.find(item => item.key === key);
                return config && config.value || this.defaultKeyColor[key];
            },
            hanleFileChange(file) {
                if (!file) {
                    return;
                }
                const type = file.type;
                if (type.indexOf('json') < 0) {
                    this.$message.error('请上传json格式文件');
                }
                const reader = new FileReader();
                reader.readAsText(file, 'UTF-8');
                reader.onload = (e) => {
                    let config = e.target.result;
                    try {
                        config = config && JSON.parse(config);
                    } catch (e) {
                        this.$message.error('文件解析失败');
                    }
                    if (config) {
                        let themeList = window.localStorage.getItem(kingDotCustomConfig);
                        const theme = {
                            uuid: uuidv4(),
                            time: Date.now(),
                            variable: config
                        };
                        themeList = themeList ? JSON.parse(themeList) : [];
                        themeList.push(theme);
                        if (themeList.length > 6) {
                            themeList = themeList.slice(-6);
                        }
                        window.localStorage.setItem(kingDotCustomConfig, JSON.stringify(themeList));
                        this.editTheme(theme);
                    }
                };
            }
        }
    };
</script>
<style lang="stylus" scoped type="text/stylus">
/*.custom-theme*/
    /*width 1200px*/
    /*margin 0 auto*/
.custom-theme-guid
    width 1200px
    margin 0 auto
    padding: 20px
.edit-theme-wrap
    padding 20px 340px 20px 190px
.custom-item-wrap
    display flex
    flex-direction row
    flex-wrap wrap
    .custom-item
        margin-right 16px
        margin-bottom 16px
.custom-item
    width 300px
    /*height 200px*/
    display flex
    flex-direction column
    /*background #F0F2F5*/
    position relative
    cursor pointer
    overflow hidden
    border-radius 4px
    .preview
        display flex
        flex-grow 1
        height 150px
        flex-direction row
        justify-content stretch
        position relative
        overflow hidden
        /*background #F0F2F5*/
        background #3678F1
        opacity 0.1
    .color-bg
        /*display flex*/
        /*flex-grow 1*/
        position absolute
        top 0
        width 150px
        height 150px
        /*border-radius 50% 50%*/
        /*background #3678F1*/
        &.bg1
            left -75px
        &.bg2
            left 0
        &.bg3
            left 75px
        &.bg4
            left 150px
    .info
        /*display flex*/
        /*flex-direction column*/
        /*justify-content center*/
        /*align-items center*/
        /*width 100%*/
        /*height 32px*/
        /*line-height 32px*/
        text-align center
        /*border-radius 50% 50% 50% 50%*/
        /*padding 10px*/
        /*background #fff*/
        /*opacity 0*/
        /*position absolute*/
        /*bottom 0*/
        /*left 0*/
        /*top 50%*/
        /*left 50%*/
        // transform translate(-50%, -50%)
        // transform-origin -5% -5%
        // transition all 0.5s
        position: absolute;
        top: 50%;
        left: 50%;
        color: #ffffff;
        transform: translate(-50%, -50%);
        font-size: 24px;
    .info-btn
        padding 0
    /*&:hover*/
        /*.info*/
            /*opacity 0.5*/
            // transform scale(1.6) translate(-50%, -50%)
.custom-item >>>
    .kd-upload
        width 100%
        height 150px
    .kd-upload-btn-wrap
        width 100%
        height 100%
    .kd-upload-add-icon
        width 100%
        height 100%
        line-height 150px
        box-sizing border-box
.goBack-btn
    padding 0
    font-size 16px
.goback-icon
    font-size 16px
    display inline-block
    transform-origin center center
    transform rotate(90deg)
    margin-right 10px
.title
    padding-top: 24px;
    padding-bottom: 16px;
</style>
