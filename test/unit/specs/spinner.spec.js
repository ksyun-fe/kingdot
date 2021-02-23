import Spinner from "components/Spinner/index.js";
import { createCons, createVue, destroyVM } from "../util";

describe("Spinner", () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it("created", () => {
        vm = createVue(
            {
                template: `
              <kd-spinner v-model="value">
              </kd-spinner>
            `,
                data() {
                    return {
                        value: 1,
                    };
                },
            },
            true
        );
        let input = vm.$el.querySelector("input");
        expect(input.value).be.equal("1");
    });
});
