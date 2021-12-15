<template>
    <div class="demo-preview-wrap flex-row">
        <div class="flex-grow">
            <h4>Button</h4>
            <div class="preview-demo">
                <kd-button>defult</kd-button>
                <kd-button type="primary">primary</kd-button>
                <kd-button type="success">Success</kd-button>
                <kd-button type="info">Info</kd-button>
                <kd-button type="warning">Warning</kd-button>
                <kd-button type="danger">Danger</kd-button>
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
                progressStatus: ''
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
    .kd-btn, .kd-checkbox, .kd-radio, .kd-switch
        margin-right 10px
.progress-area
    max-width 500px
    & > div
        margin-bottom 10px
</style>
