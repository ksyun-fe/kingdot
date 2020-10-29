import Progress from 'components/Progress/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Progress', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    // 创建基本progress,改变percentage,比较innerBar占outerBar的比例
    it('create progress', () => {
        vm = createVue({
            template: `
                <div>
                    <kd-progress
                            type="line"
                            :percentage="percentage"
                            :active="true"
                            color="#4fcc6f"
                            :strokeWidth="20"
                    />
                    <Button @click="increase">increase</Button>
                    <Button @click="decrease">decrease</Button>
                </div>
            `,
            data() {
                return {
                    percentage: 0
                }
            },
            methods: {
                increase() {
                    this.percentage = this.percentage + 10;
                },
                decrease() {
                    this.percentage = this.percentage - 10;
                }
            }
        });
        const innerBarElem = vm.$el.querySelector('.kd-progress-bar-inner');
        const outerBarElem = vm.$el.querySelector('.kd-progress.kd-progress-line .kd-progress-bar-outer');
        const increaseBtn = vm.$el.querySelectorAll('.kd-btn')[0];
        const decreaseBtn = vm.$el.querySelectorAll('.kd-btn')[1];
        // 判断颜色
        expect(document.defaultView.getComputedStyle(innerBarElem, null).backgroundColor).to.equal('rgb(79, 204, 111)');
        // 判断初始值
        expect(document.defaultView.getComputedStyle(innerBarElem, null).width).to.equal('0px');
        // increase
        increaseBtn.click();
        increaseBtn.click();
        vm.$nextTick().then(() => {
            // percentage为20
            expect(vm.percentage).to.equal(20);
            // innerBar占outerBar的10%
            let innerBarWidth = parseInt(document.defaultView.getComputedStyle(innerBarElem, null).width, 10);
            let outerBarWidth = parseInt(document.defaultView.getComputedStyle(outerBarElem, null).width, 10);
            let percentage = Math.round(innerBarWidth / outerBarWidth * 100);
            expect(percentage).to.equal(20);
        }).then(() => {
            decreaseBtn.click();
        }).then(() => {
            // percentage为10
            expect(vm.percentage).to.equal(10);
            // innerBar占outerBar的10%
            let innerBarWidth = parseInt(document.defaultView.getComputedStyle(innerBarElem, null).width, 10);
            let outerBarWidth = parseInt(document.defaultView.getComputedStyle(outerBarElem, null).width, 10);
            let percentage = Math.round(innerBarWidth / outerBarWidth * 100);
            expect(percentage).to.equal(10);
        });
    });

    // 自定义颜色
    it('custom color', () => {
        vm = createVue({
            template: `
                <div>
                    <kd-progress
                            type="line"
                            ref="strColor"
                            :percentage="30"
                            :strokeWidth="20"
                            :showText="true"
                            color="rbg(56, 196, 130)"
                    />
                    <kd-progress
                            type="line"
                            ref="arrColor"
                            :percentage="percentage"
                            :color="customColorArray"
                            :strokeWidth="20"
                    />
                    <kd-progress
                            type="line"
                            ref="funcColor"
                            :percentage="percentage"
                            :color="customColorFunc"
                            :strokeWidth="20"
                    />
                </div>
            `,
            data() {
                return {
                    percentage: 0,
                    customColorArray: ['rgb(85, 125, 252)', 'rgb(255, 154, 66)', 'rgb(239, 78, 118)', 'rbg(56, 196, 130)']
                }
            },
            mounted() {
                let interval = setInterval(() => {
                    this.percentage++;
                    if(this.percentage === 100) {
                        clearInterval(interval);
                        this.status = 'success';
                    }
                }, 60)
                console.log(this.$refs);
            },
            methods: {
                customColorFunc(percentage) {
                    if(percentage <= 25) {
                        return this.customColorArray[0];
                    }else if(percentage <= 50) {
                        return this.customColorArray[1];
                    }else if(percentage <= 75) {
                        return this.customColorArray[2];
                    }else {
                        return this.customColorArray[3];
                    }
                }
            }
        });
        const strColorBar = vm.$refs.strColor.$el.querySelector('.kd-progress-bar-inner');
        const arrColorBar = vm.$refs.arrColor.$el.querySelector('.kd-progress-bar-inner');
        const funcColorBar = vm.$refs.funcColor.$el.querySelector('.kd-progress-bar-inner');
        // 监听percentage,判断不同percentage对应的color
        vm.$watch('percentage', function (newVal, oldVal) {
            expect(document.defaultView.getComputedStyle(strColorBar, null).backgroundColor).to.equal('rbg(56, 196, 130)');
            const colorArr = vm.customColorArray;
            if(newVal <= 25) {
                expect(document.defaultView.getComputedStyle(arrColorBar, null).backgroundColor).to.equal(colorArr[0]);
                expect(document.defaultView.getComputedStyle(funcColorBar, null).backgroundColor).to.equal(colorArr[0]);
            }else if(newVal <= 50) {
                expect(document.defaultView.getComputedStyle(arrColorBar, null).backgroundColor).to.equal(colorArr[1]);
                expect(document.defaultView.getComputedStyle(funcColorBar, null).backgroundColor).to.equal(colorArr[1]);
            }else if(newVal <= 75) {
                expect(document.defaultView.getComputedStyle(arrColorBar, null).backgroundColor).to.equal(colorArr[2]);
                expect(document.defaultView.getComputedStyle(funcColorBar, null).backgroundColor).to.equal(colorArr[2]);
            }else {
                expect(document.defaultView.getComputedStyle(arrColorBar, null).backgroundColor).to.equal(colorArr[3]);
                expect(document.defaultView.getComputedStyle(funcColorBar, null).backgroundColor).to.equal(colorArr[3]);
            }
        });

    });

    // 显示progress 内置和外置和状态
    it('show text inside or outside and status', () => {
        vm = createVue({
            template: `
                <div>
                    <kd-progress
                            type="line"
                            ref="insideText"
                            :percentage="30"
                            :strokeWidth="20"
                            :showText="true"
                            :textInside="true"
                            color="#4fcc6f"
                    />
                    <kd-progress
                            type="line"
                            ref="outsideText"
                            :percentage="30"
                            :strokeWidth="20"
                            :showText="true"
                            color="#4fcc6f"
                    />
                    <kd-progress
                            type="line"
                             ref="statusBar"
                            :percentage="30"
                            :active="true"
                            :strokeWidth="20"
                            :showText="true"
                            status="error"
                            color="#EF4E76"
                    />
                </div>
            `
        });
        const insideTextElem = vm.$refs.insideText.$el.querySelector('.kd-progress-bar-inner > div');
        const outsideTextElem = vm.$refs.outsideText.$el.querySelector('.kd-progress-text');
        const statusElem = vm.$refs.statusBar.$el.querySelector('.kd-progress-text i');

        expect(insideTextElem.innerText).to.equal('30%');
        expect(outsideTextElem.innerText).to.equal('30%');
        expect(statusElem.classList.contains('kd-icon-error-solid')).to.be.true;
    });

    it('custom strokewidth', () => {
        vm = createVue({
            template: `
                <kd-progress
                        type="line"
                        :percentage="30"
                        :active="true"
                        :strokeWidth="20"
                        :showText="true"
                        status="error"
                        color="#EF4E76"
                />
            `
        });
        const progressBarElem = vm.$el.querySelector('.kd-progress-bar-inner');
        expect(document.defaultView.getComputedStyle(progressBarElem, null).height).to.equal('20px');
    });

    // circle progress bar
    it('create circle progress bar', () => {
        vm = createVue({
            template: `
                <div>
                    <kd-progress
                            type="circle"
                            :percentage="30"
                            color="rgb(79, 204, 111)"
                            :showText="true"
                            :progressTextSize="12"
                    />
                </div>
            `
        });
        const progressBarElem = vm.$el.querySelector('.kd-progress');
        expect(progressBarElem.classList.contains('kd-progress-circle')).to.be.true;
    });
});
