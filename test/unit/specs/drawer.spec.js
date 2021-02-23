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
        expect(vm.$el.classList.contains('kd-drawer')).to.be.ok;
        expect(vm.$el.querySelector('.kd-drawer-main').style.right).to.equal('0px')
        expect(vm.$el.querySelector('.kd-drawer-main').style.height).to.equal('')
        expect(vm.$el.querySelector('.kd-drawer-main').style.width).to.equal('480px')
    });

    //创建一个top Drawer
    it('create drawer of top', () => {
            vm = createCons(Drawer, {
                value: true,
                position: 'top'
            })
            expect(vm.$el.querySelector('.kd-drawer-main').style.top).to.equal('0px')
            expect(vm.$el.querySelector('.kd-drawer-main').style.height).to.equal('300px')
            expect(vm.$el.querySelector('.kd-drawer-main').style.width).to.equal('100%')
        })
        //创建一个bottom Drawer
    it('create drawer of bottom', () => {
            vm = createCons(Drawer, {
                value: true,
                position: 'bottom'
            })
            expect(vm.$el.querySelector('.kd-drawer-main').style.bottom).to.equal('0px')
            expect(vm.$el.querySelector('.kd-drawer-main').style.height).to.equal('300px')
            expect(vm.$el.querySelector('.kd-drawer-main').style.width).to.equal('100%')
        })
        //创建一个left Drawer
    it('create drawer of left', () => {
        vm = createCons(Drawer, {
            value: true,
            position: 'left'
        })
        expect(vm.$el.classList.contains('kd-drawer')).to.be.ok;
    })

    //自定义header
    it('custom drawer header', () => {
        vm = createCons(Drawer, {
            value: true,
            title: "我是自定义标题"
        })
        let text = vm.$el.querySelector('.kd-drawer-title').textContent;
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
               </kd-drawer>
            `,
            data() {
                return {
                    visible: true
                }
            }
        }, true)
        let text = vm.$el.querySelector('.kd-drawer-txt').childNodes[0].textContent;

        expect(text).to.equal('我是重构标题');
    })

    //隐藏header
    it('hide drawer header', () => {
        vm = createCons(Drawer, {
            value: true,
            showHeader: false
        })
        let title = vm.$el.querySelector('.kd-drawer-title');
        expect(title).to.be.null;
    })

    //自定义 footer
    it('custom drawer footer', () => {
            vm = createVue({
                template: `
                <kd-drawer  
                 v-model="visible"
                >
              <div slot="footer">
                <kd-button>自定义</kd-button>
              </div>
                </kd-drawer>
            `,
                data() {
                    return {
                        visible: true
                    }
                }
            }, true)
            let footer = vm.$el.querySelector('.kd-drawer-footer').querySelector('button');
            expect(footer.classList[0]).to.equal('kd-btn');
        })
        //隐藏 footer
    it('hide drawer footer', () => {
        vm = createCons(Drawer, {
            value: true,
            showFooter: false
        })
        let footer = vm.$el.querySelector('.kd-drawer-footer');
        expect(footer).to.be.null;
    })

    //点击X关闭 drawer
    it('close drawer', async() => {
            vm = createVue({
                template: `
                <kd-drawer  
                 v-model="visible"
                >
                </kd-drawer>
            `,
                data() {
                    return {
                        visible: true
                    }
                }
            }, true)
            vm.$el.querySelector('span.kd-drawer-close-icon').click();
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
                >自定义内容</kd-drawer>
            `,
                data() {
                    return {
                        visible: true
                    }
                }
            }, true)
            let contentText = vm.$el.querySelector('.kd-drawer-body').textContent;
            expect(contentText).to.equal('自定义内容');
        })
        //按钮文字
    it('button text', () => {
            vm = createCons(Drawer, {
                value: true
            })
            let oktext = vm.$el.querySelector('.kd-drawer-truebutton').textContent;
            let canceltext = vm.$el.querySelector('.kd-drawer-closbutton').textContent;
            expect(oktext).to.equal('确定');
            expect(canceltext).to.equal('取消');
        })
        //自定义按钮文字
    it('button text', () => {
        vm = createCons(Drawer, {
            value: true,
            okText: '自定义确认',
            cancelText: '自定义取消'
        })
        let oktext = vm.$el.querySelector('.kd-drawer-truebutton').textContent;
        let canceltext = vm.$el.querySelector('.kd-drawer-closbutton').textContent;
        expect(oktext).to.equal('自定义确认');
        expect(canceltext).to.equal('自定义取消');
    })

    // 确认操作
    it('ok', async() => {
            vm = createVue({
                template: `
            <kd-drawer v-model="visible" :ok='okFn' :cancel='cancelFn'>
            {{num}}
            </kd-drawer>
          `,
                data() {
                    return {
                        visible: true,
                        num: 0
                    }
                },
                methods: {
                    okFn() {
                        this.num = 1
                    },
                    cancelFn() {
                        this.num = -1
                    }
                }
            }, true)
            await vm.$nextTick().then((_) => {
                vm.$el.querySelector('.kd-drawer-truebutton').click();
                setTimeout(function() {
                    expect(
                        vm.$el.querySelector('.kd-drawer-body').textContent
                    ).to.equal(1);
                }, 200);
            })

        })
        // 取消操作
    it('cancel', async() => {
            vm = createVue({
                template: `
            <kd-drawer v-model="visible"  :cancel='cancelFn'>
            {{num}}
            </kd-drawer>
          `,
                data() {
                    return {
                        visible: true,
                        num: 0
                    }
                },
                methods: {
                    cancelFn() {
                        this.num = -1
                    }
                }
            }, true)
            await vm.$nextTick().then((_) => {
                vm.$el.querySelector('.kd-drawer-closbutton').click();
                setTimeout(function() {
                    expect(
                        vm.$el.querySelector('.kd-drawer-body').textContent
                    ).to.equal(-1);
                }, 200);
            })

        })
        //是否有遮罩层
    it('show mask', () => {
            vm = createCons(Drawer, {
                value: true,
            })
            expect(vm.$el.querySelector('.kd-drawer-overlay')).to.be.have;
        })
        //点击遮罩关闭抽屉
    it('close mask', async() => {
        vm = createCons(Drawer, {
            value: true,
            maskClosable: true
        })
        await vm.$nextTick().then((_) => {
            vm.$el.querySelector('.kd-drawer-overlay').click();
            setTimeout(function() {
                expect(
                    vm.$el.querySelector('.kd-drawer')
                ).to.be.null
            }, 200);
        })
    })

})