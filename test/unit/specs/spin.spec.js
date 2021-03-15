import Spin from 'components/Spin/index.js';
import { createCons, createVue, destroyVM} from '../util';

describe('Spin', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('create', () => {
        vm = createVue({
            template: `
                <kd-spin></kd-spin>
            `
        });

        expect(vm.$el.classList.contains('kd-spin')).to.be.true;
    });
    // text
    it('text', () => {
        vm = createCons(Spin, {
            text: '加载中'
        });
        expect(vm.$el.querySelector('.kd-spin-text').innerText).to.equal('加载中');
    });
    // size
    it('size', () => {
        vm = createCons(Spin, {
            size: 'large'
        });
        expect(vm.$el.classList.contains('kd-spin-large')).to.be.true;
    });
    // overlay
    it('overlay', () => {
        vm = createCons(Spin, {
            overlay: true
        });
        expect(vm.$el.classList.contains('kd-spin-overlay')).to.be.true;
    });
    // background
    it('background', () => {
        vm = createCons(Spin, {
            background: 'rgba(0, 0, 0, .5)'
        });
        expect(vm.$el.classList.contains('kd-spin-overlay')).to.be.true;
        expect(vm.$el.style.backgroundColor).to.be.equal('rgba(0, 0, 0, 0.5)');
    });
    // local
    it('local', () => {
        vm = createCons(Spin, {
            isLocal: true
        });
        expect(vm.$el.classList.contains('kd-spin-local')).to.be.true;
    });
})
