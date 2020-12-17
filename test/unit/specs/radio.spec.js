import Radio from 'components/Radio/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Radio', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // disabled
    it('radio disabled', () => {
        vm = createCons(Radio, {
            disabled: true
        });
        expect(vm.$el.classList.contains('kd-radio-disabled')).to.be.true;
    });
    // checked
    it('radio checked', () => {
        vm = createCons(Radio, {
            value: 1,
            trueValue: 1
        });
        expect(vm.$el.classList.contains('kd-radio-checked')).to.be.true;
    });
    // type
    it('radio type', () => {
        vm = createCons(Radio, {
            type: 'vertical'
        });
        expect(vm.$el.classList.contains('kd-radio-type')).to.be.true;
    });
    // change event
    it('change event', async () => {
        let el;
        vm = createVue({
            template: `
                <KdRadio
                        v-model="checked"
                        :true-value="true"
                        ref="radio"
                        @change="change"
                >checked</KdRadio>
            `,
            data() {
                return {
                    checked: false,
                    changeFnValue: false,
                    changeCalled: false
                }
            },
            methods: {
                change(v) {
                    this.changeFnValue = v;
                    this.changeCalled = true;
                }
            }
        }, true);

        el = vm.$el;
        expect(el.classList.contains('kd-radio-checked')).to.be.false;
        expect(vm.checked).to.be.false;
        expect(vm.changeCalled).to.be.false;
        el.click();
        await vm.$nextTick().then(() => {
            expect(vm.checked).to.be.true;
            expect(vm.changeCalled).to.be.true;
            expect(vm.changeFnValue).to.be.true;
            expect(el.classList.contains('kd-radio-checked')).to.be.true;
        });
    });
})
