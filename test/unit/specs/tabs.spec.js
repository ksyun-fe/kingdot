import { expect } from 'chai';
import { createCons, createVue, destroyVM } from '../util';
describe('tabs', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    //创建一个默认的Tabs
    it('create Tabs Tab of default', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key'>
                   <kd-tab value='default'>默认</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'default',
                }
            }
        }, true)
        let classList = vm.$el.classList;
        expect(classList.contains('kd-tabs-default')).to.be.true;
    })
    //创建一个block标签Tabs
    it('create Tabs Tab of block', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' type='block'>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        let classList = vm.$el.classList;
        expect(classList.contains('kd-tabs-block')).to.be.true;
    })
    //创建一个card标签
    it('create Tabs Tab of card', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' type='card'>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        let classList = vm.$el.classList;
        expect(classList.contains('kd-tabs-card')).to.be.true;
    })
    //创建一个pagination标签
    it('create Tabs Tab of pagination', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' type='pagination'>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        let classList = vm.$el.classList;
        expect(classList.contains('kd-tabs-pagination')).to.be.true;
    })
    //创建一个vertical标签
    it('create Tabs Tab of vertical', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' type='vertical'>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        let classList = vm.$el.classList;
        expect(classList.contains('kd-tabs-vertical')).to.be.true;
    })
    //标签页的禁用
    it(' Tabs Tab of disabled', () => {
        vm = createVue({
            template: `
            <kd-tabs v-model='key' type='block'>
               <kd-tab value='block' disabled>disabled</kd-tab>
            </kd-tabs>
        `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        vm.$el.querySelector('.kd-disabled').click();
        expect(vm.$el.querySelector('.kd-disabled')).to.be.have;
    })
    //标签页的添加
    it(' Tabs Tab of add', () => {
        vm = createVue({
            template: `
            <kd-tabs  v-model='editableTabsValue' type='block' @addTab='addTab' :addable=true>
            <kd-tab v-for="item in editableTabs" :value='item.name' :key='item.name'>  {{item.title}}  </kd-tab>
            </kd-tabs>
        `,
            data() {
                return {
                    editableTabsValue: '2',
                    editableTabs: [{
                        title: 'Tab 1',
                        name: '1',
                    }, {
                        title: 'Tab 2',
                        name: '2',
                    }],
                    tabIndex: 2
                }
            },
            methods: {
                addTab() {
                    let newTabName = ++this.tabIndex + '';
                    this.editableTabs.push({
                        title: 'New Tab',
                        name: newTabName,
                    });
                    this.editableTabsValue = newTabName;
                },
            }
        }, true)
        vm.$nextTick().then(() => {
            let classList = vm.$el.childNodes[1].classList;
            expect(classList.contains('kd-add-tab')).to.be.true;
            vm.$el.childNodes[1].click();
            expect(vm.editableTabs.length).to.equal(3);
        })
    })
    //tab 关闭属性
    it('close Tabs ', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' closable>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        vm.$nextTick().then(() => {
            let obj = vm.$el.querySelector('.kd-guanbi');
            expect(obj).to.be.have;
        })
    })
    //点击 ‘X’关闭 tab
    it('close Tabs click', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' closable>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)
        vm.$nextTick().then(() => {
            vm.$el.querySelector('.kd-guanbi').click();
            expect(
                vm.$el.querySelector('.kd-tabs-content').textContent
            ).to.equal('')
        })
    })
    //标签页的选择
    it('Tabs click', () => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' closable>
                   <kd-tab value='block'>block</kd-tab>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                }
            }
        }, true)

        vm.$el.querySelector('.kd-tab').click();
        expect(
            vm.$el.querySelector('.kd-active')
        ).to.be.have

    })
    //标签页的选择
    it('set  addbutton', (done) => {
        vm = createVue({
            template: `
                <kd-tabs v-model='key' :addable=true  @addTab='addTab'>
                   <kd-tab value='block'>block</kd-tab>
                   <div slot='addable' class='addButton' v-if='show'>添加</div>
                </kd-tabs>
            `,
            data() {
                return {
                    key: 'block',
                    show: true
                }
            },
            methods: {
                addTab() {
                    this.show = false;
                },
            }
        }, true)
        expect(vm.$el.querySelector('.addButton').textContent).to.equal('添加')

        vm.$el.querySelector('.addButton').click();
        setTimeout(function () {
            expect(
                vm.$el.querySelector('.addButton')
            ).to.be.null
            done();
        }, 200);

    })
    // 点击tabs 移动到最前面
    it('move tab', (done) => {
        vm = createVue({
            template: `
            <kd-tabs v-model='key' handleTabMove>
               <kd-tab value='block1'>block1</kd-tab>
               <kd-tab value='block2'>block2</kd-tab>
               <kd-tab value='block3'>block3</kd-tab>
               <kd-tab value='block4'>block4</kd-tab>
               <kd-tab value='block5'>block5</kd-tab>
               <kd-tab value='block6'>block6</kd-tab>
               <kd-tab value='block7'>block7</kd-tab>
               <kd-tab value='block8'>block8</kd-tab>
               <kd-tab value='block9'>block9</kd-tab>
               <kd-tab value='block10'>block10</kd-tab>
               <kd-tab value='block11'>block11</kd-tab>
               <kd-tab value='block12'>block12</kd-tab>
               <kd-tab value='block13'>block13</kd-tab>
               <kd-tab value='block14'>block14</kd-tab>
               <kd-tab value='block15'>block15</kd-tab>
            </kd-tabs>
        `,
            data() {
                return {
                    key: 'block1'
                }
            },
        }, true)
        vm.$el.querySelector('.kd-tabs-content').childNodes[2].click();
        setTimeout(() => {
            expect(
                vm.$el.querySelector('.kd-tabs-content').style.marginLeft
            ).to.equal('-121px')
            done();
        }, 200);

    })
    // 左右滑动tabs
    it('left right move tab', (done) => {
        vm = createVue({
            template: `
            <kd-tabs v-model='key'>
               <kd-tab value='block1'>block1</kd-tab>
               <kd-tab value='block2'>block2</kd-tab>
               <kd-tab value='block3'>block3</kd-tab>
               <kd-tab value='block4'>block4</kd-tab>
               <kd-tab value='block5'>block5</kd-tab>
               <kd-tab value='block6'>block6</kd-tab>
               <kd-tab value='block7'>block7</kd-tab>
               <kd-tab value='block8'>block8</kd-tab>
               <kd-tab value='block9'>block9</kd-tab>
               <kd-tab value='block10'>block10</kd-tab>
               <kd-tab value='block11'>block11</kd-tab>
               <kd-tab value='block12'>block12</kd-tab>
               <kd-tab value='block13'>block13</kd-tab>
               <kd-tab value='block14'>block14</kd-tab>
               <kd-tab value='block15'>block15</kd-tab>
            </kd-tabs>
        `,
            data() {
                return {
                    key: 'block1'
                }
            },
        }, true)
        vm.$nextTick().then(() => {
            vm.$el.querySelector('.right').click();
            setTimeout(() => {
                expect(
                    vm.$el.querySelector('.kd-tabs-content').style.marginLeft
                ).to.equal('0px')
                done();
            }, 200);
        })
    })
})