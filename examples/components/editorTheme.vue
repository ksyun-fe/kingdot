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
            <div class="flex-row-end mb-small btn-wrap">
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
            <div class="config-wrap">
                <div class="flex-shrink">
                    <kd-select
                            v-model="currentItem"
                            fluid
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
                                    @change="varChange(c, ...arguments)"
                            ></kd-input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Progress ref="progress"></Progress>
    </div>
</template>

<script>
    import { VueColorpicker } from 'vue-pop-colorpicker';
    import tinycolor from 'tinycolor2';
    import requstConfig from '../js/backInterfaceConfig.js';
    const uuidv4 = require('uuid/v4');
    import kingdot from '../../src/index.js';
    import ComponentsPreview from './components-preview.vue';
    import Progress from './progress.vue';
    export const kingDotKey = 'KINGDOT_THEME_VAR_CONFIG';
    import {throttle, cloneDeep} from 'lodash';
    export const mergeConfig = (...res) => {
        const arg1 = cloneDeep(res[0]);
        const args = res.slice(1);
        const arg1Obj = arg1.reduce((obj, item) => {
            obj[item.name] = {
                configObj: item.config.reduce((obj, item) => {
                    obj[item.key] = item;
                    return obj;
                }, {}),
                item
            };
            return obj;
        }, {});
        args.forEach(arg => {
            arg.forEach(cItem => {
                if (arg1Obj[cItem.name]) {
                    cItem.config.forEach(config => {
                        const cloneConfig = cloneDeep(config);

                        if (arg1Obj[cItem.name].configObj[cloneConfig.key]) {
                            arg1Obj[cItem.name].configObj[cloneConfig.key].value = cloneConfig.value;
                        } else {
                            arg1Obj[cItem.name].configObj[cloneConfig.key] = cloneConfig;
                            arg1Obj[cItem.name].item.config.push(cloneConfig);
                        }
                    });
                } else {
                    const cloneItem = cloneDeep(cItem);
                    arg1Obj[cloneItem.name] = {
                        configObj: cloneItem.config.reduce((obj, item) => {
                            obj[item.key] = item;
                            return obj;
                        }, {}),
                        item: cloneItem
                    };
                    arg1.push(cloneItem);
                }
            });
        });
        return arg1;
    };
    export default {
        name: 'ComponentDemo',
        components: {
            'color-picker': VueColorpicker,
            Progress,
            ComponentsPreview: ComponentsPreview
        },
        props: {
            themeUuid: {
                type: String
            }
        },
        data() {
            return {
                currentTheme: null,
                editorVarStyle: {},
                gettingVariable: false,
                uploading: false,
                loadingTheme: false,
                currentItem: 'common',
                componentVarList: [],
                changedVars: [],
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
            changedVars: {
                deep: true,
                handler(v) {
                    let themeList = window.localStorage.getItem(kingDotKey);
                    themeList = themeList ? JSON.parse(themeList) : [];
                    const currentTheme = themeList && themeList.find(item => {
                        return item.uuid === this.uuid;
                    });
                    if (currentTheme) {
                        currentTheme.variable = v;
                        currentTheme.time = Date.now();
                    } else {
                        themeList.push({
                            uuid: this.uuid,
                            version: this.version,
                            time: Date.now(),
                            variable: v
                        });
                        if (themeList.length > 6) {
                            themeList = themeList.slice(-6);
                        }
                    }
                    window.localStorage.setItem(kingDotKey, JSON.stringify(themeList));
                }
            }
        },
        mounted() {
            this.setEditorVarStyle();
            window.addEventListener('resize', this.windowResizeFn);
            this.initTheme();
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.windowResizeFn);
        },
        methods: {
            initTheme(v) {
                let themeList, currentTheme;
                if (v) {
                    themeList = window.localStorage.getItem(kingDotKey);
                    themeList = themeList ? JSON.parse(themeList) : [];
                    currentTheme = themeList.find(item => {
                        return item.uuid === this.themeUuid;
                    });
                }
                this.currentTheme = currentTheme;
                this.getVariable().then(data => {
                    if (!data) {
                        return;
                    }
                    if (this.currentTheme) {
                        this.loadTheme();
                    }
                });
            },
            getVariable(reset) {
                this.gettingVariable = true;
                this.$refs.progress.start();
                return this._request({
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
                        if (this.currentTheme && !reset) {
                            this.changedVars = this.currentTheme ? this.currentTheme.variable : [];
                            this.version = this.currentTheme.version;
                        } else {
                            this.changedVars = [];
                            this.version = kingdot.version;
                        }
                        this.componentVarList = mergeConfig([], res.body.result, this.changedVars);
                        this.gettingVariable = false;
                        this.$refs.progress.finish();
                        return res.body.result;
                    } else {
                        this.$message.error(res.body.message);
                        this.gettingVariable = false;
                        this.$refs.progress.fail();
                        this.$refs.progress.hide();
                    }
                }).catch(e => {
                    if (e.status == 0) {
                        // console.log(e);
                    } else {
                        this.gettingVariable = false;
                        this.$refs.progress.fail();
                        this.$refs.progress.hide();
                    }
                });
            },
            openColorpicker() {
                this.$refs.Colorpicker.showPicker = true;
            },
            colorChange(item) {
                item.value = tinycolor(item.value).toHexString();
                this.varChange(item, item.value);
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
                this.$refs.progress.start();
                this._request({
                    url: requstConfig.host + requstConfig.uploadTheme,
                    method: 'post',
                    data: {
                        version: this.version,
                        uuid: this.uuid,
                        vars: this.changedVars
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
                    this.$refs.progress.finish();
                });
            },
            loadTheme(vars) {
                this.loadingTheme = true;
                this.$refs.progress.start();
                this._request({
                    url: requstConfig.host + requstConfig.loadTheme,
                    method: 'post',
                    before(request) {
                        this.axiosCancel('loadThemeACTF');
                        this.loadThemeACTF = request;
                    },
                    data: {
                        version: this.version,
                        uuid: this.uuid,
                        vars: vars || this.changedVars
                    }
                }).then((res) => {
                    if (res.body.status === 200) {
                        // console.log(res.data.result);
                        const styleEl = document.createElement('style');
                        styleEl.textContent = res.data.result;
                        document.head.appendChild(styleEl);
                    }
                    this.loadingTheme = false;
                    this.$refs.progress.finish();
                }).catch(e => {
                    if (e.status == 0) {
                        // console.log(e);
                    } else {
                        this.loadingTheme = false;
                        this.$refs.progress.fail();
                        this.$refs.progress.hide();
                    }
                });
            },
            resetTheme() {
                this.getVariable(true);
                this.loadTheme([]);
            },
            varChange(item, value) {
                const component = this.changedVars.find(i => {
                    return i.name === this.selectedItem.name;
                });
                if (component) {
                    const configItem = component.config.find(i => i.key === item.key);
                    if (configItem) {
                        configItem.value = value;
                    } else {
                        component.config.push({...item});
                    }
                } else {
                    this.changedVars.push({
                        ...this.selectedItem,
                        config: [{...item}]
                    });
                }
                this.loadTheme();
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
    /*padding 10px*/
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
.btn-wrap
    position absolute
    padding-top 10px
    top 0
    left: 0
    right 16px
    z-index 1
    background #F7F8FA
.config-wrap
    padding 10px
    height 100%
    overflow auto
    padding-top 52px
</style>
