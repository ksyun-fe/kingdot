<template>
    <div
            ref="kdDropdown"
            :class="{
                'kd-select-dropdown': true,
                'kd-select-optimize': optimizeScroll
            }"
            :style="{ width:defaultWidth }"
            @scroll="scroll"
    >
        <div
                v-if="optimizeScroll"
                class="kd-select-phantom"
                :style="{ height: listHeight + 'px' }"
        ></div>
        <ul
                ref="kdDropdownContent"
                :class="{
                    'kd-select-lists': optimizeScroll
                }"
                :style="{ transform: getTransform }"
        >
            <slot><li class="kd-select-no-data">无数据</li></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'KdSelectDropdown',
        props: {
            // eslint-disable-next-line vue/require-prop-type-constructor
            value: '',
            isDropdown: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            defaultWidth: {
                type: String,
                default: ''
            },
            filterData: {
                type: Object
            },
            lazy: {
                type: Boolean,
                default: false
            },
            lazyLoadCount: {
                type: [String, Number],
                default: 10
            },
            optimizeScroll: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                optionIndex: 0,
                loadCount: 30,

                //optimizeScroll = true scroll优化模式
                //可视区域高度
                screenHeight: null,
                //每个option高度
                itemSize: 32,
                //option list总高度
                listHeight: null,
                //其实索引
                start: 0,
                //结束索引
                end: null,
                //scroll偏移量
                startOffset: 0,
            };
        },
        computed: {
            //可显示列表的数目
            visibleCount() {
                return Math.ceil(this.screenHeight / this.itemSize);
            },
            //偏移量对应的style
            getTransform() {
                return `translate3d(0,${this.startOffset}px,0)`;
            },
            getShowIndex() {
                return {
                    start: this.start,
                    end: this.end
                }
            }
        },
        watch: {
            'filterData': function (v) {
                if (this.$children) {
                    if (this.$children[0].$options._componentTag === 'kd-option') {
                        this.$children.forEach(item => {
                            item.isShow(v);
                        });
                    } else {
                        this.$children.forEach(child => {
                            const test = child.$children.every(item => {
                                return !item.isShow(v);
                            });
                            child.isGroup = !test;
                        });
                    }
                }
            }
        },
        mounted() {

        },
        updated() {
            this.screenHeight = this.$el.clientHeight;
            this.listHeight =  this.itemSize * this.$children.length;
            this.start = 0;
            this.end = this.start + this.visibleCount;
        },
        methods: {
            setValue(v) {
                this.$emit('setValue', v);
            },
            getOptionIndex() {
                this.optionIndex += 1;
                return this.optionIndex;
            },
            updateLabel(v) {
                this.$emit('updateLabel', v);
            },
            scroll(event) {
                //懒加载模式
                if (this.lazy){
                    const scrollTop = this.$refs.kdDropdown.scrollTop;
                    const contentHeight = this.$refs.kdDropdownContent.offsetHeight;
                    if (contentHeight - scrollTop <= 390) {
                        this.loadCount += parseInt(this.lazyLoadCount);
                    }
                }
                //scroll优化模式
                if(this.optimizeScroll){
                    let scrollTop = event.target.scrollTop;
                    //此时的开始索引
                    this.start = Math.floor(scrollTop / this.itemSize);
                    //此时的结束索引
                    this.end = this.start + this.visibleCount;
                    //此时的偏移量
                    this.startOffset = scrollTop - (scrollTop % this.itemSize);
                    // console.log(this.start, this.end);
                }
            }
        }
    };
</script>
