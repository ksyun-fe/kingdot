import { createVue, destroyVM } from '../util';

describe('Popconfirm', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    const createVM = () => {
        return createVue(`
            <div>
                <kd-popconfirm
                    ref="popconfirm"
                    title="content"
                >
                    <button ref="reference">trigger</button>
                </kd-popconfirm>
            </div>
        `);
    };
    it('click', () => {
        vm = createVM();
        const compo = vm.$refs.popconfirm;
        vm.$refs.reference.click();
        vm.$nextTick(() => {
            expect(compo.visible).to.true;
            document.body.click();
            expect(compo.visible).to.false;
        })
    });
});
