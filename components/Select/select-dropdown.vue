<template>
    <div
            ref="kdDropdown"
            :class="{
                'kd-select-dropdown': true,
                'kd-select-optimize': optimizeScroll
            }"
            :style="{
                width:defaultWidth,
                'max-height': `290px`
            }"
            @scroll="scroll"
    >
        <div
                v-if="optimizeScroll"
                class="kd-select-phantom"
                :style="{ 'max-height': '290px' }"
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
        <ul v-if="$children.length && allHide">
            <li class="kd-select-no-data">无数据</li>
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
            },
            dropdownMenu: {

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
                scrollInitFlag: true,
                // 兼容: 搜索结果为空的时候展示空数据
                allHide: false,
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
                let count = 0;
                this.$children.forEach(item => {
                    if (item.$options._componentTag === 'kd-option') {
                        item.isShow(v);
                        if (item.isShow(v)) {
                            count++;
                        };
                    }
                    if (item.$options._componentTag === 'kd-option-group') {
                        // only one level options in group
                        item.$children.forEach(c => {
                            if (c.$options._componentTag === 'kd-option') {
                                c.isShow(v);
                                if (c.isShow(v)) {
                                    count++;
                                };
                            }
                        });
                        const hideGroup = item.$children.every(c => {
                            if (c.$options._componentTag === 'kd-option') {
                                return !c.isShow(v);
                            }
                            return false;
                        });
                        item.isGroup = !hideGroup;
                    }
                });
                // fix: 重新计算搜索后的弹层高度
                this.listHeight =  this.itemSize * count;
                this.screenHeight = this.listHeight >= 290 ? 290 : this.listHeight;
                // fix: 全部不显示时候
                let allHide = this.$children.every(item => {
                    if (item.$options._componentTag === 'kd-option') {
                        return !item.isShow(v);
                    }
                    if (item.$options._componentTag === 'kd-option-group') {
                        const hideGroup = item.$children.every(c => {
                            if (c.$options._componentTag === 'kd-option') {
                                return !c.isShow(v);
                            }
                            return true;
                        });
                        return hideGroup;
                    }
                });
                this.allHide = allHide;
                // console.log('xxxx', allHide);
            },
            dropdownMenu(val) {
                if(!val){
                    //关闭dropdown后重置偏移量
                    this.startOffset = 0;
                    this.scrollInitFlag = true;
                }
            }
        },
        mounted() {

        },
        updated() {
            if(this.dropdownMenu && this.scrollInitFlag) {
                // this.screenHeight = this.$el.clientHeight;
                this.listHeight =  this.itemSize * this.$children.length;
                this.screenHeight = this.listHeight >= 290 ? 290 : this.listHeight;
                this.start = 0;
                this.end = this.start + this.visibleCount;
                this.scrollInitFlag = false;
            }
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
