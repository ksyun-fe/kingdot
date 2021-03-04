import { createVue, triggerEvent, destroyVM } from '../util';

describe('Slider', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // create
    it('create', () => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider ref="slider" :value="20" showStop showInput />
                </div>
            `
        });
        let slider = vm.$refs.slider;
        expect(slider.spinnerValue).to.equal(20);
    });
    // min max
    it('should not exceed min and max', done => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider ref="slider" v-model="value" :min="50" />
                </div>
            `,
            data() {
                return {
                    value: 50
                };
            }
        }, true);
        setTimeout(() => {
            vm.value = 40;
            vm.$nextTick(() => {
                expect(vm.value).to.equal(50);
                vm.value = 120;
                vm.$nextTick(() => {
                    expect(vm.value).to.equal(100);
                    done();
                });
            });
        }, 10);
    });
    // drag
    it('drag', done => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider ref="slider" v-model="value" />
                </div>
            `,
            data() {
                return {
                    value: 0
                };
            }
        }, true);
        const slider = vm.$refs.slider;
        const pos = { clientX: 100 };
        // drag fisrt point
        slider.onDrag('start', pos);
        slider.onDraging(pos);
        slider.onSlideEnd(pos);
        setTimeout(() => {
            expect(vm.value > 0).to.true;
            done();
        }, 10);
    });
    // click
    it('click', done => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider ref="slider" v-model="value" />
                </div>
            `,
            data() {
                return {
                    value: 0
                };
            }
        }, true);
        const slider = vm.$refs.slider;
        const pos = { clientX: 100 };
        slider.clickWrapper(pos);
        setTimeout(() => {
            expect(vm.value > 0).to.true;
            done();
        }, 10);
    });
    // disabled
    it('disabled', done => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider ref="slider" v-model="value" :disabled="true" />
                </div>
            `,
            data() {
                return {
                    value: 0
                };
            }
        }, true);
        const slider = vm.$refs.slider;
        const pos = { clientX: 100 };
        slider.clickWrapper(pos);
        setTimeout(() => {
            expect(vm.value).to.equal(0);
            done();
        }, 10);
    });
    // marks
    it('marks', done => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider ref="slider" :min="1" :max="12" :value="3" :marks="marks" />
                </div>
            `,
            data() {
                return {
                    marks: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "4": "4",
                        "5": "5",
                        "6": "6月",
                        "7": "7",
                        "8": "8",
                        "9": "9",
                        "10": "1年",
                        "11": "2年",
                        "12": "3年",
                    },
                };
            }
        }, true);
        const slider = vm.$refs.slider;
        slider.clickMarks({value: 2});
        setTimeout(() => {
            expect(slider.spinnerValue).to.equal(2);
            done();
        }, 10);
    });
    // range
    it('range', done => {
        vm = createVue({
            template: `
                <div>
                    <kd-slider
                        v-model="value2"
                        ref="slider"
                        range
                        showEnd
                        always
                        :marks="marks"
                    />
                </div>
            `,
            data() {
                return {
                    value2: [70, 80],
                    marks: {
                        "1": "1",
                        "2": "2",
                        "3": "3",
                        "99": "99",
                        "100": "100"
                    },
                };
            }
        }, true);
        const slider = vm.$refs.slider;
        const pos = { clientX: 100 };
        slider.clickWrapper(pos);

        setTimeout(() => {
            expect(vm.value2[0] < 70).to.true;

            slider.clickMarks({value: 100});
            setTimeout(() => {
                expect(vm.value2[1]).to.equal(100);

                slider.clickMarks({value: 1});
                slider.clickMarks({value: 100});
                slider.clickMarks({value: 99});
                setTimeout(() => {
                    expect(vm.value2[1]).to.equal(99);

                    slider.clickMarks({value: 1});
                    slider.clickMarks({value: 98});
                    slider.clickMarks({value: 2});
                    setTimeout(() => {
                        expect(vm.value2[0]).to.equal(2);
                        done();
                    }, 10)
                }, 10)
            }, 10)
        }, 10);
    });
})
