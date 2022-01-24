import { expect } from "chai";
import { createVue, triggerEvent, destroyVM } from "../util";

describe("cascader", () => {
    let vm, tooltip;
    let configList = ["disabled", "clearable", "showAllLevels", "filterable"];

    let createVm = (datas = {}) => {
        configList.forEach((item) => {
            datas[item] = datas[item] || false;
        });
        let options = [
            {
                label: "option 1",
                value: 1,
                children: [{
                    label: "option 4",
                    value: 4,
                    disabled: true,
                    children: []
                }, {
                    label: "option 5",
                    value: 5,
                    disabled: true,
                    children: [{
                        label: "option 6",
                        value: 6
                    }]
                }, {
                    label: "option 7",
                    value: 7,
                    children: [{
                        label: "option 8",
                        value: 8
                    },{
                        label: "option 9",
                        value: 9
                    }]
                }]
            }, 
            {
                label: "option 2",
                value: 2,
                disabled: true
            },
            {
                label: "option 3",
                value: 3
            }
        ];
        let defaultValue = [1, 7, 9];
        vm = createVue({
            template: `
                <kd-cascader
                    ref="cascader"
                    v-model="defaultValue"
                    width="300"
                    :options="options"
                    :disabled="disabled"
                    :clearable="clearable"
                    :show-all-levels="showAllLevels"
                    :filterable="filterable"
                >
                </kd-cascader>
            `,
            data() {
                return {
                    options,
                    defaultValue,
                    ...datas,
                };
            },
        });
        return vm;
    };
    afterEach(() => {
        destroyVM(vm);
        destroyVM(tooltip);
    });
    it("base cascader", () => {
        vm = createVm();
        let el = vm.$el.querySelector(".kd-cascader-input");
        el.click();
        setTimeout(() => {
            let menu = document.querySelector(".kd-cascader-tooltip");
            expect(menu).to.ok;
        }, 1000);
    });
    it("width", () => {
        vm = createVm();
        let width = vm.$refs.cascader.width
        expect(width).to.eql("300");
    });
    it("default value", () => {
        vm = createVm({showAllLevels: true});
        setTimeout(() => {
            const menus = vm.$el.querySelector(".kd-cascader-menu");
            expect(menus.length).to.equal(3);
            expect(vm.$el.querySelector("input").value).to.equal("option 1 / option 7 / option 9");
        }, 1000)
    });
    it("disabled", () => {
        vm = createVm({disabled: true});
        let el = document.querySelector(".kd-cascader");
        el.click();
        expect(el.className).to.includes("kd-cascader-disabled");
        setTimeout(() => {
            let menu = document.querySelector(".kd-cascader-tooltip");
            expect(menu.style.display).to.includes("none");
        }, 1000)
    });
    it("clearable", () => {
        vm = createVm({clearable: true});
        triggerEvent(vm.$el, "mouseenter");
        setTimeout(() => {
            const clearBtn = vm.$el.querySelector(".kd-cascader-clear-icon");
            if (vm.value) expect(clearBtn).to.exist;
            clearBtn.click();
            setTimeout(() => {
                expect(vm.value).to.deep.equal([]);
                expect(vm.$el.querySelector(".kd-cascader-arrow-icon")).to.exist;
            }, 1000)
        }, 1000)
    });
    it("just show leaf node", () => {
        vm = createVm({showAllLevels: false});
        setTimeout(() => {
            const menus = vm.$el.querySelector(".kd-cascader-menu");
            expect(menus.length).to.equal(3);
            expect(vm.$el.querySelector("input").value).to.equal("option 9");
        }, 1000)
    });
    it("filterable", () => {
        vm = createVm({filterable: true});
        const input = vm.$el.querySelector('.kd-cascader-input-inner');
        input.click();
        input.value = '7';
        triggerEvent(input, 'input');
        setTimeout(() => {
            expect(document.querySelector('.kd-cascader-suggest')).to.exist;
            expect(document.querySelectorAll('.kd-cascader-suggest-li').length).to.equal(2);
            document.querySelectorAll('.kd-cascader-suggest-li')[0].click();
            setTimeout(() => {
                expect(vm.value).to.deep.equal([1, 7, 8]);
            }, 1000);
        }, 1000)
    });
});
