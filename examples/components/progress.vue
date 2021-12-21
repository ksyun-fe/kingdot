<template>
    <div
            :class="{
                progress: true,
                show: show,
                success: success
            }"
            :style="{
                'width': percent+'%'
            }"
    ></div>
</template>
<script>
    export default {
        data() {
            return {
                percent: 0,
                show: false,
                success: true
            };
        },
        methods: {
            start() {
                const cut = 10000 / Math.floor(3000);
                this.show = true;
                this.success = true;
                this.percent = 0;
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = setInterval(() => {
                    this.percent = this.percent + Math.floor(cut * Math.random());
                    if (this.percent >= 90) {
                        this.percent = 90;
                    }
                }, 100);
            },
            finish() {
                this.percent = 100;
                this.hide();
            },
            hide() {
                clearInterval(this.timer);
                this.timer = null;
                setTimeout(() => {
                    this.show = false;
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.percent = 0;
                        }, 300);
                    });
                }, 500);
            },
            fail() {
                this.success = false;
            }
        }
    };
</script>
<style lang="stylus" scoped type="text/stylus">
.progress
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 2px;
    width: 0%;
    /*background-color: #ececec;*/
    transition: width 0.3s, opacity 0.5s;
    opacity: 0;
    z-index: 99999;
    display: none;
    &.show
        display: block;
        opacity: 1;
    &.success
        background-color: rgb(79, 204, 111);
</style>
