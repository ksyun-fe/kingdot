import Form from 'components/Form/index.js';
import {createCons, createVue, destroyVM, triggerEvent} from '../util';

describe('Form', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // label width
    it('custom define label width', done => {
        vm = createVue({
            template: `
                   <kd-form
                        ref="form"
                        :labelWidth="230"
                   >
                         <kd-form-item
                                label="是否开启schema检核:"
                                model="isOpenSchema">
                            <kd-switch v-model="isOpenSchema"/>
                        </kd-form-item>
                   </kd-form>
            `,
            data() {
                return {
                    isOpenSchema: true
                }
            }
        });

        expect(vm.$el.querySelector('.kd-label').style.width).to.equal('230px');
        done();
    })
    // hide label
    it('hide label', done => {
        vm = createVue({
            template: `
                   <kd-form
                        ref="form"
                   >
                        <kd-form-item
                                ref="batchSize"
                                model="batchSize"
                                :showWarning="false"
                                :hideLabel="true"
                        >
                           <kd-input
                                   :fluid="true"
                                   placeholder="大于0小于1000000"
                                   v-model.trim="batchSize"/>
                       </kd-form-item>
                   </kd-form>
            `,
            data() {
                return {
                    batchSize: 10
                }
            }
        });
        expect(vm.$refs.batchSize.$el.querySelector('.kd-label')).to.be.null;
        done();
    });
    // control show message
    it('validate && show or hide message', (done) => {
        vm = createVue({
            template: `
                    <kd-form
                        ref="form"
                        @validateFail="validateFailHandler"
                        @submit="submitHandler"
                    >
                        <kd-form-item
                               ref="showMessage"
                               model="batchSize"
                               :rules="rules"
                               :showWarning="true"
                        >
                             <kd-input
                                :fluid="true"
                                placeholder="大于0小于100"
                                v-model.trim="batchSize"/>
                        </kd-form-item>
                        <kd-form-item
                                ref="hideMessage"
                                model="batchSize"
                                :rules="rules"
                                :showWarning="false"
                        >
                             <kd-input
                                :fluid="true"
                                placeholder="大于0小于100"
                                v-model.trim="batchSize"/>
                        </kd-form-item>
                    </kd-form>
            `,
            data() {
                return {
                    batchSize: 10,
                    rules: {
                        required: true,
                        min: 0,
                        max: 100
                    },
                    hasSubmit: false,
                    isValidateFail: false
                }
            },
            methods: {
                setValue(key, val) {
                    this[key] = val;
                },
                validateFailHandler() {
                    this.isValidateFail = true;
                },
                submitHandler() {
                    this.hasSubmit = true;
                }
            }
        });
        let showMessageEl = vm.$refs.showMessage.$el;
        let hideMessageEl = vm.$refs.hideMessage.$el;
        expect(showMessageEl.querySelector('.kd-form-item-validate-error')).to.be.null;
        expect(hideMessageEl.querySelector('.kd-form-item-validate-error')).to.be.null;
        expect(vm.isValidateFail).to.be.false;
        vm.setValue('batchSize', 1000);
        // triggerEvent(showMessageEl, 'change');
        // triggerEvent(hideMessageEl, 'change');
        vm.$refs.form.submit();
        setTimeout(() => {
            expect(showMessageEl.querySelector('.kd-form-item-validate-error')).to.be.exist;
            expect(hideMessageEl.querySelector('.kd-form-item-validate-error')).to.be.null;
            done();
        }, 1000);
        vm.$refs.form.validate().then(async (isValid) => {
            expect(isValid).to.be.false;
            await vm.$nextTick().then(() => {
                expect(vm.isValidateFail).to.be.true;
            })
            vm.setValue('batchSize', 1000);
            vm.$refs.form.validate().then((isValid) => {
                expect(isValid).to.be.true;
            });
        });
    });
});

