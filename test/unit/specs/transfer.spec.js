import { createVue, destroyVM } from '../util';
describe('Transfer',()=>{
    let vm;
      afterEach(()=>{
        destroyVM(vm)
      });
      //创建一个基础的transfer
    it('create Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                        {
                            key:3,
                            label:`item3`,
                        },
                ],
                value: [1,2]
                }
            }
        })
        expect(vm.$el.classList.contains('kd-transfer')).to.be.true;
    })
    //测试向右侧移动数据
    it('to right Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" ref="transfer" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                            checked: true
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                ],
                value: [],
                }
            },
        })
        vm.$refs.transfer.toTargetClick()
        vm.$nextTick().then(()=>{
            expect(vm.value).to.equal([1]);
        })

    })
    //测试向左移动数据
    it('to left Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" ref="transfer" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                            checked: true
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                ],
                value: [1]
                }
            }
        })
        vm.$refs.transfer.toSourceClick()
        vm.$nextTick().then(()=>{
            expect(vm.value).to.equal([]);
        })
    })
    //全选
    it('checkedAll Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: []
                }
            }
        })
        vm.$el.querySelector('.kd-checkbox').click()
        vm.$nextTick().then(()=>{
            expect(vm.defaultData[0].checked).to.equal(true);
            expect(vm.defaultData[1].checked).to.equal(true);
        })
    })
    it('checkedAll Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: [1,2]
                }
            }
        })
        vm.$el.querySelectorAll('.kd-checkbox')[1].click()
        vm.$nextTick().then(()=>{
            expect(vm.defaultData[0].checked).to.equal(true);
            expect(vm.defaultData[1].checked).to.equal(true);
        })
    })
    //左侧单选
    it('checked Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                            checked:true
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: []
                }
            }
        })
        vm.$el.querySelector('.kd-transfer-content-item').click()
        vm.$nextTick().then(()=>{
            expect(vm.defaultData[0].checked).to.equal(false);
        })
        
    })
    //右侧单选
    it('checkedright Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`,
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: [1,2]
                }
            }
        })
        vm.$el.querySelector('.kd-transfer-content-label').click()
        vm.$nextTick().then(()=>{ 
            expect(vm.$el.querySelector('.kd-transfer-active')).to.be.true;
        })
        vm.$el.querySelector('.kd-checkbox-input').click()
        vm.$nextTick().then(()=>{ 
            expect(vm.$el.querySelector('.kd-transfer-active')).to.be.true;
        })
    })
    //虚拟列表
    it('virtualScroll Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :virtualScroll="true" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {                                
                    defaultData:[
                        {
                            key:1,
                            label:`item1`
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: []
                }
            }
            
        })
        vm.$nextTick().then(()=>{
            expect(vm.$el.classList.contains('kd-transfer-content-virtual')).to.be.true;
        })
    })
    //搜索
    it('search Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" :data="defaultData" showFilter :filter-method="filterMethod">
                        </kd-transfer>
                    `,
            data() {
                return {
                    defaultData:[
                        {
                            key:1,
                            label:`item1`
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: [],
                    filterMethod(item, serachText){
                        return item.label.indexOf(serachText) > -1;
                    }
                }
            }
        })
        let el = vm.$el.querySelector('.kd-input-inner')
        el.value = 'item2'
        vm.$nextTick().then(()=>{
            let tooltip = document.querySelector(".kd-transfer-content-label")[0];
            let isTrue = tooltip.innerHTML
            expect(isTrue).to.equal('item2')
        })
    })
    //更改标题名称
    it('checkName Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer :title="titles" v-model="value" :data="defaultData">
                        </kd-transfer>
                    `,
            data() {
                return {                                
                    defaultData:[
                        {
                            key:1,
                            label:`item1`
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: [],
                    titles:['列表1','列表2']
                }
            }
            
        })
        vm.$nextTick().then(()=>{
            let el = vm.$el.querySelector('.kd-checkbox-text').firstChild
            let els = el.firstChild
            let isTrue = els.innerHTML
            expect(isTrue).to.equal('列表1')
        })
    })
    //自定义内容
    it('foot Transfer',()=>{
        vm = createVue({
            template: `
                        <kd-transfer v-model="value" buttonLevel :data="defaultData">
                                <span slot-scope="option">{{option.name}}...</span>
                                <kd-button slot="left-bottom">更多</kd-button>
                                <kd-button slot="right-bottom">更多</kd-button>
                        </kd-transfer>
                    `,
            data() {
                return {                                
                    defaultData:[
                        {
                            key:1,
                            label:`item1`
                        },
                        {
                            key:2,
                            label:`item2`,
                        },
                    ],
                    value: []
                }
            }
            
        })
        vm.$nextTick().then(()=>{
            let el = vm.$el.querySelector('.kd-transfer-content-item')
            let isTrue = el.innerHTML
            expect(isTrue).to.equal('item1...')
            expect(vm.$el.classList.contains('kd-transfer-panel-footer')).to.true
        })
    })
})