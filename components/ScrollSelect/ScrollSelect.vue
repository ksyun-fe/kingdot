<template>
    <div
            :class="{
                'k-scroll-select': true,
                'k-disabled': disabled
            }"
    >
        <!-- :style="{
                    transform: `translateY(${translateY}px)`,
                    marginTop: `${marginTop}px`,
                }" -->
        <div
                class="k-wrapper"
                @wheel.prevent="mouseWheel"
        >
            <div
                    v-for="(item, index) in selectList"
                    :key="index"
                    ref="item"
                    class="k-scroll-item"
                    :class="{
                        'k-active': currentValue === item.value,
                        'k-disabled': isItemDisabled(item.value)
                    }"
                    @click="clickHandler(item, index)"
            >
                {{ item.label }}
            </div>
        </div>
        <div class="k-border"></div>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'ScrollSelect',
        mixins: [Lang],
        props: {
            data: {
                type: Array,
                default() {
                    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
                }
            },
            disabled: {
                type: Boolean,
                default: false
            },
            // 判断选项是否需要禁用
            itemDisable: {
                type: Function
            }
            // count: { //  展示范围, 最好奇数位. 默认5
            //     type: Number,
            //     default() {
            //         return 5;
            //     }
            // }
        },
        data() {
            return {
                translateY: 0,
                marginTop: 0,
                curIndex: 0,
                currentValue: this.data[0].value || this.data[0],
                count: 5 // 展示范围, 默认5
                // isDisabled: this.disabled
            };
        },
        computed: {
            selectList() {
                let list = [];
                let curIndex = -1;
                let data = this.data;
                // if(typeof data == 'function'){  // data == 'function' 的特殊处理
                //     data = data(this.currentValue);
                // }
                // data 是完整的列表
                data = data.map((item, index) => {
                    const type = typeof item;
                    // 若为字符串数组, 则处理成对象数组
                    if (type === 'string' || type === 'number') {
                        item = {
                            value: item,
                            label: item
                        };
                    }
                    if (item.value === this.currentValue) {
                        curIndex = index;
                    }
                    return item;
                });
                // return data;

                const length = data.length;
                const half = Math.floor(this.count / 2);
                if (length < 1) {
                    return [];
                }

                // list 是能展示出来的几个元素的集合. 与当前选中的 curValue 有关
                list = Array(this.count).fill(0).map((item, index) => {
                    return data[((length + (curIndex - half) % length) + index) % length];
                });
                return list;
            }
        },
        watch: {
            currentValue(value, oldValue) {
                const itemDisable = this.itemDisable;

                // 判断 item 没有被禁用...
                if (!(!!itemDisable && itemDisable.call(this, value)) && this.value !== value) {
                    this.$emit('input', value);
                    this.$emit('change', value, oldValue);
                }
            }
        },
        mounted() {
            this.initPosition();
        },
        methods: {
            // 初始化位置信息
            initPosition() {
                const height = this.$el.offsetHeight;
                console.log('initPosition marginTop', this.$el.offsetHeight);

                this.itemHeight = this.$refs.item[0].offsetHeight;
                console.log('initPosition translateY', this.itemHeight);

                this.translateY = -(Math.floor(this.count / 2) * this.itemHeight - (height - this.itemHeight) / 2);
                console.log('initPosition translateY', this.translateY);

                // this.translateY = this.initTranslateY;

                this.marginTop = 0;
            },
            mouseWheel(e) {
                if (this.disabled) return;
                // TODO: 拿滚动详细数据 (方向, 距离)

                this.setMoveValue(e.deltaY < 0 ? -1 : 1);
            },
            setMoveValue(index) {
                // +-1, null true()
                const length = this.selectList.length;
                const currentIndex = this.selectList.findIndex(item => item.value === this.currentValue);
                // 选中
                this.currentValue = this.selectList[(length + currentIndex + index) % length].value;

                // 如果滚动之后 下一条被禁用 => 同方向再滚动一次
                if (this.isItemDisabled(this.currentValue)) {
                    this.setMoveValue(index > 0 ? index++ : index--);
                }
                // this.marginTop += moveY || index * this.itemHeight; // 滚动一节. 上移或者下移 整个 itemHeight

                // this.translateY -= this.itemHeight * index;
                // ??? 改变 this.translateY
                // if (isSetTranslate) {
                //     this.translateY -= this.itemHeight * index;
                // }
            },
            clickHandler(selectItem, index) {
                if (this.disabled) return;
                if (this.isItemDisabled(selectItem.value)) return;

                const half = Math.floor(this.count / 2);
                const length = this.selectList.length;
                const currentIndex = this.selectList.findIndex(item => item.value === this.currentValue);

                this.currentValue = this.selectList[(length + currentIndex + index - half) % length].value;
            },
            isItemDisabled(value) {
                // 整个组件被禁用, 或者传入了 验证函数, 且验证后为禁用
                return this.disabled || !!this.itemDisable && this.itemDisable(value);
            }
        }
    };
</script>
