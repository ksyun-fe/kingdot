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
                            <div class="preview"></div>
                            <div
                                    class="color-bg bg4"
                                    :style="{background: getVarColor('$-border-base-color', baseVariable)}"
                            ></div>
                            <div
                                    class="color-bg bg3"
                                    :style="{background: getVarColor('$-text-light-color', baseVariable)}"
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
                                    :style="{background: getVarColor('$-text-light-color', item.variable)}"
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
    import { kingDotKey, mergeConfig } from 'examples/components/editorTheme.vue';
    import requstConfig from '../../../js/backInterfaceConfig';
    const uuidv4 = require('uuid/v4');
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
                    '$-border-base-color': '#3678F1',
                    '$-text-light-color': '#528EFF',
                    '$-primary-color': '#9EC6FF',
                    '$-success-color': '#C4DFFF'
                };
            }
        },
        created() {
            const themeStorage = window.localStorage.getItem(kingDotKey);
            this.custumThemes = themeStorage ? JSON.parse(themeStorage) : [];
            this.getVariable();
        },
        methods: {
            getVariable() {
                return this._request({
                    url: requstConfig.host + requstConfig.getVariable,
                    params: {
                        uuid: uuidv4()
                    }
                }).then((res) => {
                    if (res.body.status === 200) {
                        this.baseVariable = res.body.result;
                        this.custumThemes.forEach(item => {
                            item.variable = mergeConfig([], res.body.result, item.variable);
                        });
                        return res.body.result;
                    } else {
                        this.$message.error(res.body.message);
                    }
                }).catch(e => {
                    if (e.status == 0) {
                        // console.log(e);
                    }
                });
            },
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
                // return this.defaultKeyColor[key];
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
                        let themeList = window.localStorage.getItem(kingDotKey);
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
                        window.localStorage.setItem(kingDotKey, JSON.stringify(themeList));
                        this.editTheme(theme);
                    }
                };
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
    /*height 200px*/
    display flex
    flex-direction column
    margin-right 10px
    margin-bottom 10px
    /*background #F0F2F5*/
    position relative
    cursor pointer
    overflow hidden
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
        border-radius 50% 50%
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
        width 100%
        height 32px
        line-height 32px
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
</style>
