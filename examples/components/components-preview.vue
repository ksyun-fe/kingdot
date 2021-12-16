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
                <div class="button-section">
                    <kd-button>defult</kd-button>
                    <kd-button type="primary">primary</kd-button>
                    <kd-button type="success">Success</kd-button>
                    <kd-button type="warning">Warning</kd-button>
                    <kd-button type="danger">Danger</kd-button>
                    <kd-button type="none">文字按钮</kd-button>
                    <kd-button type="text">链接按钮</kd-button>
                    <kd-button
                            type="dashed"
                            clickDelay
                    >默认按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button hollow>空心按钮</kd-button>
                    <kd-button
                            type="primary"
                            hollow
                    >主要按钮</kd-button>
                    <kd-button
                            type="success"
                            hollow
                    >成功按钮</kd-button>
                    <kd-button
                            type="warning"
                            hollow
                    >警告按钮</kd-button>
                    <kd-button
                            type="danger"
                            hollow
                    >危险按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            disabled
                    >禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="dashed"
                    >默认禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="primary"
                    >主要禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="text"
                    >text禁用按钮</kd-button>
                    <kd-button
                            disabled
                            type="none"
                    >none禁用按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            loading
                    ></kd-button>
                    <kd-button
                            type="primary"
                            loading
                    >加载中</kd-button>
                    <kd-button
                            type="primary"
                            icon="kd-icon-more"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            icon="kd-icon-plus"
                    >图标在前</kd-button>
                    <kd-button type="danger">图标在后<i class="kd-icon-right kd-icon-more"></i></kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            shape="round"
                    >按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            size="large"
                    >大按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="small"
                    >小按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="mini"
                    >mini按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            size="large"
                            shape="round"
                    >大按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="small"
                            shape="round"
                    >小按钮</kd-button>
                    <kd-button
                            type="primary"
                            size="mini"
                            shape="round"
                    >mini按钮</kd-button>
                </div>
                <div class="button-section">
                    <kd-button
                            type="primary"
                            size="large"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            size="small"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                    <kd-button
                            type="primary"
                            size="mini"
                            icon="kd-icon-arrow-right"
                            shape="circle"
                    ></kd-button>
                </div>
                <div class="button-section">
                    <kd-button-group
                            v-model="checkboxValue"
                            checkType="checkbox"
                            :disabled="disabled"
                    >
                        <kd-button value="1">按钮1</kd-button>
                        <kd-button value="2">按钮2</kd-button>
                        <kd-button value="3">按钮3</kd-button>
                    </kd-button-group>
                </div>
                <div class="button-section">
                    <kd-button-group>
                        <kd-button type="primary">按钮1</kd-button>
                        <kd-button
                                type="primary"
                                icon="iconmoren_xinzeng"
                        >按钮2</kd-button>
                        <kd-button
                                type="primary"
                                icon="iconmoren_xinzeng"
                        >按钮3</kd-button>
                    </kd-button-group>
                </div>
            </div>
            <h4>Checkbox</h4>
            <div class="">
                <kd-checkbox>checkbox</kd-checkbox>
                <kd-checkbox disabled>checkbox</kd-checkbox>
            </div>
            <h4>Dialog</h4>
            <div class="dialog-section">
                <kd-button @click="openDialog">点击打开默认Dialog</kd-button>
                <kd-button @click="openMessageDialog">提示信息Dialog</kd-button>
                <kd-button @click="openMessageConfirmDialog">二次确认Dialog</kd-button>
                <kd-dialog
                        v-model="showDialog"
                        :disableOk="disableOk"
                        :ok="OK"
                        width="800"
                        height="800"
                >

                </kd-dialog>
                <kd-dialog
                        v-model="showMessageDialog"
                        type="tips"
                        :showTitle="false"
                        icon="success"
                        tipsTitle="操作成功"
                        :tipsMessage="additionalTips"
                        :tipsIsCenter="true"
                ></kd-dialog>
                <kd-dialog
                        v-model="showConfirmDialog"
                        type="confirm"
                        :showTitle="false"
                        icon="failed"
                        :confirmTips="confirmTips"
                        :confirmTitle="confirmTitle"
                >
                </kd-dialog>
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
            <h4>Steps</h4>
            <div class="steps-section">
                <kd-steps
                        v-model="stepIndex1"
                        type="spot"
                        :isClick="true"
                >
                    <kd-step title="步骤一"></kd-step>
                    <kd-step title="步骤二"></kd-step>
                    <kd-step title="步骤三"></kd-step>
                    <kd-step title="完成"></kd-step>
                </kd-steps>
                <kd-steps
                        v-model="stepIndex1"
                        size="small"
                >
                    <kd-step title="步骤一"></kd-step>
                    <kd-step title="步骤二"></kd-step>
                    <kd-step title="步骤三"></kd-step>
                    <kd-step title="完成完成完成完成"></kd-step>
                </kd-steps>
                <kd-steps v-model="stepIndex1">
                    <kd-step
                            title=""
                            :description="description"
                    ></kd-step>
                    <kd-step
                            title=""
                            :description="description"
                    ></kd-step>
                    <kd-step
                            title="步骤三"
                            :description="description"
                    ></kd-step>
                    <kd-step
                            title="完成"
                            :description="description"
                    ></kd-step>
                </kd-steps>
                <kd-steps v-model="stepIndex1">
                    <kd-step
                            title="步骤一"
                            icon="kd-icon-upload-file"
                    ></kd-step>
                    <kd-step
                            title="步骤二"
                            icon="kd-icon-menu-more"
                    ></kd-step>
                    <kd-step
                            title="步骤三"
                            icon="kd-icon-success-circle"
                    ></kd-step>
                </kd-steps>
                <kd-steps
                        v-model="stepIndex1"
                        type="simple"
                >
                    <kd-step title="步骤一"></kd-step>
                    <kd-step title="步骤二"></kd-step>
                    <kd-step title="步骤三"></kd-step>
                </kd-steps>
                <kd-steps
                        v-model="stepIndex1"
                        finishStatus="finished"
                >
                    <kd-step
                            title="步骤一"
                            status="wait"
                    ></kd-step>
                    <kd-step
                            title="步骤二"
                            status="error"
                    ></kd-step>
                    <kd-step
                            title="步骤三"
                            status="active"
                    ></kd-step>
                    <kd-step title="完成完成完成完成"></kd-step>
                </kd-steps>
                <div style="height:300px;">
                    <kd-steps
                            v-model="stepIndex1"
                            style="margin-bottom:40px"
                            direction="vertical"
                    >
                        <kd-step title="步骤一"></kd-step>
                        <kd-step title="步骤二"></kd-step>
                        <kd-step
                                title=""
                                :description="description"
                        ></kd-step>
                    </kd-steps>
                </div>
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
            <h4>Slider</h4>
            <div style="width:800px;">
                <kd-slider
                        v-model="slider1"
                        showEnd
                ></kd-slider>
                <kd-slider
                        v-model="slider1"
                        showEnd
                        showStop
                ></kd-slider>
                <kd-slider
                        v-model="slider1"
                        showEnd
                        disabled
                ></kd-slider>
                <kd-slider
                        v-model="slider2"
                        range
                        showInput
                        showEnd
                        always
                ></kd-slider>
                <kd-slider
                        :min="1"
                        :max="12"
                        :value="3"
                        :marks="marks"
                ></kd-slider>
            </div>
            <h4>Select</h4>
            <div>
                <kd-select
                        v-model="select1"
                        placeholder="请选择内容"
                        filterable
                >
                    <kd-option value="">空数据</kd-option>
                    <kd-option
                            v-for="item in options"
                            :key="item.value"
                            :title="item.label"
                            :value="item.value"
                    >{{ item.label }}</kd-option>
                </kd-select>
            </div>
            <h4>Tree</h4>
            <kd-tree
                    ref="tree1"
                    :canDeleteRoot="true"
                    :data="treeData1"
                    :draggable="draggable"
                    :halfcheck="halfcheck"
                    :checkbox="checkbox"
                    :radio="radio"
                    selectAlone
                    :showLine="showLine"
                    :expandedKeys="expandedKeys"
                    :checkedKeys="checkedKeys"
                    :chkDisabledKeys="['node-1-1']"
                    :nocheckKeys="['node-1-1-2']"
                    @node-click="nodeClick"
            >
                <span>
                    ??? <kd-button size="mini">test</kd-button>
                </span>
            </kd-tree>
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
                progressStatus: '',
                checkboxValue: [1],
                disabled: true,
                stepIndex1: 2,
                description: 'description',
                showDialog: false,
                disableOk: true,
                showMessageDialog: false,
                confirmTitle: '二次确认标题',
                confirmTips: '还可以自定义底部哟！！！',
                showConfirmDialog: false,
                additionalTips: '附加提示。此成功提示出现在一系列任务之后，比如在弹窗中操作了分步表单任务，完成最后一步后提示。简单的弹窗任务直接使用 Message 提示。',
                // slider
                slider1: 10,
                slider2: [10, 80],
                marks: {
                    '1': '1',
                    '2': '2',
                    '3': '3',
                    '4': '4',
                    '5': '5',
                    '6': '6月',
                    '7': '7',
                    '8': '8',
                    '9': '9',
                    '10': '1年',
                    '11': '2年',
                    '12': '3年'
                },
                // select
                select1: 'item1',
                options: [
                    { value: 'item1', label: 'item option 1item option 1item option 1item option 1item option 1' },
                    { value: 'item2', label: 'item option 2'},
                    { value: 'item3', label: 'item option 3' }
                ],
                // tree
                showLine: false,
                checkbox: true,
                draggable: true,
                halfcheck: true,
                radio: true,
                search: '',
                expandedKeys: ['node1'],
                checkedKeys: ['node-1-1-1', 'node-1-1-3'],
                treeData1: [
                    {
                        title: 'Node1',
                        // expanded: true,
                        selDisabled: true,
                        id: 'node1',
                        children: [
                            {
                                title: 'Node 1-1',
                                id: 'node-1-1',
                                // expanded: true,
                                children: [
                                    { title: 'Node 1-1-1', id: 'node-1-1-1' },
                                    { title: 'Node 1-1-2', id: 'node-1-1-2' },
                                    { title: 'Node 1-1-3', id: 'node-1-1-3' }
                                ]
                            },
                            {
                                title: 'Node 1-2',
                                id: 'node-1-2',
                                children: [
                                    { title: 'Node 1-2-1', id: 'node-1-2-1' },
                                    { title: 'Node 1-2-2', id: 'node-1-2-2' }
                                ]
                            }
                        ]
                    },
                    {
                        title: 'Node 2',
                        id: 'node-2',
                        children: [
                            { title: 'Node 2-1-1', id: 'node-2-1-1' },
                            { title: 'Node 2-1-2', id: 'node-2-1-2' }
                        ]
                    }
                ]
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
            },
            // Dialog
            openDialog() {
                this.showDialog = true;
            },
            OK(dialog) {
                dialog.showLoading();
                this.num++;
                setTimeout(function () {
                    dialog.hideLoading();
                }, 2000);
            },
            openMessageDialog() {
                this.showMessageDialog = true;
            },
            openMessageConfirmDialog() {
                this.showConfirmDialog = true;
            },
            nodeClick() {
                this.$message.success('node-click');
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
    .kd-checkbox, .kd-radio, .kd-switch
        margin-right 10px
.input-area, .progress-area
    max-width 500px
    & > div
        margin-bottom 10px
.button-section
    .kd-btn+.kd-btn
        margin-left 10px
    .kd-btn-group
        .kd-btn
            margin-left -1px
    margin-bottom 10px
    height: 45px
.steps-section
    width calc(100% - 310px)
.dialog-section
    .kd-btn
        margin-right 10px
</style>
