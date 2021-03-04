import { createVue, destroyVM } from '../util';

describe('Transition', () => {
    afterEach(() => {
        if (!vm) return;
        destroyVM(vm);
    });
    let vm;
    let template = `
        <kd-transition :type="type" :motion="motion">
            <div v-show="show">
                <div style="widht:300px;height:300px;"></div>
            </div>
        </kd-transition>
    `;
    let normalTest = function (show, type, motion = '') {
        let name = `type: ${type} ${motion} ${show ? 'hide' : 'show'}`;
        if (vm) {
            destroyVM(vm);
        }
        it(name, async () => {
            vm = createVue({
                template: template,
                data() {
                    return {
                        show: show,
                        type: type,
                        motion: motion
                    }
                }
            });
            let action = vm.show ? 'leave' : 'enter';
            vm.show = !show;
            await vm.$nextTick().then(() => {
                expect(vm.$el.classList.contains(`${type}${motion ? '-' + motion : ''}-${action}`)).to.be.true;
                expect(vm.$el.classList.contains(`${type}${motion ? '-' + motion : ''}-${action}-active`)).to.be.true;
            });
        });
    }
    // normal
    let pos1 = ['up', 'down', 'left', 'right'];
    let pos2 = ['', 'big', 'big-fast'];
    let types = ['zoom', 'move', 'slide'];
    pos2.forEach(pos => {
        normalTest(true, 'zoom', pos);
        normalTest(false, 'zoom', pos);
    })
    types.forEach(type => {
        pos1.forEach(motion => {
            normalTest(true, type, motion);
            normalTest(false, type, motion);
        })
    })
    // fade
    normalTest(true, 'fade', '');
    normalTest(false, 'fade', '');
    // swing
    normalTest(true, 'swing', '');
    normalTest(false, 'swing', '');
    // collapse show
    it('type: collapse show', async () => {
        vm = createVue({
            template: template,
            data() {
                return {
                    show: true,
                    type: 'collapse',
                    motion: ''
                }
            }
        });
        vm.show = false;
        await vm.$nextTick().then(() => {
            expect(vm.$el.classList.contains('kd-collapse-transition')).to.be.true;
        });
    });
    // collapse hide
    it('type: collapse hide', async () => {
        vm = createVue({
            template: template,
            data() {
                return {
                    show: false,
                    type: 'collapse',
                    motion: ''
                }
            }
        });
        vm.show = true;
        await vm.$nextTick().then(() => {
            expect(vm.$el.classList.contains('kd-collapse-transition')).to.be.true;
        });
    });
});
