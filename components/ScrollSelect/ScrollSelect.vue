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
                        'k-disabled': isItemDisabled(item)
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
                type: Function,
                default: () => false
            },
            count: { //  展示范围, 最好奇数位. 默认5
                type: Number,
                default() {
                    return 5;
                }
            }
        },
        data() {
            return {
                translateY: 0,
                marginTop: 0,
                curIndex: 0,
                currentValue: '',
                isDisabled: this.disabled
            };
        },
        computed: {
            // displayList() {
            //     let list = [];
            //     return list;
            // },
            selectList() {
                let list = [];
                let curIndex = -1;
                let data = this.data;
                // if(typeof data == 'function'){  // data == 'function' 的特殊处理
                //     data = data(this.currentValue);
                // }
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
                if (curIndex === -1) { // 按位取反 1 => -2  判断 curIndex != -1
                    curIndex = 0;
                    this.currentValue = data[0].value;
                }

                list = Array(this.count).fill(0).map((item, index) => { // 把下半截挪到上面...
                    return data[((length + (curIndex - half) % length) + index) % length];
                });
                // console.log('data', this.data);
                // console.log('selectList', list);
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
        created() {
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
                // 拿滚动数据 (方向, 距离x 次数)
                // const normalized = normalizeWheel(e);
                this.setMoveValue(e.deltaY < 0 ? -1 : 1, null, true);
            },
            setMoveValue(index, moveY, isSetTranslate) {
                // +-1, null true()
                const length = this.selectList.length;
                const currentIndex = this.selectList.findIndex(item => item.value === this.currentValue);
                // 选中
                this.currentValue = this.selectList[(length + currentIndex + index) % length].value;
                // this.marginTop += moveY || index * this.itemHeight; // 滚动一节. 上移或者下移 整个 itemHeight

                // this.translateY -= this.itemHeight * index;
                // ??? 改变 this.translateY
                // if (isSetTranslate) {
                //     this.translateY -= this.itemHeight * index;
                // }
            },
            clickHandler(selectItem, index) {
                if (this.disabled) return;
                console.log('click', selectItem, index);
                const half = Math.floor(this.count / 2);
                const length = this.selectList.length;
                const currentIndex = this.selectList.findIndex(item => item.value === this.currentValue);

                this.currentValue = this.selectList[(length + currentIndex + index - half) % length].value;
            },
            isItemDisabled(item) {
                // 整个组件被禁用, 或者传入了 验证函数, 且验证后为禁用
                const flag = this.isDisabled || !!this.itemDisable && this.itemDisable(item.value);
                if (!flag && item.value === this.currentValue && this.currentValue !== this.value) {
                    this.$emit('input', this.currentValue);
                }
                return flag;
            }
        }
    };
</script>
