import Breadcrumb from 'components/Breadcrumb/index.js';
import { createCons, createVue, destroyVM } from '../util';
describe('Breadcrunmb',()=>{
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    //创建一个默认的breadcrumb
    it('create default Breadcrumb', (done) => {
        vm = createVue({
            template: `
                <Breadcrumb>
                    <BreadcrumbItem>一级菜单</BreadcrumbItem>
                    <BreadcrumbItem>二级菜单</BreadcrumbItem>
                    <BreadcrumbItem>三级菜单</BreadcrumbItem>
                </Breadcrumb>
         `
        });
        vm.$el;
        setTimeout(() => {
            expect(vm.$el.querySelector('.kd-separator-item').classList.contains('kd-icon-arrow-right')).to.true;
            done();
        }, 500);
    });
    // 创建一个自定义分隔符的Breadcrumb
    it('create Breadcrumb is custom separator', (done) => {
        vm = createVue({
            template: `
                <Breadcrumb separator="/">
                    <BreadcrumbItem>一级菜单</BreadcrumbItem>
                    <BreadcrumbItem>二级菜单</BreadcrumbItem>
                    <BreadcrumbItem>三级菜单</BreadcrumbItem>
                </Breadcrumb>
         `
        });
        vm.$el;
        setTimeout(() => {
            expect(vm.$el.querySelector('.kd-separator-item').innerText).to.equal('/');
            done();
        }, 500);
    });
})