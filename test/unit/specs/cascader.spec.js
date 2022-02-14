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
        let value = [1, 7, 9];
        vm = createVue({
            template: `
                <kd-cascader
                    ref="cascader"
                    v-model="value"
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
                    value,
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
    it("base cascader", done => {
        vm = createVm();
        let el = document.querySelector(".kd-cascader-input");
        el.click();
        setTimeout(() => {
            let menu = document.querySelector(".kd-cascader-tooltip");
            expect(menu).to.ok;
            done();
        }, 0);
    });
    it("width", () => {
        vm = createVm();
        let width = vm.$refs.cascader.width
        expect(width).to.eql("300");
    });
    it("default value", async () => {
        vm = createVm({showAllLevels: true});
        await vm.$nextTick().then(() => {
            expect(document.querySelector("input").value).to.equal("option 1 / option 7 / option 9");
        })
    });
    it("disabled", done => {
        vm = createVm({disabled: true});
        let el = document.querySelector(".kd-cascader");
        expect(el.className).to.includes("kd-cascader-disabled");
        document.querySelector(".kd-cascader-input").click();
        setTimeout(() => {
            let menu = document.querySelector(".kd-cascader-tooltip");
            expect(menu).to.not.be.ok;
            done();
        }, 0);
    });
    it("clearable", done => {
        vm = createVm({clearable: true});
        let el = document.querySelector(".kd-cascader-input");
        triggerEvent(el, "mouseenter");
        setTimeout(() => {
            const clearBtn = document.querySelector(".kd-cascader-clear-icon");
            const input = document.querySelector("input");
            if (input.value && vm.value) expect(clearBtn).to.exist;
            clearBtn.click();
            setTimeout(() => {
                expect(input.value).to.equal('');
                expect(vm.value).to.deep.equal([]);
                expect(document.querySelector(".kd-cascader-arrow-icon")).to.exist;
                done();
            }, 0)
        }, 0)
    });
    it("just show leaf node", async () => {
        vm = createVm({showAllLevels: false});
        await vm.$nextTick().then(() => {
            expect(document.querySelector("input").value).to.equal("option 9");
        })
    });
    it("filterable", done => {
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
                done();
            }, 0);
        }, 0)
    });
});
