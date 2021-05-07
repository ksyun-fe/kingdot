<template>
    <div
            :class="{
                'kd-scroll-select': true,
                'kd-disabled': disabled
            }"
    >
        <!-- :style="{
                    transform: `translateY(${translateY}px)`,
                    marginTop: `${marginTop}px`,
                }"
            @mousedown="moveStart"
                -->
        <div
                class="kd-wrapper"
                @wheel.prevent="mouseWheel"
        >
            <div
                    v-for="(item, index) in selectList"
                    :key="index"
                    ref="item"
                    class="kd-scroll-item"
                    :class="{
                        'kd-scroll-item-active': value === item.value,
                        'kd-scroll-item-disabled': isItemDisabled(item)
                    }"
                    @click="clickHandler(item, index)"
            >
                {{ item.label }}
            </div>
        </div>
        <div class="kd-border"></div>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';
    // import normalizeWheel from 'normalize-wheel';

    export default {
        name: 'ScrollSelect',
        mixins: [Lang],
        props: {
            value: {
                type: [String, Number]
            },
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
                // translateY: 0,
                // marginTop: 0,
                curIndex: 0,
                currentValue: this.data[0].value || this.data[0]
                // currentValue: '',
                // count: 5 // 展示范围, 默认5
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
            value: {
                immediate: true,
                handler(v) {
                    // if (v) {
                    this.currentValue = v;
                    // }
                }
            },
            currentValue(value, oldValue) {
                const itemDisable = this.itemDisable;

                // 判断 currentValue 没有被禁用...
                // !!value &&
                // value 是假值的时候就不再 emit 事件, 不然会被处理成 00:00:00
                if (!!value && !(!!itemDisable && itemDisable.call(this, value))) {
                    this.$emit('input', value);
                    this.$emit('change', value, oldValue);
                }
            }
        },
        mounted() {
            console.log('count', this.count);
            this.initPosition();
        },
        methods: {
            // 初始化位置信息
            initPosition() {
                const height = this.$el.offsetHeight;
                // console.log('initPosition marginTop', this.$el.offsetHeight);

                this.itemHeight = this.$refs.item[0].offsetHeight;
                // console.log('initPosition translateY', this.itemHeight);

                this.translateY = -(Math.floor(this.count / 2) * this.itemHeight - (height - this.itemHeight) / 2);
                // console.log('initPosition translateY', this.translateY);

                // this.translateY = this.initTranslateY;

                this.marginTop = 0;
            },
            // moveStart(e) { // 拖动调整
            //     // 设置初始值
            //     if(e.which !== 1) return;
            //     if(this.disabled) return;
            //     this.moveFlag = true;
            //     this.moved = false;
            //     this.moveStartY = e.clientY;
            //     this.initY = e.clientY;
            //     this.itemHeight = this.$refs.item[0].offsetHeight;

            //     // addEventListener(document, 'mousemove', this.moving)
            //     // addEventListener(document, 'mouseup', this.moveEnd)
            //     document.addEventListener('mousemove', this.moving)
            //     document.addEventListener('mouseup', this.moveEnd)
            // },
            // moving(e) {
            //     if(!this.moveFlag) return;
            //     let moveY = e.clientY - this.moveStartY;
            //     let detaY = e.clientY - this.initY;
            //     this.moved = !!moveY;
            //     let moveIndex = Math.floor(Math.abs(detaY) / this.itemHeight);
            //     if (moveIndex) {
            //         if (detaY < 0) {
            //             moveIndex = -moveIndex;
            //         }

            //         this.setMoveValue(-moveIndex, -detaY);
            //         this.initY = e.clientY;
            //     }
            //     this.moveStartY = e.clientY;

            //     this.translateY += moveY;
            // },
            // setMoveValue(index, moveY, isSetTranslate) {

            //     let length = this.selectList.length;
            //     let currentIndex = this.selectList.findIndex(item => item.value === this.currentValue);
            //     this.currentValue = this.selectList[(length + currentIndex + index) % length].value;
            //     this.marginTop += moveY || index * this.itemHeight;

            //     if (isSetTranslate) {
            //         this.translateY -= this.itemHeight * index;
            //     }
            // },
            // moveEnd(e) {
            //     if (this.moveFlag) {
            //         this.moveFlag = false;
            //         this.translateY = -this.marginTop + this.initTranslateY;

            //         // removeEventListener(document,'mousemove', this.moving);
            //         // removeEventListener(document,'mouseup', this.moveEnd);
            //         document.removeEventListener('mousemove', this.moving);
            //         document.removeEventListener('mouseup', this.moveEnd);
            //     }
            // },
            // mouseWheel(e) {
            //     if (this.disabled) return;
            //     const normalized = normalizeWheel(e);
            //     this.setMoveValue(normalized.spinY < 0 ? -1 : 1, null, true)
            // },

            // =========
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

                // this.marginTop += moveY || index * this.itemHeight; // 滚动一节. 上移或者下移 整个 itemHeight

                // this.translateY -= this.itemHeight * index;
                // 改变 this.translateY 使得选中项在中间
                // if (isSetTranslate) {
                //     this.translateY -= this.itemHeight * index;
                // }
            },
            clickHandler(selectItem, index) {
                if (this.disabled) return;
                if (this.isItemDisabled(selectItem)) return;

                const half = Math.floor(this.count / 2);
                const length = this.selectList.length;
                const currentIndex = this.selectList.findIndex(item => item.value === this.currentValue);

                this.currentValue = this.selectList[(length + currentIndex + index - half) % length].value;
            },
            isItemDisabled(item) {
                // 整个组件被禁用, 或者传入了 验证函数, 且验证后为禁用
                const disableFlag = this.disabled || !!this.itemDisable && this.itemDisable(item.value);
                if (!disableFlag && item.value === this.currentValue && this.currentValue !== this.value) {
                    // if (this.value) { // 初始化没有value时, 不把
                    //     this.$emit('input', this.currentValue);
                    // }
                    // console.log('计算禁用, 更新input');
                    this.$emit('input', this.currentValue);
                }
                return disableFlag;
            }
        }
    };
</script>
