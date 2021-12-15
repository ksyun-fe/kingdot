<template>
    <div class="demo-preview-wrap flex-row">
        <div class="flex-grow">
            <h4>Breadcrumb</h4>
            <div class="">
                <kd-breadcrumb separator="/">
                    <kd-breadcrumb-item>一级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>二级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
                </kd-breadcrumb>
                <kd-breadcrumb>
                    <kd-breadcrumb-item to="/">一级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item href="/">二级菜单</kd-breadcrumb-item>
                    <kd-breadcrumb-item>三级菜单</kd-breadcrumb-item>
                </kd-breadcrumb>
            </div>
            <h4>Button</h4>
            <div class="preview-demo">
                <kd-button>defult</kd-button>
                <kd-button type="primary">primary</kd-button>
                <kd-button type="success">Success</kd-button>
                <kd-button type="info">Info</kd-button>
                <kd-button type="warning">Warning</kd-button>
                <kd-button type="danger">Danger</kd-button>
                <kd-button type="none">文字按钮</kd-button>
            </div>
            <h4>Checkbox</h4>
            <div class="">
                <kd-checkbox>checkbox</kd-checkbox>
                <kd-checkbox disabled>checkbox</kd-checkbox>
            </div>
            <h4>Radio</h4>
            <div class="">
                <kd-radio>radio</kd-radio>
                <kd-radio disabled>radio</kd-radio>
            </div>
            <h4>Input</h4>
            <div class="input-area">
                <div>
                    <kd-input
                            v-model="inputVal"
                            placeholder="请输入内容"
                            length-limit
                    ></kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            placeholder="请输入内容"
                            :disabled="true"
                    ></kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            type="text"
                            clearable
                    ></kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            :type="inputType"
                    >
                        <template v-slot:suffix>
                            <i
                                    :class="iconClass"
                                    @click="switchType"
                            ></i>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="mini"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="small"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="default"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputUrl"
                            name="url"
                            size="large"
                    >
                        <template v-slot:prepend>
                            <span>http://</span>
                        </template>
                        <template v-slot:append>
                            <span>.com</span>
                        </template>
                    </kd-input>
                </div>
                <div>
                    <kd-input
                            v-model="inputVal"
                            type="textarea"
                            name="desc"
                            :rows="5"
                            width="300px"
                    ></kd-input>
                </div>
            </div>
            <h4>Progress</h4>
            <div class="progress-area">
                <kd-progress
                        type="line"
                        :percentage="0"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        color="#4fcc6f"
                />
                <kd-progress
                        type="line"
                        :percentage="30"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        status="error"
                        color="#EF4E76"
                />
                <kd-progress
                        type="line"
                        :percentage="30"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        status="warning"
                        color="#FF9A42"
                />
                <kd-progress
                        type="line"
                        :percentage="progressPercentage"
                        :format="formatPercentage"
                        color="#4fcc6f"
                        :showText="true"
                        :strokeWidth="20"
                />
                <kd-progress
                        type="line"
                        :percentage="progressPercentage"
                        color="#4fcc6f"
                        :status="progressStatus"
                        :showText="true"
                        :strokeWidth="20"
                />
                <kd-progress
                        type="circle"
                        :percentage="progressPercentage"
                        color="#4fcc6f"
                        :showText="true"
                        :progressTextSize="12"
                />
            </div>
            <h4>Switch</h4>
            <div>
                <kd-switch
                        v-model="switchVal"
                        size="default"
                ></kd-switch>
                <kd-switch
                        v-model="switchVal"
                        size="default"
                        disabled
                ></kd-switch>
                <kd-switch
                        v-model="switchVal"
                        active-text="开"
                        inactive-text="关"
                        font-size="14"
                ></kd-switch>
            </div>
            <h4>Upload</h4>
            <div>
                <kd-upload
                        :auto-upload="false"
                        tip="只能上传jpg/png文件，且不超过500kb"
                        accept=".png,.jpg"
                >
                    <kd-button>点击上传</kd-button>
                </kd-upload>
            </div>
            <div>
                <kd-upload
                        multiple
                        :file-change="handleFileChange"
                        :auto-upload="false"
                        :show-file-list="isFileList"
                >
                    <img
                            v-if="headImage"
                            :src="headImage"
                            class="kd-upload-head"
                    >
                    <i
                            v-else
                            class="kd-upload-add-icon kdicon kd-icon-plus"
                    ></i>
                </kd-upload>
            </div>
            <div>
                <kd-upload
                        multiple
                        tip="只能上传jpg/png文件，且不超过500kb"
                        :auto-upload="false"
                        drag
                >
                </kd-upload>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ComponentPreview',
        data() {
            return {
                isFileList: false,
                headImage: '',
                inputType: 'password',
                inputVal: 'Kingdot',
                inputUrl: 'kingdot',
                switchVal: false,
                progressPercentage: 0,
                progressStatus: ''
            };
        },
        computed: {
            iconClass() {
                return this.inputType === 'password' ? 'kd-icon-view' : 'kd-icon-hide';
            }
        },
        watch: {

        },
        created() {

        },
        mounted() {
            const interval = setInterval(() => {
                this.progressPercentage++;
                if (this.progressPercentage === 100) {
                    clearInterval(interval);
                    this.progressStatus = 'success';
                }
            }, 60);
        },
        methods: {
            formatPercentage(percentage) {
                return percentage === 100 ? 'fulfill' : `${percentage}%`;
            },
            switchType() {
                this.inputType = this.inputType === 'password' ? 'text' : 'password';
            },
            handleFileChange(file) {
                const isImage = file.type.indexOf('image') > -1;
                const isSize = file.size / 1024 / 1024 < 3;
                if (!isImage) {
                    this.$message.error('上传图片只能是 image 格式!');
                }
                if (!isSize) {
                    this.$message.error('上传图片不能超过3MB!');
                }
                const rules = isImage && isSize;
                if (rules) {
                    this.headImage = URL.createObjectURL(file);
                }
                return rules;
            }
        }
    };
</script>
<style lang="stylus" scoped>
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
.editor-theme-wrap
    display flex
    flex-direction row
.editor-var
    width 300px
.demo-preview-wrap >>>
    .kd-btn, .kd-checkbox, .kd-radio, .kd-switch
        margin-right 10px
.input-area, .progress-area
    max-width 500px
    & > div
        margin-bottom 10px
</style>
