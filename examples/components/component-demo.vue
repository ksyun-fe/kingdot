<template>
    <section
            class="demo"
            @mouseenter="sectionMouseenter"
            @mouseleave="sectionMouseleave"
    >
        <div class="demo-exhibition">
            <slot name="demo"></slot>
        </div>
        <div class="demo-title">
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="demo-description">
                <slot name="description"></slot>
            </div>
        </div>
        <div
                ref="code"
                class="demo-code"
        >
            <div ref="codeContent">
                <slot name="code"></slot>
            </div>

        </div>
        <div
                class="code-toggle"
                @click="toggleShowCode"
        >
            <i
                    :class="{
                        active: sectionHover,
                        'open': showCode,
                        'arrow-icon': true
                    }"
            ></i>
            <transition name="fade">
                <span v-show="sectionHover"> {{ showCode ? '隐藏代码' : '显示代码' }}</span>
            </transition>
        </div>
        <slot></slot>
    </section>
</template>

<script>
    export default {
        name: 'ComponentDemo',
        data() {
            return {
                showCode: false,
                sectionHover: false
            };
        },
        watch: {
            showCode(v) {
                let codeContentRects;
                if (!v) {
                    this.$refs.code.style.height = '0px';
                } else {
                    codeContentRects = this.$refs.codeContent.getClientRects()[0];
                    this.$refs.code.style.height = codeContentRects.height + 'px';
                }
                setTimeout(() => {
                }, 300);
            }
        },
        methods: {
            sectionMouseenter() {
                this.sectionHover = true;
            },
            sectionMouseleave() {
                this.sectionHover = false;
            },
            toggleShowCode() {
                this.showCode = !this.showCode;
            }
        }
    };
</script>
<style lang="stylus" scoped type="text/stylus">
    body.dark
        .demo
            background #252D45
            border none
        .demo-title
            border-bottom 1px solid #2F374F
            border-top 1px solid #2F374F
            .title
                background #222A41
        .demo-description
            code
                color #8D919B;
                border 1px solid #2F374F
                background #252D45
        .demo-code
            .hljs
                background #252D45
        .code-toggle
            border-top 1px solid #2F374F
            &:hover
                color #8D919B
                background #2D354D
        .arrow-icon
            &:after
                border-top 8px solid #737D99
    .demo
        margin-bottom: 20px;
        background: #fff;
        border 1px solid #ebebeb

    .demo-exhibition
        padding 30px

    .demo-title
        padding: 15px 5px;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
        position: relative;

        .title
            position absolute
            top -11px
            left 15px
            background #fff
            padding 0 10px
            font-size 16px

    .demo-description
        padding 10px 20px
        font-size 12px
        code
            display inline-block
            vertical-align 2px
            background #F7FAFE
            margin 0 3px
            padding 0px 5px
            border-radius 3px
            color #666
            border 1px solid #E5E5E5
            line-height 20px

    .demo-code
        background #bbb
        transition all 0.3s
        height 0
        line-height 0
        overflow hidden

        &.hide
            border-top none

    .code-toggle
        border-top 1px solid #eee
        display flex
        flex-direction row
        justify-content center
        align-items center
        position relative
        height 44px
        opacity 0.5
        cursor pointer

        &:hover
            opacity 1
            color #0a5eee
            background #fafafa

    .arrow-icon
        position absolute
        width 12px
        height 8px
        transition all .3s
        margin-right 16px
        left 50%
        top 18px
        &:after
            border 6px solid transparent
            border-top 8px solid #557dfc
            width 0
            height 0
            position absolute
            content ' '
            transition all .3s
            transform-origin center 25%

        &.active
            transform translateX(-54px)

        &.open:after
            transform rotate(180deg)

    .fade-enter-active, .fade-leave-active
        transition all .3s

    .fade-enter, .fade-leave-to
        opacity 0
        transform translateX(20px)

</style>
