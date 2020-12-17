import Radio from 'components/Radio/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Radio', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // 禁用按钮
    it('radio disabled', () => {
        vm = createCons(Radio, {
            disabled: true
        });
        expect(vm.$el.classList.contains('kd-radio-disabled')).to.be.true;
    });
    // 选中按钮
    it('radio checked', () => {
        vm = createCons(Radio, {
            value: 1,
            trueValue: 1
        });
        expect(vm.$el.classList.contains('kd-radio-checked')).to.be.true;
    });
})
