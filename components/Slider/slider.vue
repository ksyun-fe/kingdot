<template>
    <div :class="sliderCls">
        <div class="kd-slider-wrapper">
            <!-- slider -->
            <div
                    ref="sliderWrapper"
                    class="kd-wrapper"
                    @click="clickWrapper"
            >
                <div
                        class="kd-slider-bar"
                        :style="barStyle"
                ></div>
                <kd-tooltip
                        ref="point1"
                        :content="sliderValue[0] + ''"
                        effect="dark"
                        :disabled="!showTip"
                        :always="always"
                >
                    <div
                            v-if="isRange"
                            ref="sliderStartBtn"
                            :class="{
                                'kd-handle': true,
                                'kd-active': isBarReverse
                                    ? draggingPoint == 'end'
                                    : draggingPoint == 'start'
                            }"
                            :style="isBarReverse ? endStyle : startStyle"
                            @mousedown="onDrag('start')"
                    ></div>
                </kd-tooltip>
                <kd-tooltip
                        ref="point2"
                        :content="sliderValue[1] + ''"
                        effect="dark"
                        :disabled="!showTip"
                        :always="always"
                >
                    <div
                            ref="sliderEndBtn"
                            :class="{
                                'kd-handle': true,
                                'kd-active': isBarReverse
                                    ? draggingPoint == 'start'
                                    : draggingPoint == 'end'
                            }"
                            :style="isBarReverse ? startStyle : endStyle"
                            @mousedown="onDrag('end')"
                    ></div>
                </kd-tooltip>
                <template v-if="isShowStop">
                    <i
                            v-for="i in isShowStopList"
                            :key="i"
                            class="kd-point"
                            :style="{
                                left: (i * 100) / (isShowStopList.length + 1) + '%'
                            }"
                    ></i>
                </template>
            </div>
            <!-- marks -->
            <div
                    v-if="marksList.length"
                    class="kd-slider-marks"
            >
                <span
                        v-for="(item, index) in marksList"
                        :key="index"
                        class="kd-slider-marks-item"
                        :class="{'kd-slider-mark-active': isRange ? sliderValue.includes(Number(item.value)) : (sliderValue[1] == item.value)}"
                        :style="{
                            left: item.posLeft
                        }"
                        @click="clickMarks(item)"
                >{{ item.label }}</span>
            </div>
        </div>
        <div
                v-if="isShowInput"
                class="kd-spinner-wrapper"
        >
            <!-- range类型的input -->
            <div
                    v-if="isRange"
                    :class="rangeInputCls"
            >
                <kd-input
                        v-model="sliderValue[0]"
                        :disabled="disabled"
                        :width="64"
                        tabindex="0"
                        status=""
                        resize="none"
                        class="single-input"
                        @focus="inputFocusFn"
                        @blur="inputBlurFn"
                />
                <div>
                    <span class="input-middle"></span>
                </div>
                <kd-input
                        v-model="sliderValue[1]"
                        :disabled="disabled"
                        :width="64"
                        tabindex="0"
                        status=""
                        resize="none"
                        class="single-input"
                        @focus="inputFocusFn"
                        @blur="inputBlurFn"
                />
            </div>
            <!-- 单个input -->
            <kd-input
                    v-else
                    v-model="sliderValue[1]"
                    :disabled="disabled"
                    :width="80"
                    tabindex="0"
                    status=""
                    resize="none"
            />
        </div>
    </div>
