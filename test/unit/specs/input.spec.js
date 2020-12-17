import Input from 'components/Input/index.js';
import { createCons, createVue, destroyVM } from '../util';

describe('Input', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // 创建基本input
    it('create input & focus', () => {
        vm = createVue({
            template: `
                <div>
                    <Input
                            placeholder="请输入内容"
                            v-model="age"
                            :maxlength="12"
                            ref="input"
                    />
                    <Button ref="focusBtn" @click="inputFocus">switch focus</Button>
                    <Button ref="blurBtn" @click="inputBlur">switch blur</Button>
                </div>
            `,
            data() {
                return {
                    age: 20,
                    isFocus: false
                }
            },
            methods: {
                inputFocus() {
                    this.$refs.input.focus();
                    this.isFocus = true;
                },
                inputBlur() {
                    this.$refs.input.blur();
                    this.isFocus = false;
                }
            }
        });
        const inputElem = vm.$el.querySelector('.kd-input-inner');
        const focusBtn = vm.$el.querySelectorAll('.kd-btn')[0];
        const blurBtn = vm.$el.querySelectorAll('.kd-btn')[1];
        expect(document.defaultView.getComputedStyle(inputElem, null).border).to.equal('1px solid rgb(204, 204, 204)');
        expect(inputElem.getAttribute('placeholder')).to.equal('请输入内容');
        expect(inputElem.getAttribute('maxlength')).to.equal('12');
        vm.inputFocus();
        expect(vm.isFocus).to.be.true;
        vm.$nextTick().then(() => {
            expect(document.defaultView.getComputedStyle(inputElem, null).border).to.equal('1px solid rgb(85, 125, 252)');
            vm.inputBlur();
            expect(vm.isFocus).to.be.false;
        }).then(() => {
            expect(document.defaultView.getComputedStyle(inputElem, null).border).to.equal('1px solid rgb(204, 204, 204)');
        });
    });

    // disabled
    it('disabled', () => {
        vm = createVue({
            template: `
                <div>
                    <Input
                            placeholder="请输入内容"
                            v-model="age"
                            :maxlength="12"
                            :disabled="disabled"
                    />
                    <Button @click="disabled = !disabled">switch disabled</Button>
                </div>
            `,
            data() {
                return {
                    age: 20,
                    disabled: true
                }
            }
        });
        const inputWrapperElem = vm.$el.querySelector('.kd-input-inner');
        const buttonElem = vm.$el.querySelector('.kd-btn');
        expect(inputWrapperElem.getAttribute('disabled')).to.equal('disabled');
        buttonElem.click();
        vm.$nextTick(() => {
            expect(inputWrapperElem.getAttribute('disabled')).to.be.null;
        });
    });

    // 先有值，然后clear，然后再赋值；  检测clear icon的变化
    it('clearable', () => {
        vm = createVue({
            template: `
                <Input
                        type="text"
                        v-model="info"
                        clearable
                />
            `,
            data() {
                return {
                    info: 'abc'
                }
            }
        });
        const inputWrapperElem = vm.$el.querySelector('.kd-input-inner');
        const clearableIcon = vm.$el.querySelector('.kd-input-clearable');
        expect(vm.info).to.equal('abc');
        clearableIcon.click();
        expect(vm.info).to.equal('');
        vm.$nextTick().then(() => {
            expect(vm.$el.querySelector('.kd-input-clearable')).to.be.null;
            vm.$set('info', '12345');
        }).then(() => {
            expect(vm.$el.querySelector('.kd-input-clearable')).to.not.be.null;
        });
    });

    // type
    it('type--password', () => {
        vm = createVue({
            template: `
                <Input
                        :type="type"
                        v-model="password"
                >
                    <template v-slot:suffix>
                        <i
                                :class="iconClass"
                                @click="switchType"
                        ></i>
                    </template>
                </Input>
            `,
            data() {
                return {
                    password: '1234567',
                    type: 'password'
                }
            },
            computed: {
                iconClass() {
                    return this.type === 'password' ? 'kd-icon-view' : 'kd-icon-hide'
                }
            },
            methods: {
                switchType() {
                    this.type = this.type === 'password' ? 'text' : 'password';
                }
            }
        });
        const psdElem = vm.$el.querySelector('.kd-input-inner');
        expect(psdElem.getAttribute('type')).to.equal('password');
        vm.switchType();
        vm.$nextTick().then(() => {
            expect(psdElem.getAttribute('type')).to.equal('text');
            vm.switchType();
        }).then(() => {
            expect(psdElem.getAttribute('type')).to.equal('password');
        })
    });

    // prepend && append
    it('prepend && append', () => {
        vm = createVue({
            template: `
                <Input
                        v-model="url"
                        name="url"
                >
                    <template v-slot:prepend>
                        <span>http://</span>
                    </template>
                    <template v-slot:append>
                        <span>.com</span>
                    </template>
                </Input>
            `,
            data() {
                return {
                    url: 'kingsoftcloud'
                }
            }
        });
        const prependElem = vm.$el.querySelector('.kd-input-prepend');
        const appendElem = vm.$el.querySelector('.kd-input-append');
        expect(prependElem.innerText).to.equal('http://');
        expect(appendElem.innerText).to.equal('.com');
    });

    // textarea width
    it('textarea 300px & fluid', () => {
        vm = createVue({
            template: `
                <div>
                    <Input
                            type="textarea"
                            v-model="intro"
                            name="intro"
                            :rows="5"
                            width="300px"
                    />
                    <Input
                            type="textarea"
                            v-model="intro"
                            name="intro"
                            :fluid="true"
                    />
                </div>
            `,
            data() {
                return {
                    intro: 'this is textarea'
                }
            }
        });
        const nativeTextarea = vm.$children[0].$el.querySelector('.kd-input-inner');
        const fluidTextarea = vm.$children[1].$el.querySelector('.kd-input-inner');
        const fluidTextareaParentElem = fluidTextarea.parentElement;
        expect(document.defaultView.getComputedStyle(nativeTextarea, null).width).to.equal('300px');
        expect(document.defaultView.getComputedStyle(fluidTextarea, null).width).to.equal(document.defaultView.getComputedStyle(fluidTextareaParentElem, null).width);
    });

    // textarea resize
    it('textarea resize', () => {
        vm = createVue({
            template: `
                <Input
                        type="textarea"
                        v-model="intro"
                        name="intro"
                        :rows="5"
                        width="300px"
                        :resize="resize"
                />
            `,
            data() {
                return {
                    intro: 'this is textarea',
                    resize: 'none'
                }
            }
        });
        const textarea = vm.$el.querySelector('.kd-input-inner');
        expect(textarea.style.resize).to.be.equal(vm.resize);
        vm.resize = 'horizontal';
        vm.$nextTick().then(()=> {
            expect(textarea.style.resize).to.be.equal(vm.resize);
        });
    });
});
