import {createVue, destroyVM} from '../util';

describe('Collapse', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    it('create collapse', () => {
        vm = createVue({
            template: `
                <kd-collapse>
                    <kd-collapse-item title="js">
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item title="css">
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `
        });

        expect(vm.$el.classList.contains('kd-collapse')).to.be.true;
        expect(vm.$el.querySelectorAll('.kd-collapse-item')).to.have.lengthOf(2);
        expect(vm.$el.querySelector('.kd-collapse-item .kd-collapse-title').textContent).to.be.equal('js');

    });

    it('custom collapse-item value', async () => {
        let el, items;
        vm = createVue({
            template: `
                <kd-collapse v-model="value">
                    <kd-collapse-item
                            title="js"
                            value="js"
                    >
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="css"
                            value="css"
                    >
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `,
            data() {
                return {
                    value: []
                };
            }
        });
        el = vm.$el;
        items = el.querySelectorAll('.kd-collapse-item');
        expect(el.querySelector('.kd-collapse-item-active')).to.be.not.exist;

        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.eql(['js']);
        });

        items[1].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.eql(['js', 'css']);
        });

        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.eql(['css']);
        });
    });

    it('accordion', async () => {
        let el, items;
        vm = createVue({
            template: `
                <kd-collapse v-model="value" accordion>
                    <kd-collapse-item
                            title="js"
                            value="js"
                    >
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="css"
                            value="css"
                    >
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `,
            data() {
                return {
                    value: ''
                };
            }
        });
        el = vm.$el;
        items = el.querySelectorAll('.kd-collapse-item');
        expect(el.querySelector('.kd-collapse-item-active')).to.be.not.exist;

        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.equal('js');
        });

        items[1].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.equal('css');
        });

        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.equal('js');
        });
    });

    it('concise', () => {
        vm = createVue({
            template: `
                <kd-collapse concise>
                    <kd-collapse-item title="js">
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item title="css">
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `
        });
        expect(vm.$el.classList.contains('kd-collapse-concise')).to.be.true;
    });

    it('change event', async () => {
        let el, items;
        vm = createVue({
            template: `
                <kd-collapse
                        v-model="value"
                        @change="change"
                >
                    <kd-collapse-item
                            title="js"
                            value="js"
                    >
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="css"
                            value="css"
                    >
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `,
            data() {
                return {
                    value: [],
                    changed: false
                };
            },
            methods: {
                change() {
                    this.changed = true;
                }
            }
        });
        el = vm.$el;
        items = el.querySelectorAll('.kd-collapse-item');
        expect(vm.changed).to.be.false;
        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.eql(['js']);
            expect(vm.changed).to.be.true;
        });

    });

    it('collaseItem change event', async () => {
        let el, items;
        vm = createVue({
            template: `
                <kd-collapse
                        v-model="value"
                >
                    <kd-collapse-item
                            title="js"
                            value="js"
                            @change="change"
                    >
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="css"
                            value="css"
                    >
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `,
            data() {
                return {
                    value: [],
                    changed: false
                };
            },
            methods: {
                change() {
                    this.changed = true;
                }
            }
        });
        el = vm.$el;
        items = el.querySelectorAll('.kd-collapse-item');
        expect(vm.changed).to.be.false;

        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value).to.be.eql(['js']);
            expect(vm.changed).to.be.true;
        });

    });

    it('disabled', async () => {
        let el, items;
        vm = createVue({
            template: `
                <kd-collapse
                        v-model="value"
                        @change="change"
                >
                    <kd-collapse-item
                            title="js"
                            value="js"
                            disabled
                    >
                        <div>js content</div>
                    </kd-collapse-item>
                    <kd-collapse-item
                            title="css"
                            value="css"
                    >
                        <div>css content</div>
                    </kd-collapse-item>
                </kd-collapse>
            `,
            data() {
                return {
                    value: [],
                    changed: false
                };
            },
            methods: {
                change() {
                    this.changed = true;
                }
            }
        });
        el = vm.$el;
        items = el.querySelectorAll('.kd-collapse-item');
        expect(vm.value).to.be.empty;
        expect(vm.changed).to.be.false;

        items[0].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value.includes('js')).to.be.false;
            expect(vm.changed).to.be.false;
        });

        items[1].querySelector('.kd-collapse-title').click();
        await vm.$nextTick().then(() => {
            expect(vm.value.includes('css')).to.be.true;
            expect(vm.changed).to.be.true;
        });

    });
});
