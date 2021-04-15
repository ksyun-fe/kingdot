import Spinner from "components/Spinner/index.js";
import { createCons, createVue, destroyVM } from "../util";

describe("Spinner", () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it("created", () => {
        vm = createVue({
            template: `
              <kd-spinner v-model="value">
              </kd-spinner>
            `,
            data() {
                return {
                    value: 1,
                };
            },
        });
        let input = vm.$el.querySelector(".kd-input-inner");
        expect(input.value).be.equal("1");
    });
    it("disabled", () => {
        vm = createVue({
            template: ' <kd-spinner v-model="value" disabled></kd-spinner>',
            data() {
                return {
                    value: 1,
                };
            },
        });
        const increase = vm.$el.querySelector(".kd-spinner-add");
        const minus = vm.$el.querySelector(".kd-spinner-minus");
        let input = vm.$el.querySelector("input");
        increase.click();
        expect(input.value).be.equal("1");
        minus.click();
        expect(input.value).be.equal("1");
    });
    it("size", () => {
        const size = ["large", "mini", "small"];
        size.forEach((item) => {
            vm = createCons(Spinner, {
                size: item,
            });
            let el = vm.$el.classList.contains(`kd-spinner-${item}`);
            expect(el).to.true;
        });
    });
    it("btn position", () => {
        vm = createCons(Spinner, {
            buttonPosition: "right",
        });
        let el = vm.$el.classList.contains(`kd-spinner-right`);
        expect(el).to.true;
    });
    it("increase", (done) => {
        vm = createVue({
            template: ' <kd-spinner v-model="value"></kd-spinner>',
            data() {
                return {
                    value: 1,
                };
            },
        });
        const increase = vm.$el.querySelector(".kd-spinner-add");
        increase.click();
        const input = vm.$el.querySelector(".kd-input-inner");
        vm.$nextTick(() => {
            expect(input.value).be.equal("2");
            done();
        });
    });
    it("minus", (done) => {
        vm = createVue({
            template: ' <kd-spinner v-model="value"></kd-spinner>',
            data() {
                return {
                    value: 1,
                };
            },
        });
        const minus = vm.$el.querySelector(".kd-spinner-minus");
        const input = vm.$el.querySelector(".kd-input-inner");
        minus.click();
        vm.$nextTick(() => {
            expect(input.value).be.equal("0");
            done();
        });
    });
    it("precision", (done) => {
        vm = createVue({
            template: ' <kd-spinner v-model="value" :precision="1"></kd-spinner>',
            data() {
                return {
                    value: 1,
                };
            },
        });
        const input = vm.$el.querySelector(".kd-input-inner");
        vm.$nextTick(() => {
            console.log('value',input.value)
            expect(input.value).be.equal("1.0");
            done();
        });
    });
    it("increase or miuns is precision", (done) => {
        vm = createVue({
            template: ' <kd-spinner v-model="value" :precision="1"></kd-spinner>',
            data() {
                return {
                    value: 1,
                };
            },
        });
        const increase = vm.$el.querySelector(".kd-spinner-add");
        const minus = vm.$el.querySelector(".kd-spinner-minus");
        increase.click();
        const input = vm.$el.querySelector(".kd-input-inner");
        vm.$nextTick(() => {
            expect(input.value).be.equal("2.0");
            minus.click();
            vm.$nextTick(() => {
                expect(input.value).be.equal("1.0");
                done();
            })
        });
    });
});
