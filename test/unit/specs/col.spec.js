import {createVue, destroyVM} from '../util';

const mediaBreakSize = require('../../../src/media.js').mediaBreakSize;
describe('Col', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        vm = createVue({
            template: `
                <kd-col></kd-col>
            `
        });

        expect(vm.$el.classList.contains('kd-col')).to.be.true;
    });

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
        it(prop, () => {
            vm = createVue({
                template: `
                    <kd-col :[propName]="12"></kd-col>
                `,
                data() {
                    return {
                        propName: prop
                    };
                }
            });

            expect(vm.$el.classList.contains(`kd-col-${prop}-12`)).to.be.true;
        });
    });

    it('tag', () => {
        vm = createVue({
            template: `
                <kd-col tag="p"></kd-col>
            `
        });

        expect(vm.$el.tagName).to.be.equal('P');
    });

    it('xs', () => {
        vm = createVue({
            template: `
                <kd-col xs="4"></kd-col>
            `
        });

        expect(vm.$el.classList.contains(`kd-col-xs-span-4`)).to.be.true;
    });

    mediaBreakSize.forEach(size => {
        it(size + ' set obj', () => {
            let sizeData = {
                span: 4,
                offset: 8
            };
            vm = createVue({

                template: `
                    <kd-col v-bind:[size]="sizeData"></kd-col>
                `,
                data() {
                    return {
                        size: size,
                        sizeData: sizeData
                    };
                }
            });

            Object.keys(sizeData).forEach(prop => {
                expect(vm.$el.classList.contains(`kd-col-${size}-${prop}-${sizeData[prop]}`)).to.be.true;
            });

        });
    });
});
