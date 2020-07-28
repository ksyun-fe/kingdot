<template>
    <div
            id="container"
            class="container"
    >
        <div class="panel">
            <h1>King Dot</h1>
            <p class="desc">
                The design system serving the enterprise level products, based on the modular solution of the determined and natural design values, enables designers and developers to focus on better user experience design
            </p>
            <div class="button-wrapper">
                <router-link
                        :to="componentRouter"
                        tag="button"
                        exact
                >get start</router-link>
                <button>Github</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                componentRouter: ''
            };
        },
        created() {
            this.componentRouter = '/' + this.$route.meta.lang + '/component';
        }
    };
</script>
<style scoped ref="stylesheet/stylus" lang="stylus" type="text/stylus">
    .container
        height: 100%
        text-align center
        .panel
            position relative
            top 50%
            margin 0 auto
            padding 0 58px
            height: 398px
            margin-top -(@height / 2)
            background-color: #fff
            box-shadow: 0 0 15px 0 rgba(0,0,0,0.15)
            border-radius: 4px
            h1
                position relative
                padding 68px 0 24px 0
                font-size: 42px
                color: #353535
                &:after
                    content ''
                    position absolute
                    bottom 0
                    left calc(50% - 23px)
                    width: 46px
                    height: 4px
                    background-color #557DFC
            .desc
                margin 40px auto 0
                width: 442px
                font-size 14px
                line-height: 32px
                color: #353535
            .button-wrapper
                position absolute
                left 163px
                right 163px
                bottom 58px
                display flex
                justify-content space-between
                button
                    box-sizing border-box
                    width: 104px
                    height: 40px
                    font-size 14px
                    border 1px solid #557DFC
                    background-color: #fff
                    border-radius 40px
                    &.active, &:nth-of-type(1)
                        color #fff
                        background-color: #557DFC
    @media (max-width: 780px)
        .container
            .panel
                padding 20px
                height 348px
                h1
                    margin 16px 0
                    padding 0 0 16px 0
                .desc
                    margin 26px auto 0
                    width 320px
                .button-wrapper
                    margin 0
                    left 20px
                    right 20px
                    bottom 30px
                    justify-content space-around
</style>
