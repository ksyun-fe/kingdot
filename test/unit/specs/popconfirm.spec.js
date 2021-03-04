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
                    title="title"
                    content="content"
                >
                    <button id="reference" ref="reference">trigger</button>
                </kd-popconfirm>
            </div>
        `);
    };
    it('click', function(done) {
        vm = createVM();
        const compo = vm.$refs.popconfirm;

        vm.$refs.reference.click();
        this.timeout(5000);
        setTimeout(() => {
            expect(compo.visible).to.be.true;
            console.log('xxxxxxxxx1===', compo.visible);
            document.body.click();
            setTimeout(() => {
                console.log('xxxxxxxxx2===', compo.visible);
                expect(compo.visible).to.be.false;
                done();
            }, 1000);
        }, 1000);
    });
});
