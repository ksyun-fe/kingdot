import { createVue, triggerEvent, destroyVM } from '../util';

describe('Popper', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // trigger
    const createVM = (trigger) => {
        return createVue(`
            <div>
                <kd-popover
                    ref="popover"
                    trigger="${trigger}"
                    content="content"
                >
                    <button ref="reference">trigger ${trigger}</button>
                </kd-popover>
            </div>
        `);
    };
    it('click', () => {
        vm = createVM('click');
        const compo = vm.$refs.popover;
        vm.$refs.reference.click();
        vm.$nextTick(() => {
            expect(compo.visible).to.true;
            document.body.click();
            expect(compo.visible).to.false;
        })
    });
    it('hover', () => {
        vm = createVM('hover');
        const compo = vm.$refs.popover;
        const button = vm.$refs.reference;
        triggerEvent(button, 'mouseenter');
        vm.$nextTick(() => {
            expect(compo.visible).to.true;
        })
        triggerEvent(button, 'mouseleave');
        vm.$nextTick(() => {
            expect(compo.visible).to.false;
        })
    });
})
