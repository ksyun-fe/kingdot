import {createCons, createVue, destroyVM} from '../util';

describe('Checkbox', () => {
    let vm;

    afterEach(() => {
        destroyVM(vm);
    });

    it('create', () => {
        let el;
        vm = createVue({
            template: `<KdCheckbox>Javascript</KdCheckbox>`,
        }, true);
        el = vm.$el;
        expect(el.classList.contains('kd-checkbox')).to.be.true;
    });

    it('change event', async () => {
        let el;
        vm = createVue({
            template: `
                <KdCheckbox
                        v-model="checked"
                        ref="checkbox"
                        @change="change"
                >checked</KdCheckbox>
            `,
            data() {
                return {
                    checked: false,
                    changeFnValue: false,
                    changeCalled: false
                }
            },
            methods: {
                change(v) {
                    this.changeFnValue = v;
                    this.changeCalled = true;
                }
            }
        }, true);

        el = vm.$el;
        expect(el.classList.contains('kd-is-checked')).to.be.false;
        expect(vm.checked).to.be.false;
        expect(vm.changeCalled).to.be.false;
        el.click();
        await vm.$nextTick().then(() => {
            expect(vm.checked).to.be.true;
            expect(vm.changeCalled).to.be.true;
            expect(vm.changeFnValue).to.be.true;
            expect(el.classList.contains('kd-is-checked')).to.be.true;
        });
    });

    it('watch value', async () => {
        let el;
        vm = createVue({
            template: `
                <KdCheckbox
                        v-model="language"
                        true-value="js"
                        ref="checkbox"
                >Javascript</KdCheckbox>
            `,
            data() {
                return {
                    language: false,
                    changed: false
                }
            },
            watch: {
                language() {
                    this.changed = true;
                }
            }
        }, true);

        el = vm.$el;
        el.click();

        await vm.$nextTick().then(() => {
            expect(vm.language).to.be.equal('js');
            expect(vm.changed).to.be.true;
        });
    });

    it('set trueValue falseValue', async () => {
        let el;
        vm = createVue({
            template: `
                <KdCheckbox
                        v-model="language"
                        name="language"
                        trueValue="js"
                        falseValue="css"
                >Javascript</KdCheckbox>
            `,
            data() {
                return {
                    language: 'css'
                }
            }
        }, true);

        el = vm.$el;
        expect(el.classList.contains('kd-is-checked')).to.be.false;
        expect(vm.language).to.be.equal('css');
        el.click();
        await vm.$nextTick().then(() => {
            expect(vm.language).to.be.equal('js');
            expect(el.classList.contains('kd-is-checked')).to.be.true;
        });
        el.click();
        await vm.$nextTick().then(() => {
            expect(vm.language).to.be.equal('css');
            expect(el.classList.contains('kd-is-checked')).to.be.false;
        });
    });

    it('disabled', async () => {
        let el;
        vm = createVue({
            template: `
                <kd-checkbox
                        v-model="languages"
                        disabled
                        @click="click"
                >Javascript
                </kd-checkbox>
            `,
            data() {
                return {
                    languages: false,
                    clicked: false
                };
            },
            methods: {
                click() {
                    this.clicked = true;
                }
            }
        }, true);
        el = vm.$el;
        expect(el.classList.contains('kd-is-disabled')).to.be.true;
        expect(vm.languages).to.be.equal(false);
        el.click();
        await vm.$nextTick().then(() => {
            expect(el.classList.contains('kd-is-disabled')).to.be.true;
            expect(vm.languages).to.be.equal(false);
            expect(vm.clicked).to.be.false;
        });
    });

    it('indeterminate', () => {
        let el;
        vm = createVue({
            template: `
                <kd-checkbox
                        v-model="languages"
                        indeterminate
                >Javascript
                </kd-checkbox>
            `,
            data() {
                return {
                    languages: false
                };
            }
        }, true);
        el = vm.$el;
        expect(el.classList.contains('kd-is-indeterminate')).to.be.true;
    });

    it('label', () => {
        let el;
        vm = createVue({
            template: `
                <kd-checkbox
                        v-model="languages"
                        label="Javascript"
                ></kd-checkbox>
            `,
            data() {
                return {
                    languages: false
                };
            }
        }, true);
        el = vm.$el;
        expect(el.querySelector('.kd-checkbox-text').textContent).to.be.equal('Javascript');
    });

    it('checkbox group', async () => {
        let checkboxGroup, values;
        vm = createVue({
            template: `
                <div>
                    <kd-checkbox
                            v-for="item in languages"
                            :key="item"
                            v-model="selected"
                            :true-value="item"
                            ref="checkbox"
                            @change="change"
                    >{{item}}</kd-checkbox>
                </div>
            `,
            data() {
                return {
                    languages: ['js', 'css', 'html'],
                    selected: [],
                    changeFnValue: []
                };
            },
            methods: {
                change(v) {
                    this.changeFnValue = v;
                }
            }
        }, true);
        checkboxGroup = vm.$refs.checkbox;
        expect(vm.selected).to.be.an.instanceof(Array);
        expect(vm.selected).to.have.lengthOf(0);

        checkboxGroup[0].$el.click();
        await vm.$nextTick().then(() => {
            expect(vm.selected).to.be.an.instanceof(Array);
            expect(vm.selected).to.have.members(['js']);
        });

        checkboxGroup[1].$el.click();
        await vm.$nextTick().then(() => {
            expect(vm.selected).to.have.members(['js', 'css']);
        });

        checkboxGroup[2].$el.click();
        await vm.$nextTick().then(() => {
            expect(vm.selected).to.have.members(['js', 'css', 'html']);
        });

        checkboxGroup[1].$el.click();
        await vm.$nextTick().then(() => {
            expect(vm.selected).to.have.members(['js', 'html']);
        });
    });
});
