import { createVue, triggerEvent, destroyVM } from '../util';

describe('Tooltip', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // create
    it('create', done => {
        vm = createVue({
            template: `
                <kd-tooltip ref="tooltip" content="提示文字">
                    <button>click1</button>
                </kd-tooltip>
            `
        });
        const tooltip = vm.$refs.tooltip;
        vm.$nextTick(() => {
            expect(tooltip.popperVM.$el).to.have.property('textContent', '提示文字');
            done();
        });
    });
    // hover
    describe('hover', () => {
        afterEach(() => {
            destroyVM(vm);
        });
        vm = createVue(`
            <kd-tooltip ref="tooltip" content="提示文字">
                <button>click2</button>
            </kd-tooltip>
        `);
        const tooltip = vm.$refs.tooltip;
        triggerEvent(tooltip.$el, 'mouseenter');
        it('popperVM is exist', () => expect(tooltip.popperVM).to.exist);
        it('show popper: visible is true', () => expect(tooltip.visible).to.true);
        it('close popper: visible is false', done => {
            triggerEvent(tooltip.$el, 'mouseleave');
            setTimeout(() => {
                expect(tooltip.visible).to.false;
                done();
            }, 300);
        });
    });
})
