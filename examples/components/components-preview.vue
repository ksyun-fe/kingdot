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
            <h4>Radio</h4>
            <div class="">
                <kd-radio>radio</kd-radio>
                <kd-radio disabled>radio</kd-radio>
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
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ComponentPreview',
        data() {
            return {
                switchVal: false,
                progressPercentage: 0,
                progressStatus: '',
                checkboxValue: [1],
                disabled: true,
                stepIndex1: 2,
                description: 'description'
            };
        },
        computed: {

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
.progress-area
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
</style>
