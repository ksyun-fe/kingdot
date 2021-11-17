import Button from 'components/Button/index.js';
import { resetHistory } from 'sinon';
import { createCons, createVue, destroyVM } from '../util';

describe('Button', () => {
    // 创建一个primary按钮
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('button primary', () => {
        vm = createCons(Button, {
            type: 'primary'
        });
        expect(vm.$el.classList.contains('kd-btn-primary')).to.be.true;
    });
    // 链接按钮
    it('button text', () => {
        vm = createCons(Button, {
            type: 'text'
        });
        expect(vm.$el.classList.contains('kd-btn-text')).to.be.true;
    });
    // 禁用按钮
    it('button disabled', () => {
        vm = createCons(Button, {
            disabled: true
        });
        expect(vm.$el.classList.contains('kd-btn-disabled')).true;
    });
    // 按钮加载效果
    it('button loading', () => {
        vm = createCons(Button, {
            loading: true
        });
        expect(vm.$el.classList.contains('kd-btn-loading')).to.be.true;
        expect(vm.$el.querySelector('.kd-btn-loading-icon')).to.be.ok;
    });
    it('button icon', () => {
        vm = createCons(Button, {
            icon: 'buttonIcon'
        });
        expect(vm.$el.querySelector('.buttonIcon')).to.be.ok;
    });
    it('button shape', () => {
        vm = createCons(Button, {
            shape: 'round'
        });
        expect(vm.$el.classList.contains('kd-btn-round')).true;
    });
    it('button size', () => {
        vm = createCons(Button, {
            size: 'large'
        });
        expect(vm.$el.classList.contains('kd-btn-large')).true;
    });
    it('button group of checkbox', () => {
        vm = createVue({
            template: `
                <kd-button-group checkType="checkbox" v-model="checkboxValue">
                    <kd-button value="1" >按钮1</kd-button>
                    <kd-button value="2">按钮2</kd-button>
                    <kd-button value="3">按钮3</kd-button>
                </kd-button-group>
            `,
            data(){
                return {
                    checkboxValue:['1']
                }
            }
        });
        expect(vm.$el.classList.contains('kd-btn-group-checkbox')).true;
    });
    it('button group of radio', () => {
        vm = createVue({
            template: `
                <kd-button-group checkType="radio" v-model="radioValue" >
                    <kd-button value="1" >按钮1</kd-button>
                    <kd-button value="2">按钮2</kd-button>
                    <kd-button value="3" >按钮3</kd-button>
                </kd-button-group>
            `,
            data(){
                return {
                    radioValue:'1'
                }
            }
        });
        expect(vm.$el.classList.contains('kd-btn-group-radio')).true;
    });
    // 点击按钮返回event事件
    it('click button', (done) => {
        let result;
        vm = createVue({
            template: `
        <Button type='primary' @click='btnTest'>测试</Button>
      `,
            methods: {
                btnTest(e) {
                    result = e;
                }
            }
        });
        vm.$el.click();
        setTimeout(() => {
            expect(result).to.exist;
            done();
        }, 50);
    });
    it('disabled not click button', done => {
        vm = createVue({
            template: `
                <kd-button type='primary' disabled @click='btnTest'>测试</kd-button>
            `,
            data(){
                return{
                    num:1
                }
            },
            methods: {
                btnTest() {
                    this.num = 2
                }
            }
        });
        vm.$nextTick().then((_) => {
            vm.$el.click();
            setTimeout(() => {
                expect(vm.num).to.not.equal(2);
                done();
            }, 500);
        })
    });
    it('loading not click button', done => {
        vm = createVue({
            template: `
                <kd-button @click='btnTest' loading ><span class="inner-text"></span></kd-button>
            `,
            data(){
                return {
                    num:1
                }
            },
            methods: {
                btnTest() {
                    this.num =2
                }
            }
        });
        vm.$nextTick().then((_) => {
            vm.$el.querySelector(".inner-text").click();
            setTimeout(() => {
                expect(vm.num).to.equal(1);
                done();
            }, 500);
        })
    });
    it('button has authid,but no Authority', async () => {
        vm = createCons(Button, {
            type: 'primary',
            authid:'zzz'
        });
        await vm.$nextTick().then((_) => {
            expect(vm.$el.classList.contains('kd-btn-disabled')).true;
        });
    });
    it('button has authid', async () => {
        vm = createVue({
            template: `
                <kd-button type='primary' authid="xxx">主要按钮</kd-button>
            `,
        });
        await vm.$nextTick().then((_) => {
            expect(vm.$el.classList.contains('kd-btn-disabled')).false;
        });
    });
    it('button has authid,but no Authority',async () => {
        vm = createCons(Button, {
            type: 'primary',
            authid:'zzz'
        });
        await vm.$nextTick().then((_) => {
            expect(vm.$el.classList.contains('kd-btn-disabled')).true;
        });
    });
    it('button has clickDelay', async () => {
        vm = createCons(Button, {
            type: 'primary',
            clickDelay:true
        });
        vm.$el.click();
        await vm.$nextTick().then((_) => {
            expect(vm.$el.classList.contains('kd-btn-disabled')).true;
        });
    });
});