import { expect } from "chai";
import { createVue, destroyVM } from "../util";
describe("cascader", () => {
    let vm, tooltip;
    let getVm = (datas = {}) => {
        let options = [
            {
                label: 'option 1',
                value: 1,
                children: [{
                    label: 'option 4',
                    value: 4,
                    disabled: true,
                    children: []
                }, {
                    label: 'option 5',
                    value: 5,
                    disabled: true,
                    children: [{
                        label: 'option 6',
                        value: 6
                    }]
                }, {
                    label: 'option 7',
                    value: 7,
                    children: [{
                        label: 'option 8',
                        value: 8
                    },{
                        label: 'option 9',
                        value: 9
                    }]
                }]
            }, 
            {
                label: 'option 2',
                value: 2,
                disabled: true
            },
            {
                label: 'option 3',
                value: 3
            }
        ];
        vm = createVue({
            template: `
                <kd-cascader
                    ref="cascader"
                    v-model="defaultValue"
                    :options="options"
                    :disabled="disabled"
                    :clearable="clearable"
                    :expandTrigger="triggerType"
                >
                </kd-cascader>
            `,
            data() {
                return {
                    options,
                    ...datas,
                };
            },
        });
        input = vm.$el.querySelector(".kd-cascader-input-inner");

        return vm;
    };
    afterEach(() => {
        destroyVM(vm);
        destroyVM(tooltip);
    });
    // it("width", (done) => {
    //     vm = getVm();
    //     let width = vm.$refs.cascader.width
    //     expect(width).to.eql('200');
    //     done();
    // });
});
