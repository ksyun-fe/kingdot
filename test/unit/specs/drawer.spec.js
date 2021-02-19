import { expect } from 'chai';
import Drawer from '../../../components/Drawer/drawer.vue';
import { createCons, createVue, destroyVM } from '../util';
describe('drawer', () => {
    let vm
    afterEach(() => {
        destroyVM(vm);
    });
    //创建一个默认的drawer
    it('create drawer of default', () => {
        vm = createCons(Drawer, {
            value: true
        })
        expect(vm.$el.childNodes[1].classList.contains('kd-drawer-main')).to.be.true;
        expect(vm.$el.childNodes[0].classList.contains('kd-drawer-overlay')).to.be.true;
    });

    //自定义header
    it('custom drawer header', () => {
        vm = createCons(Drawer, {
            value: true,
            title: "我是自定义标题"
        })
        let text = vm.$el.childNodes[1].childNodes[0].childNodes[0].textContent;
        expect(text).to.equal('我是自定义标题');
    })

    //重构header
    it('Refactoring drawer header', () => {
        vm = createVue({
            template: `
                <kd-drawer  
                   v-model="visible"
               >
                  <div slot="header">我是重构标题</div>
               <kd-drawer>
            `,
            data() {
                return {
                    visible: true
                }
            }
        }, true)
        let text = vm.$el.childNodes[1].childNodes[0].childNodes[0].childNodes[0].textContent;
        expect(text).to.equal('我是重构标题');
    })

    //隐藏header
    it('hide drawer header', () => {
        vm = createCons(Drawer, {
            value: true,
            showHeader: false
        })
        let title = vm.$el.childNodes[1].childNodes[0].textContent;
        expect(title).to.equal('');
    })

    //自定义 footer
    it('custom drawer footer', () => {
            vm = createVue({
                template: `
                <kd-drawer  
                 v-model="visible"
                >
              <div slot="footer">
                <Button>自定义</Button>
              </div>
                <kd-drawer>
            `,
                data() {
                    return {
                        visible: true
                    }
                }
            }, true)
            let footer = vm.$el.childNodes[1].childNodes[2].childNodes[0].childNodes[0];
            expect(footer.classList[0]).to.equal('kd-btn');
        })
        //隐藏 footer
    it('hide drawer footer', () => {
        vm = createCons(Drawer, {
            value: true,
            showFooter: false
        })
        let footer = vm.$el.childNodes[1].childNodes[2].textContent;
        expect(footer).to.equal('');
    })

    //点击X关闭 drawer
    it('close drawer', () => {
            vm = createVue({
                template: `
                <kd-drawer  
                 v-model="visible"
                >
                <kd-drawer>
            `,
                data() {
                    return {
                        visible: true
                    }
                }
            }, true)
            vm.$el.childNodes[1].childNodes[0].childNodes[1].click();
            setTimeout(() => {
                expect(vm.visible).to.be.false;
                done();
            }, 500);
        })
        //自定义内容
    it('custom drawer content', () => {
        vm = createVue({
            template: `
                <kd-drawer  
                 v-model="visible"
                >自定义内容<kd-drawer>
            `,
            data() {
                return {
                    visible: true
                }
            }
        }, true)
        let contentText = vm.$el.childNodes[1].childNodes[1].childNodes[0].textContent;
        expect(contentText).to.equal('自定义内容');
    })
})