</template>
<script>
    import KdTooltip from '../Tooltip';
    import KdInput from '../Input';
    export default {
        name: 'KdSlider',
        components: {
            KdTooltip,
            KdInput
        },
        props: {
            value: {
                type: [Number, Array],
                default() {
                    return 0;
                }
            },
            min: {
                type: Number,
                default() {
                    return 0;
                }
            },
            max: {
                type: Number,
                default() {
                    return 100;
                }
            },
            unit: {
                type: String,
                default() {
                    return '';
                }
            },
            isShowEnd: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            isShowInput: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            isShowStop: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            isRange: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            step: {
                type: Number,
                default() {
                    return 1;
                }
            },
            marks: {
                type: Object
            },
            disabled: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            // for tip: disable
            showTip: {
                type: Boolean,
                default: true
            },
            always: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                sliderValue: [this.minValue, this.minValue],
                maxValue: this.max,
                minValue: this.min,
                spinnerValue: 0,
                barValue: [],
                isDragging: false,
                isBarReverse: false,
                draggingPoint: null,
                inputFocus: false
            };
        },
        computed: {
            sliderCls() {
                return {
                    'kd-slider': true,
                    'kd-slider-disabled': this.disabled,
                    'kd-dragging': this.isDragging,
                    'kd-show-input': this.isShowInput && !this.isRange,
                    'kd-show-range-input': this.isShowInput && this.isRange,
                    'kd-show-end': this.isShowEnd
                };
            },
            barStyle() {
                let style;
                if (this.isRange) {
                    style = {
                        width: (Math.abs(this.barValue[1] - this.barValue[0]) / this.sliderWidth) * 100 + '%',
                        left: ((Math.min(this.barValue[0], this.barValue[1]) - this.minValue) / this.sliderWidth) * 100 + '%'
                    };
                } else {
                    style = {
                        width: (Math.abs(this.barValue[1] - this.minValue) / this.sliderWidth) * 100 + '%',
                        left: 0
                    };
                }
                return style;
            },
            sliderWidth() {
                return this.maxValue - this.minValue;
            },
            startStyle() {
                return {
                    left: (Math.abs(this.barValue[0] - this.minValue) / this.sliderWidth) * 100 + '%'
                };
            },
            endStyle() {
                return {
                    left: (Math.abs(this.barValue[1] - this.minValue) / this.sliderWidth) * 100 + '%'
                };
            },
            isShowStopList() {
                const counts = Math.floor(this.sliderWidth / this.step);
                return Array.from({ length: counts - 1 }).map((v, i) => i + 1);
            },
            rangeInputCls() {
                return {
                    'kd-slider-input-range': true,
                    'kd-slider-input-focus': this.inputFocus && !this.disabled,
                    'kd-slider-input-disabled': this.disabled
                };
            },
            marksList() {
                if (this.marks) {
                    return Object.keys(this.marks).map((item) => {
                        return {
                            value: item,
                            label: this.marks[item],
                            posLeft: ((+item - this.minValue) * 100) / this.sliderWidth + '%'
                        };
                    });
                } else if (this.isShowEnd) {
                    return [
                        {
                            value: this.min,
                            label: this.minValue,
                            posLeft: '0%'
                        },
                        {
                            value: this.max,
                            label: this.maxValue,
                            posLeft: '100%'
                        }
                    ];
                } else {
                    return [];
                }
            }
        },
        watch: {
            value: {
                immediate: true,
                handler(v) {
                    if (Array.isArray(v)) {
                        this.sliderValue = v;
                    } else {
                        if (this.isRange) {
                            this.sliderValue = [this.minValue, this.minValue];
                        } else {
                            this.sliderValue = [this.minValue, v];
                        }
                    }
                }
            },
            sliderValue: {
                immediate: true,
                handler(v) {
                    if (!this.checkSliderValue()) return;
                    this.spinnerValue = v[1];
                    if (!this.isDragging) {
                        this.barValue = v;
                    }
                    if (this.isRange) {
                        v = v && v.length < 2 ? [this.minValue, this.minValue] : v;
                    } else {
                        v = v[1];
                    }
                    this.$emit('input', v);
                    setTimeout(() => {
                        this.tipUpdate();
                    }, 300);
                }
            },
            max: {
                immediate: true,
                handler(v) {
                    this.maxValue = v;
                }
            },
            min: {
                immediate: true,
                handler(v) {
                    this.minValue = v;
                }
            },
            spinnerValue(v) {
                if (this.isRange) return;
                this.sliderValue = [this.sliderValue[0], v];
            },
            barValue(v) {
                if (v[0] > v[1]) {
                    this.isBarReverse = true;
                } else {
                    this.isBarReverse = false;
                }
                this.sliderValue = v;
                this.$refs.sliderEndBtn && this.$refs.sliderEndBtn.blur();
                this.$refs.sliderStartBtn && this.$refs.sliderStartBtn.blur();
            }
        },
        beforeDestroy() {
            document.removeEventListener('mousemove', this.onDraging);
            document.removeEventListener('mouseup', this.onSlideEnd);
        },
        methods: {
            checkSliderValue() {
                const v0 = this.fix(this.sliderValue[0]);
                const v1 = this.fix(this.sliderValue[1]);

                if (v0 !== this.sliderValue[0] || v1 !== this.sliderValue[1]) {
                    this.sliderValue = [v0, v1];
                    return false;
                }
                if (this.sliderValue[0] > this.sliderValue[1]) {
                    this.sliderValue = [this.sliderValue[1], this.sliderValue[0]];
                    return false;
                }

                return true;
            },
            fix(v) {
                const step = this.step;
                const max = this.maxValue;
                const min = this.minValue;

                if (Number.isNaN(Number(v))) {
                    return min;
                } else if (v < min) {
                    return min;
                } else if (v > max) {
                    return max;
                } else {
                    const fixedValue = Number(
                        (Math.round(v / step) * step).toFixed(10)
                    );
                    if (fixedValue < min) {
                        return min;
                    } else if (fixedValue > max) {
                        return max;
                    } else {
                        return fixedValue;
                    }
                }
            },
            clickWrapper(e) {
                if (this.disabled || this.isDragging) return;
                const newValue = this.getSlidingValue(e.clientX);
                if (this.isRange) {
                    if (
                        Math.abs(this.sliderValue[0] - newValue) <=
                        Math.abs(this.sliderValue[1] - newValue)
                    ) {
                        this.sliderValue = [newValue, this.sliderValue[1]];
                    } else {
                        this.sliderValue = [this.sliderValue[0], newValue];
                    }
                } else {
                    this.sliderValue = [this.sliderValue[0], newValue];
                }
            },
            clickMarks(item) {
                const newValue = Number(item.value);
                if (this.isRange) {
                    if (
                        Math.abs(this.sliderValue[0] - newValue) <=
                        Math.abs(this.sliderValue[1] - newValue)
                    ) {
                        this.sliderValue = [newValue, this.sliderValue[1]];
                    } else {
                        this.sliderValue = [this.sliderValue[0], newValue];
                    }
                } else {
                    this.sliderValue = [this.sliderValue[0], newValue];
                }
            },
            getSlidingValue(pos) {
                const rect = this.$refs.sliderWrapper.getBoundingClientRect();
                const percent = (pos - rect.left) / rect.width;
                const max = this.maxValue;
                const min = this.minValue;
                if (percent <= 0) {
                    return min;
                } else if (percent >= 1) {
                    return max;
                } else {
                    return min + this.sliderWidth * percent;
                }
            },
            onDrag(draggingPoint, e) {
                if (this.disabled) return;
                this.isDragging = true;
                this.draggingPoint = draggingPoint;
                document.addEventListener('mousemove', this.onDraging);
                document.addEventListener('mouseup', this.onSlideEnd);
            },
            onDraging(e) {
                if (!this.isDragging) return;
                this.setDragValue(e);
                this.tipUpdate();
            },
            tipUpdate() {
                this.$refs.point1 && this.$refs.point1.updatePopper();
                this.$refs.point2 && this.$refs.point2.updatePopper();
            },
            setDragValue(e) {
                const tempValue = this.getSlidingValue(e.clientX);
                if (this.draggingPoint === 'start') {
                    this.barValue = [tempValue, this.barValue[1]];
                }
                if (this.draggingPoint === 'end') {
                    this.barValue = [this.barValue[0], tempValue];
                }
            },
            onSlideEnd(e) {
                if (!this.isDragging) return;
                this.setDragValue(e);
                document.removeEventListener('mousemove', this.onDraging);
                document.removeEventListener('mouseup', this.onSlideEnd);
                this.isDragging = false;
            },
            // input event
            inputFocusFn(e) {
                this.inputFocus = true;
            },
            inputBlurFn(e) {
                this.inputFocus = false;
            }
        }
    };
</script>
