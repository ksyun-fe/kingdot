import { createVue, triggerEvent, destroyVM } from '../util';

describe('Tooltip', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // create
    it('create', function(done) {
        vm = createVue({
            template: `
                <kd-tooltip ref="tooltip" content="提示文字">
                    <button>click1</button>
                </kd-tooltip>
            `
        });
        const tooltip = vm.$refs.tooltip;
        this.timeout(2000);
        setTimeout(() => {
            expect(tooltip.popperVM.$el).to.have.property('textContent', '提示文字');
            done();
        }, 1000);
    });
    // hover
    it('hover', function(done) {
        vm = createVue(`
            <kd-tooltip ref="tooltip" content="提示文字" canHover effect="dark">
                <button>click2</button>
            </kd-tooltip>
        `);
        const tooltip = vm.$refs.tooltip;
        triggerEvent(tooltip.$el, 'mouseenter');

        this.timeout(8000);
        setTimeout(() => {
            // popperVM is exist
            expect(tooltip.popperVM).to.exist;
            expect(tooltip.visible).to.be.true;

            triggerEvent(tooltip.$el, 'mouseleave');
            setTimeout(() => {
                expect(tooltip.visible).to.false;
                done();
            }, 3000)
        }, 3000);
    })
})
