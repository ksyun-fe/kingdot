import {createVue, destroyVM} from '../util';

describe('Row', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createVue({
            template: `
                <kd-row></kd-row>
            `
        });

        expect(vm.$el.classList.contains('kd-row')).to.be.true;
    });

    it('gutter', () => {
        vm = createVue({
            template: `
                <kd-row gutter="16"></kd-row>
            `
        });
        expect(vm.$el.style.marginLeft).to.be.equal('-8px');
        expect(vm.$el.style.marginRight).to.be.equal('-8px');
    });


    it('flex', () => {
        vm = createVue({
            template: `
                <kd-row flex></kd-row>
            `
        });

        expect(vm.$el.classList.contains('kd-row-flex')).to.be.true;
    });

    it('justify', () => {
        vm = createVue({
            template: `
                <kd-row justify="center"></kd-row>
            `
        });

        expect(vm.$el.classList.contains('kd-row-flex')).to.be.true;
        expect(vm.$el.classList.contains('kd-row-justify-center')).to.be.true;
    });

    it('align', () => {
        vm = createVue({
            template: `
                <kd-row align="middle"></kd-row>
            `
        });

        expect(vm.$el.classList.contains('kd-row-flex')).to.be.true;
        expect(vm.$el.classList.contains('kd-row-align-middle')).to.be.true;
    });

    it('tag', () => {
        vm = createVue({
            template: `
                <kd-row tag="p"></kd-row>
            `
        });
        expect(vm.$el.tagName).to.be.equal('P');
    });

});
