import { expect } from 'chai';
import { createCons, createVue, destroyVM } from '../util';
describe('tabs', () => {
    let vm;
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
            let classList = vm.$el.childNodes[0].childNodes[2].childNodes[0].classList;
            expect(classList.contains('kd-disabled')).to.be.true;
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
        let classList = vm.$el.childNodes[1].classList;
        expect(classList.contains('kd-add-tab')).to.be.true;
        vm.$el.childNodes[1].click();
        expect(vm.editableTabs.length).to.equal(3);
    })

})