// import Spinner from "components/Spinner/index.js";
import { expect } from "chai";
import { result } from "lodash";
import { createCons, createVue, destroyVM, triggerEvent } from "../util";
describe("dropdown", () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it("trigger click", (done) => {
        vm = createVue({
            template: `
                <kd-dropdown type="primary" trigger="click" >
                    <kd-button type="text">下拉菜单<i class="kdicon kd-icon-right kd-icon-arrow-down"></i></kd-button>
                    <kd-dropdown-menu slot="dropdown">
                        <kd-dropdown-item> 1 item </kd-dropdown-item>
                    </kd-dropdown-menu>
                </kd-dropdown>
            `,
        });
        let el = vm.$el.querySelector(".kd-btn");
        el.click();
        setTimeout(() => {
            let menu = document.querySelector(".kd-tooltip-inner");
            expect(menu).to.ok;
            done();
        }, 1000);
    });
    it("hide menu", (done) => {
        vm = createVue({
            template: `
                <kd-dropdown type="primary" trigger="click" >
                    <kd-button type="text">下拉菜单<i class="kdicon kd-icon-right kd-icon-arrow-down"></i></kd-button>
                    <kd-dropdown-menu slot="dropdown">
                        <kd-dropdown-item> 1 item </kd-dropdown-item>
                    </kd-dropdown-menu>
                </kd-dropdown>
            `,
        });
        let el = vm.$el.querySelector(".kd-btn");
        el.click();
        setTimeout(() => {
            el.click();
            setTimeout(() => {
                menu = document.querySelector(".kd-tooltip");
                expect(menu.style.display).to.eql('none')
                el.click();
                done();
            }, 500);
        }, 1000);
    });
    it("click hide", (done) => {
        let result = ''
        vm = createVue({
            template: `
                <kd-dropdown type="primary" trigger="click" >
                    <kd-button type="text">下拉菜单<i class="kdicon kd-icon-right kd-icon-arrow-down"></i></kd-button>
                    <kd-dropdown-menu slot="dropdown">
                        <kd-dropdown-item @click="handleClick" value="1item"> 1 item </kd-dropdown-item>
                    </kd-dropdown-menu>
                </kd-dropdown>
            `,
            methods:{
                handleClick(v){
                    result = v
                }
            }
        });
        let el = vm.$el.querySelector(".kd-btn");
        el.click();
        setTimeout(() => {
            let item = document.querySelector(".kd-dropdown-item");
            item.click();
            setTimeout(() => {
                expect(result).to.eql('1item');
                done();
            }, 500);
        }, 1000);
    });
    it("menu hide type", (done) => {
        let result = ''
        vm = createVue({
            template: `
                <kd-dropdown type="primary" trigger="click" :click-hide="false">
                    <kd-button type="text">下拉菜单<i class="kdicon kd-icon-right kd-icon-arrow-down"></i></kd-button>
                    <kd-dropdown-menu slot="dropdown">
                        <kd-dropdown-item @click="handleClick" value="1item"> 1 item </kd-dropdown-item>
                    </kd-dropdown-menu>
                </kd-dropdown>
            `,
            methods:{
                handleClick(v){
                    result = v
                }
            }
        });
        let el = vm.$el.querySelector(".kd-btn");
        el.click();
        setTimeout(() => {
            let item = document.querySelector(".kd-dropdown-item");
            item.click();
            setTimeout(() => {
                let tooltip = document.querySelector(".kd-tooltip");
                expect(tooltip.style.display).to.eql('none')
                done();
            }, 500);
        }, 1000);
    });
    
});
