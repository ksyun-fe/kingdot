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
                    title="title"
                    content="content"
                >
                    <button ref="reference">trigger ${trigger}</button>
                </kd-popover>
            </div>
        `);
    };
    it('click', function(done) {
        vm = createVM('click');
        const compo = vm.$refs.popover;
        vm.$refs.reference.click();
        this.timeout(3000);
        setTimeout(() => {
            console.log('popper1===', compo.visible);
            expect(compo.visible).to.true;
            document.body.click();
            setTimeout(() => {
                console.log('popper2===', compo.visible);
                expect(compo.visible).to.false;
                done();
            }, 1000);
        }, 1000);
    });
    it('hover', function(done) {
        vm = createVM('hover');
        const compo = vm.$refs.popover;
        const button = vm.$refs.reference;
        triggerEvent(button, 'mouseenter');
        this.timeout(3000);
        setTimeout(() => {
            console.log('popper3===', compo.visible);
            expect(compo.visible).to.true;
            triggerEvent(button, 'mouseleave');
            setTimeout(() => {
                console.log('popper4===', compo.visible);
                expect(compo.visible).to.false;
                done();
            }, 1000);
        }, 1000);
    });
})
