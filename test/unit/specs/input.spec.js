import Input from 'components/Input/index.js';
import { createCons, createVue, destroyVM, triggerEvent } from '../util';

describe('Input', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // 创建基本input
    it('create input & focus', async () => {
        vm = createVue({
            template: `
                <div>
                    <kd-input
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
        // expect(document.defaultView.getComputedStyle(inputElem, null).border).to.equal('1px solid rgb(204, 204, 204)');
        expect(inputElem.getAttribute('placeholder')).to.equal('请输入内容');
        expect(inputElem.getAttribute('maxlength')).to.equal('12');
        vm.inputFocus();
        expect(vm.isFocus).to.be.true;
        await vm.$nextTick().then(() => {
            // expect(document.defaultView.getComputedStyle(inputElem, null).border).to.equal('1px solid rgb(85, 125, 252)');
            vm.inputBlur();
            expect(vm.isFocus).to.be.false;
        }).then(() => {
            expect(document.defaultView.getComputedStyle(inputElem, null).border).to.equal('1px solid rgb(204, 204, 204)');
        });
    });

    // disabled
    it('disabled', async () => {
        vm = createVue({
            template: `
                <div>
                    <kd-input
                            placeholder="请输入内容"
                            v-model="age"
                            :maxlength="12"
                            :disabled="disabled"
                    />
                    <Button @click="changeStatus">switch disabled</Button>
                </div>
            `,
            data() {
                return {
                    age: 20,
                    disabled: true
                }
            },
            methods: {
                changeStatus() {
                    this.disabled = !this.disabled;
                }
            }
        });
        const inputWrapperElem = vm.$el.querySelector('.kd-input-inner');
        expect(inputWrapperElem.getAttribute('disabled')).to.equal('disabled');
        vm.changeStatus();
        await vm.$nextTick(() => {
            expect(inputWrapperElem.getAttribute('disabled')).to.be.null;
        });
    });

    // type
    it('type--password', async () => {
        vm = createVue({
            template: `
                <kd-input
                        :type="type"
                        v-model="password"
                >
                    <template v-slot:suffix>
                        <i
                                :class="iconClass"
                                @click="switchType"
                        ></i>
                    </template>
                </kd-input>
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
        await vm.$nextTick().then(() => {
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
                <kd-input
                        v-model="url"
                        name="url"
                >
                    <template v-slot:prepend>
                        <span>http://</span>
                    </template>
                    <template v-slot:append>
                        <span>.com</span>
                    </template>
                </kd-input>
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

    // clear
    it('clear', () => {
        vm = createVue({
            template: `
                <kd-input
                        ref="input"
                        type="text"
                        v-model="info"
                        clearable
                />
            `,
            data() {
                return {
                    info: 'kingsoftcloud'
                }
            }
        });
        vm.$refs.input.clear();
        expect(vm.info).to.equal('');
    });

    // select
    it('method:select', async() => {
        const testContent = 'input select';
        vm = createVue({
            template: `
          <kd-input
            ref="inputComp"
            value="${testContent}"
          />
        `
        }, true);
        expect(vm.$refs.inputComp.$refs.input.selectionStart).to.equal(testContent.length);
        expect(vm.$refs.inputComp.$refs.input.selectionEnd).to.equal(testContent.length);
        vm.$refs.inputComp.select();
        expect(vm.$refs.inputComp.$refs.input.selectionStart).to.equal(0);
        expect(vm.$refs.inputComp.$refs.input.selectionEnd).to.equal(testContent.length);
    });

    // event
    it('event input keyup keydown change', async () => {
        vm = createVue({
            template: `
                <kd-input
                        ref="input"
                        type="text"
                        @change="changeHandler"
                        @keydown="keydownHandler"
                        @keyup="keyupHandler"
                        v-model="info"
                />
            `,
            data() {
                return {
                    info: 'kingsoftcloud',
                    isEmitChange: false,
                    isEmitKeyup: false,
                    isEmitKeydown: false
                }
            },
            methods: {
                changeHandler() {
                    this.isEmitChange = true;
                },
                keydownHandler() {
                    this.isEmitKeydown = true;
                },
                keyupHandler() {
                    this.isEmitKeyup = true;
                }
            }
        });
        const inputElem = vm.$refs.input.$el.querySelector('.kd-input-inner');
        triggerEvent(inputElem, 'keydown');
        await vm.$nextTick().then(() => {
            expect(vm.isEmitKeydown).to.be.true;
        });
        triggerEvent(inputElem, 'change');
        await vm.$nextTick().then(() => {
            expect(vm.isEmitChange).to.be.true;
        });
        triggerEvent(inputElem, 'keyup');
        await vm.$nextTick().then(() => {
            expect(vm.isEmitKeyup).to.be.true;
        });
    });

    // textarea width
    it('textarea 300px & fluid', () => {
        vm = createVue({
            template: `
                <div>
                    <kd-input
                            type="textarea"
                            v-model="intro"
                            name="intro"
                            :rows="5"
                            width="300px"
                    />
                    <kd-input
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
    it('textarea resize', async () => {
        vm = createVue({
            template: `
                <kd-input
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
        await vm.$nextTick().then(()=> {
            expect(textarea.style.resize).to.be.equal(vm.resize);
        });
    });

    // limit
    it('limit ', (done) => {
        vm = createVue({
            template: `
                <div>
                    <kd-input
                            class="test-exceed"
                            ref="exceedInput"
                            type="text"
                            v-model="info"
                            placeholder="最大输入长度10"
                            maxlength="10"
                    ></kd-input>
                    <kd-input
                            class="not-exceed"
                            type="text"
                            placeholder="最大输入长度10"
                            v-model="info1"
                            maxlength="10"
                    ></kd-input>
                    <kd-input
                            class="count-exceed"
                            ref="exceedCount"
                            type="text"
                            v-model="count"
                            placeholder="最大输入长度10"
                            maxlength="2"
                    ></kd-input>
                </div>
            `,
            data() {
                return {
                    info: 'hellohellohello',
                    info1: 'hello',
                    count: 100
                }
            }
        });
        const inputElem = vm.$el.querySelector('.not-exceed');
        const inputExceedElem = vm.$el.querySelector('.test-exceed');
        const countExceedElem = vm.$el.querySelector('.count-exceed');
        expect(inputElem.classList.contains('kd-is-exceed')).to.false;
        expect(inputExceedElem.classList.contains('kd-is-exceed')).to.true;
        expect(countExceedElem.classList.contains('kd-is-exceed')).to.true;
        vm.info = '123';
        vm.count = 10;
        setTimeout(() => {
            expect(inputExceedElem.classList.contains('kd-is-exceed')).to.false;
            expect(countExceedElem.classList.contains('kd-is-exceed')).to.false;
            done();
        }, 100);
    });

    // innerValue change
    it('innerValue ', async () => {
        vm = createVue({
            template: `
                <div>
                    <kd-input
                            ref="inner"
                            type="text"
                            v-model="info"
                    ></kd-input>
                </div>
            `,
            data() {
                return {
                    info: 'hello'
                }
            }
        });
        const inputElem = vm.$el.querySelector('.kd-input-inner');
        vm.$refs.inner.innerValue = 'abc';
        await vm.$nextTick().then(() => {
            console.log(vm.info);
        })
    })
});
