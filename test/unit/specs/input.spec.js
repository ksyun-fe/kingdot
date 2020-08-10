import Input from 'components/Input/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Switch', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // 创建基本input
        it('create input', () => {
            vm = createVue({
                template: `
                     <Input
                            placeholder="请输入内容"
                            v-model="age"
                            :maxlength="12"
                     />
                `,
                data() {
                    return {
                        age: 20
                    }
                }
            });
            const inputElem = vm.$el.querySelector('.kd-inner');
            expect(inputElem.getAttribute('placeholder')).to.equal('请输入内容');
            expect(inputElem.getAttribute('maxlength')).to.equal('12');

        })
});
