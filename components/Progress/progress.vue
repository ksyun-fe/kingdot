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
                :style="{width: width+'px', height: width+'px'}"
        >
            <svg viewBox="0 0 100 100">
                <path
                        :d="path"
                        stroke="#ECECEC"
                        :stroke-width="relativeStrokeWidth"
                        fill="none"
                ></path>
                <path
                        :d="path"
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
            <slot v-if="showCustomText"></slot>
            <template v-if="!status && !showCustomText">{{ value }}</template>
            <i
                    v-if="status && !showCustomText"
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
            },
            showCustomText: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            value() {
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
                return this.progressTextSize ? {fontSize: this.progressTextSize + 'px'} : {};
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
            path() {
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
            }
        },
        methods: {
            getCurrentColor(percentage) {
                if (typeof this.color === 'string') {
                    return this.color;
                } else if (typeof this.color === 'function') {
                    return this.color(percentage);
                } else {
                    return this.getLevelColor(percentage);
                }
            },
            getLevelColor(percentage) {
                const colors = this.color.map((color, index) => {
                    if (typeof color === 'string') {
                        return {
                            color: color,
                            percentage: (index + 1) * (100 / color.length)
                        };
                    }
                });
                const colorArray = colors.sort((a, b) => a.percentage - b.percentage);
                for (let i = 0; i < colorArray.length; i++) {
                    if (colorArray[i].percentage > percentage) {
                        return colorArray[i].color;
                    }
                }
            }
        }
    };
</script>
