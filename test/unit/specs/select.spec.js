// import Spinner from "components/Spinner/index.js";
import { expect } from "chai";
import { createVue, destroyVM } from "../util";
describe("select", () => {
    let vm, input, tooltip;
    let configList = ["disabled", "multiple", "value","showFilter"];
    let getVm = (datas = {}) => {
        configList.forEach((item) => {
            let value = item === "value" ? datas[item] || "item1" : false;
            datas[item] = datas[item] || value;
        });
        let options = [
            {
                value: "item1",
                label: "item1",
            },
            {
                value: "item2",
                label: "item2",
            },
            {
                value: "item3",
                label: "item3",
                disabled: true,
            },
        ];
        vm = createVue({
            template: `
                <kd-select v-model="value" 
                    placeholder="请选择内容" 
                    ref="select"
                    width="200"
                    :disabled="disabled" 
                    :multiple="multiple"
                    :showFilter="showFilter"
                >
                    <kd-option v-for="item in options" :key="item.value" :value="item.value">{{ item.label }}
                    </kd-option>
                </kd-select>
            `,
            data() {
                return {
                    options,
                    ...datas,
                };
            },
        });
        input = vm.$el.querySelector(".kd-select-input-inner");

        return vm;
    };
    afterEach(() => {
        destroyVM(vm);
        destroyVM(tooltip);
    });
    it("base", (done) => {
        vm = getVm();
        let el = vm.$el.querySelector(".kd-select-input-inner");
        el.click();
        setTimeout(() => {
            let menu = document.querySelector(".kd-tooltip-inner");
            expect(menu).to.ok;
            done();
        }, 1000);
    });
    it("default value", (done) => {
        vm = getVm();
        let el = vm.$el.querySelector(".kd-select-input-inner");
        vm.$nextTick(() => {
            expect(el.value).to.eql("item1");
            done();
        });
    });
    it("disabled select", (done) => {
        vm = getVm({ disabled: true });
        let el = vm.$el.querySelector(".kd-select-input-inner");
        let select = vm.$refs.select;
        el.click();
        expect(select.dropdownMenu).to.false;
        done();
    });
    it("width", (done) => {
        vm = getVm();
        let width = vm.$refs.select.width
        expect(width).to.eql('200');
        done();
    });
    it("filter", (done) => {
        vm = getVm({showFilter:true});
        let el = vm.$el.querySelector(".kd-select-input-inner");
        el.click();
        el.value = 'item1'
        setTimeout(()=>{
            let tooltip = document.querySelector(".kd-option");
            let isTrue = tooltip.innerHTML.indexOf('item1') > -1
            expect(isTrue).to.true
            done();
        },1000)
    });
});
