import Button from 'components/Button/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Button', () => {
    // 创建一个primary按钮
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('button primary', () => {
        vm = createCons(Button, {
            type: 'primary'
        });
        expect(vm.$el.classList.contains('kd-btn-primary')).to.be.true;
    });
    // 禁用按钮
    it('button disabled', () => {
        vm = createCons(Button, {
            disabled: true
        });
        expect(vm.$el.classList.contains('kd-btn-disabled')).true;
    });
    // 按钮加载效果
    it('button loading', () => {
        vm = createCons(Button, {
            loading: true
        });
        expect(vm.$el.classList.contains('kd-btn-loading')).to.be.true;
        expect(vm.$el.querySelector('.kd-btn-loading-icon')).to.be.ok;
    });
    it('button icon', () => {
        vm = createCons(Button, {
            icon: 'buttonIcon'
        });
        expect(vm.$el.querySelector('.buttonIcon')).to.be.ok;
    });
    it('button shape', () => {
        vm = createCons(Button, {
            shape: 'round'
        });
        expect(vm.$el.classList.contains('kd-btn-round')).true;
    });
    it('button size', () => {
        vm = createCons(Button, {
            size: 'large'
        });
        expect(vm.$el.classList.contains('kd-btn-large')).true;
    });
    it('button group', () => {
        vm = createCons(Button, {
            size: 'large'
        });
        expect(vm.$el.classList.contains('kd-btn-large')).true;
    });
    // 点击按钮返回event事件
    it('click button', (done) => {
        let result;
        vm = createVue({
            template: `
        <Button type='primary' @click='btnTest'>测试</Button>
      `,
            methods: {
                btnTest(e) {
                    result = e;
                }
            }
        });
        vm.$el.click();
        setTimeout(() => {
            expect(result).to.exist;
            done();
        }, 50);
    });
    it('disabled not click button', done => {
        let result;
        vm = createVue({
            template: `
                <Button type='primary' disabled @click='btnTest'>测试</Button>
            `,
            methods: {
                btnTest(e) {
                    result = e;
                }
            }
        });
        vm.$el.click();
        setTimeout(() => {
            expect(result).to.not.exist;
            done();
        }, 50);
    });
    it('login not click button', done => {
        let result;
        vm = createVue({
            template: `
                <Button type='primary' loading @click='btnTest'>测试</Button>
            `,
            methods: {
                btnTest(e) {
                    result = e;
                }
            }
        });
        vm.$el.click();
        setTimeout(() => {
            expect(result).to.not.exist;
            done();
        }, 50);
    });
});