import Switch from 'components/Switch/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Switch', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // 基本样式与文案是否正确
    it('switch large && text', () => {
        vm = createCons(Switch, {
            value: true,
            size: 'large',
            activeText: 'on'
        }, true)
        const switchElem = vm.$el;
        const activeTextElem = vm.$el.querySelector('.kd-switch-active');
        expect(switchElem.classList.contains('kd-switch-large')).to.equal(true);
        expect(activeTextElem.innerText).to.equal('on');
    });

    // 自定义width height
    it('switch custom width & height', () => {
        vm = createCons(Switch,{
            value: false,
            width: 80,
            height: 32
        }, true);
        const switchElem = vm.$el;
        const coreElem = vm.$el.querySelector('.kd-switch-round');
        expect(switchElem.classList.contains('kd-switch-default')).to.equal(true);
        expect(switchElem.style.width).to.equal('80px');
        expect(switchElem.style.height).to.equal('32px');
        expect(switchElem.style.borderRadius).to.equal('16px');
        expect(coreElem.style.width).to.equal('28px');
        expect(coreElem.style.height).to.equal('28px');
        expect(coreElem.style.borderRadius).to.equal('14px');
    });

    // 事件触发
    it('switch trigger change event', () => {
        vm = createVue({
            template: `
                <div>
                    <KdSwitch
                        v-model="val"
                        :active-value="activeValue"
                        :inactive-value="inactiveValue"
                        active-text="on"
                        inactive-text="off"
                        @change="changeHandler"
                    ></KdSwitch>
                </div>
            `,
            data() {
                return {
                    val: 0,
                    isEmitChange: false,
                    activeValue: 100,
                    inactiveValue: 0
                }
            },
            methods: {
                changeHandler(e) {
                    this.isEmitChange = this.val === this.activeValue;
                }
            }
        }, true);
        const switchElem = vm.$el.querySelector('.kd-switch');
        const core = vm.$el.querySelector('.kd-switch-round');
        expect(switchElem.querySelector('.kd-switch-inactive').innerText).to.equal('off');
        core.click();
        setTimeout(()=> {
            expect(switchElem.querySelector('.kd-switch-active').innerText).to.equal('on');
            expect(vm.val).to.equal(100);
            expect(vm.isEmitChange).to.equal(true);
            core.click();
            setTimeout(() => {
                expect(switchElem.querySelector('.kd-switch-inactive').innerText).to.equal('off');
                expect(vm.val).to.equal(0);
                expect(vm.isEmitChange).to.equal(false);
            });
        }, 10);
    });
});
