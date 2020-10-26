<template>
    <div
            class="kd-progress"
            :class="[
                'kd-progress-'+type,
                {
                    'kd-progress-without-text': !showText,
                    'kd-progress-text-inside': textInside
                }
            ]"
    >
        <div
                v-if="type === 'line'"
                class="kd-progress-bar"
        >
            <div
                    class="kd-progress-bar-outer"
                    :style="{height: strokeWidth+'px'}"
            >
                <div
                        class="kd-progress-bar-inner"
                        :class="{'kd-progress-bar-active': active}"
                        :style="barStyle"
                >
                    <div
                            v-if="showText && textInside"
                            :style="{fontSize: progressTextSize + 'px'}"
                    >{{ value }}</div>
                </div>
            </div>
        </div>
        <div
                v-else
                class="kd-progress-circle"
                :style="{width: width+'px', height: width+'px'}"
        >
            <svg viewBox="0 0 100 100">
                <path
                        :d="trackPath"
                        stroke="#ECECEC"
                        :stroke-width="relativeStrokeWidth"
                        fill="none"
                ></path>
                <path
                        :d="trackPath"
                        :stroke="color"
                        :stroke-width="relativeStrokeWidth"
                        fill="none"
                        :style="circleStyle"
                        stroke-linecap="round"
                ></path>
            </svg>
        </div>
        <div
                v-if="showText && !textInside"
                class="kd-progress-text"
                :style="{fontSize: progressTextSize + 'px'}"
        >
            <template v-if="!status">{{ value }}</template>
            <i
                    v-else
                    :class="iconClass"
                    :style="iconStyle"
            ></i>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'KdProgress',
        props: {
            type: {
                type: String,
                default: 'line',
                validator: val => ['line', 'circle'].indexOf(val) > -1
            },
            percentage: {
                type: Number,
                default: 0,
                required: true,
                validator: value => value >= 0 && value <= 100
            },
            strokeWidth: {
                type: Number,
                default: 4
            },
            showText: {
                type: Boolean,
                default: false
            },
            textInside: {
                type: Boolean,
                default: false
            },
            status: {
                type: String
            },
            active: {
                type: Boolean,
                default: false
            },
            color: {
                type: [String, Array, Function],
                required: true
            },
            format: {
                type: Function
            },
            width: {// 画布宽度
                type: Number,
                default: 100
            },
            progressTextSize: {
                type: [Number, String]
            }
        },
        computed: {
            value() {
                if (this.percentage == 100) {
                    console.log('--100');
                }
                return this.format ? this.format(this.percentage) : `${this.percentage}%`;
            },
            iconClass() {
                if (this.status === 'warning') {
                    return 'kd-icon-warning-solid';
                }
                if (this.type === 'line') {
                    return this.status === 'success' ? 'kd-icon-success-solid' : 'kd-icon-error-solid';
                } else {
                    return this.status === 'success' ? 'kd-icon-success' : 'kd-icon-error';
                }
            },
            iconStyle() {
                if (this.progressTextSize) {
                    return {fontSize: this.progressTextSize + 'px'};
                } else {
                    return {};
                }
            },
            barStyle() {
                const style = {};
                style.width = this.percentage + '%';
                style.backgroundColor = this.getCurrentColor(this.percentage);
                return style;
            },
            relativeStrokeWidth() {
                // 由于vieBox是0,0,100,100,所以无论svg实际占用多少Px,宽高都会等分为100份,所以svg中的尺寸和外界尺寸是不一致的
                // 这里必须画笔宽度就相当于 strokeWidth / width * 100
                return (this.strokeWidth / this.width * 100).toFixed(1);
            },
            radius() {
                // 半径 = (画布宽度 - relativeStrokeWidth ) / 2
                return parseInt((100 - this.relativeStrokeWidth) / 2, 10);
            },
            trackPath() {
                // 路径轨迹  环形
                return `
                    M50 50
                    m0 -${this.radius}
                    a${this.radius} ${this.radius} 0 1 1 0 ${this.radius * 2}
                    a${this.radius} ${this.radius} 0 1 1 0 -${this.radius * 2}
                `;
            },
            perimeter() {
                // 周长
                return 2 * Math.PI * this.radius;
            },
            circleStyle() {
                // 百分比环形 通过实线与虚线实现; 用到 stroke-dasharray
                return {
                    strokeDasharray: `${this.perimeter * this.percentage / 100}, ${this.perimeter}`,
                    strokeDashoffset: 0,
                    transition: 'all .6s ease'
                };
            },
            textSize() {
                return this.type === 'line'
                    ? 12 + this.strokeWidth * 0.4
                    : this.width * 0.111111 + 2;
            }
        },
        methods: {
            getCurrentColor(percentage) {
                if (typeof this.color === 'function') {
                    return this.color(percentage);
                } else if (typeof this.color === 'string') {
                    return this.color;
                } else {
                    return this.getLevelColor(percentage);
                }
            },
            getLevelColor(percentage) {
                const colorArray = this.getColorArray().sort((a, b) => a.percentage - b.percentage);
                for (let i = 0; i < colorArray.length; i++) {
                    if (colorArray[i].percentage > percentage) {
                        return colorArray[i].color;
                    }
                }
                return colorArray[colorArray.length - 1].color;
            },
            getColorArray() {
                const color = this.color;
                const span = 100 / color.length;
                return color.map((seriesColor, index) => {
                    if (typeof seriesColor === 'string') {
                        return {
                            color: seriesColor,
                            percentage: (index + 1) * span
                        };
                    }
                    return seriesColor;
                });
            }
        }
    };
</script>
