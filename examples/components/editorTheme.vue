<template>
    <div class="editor-theme-wrap flex-row">
        <div class="flex-grow">
            <ComponentsPreview></ComponentsPreview>
        </div>
        <div class="flex-col editor-var">
            <div class="flex-row-end mb-small">
                <kd-button
                        type="primary"
                        class="mr-mini"
                        :disabled="loadingTheme || uploading"
                        @click="resetTheme"
                >重置</kd-button>
                <kd-button
                        type="primary"
                        class="mr-mini"
                        :loading="loadingTheme"
                        :disabled="uploading"
                        @click="loadTheme"
                >加载</kd-button>
                <kd-button
                        type="primary"
                        :loading="uploading"
                        :disabled="loadingTheme"
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
                    <div>{{ c.name }}</div>
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
    const kingDotKey = 'KINGDOT_THEME_VAR_CONFIG';
    export default {
        name: 'ComponentDemo',
        components: {
            'color-picker': VueColorpicker,
            ComponentsPreview: ComponentsPreview
        },
        props: {

        },
        data() {
            return {
                uploading: false,
                loadingTheme: false,
                currentItem: 'button',
                color: '#ff0',
                componentVarList: [],
                uuid: localStorage.getItem('kingDotKey') && localStorage.getItem('kingDotKey').uuid || uuidv4()
            };
        },
        computed: {
            selectedItem() {
                return this.componentVarList.find(item => {
                    return item.name === this.currentItem;
                });
            }
        },
        watch: {

        },
        created() {
            this.getVariable();
        },
        methods: {
            getVariable() {
                this._request({
                    url: requstConfig.host + requstConfig.getVariable,
                    params: {
                        version: kingdot.version,
                        uuid: this.uuid
                    }
                }).then((res) => {
                    if (res.body.status === 200) {
                        this.componentVarList = res.body.result;
                        window.localStorage.setItem(kingDotKey, {
                            uuid: this.uuid,
                            version: kingdot.version,
                            variable: res.body.result
                        });
                    }
                }).catch(e => {
                    // console.log(e);
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
                        version: kingdot.version,
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
                        version: kingdot.version,
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
                const config = window.localStorage.getItem(kingDotKey);
                if (config && config.version === kingdot.version) {
                    this.componentVarList = config.variable;
                } else {
                    this.getVariable();
                }
                this.loadTheme([]);
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
.editor-var
    width 300px
    position fixed
    top 90px
    bottom 10px
    right 0
    overflow auto
    padding 10px
    background #F2F6FC
.selected-item-name
    font-size 16px
</style>
