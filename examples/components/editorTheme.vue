<template>
    <div
            ref="editorThemeWrap"
            class="editor-theme-wrap flex-row"
    >
        <div class="preview-main">
            <div class="preview-wrap">
                <ComponentsPreview></ComponentsPreview>
            </div>
        </div>
        <div
                ref="editorVar"
                :class="{
                    'flex-col': true,
                    'editor-var': true,
                    'fixed': true
                }"
                :style="editorVarStyle"
        >
            <div class="flex-row-end mb-small">
                <kd-button
                        type="primary"
                        class="mr-mini"
                        :disabled="loadingTheme || uploading || gettingVariable"
                        @click="resetTheme"
                >重置</kd-button>
                <kd-button
                        type="primary"
                        class="mr-mini"
                        :loading="loadingTheme"
                        :disabled="uploading || gettingVariable"
                        @click="loadTheme()"
                >加载</kd-button>
                <kd-button
                        type="primary"
                        :loading="uploading"
                        :disabled="loadingTheme || gettingVariable"
                        @click="uploadTheme"
                >下载</kd-button>
            </div>

            <div class="flex-shrink">
                <kd-select
                        v-model="currentItem"
                        @change="currentSelectChange"
                >
                    <kd-option
                            v-for="item in componentVarList"
                            :key="item.name"
                            :value="item.name"
                    >{{ item.name }}</kd-option>
                </kd-select>
            </div>
            <div
                    v-if="selectedItem"
                    class="flex-grow"
            >
                <div
                        v-for="c in selectedItem.config"
                        :key="c.name"
                >
                    <div class="var-config-name">{{ c.name }}</div>
                    <div
                            v-if="c.type === 'color'"
                            class="flex-row"
                            @click="openColorpicker"
                    >
                        <kd-input
                                :value="c.value"
                                fluid
                                readonly
                                class="mr-mini"
                        ></kd-input>
                        <color-picker
                                ref="Colorpicker"
                                v-model="c.value"
                                @change="colorChange(c)"
                        ></color-picker>
                    </div>
                    <div v-else>
                        <kd-input
                                v-model="c.value"
                                fluid
                        ></kd-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueColorpicker } from 'vue-pop-colorpicker';
    import tinycolor from 'tinycolor2';
    import requstConfig from '../js/backInterfaceConfig.js';
    const uuidv4 = require('uuid/v4');
    import kingdot from '../../src/index.js';
    import ComponentsPreview from './components-preview.vue';
    export const kingDotKey = 'KINGDOT_THEME_VAR_CONFIG';
    import {throttle} from 'lodash';
    export default {
        name: 'ComponentDemo',
        components: {
            'color-picker': VueColorpicker,
            ComponentsPreview: ComponentsPreview
        },
        props: {
            themeUuid: {
                type: String
            }
        },
        data() {
            return {
                editorVarStyle: {},
                gettingVariable: false,
                uploading: false,
                loadingTheme: false,
                currentItem: 'common',
                componentVarList: [],
                version: kingdot.version,
                uuid: this.themeUuid || uuidv4()
            };
        },
        computed: {
            selectedItem() {
                return this.componentVarList.find(item => {
                    return item.name === this.currentItem;
                });
            },
            windowResizeFn() {
                return throttle(this.resizeFn, 50);
            }
        },
        watch: {
            themeUuid: {
                immediate: true,
                handler(v) {
                    let themeList, currentTheme;
                    if (v) {
                        themeList = window.localStorage.getItem(kingDotKey);
                        themeList = themeList ? JSON.parse(themeList) : [];
                        currentTheme = themeList.find(item => {
                            return item.uuid === this.themeUuid;
                        });
                    }
                    if (currentTheme) {
                        this.componentVarList = currentTheme.variable;
                        this.uuid = currentTheme.uuid;
                        this.version = currentTheme.version;
                        this.loadTheme();
                    } else {
                        this.componentVarList = [];
                        this.uuid = uuidv4();
                        this.version = kingdot.version;
                    }
                }
            },
            componentVarList: {
                deep: true,
                handler(v) {
                    let themeList = window.localStorage.getItem(kingDotKey);
                    themeList = themeList ? JSON.parse(themeList) : [];
                    const currentTheme = themeList && themeList.find(item => {
                        return item.uuid === this.uuid;
                    });
                    if (currentTheme) {
                        currentTheme.variable = v;
                    } else {
                        themeList.push({
                            uuid: this.uuid,
                            version: this.version,
                            variable: v
                        });
                        if (themeList.length > 7) {
                            themeList = themeList.slice(-7);
                        }
                    }
                    window.localStorage.setItem(kingDotKey, JSON.stringify(themeList));
                }
            }
        },
        created() {
            if (!this.themeUuid) {
                this.getVariable();
            }
        },
        mounted() {
            this.setEditorVarStyle();
            window.addEventListener('resize', this.windowResizeFn);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.windowResizeFn);
        },
        methods: {
            getVariable() {
                this.gettingVariable = true;
                this._request({
                    url: requstConfig.host + requstConfig.getVariable,
                    before(request) {
                        this.axiosCancel('getVariableACTF');
                        this.getVariableACTF = request;
                    },
                    params: {
                        version: this.version,
                        uuid: this.uuid
                    }
                }).then((res) => {
                    if (res.body.status === 200) {
                        this.componentVarList = res.body.result;
                    }
                    this.gettingVariable = false;
                }).catch(e => {
                    if (e.status == 0) {
                        // console.log(e);
                    } else {
                        this.gettingVariable = false;
                    }
                });
            },
            openColorpicker() {
                this.$refs.Colorpicker.showPicker = true;
            },
            colorChange(item) {
                item.value = tinycolor(item.value).toHexString();
            },
            currentSelectChange(item) {
                const els = Array.from(document.querySelectorAll('h4'));
                const selectElement = els.find((el) => {
                    return el.innerText.toLowerCase() === item.value;
                });
                if (selectElement) {
                    const top = selectElement.getBoundingClientRect().top;
                    window.scrollTo(0, window.pageYOffset + top - 90);
                }
            },
            uploadTheme() {
                this.uploading = true;
                this._request({
                    url: requstConfig.host + requstConfig.uploadTheme,
                    method: 'post',
                    data: {
                        version: this.version,
                        uuid: this.uuid,
                        vars: this.componentVarList
                    },
                    responseType: 'arraybuffer'
                }).then((res) => {
                    const blob = new Blob([res.body], {
                        type: 'application/zip'
                    });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'theme.zip';
                    link.click();
                }).catch(e => {
                    // console.log(e);
                }).finally(() => {
                    this.uploading = false;
                });
            },
            loadTheme(vars) {
                this.loadingTheme = true;
                this._request({
                    url: requstConfig.host + requstConfig.loadTheme,
                    method: 'post',
                    data: {
                        version: this.version,
                        uuid: this.uuid,
                        vars: vars || this.componentVarList
                    }
                }).then((res) => {
                    if (res.body.status === 200) {
                        // console.log(res.data.result);
                        const styleEl = document.createElement('style');
                        styleEl.textContent = res.data.result;
                        document.head.appendChild(styleEl);
                    }
                }).catch(e => {
                    // console.log(e);
                }).finally(() => {
                    this.loadingTheme = false;
                });
            },
            resetTheme() {
                this.getVariable();
                this.loadTheme([]);
            },
            setEditorVarStyle() {
                const wrapRect = this.$refs.editorThemeWrap.getBoundingClientRect();
                const rect = this.$refs.editorVar.getBoundingClientRect();
                const innerWidth = window.innerWidth;
                this.editorVarStyle = {
                    left: (innerWidth - wrapRect.width) / 2 + wrapRect.width - rect.width + 'px'
                };
            },
            resizeFn() {
                this.setEditorVarStyle();
            },
            axiosCancel(CancelProp) {
                if (!this[CancelProp]) return;
                if (Array.isArray(this[CancelProp])) {
                    this[CancelProp].forEach(fn => fn.abort());
                    this[CancelProp] = [];
                } else {
                    this[CancelProp].abort();
                    this[CancelProp] = null;
                }
            }
        }
    };
</script>
<style lang="stylus" scoped type="text/stylus">
.flex-row-end
    display flex
    flex-direction row
    justify-content flex-end
.flex-row
    display flex
    flex-direction row
.flex-col
    display flex
    flex-direction column
.flex-shrink
    flex-shrink 0
.flex-grow
    flex-grow 1
.mr-mini
    margin-right 10px
.mb-small
    margin-bottom 10px
.editor-theme-wrap
    display flex
    flex-direction row
    width 1200px
.preview-main

.preview-wrap
    height 100%
    overflow auto
.editor-var
    width 300px
    overflow auto
    padding 10px
    background #F7F8FA
    position fixed
    top 94px
    bottom 10px
.preview-main
    width 840px
.selected-item-name
    font-size 16px
.var-config-name
    margin 10px
</style>
