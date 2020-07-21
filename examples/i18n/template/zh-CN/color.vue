<template>
    <div class="article color-wrap">
        <h2>颜色</h2>
        <p>颜色作为一种感知性的设计语言，在表达设计目标时起到强化作用。因此在定义一系列色值的同时，更重要的是对他们在实际页面和情景中的使用方法进行标准化定义。</p>
        <div
                v-for="(it,idx) in colorData"
                :key="idx"
        >
            <h3>{{ it.title }}</h3>
            <p>{{ it.text }}</p>
            <div class="color-wrap-flex">
                <div
                        v-for="(item,index) in it.block"
                        :key="index"
                        class="wrap-flex-li"
                        :style="{'background':item.bg,'color':item.color}"
                >
                    <p>{{ item.text }}</p>
                    <p>{{ item.bg }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const blockData = [
        [{
            'text': 'Primary',
            'bg': '#557DFC'
        }],
        [
            {
                'text': 'Success',
                'bg': '#38C482'
            },
            {
                'text': 'Warning',
                'bg': '#FF9A42'
            },
            {
                'text': 'Danger',
                'bg': '#EF4E76'
            }
        ],
        [
            {
                'text': 'Title',
                'bg': '#262626'
            },
            {
                'text': 'Text',
                'bg': '#4c4c4c'
            },
            {
                'text': 'List Text',
                'bg': '#778088'
            },
            {
                'text': 'Help Text',
                'bg': '#737373'
            },
            {
                'text': 'Placeholder',
                'bg': '#B2B2B2'
            },
            {
                'text': 'Disable',
                'bg': '#CCCCCC'
            }
        ],
        [
            {
                'text': 'Content BG',
                'bg': '#F7FAFE',
                'color': '#4C4C4C'
            },
            {
                'text': 'Table Column BG',
                'bg': '#F3F6FB',
                'color': '#4C4C4C'
            },
            {
                'text': 'Input Content BG',
                'bg': '#F3F4F7',
                'color': '#4C4C4C'
            }
        ]
    ];
    import page from './../../config/page.json';
    export default {
        name: 'DesignColor',
        data() {
            return {
                colorData: [],
                blockData: blockData
            };
        },
        mounted() {
            const lang = page.find(item => {
                return item.lang === this.$route.meta.lang;
            });
            lang.page.color['3'].forEach((item, index) => {
                item.block = blockData[index];
            });
            this.colorData = lang.page.color['3'];
        }
    };
</script>

<style scoped ref="stylesheet/stylus" lang="stylus" type="text/stylus">
    .article
        padding 0 200px 40px 40px
        flex 1
        overflow auto
        h3:first-child
            margin 18px 0
        p
            margin 0
            line-height 20px
        .color-wrap-flex
            display flex
            justify-content flex-start
            flex-wrap wrap
            .wrap-flex-li
                width 235px
                height 70px
                background #ccc
                display flex
                flex-direction column
                justify-content center
                border-radius 5px
                margin 20px 20px 0 0
                color #f2f2f2
                p
                    padding-left 20px
                    line-height 26px
</style>
