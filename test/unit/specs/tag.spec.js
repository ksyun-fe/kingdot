import Tag from "components/Tag/index.js";
import { createCons, createVue, destroyVM } from "../util";
describe("Tag", () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('create', () => {
        vm = createVue({
            template: `
                <kd-tag>标签一</kd-tag>
            `
        });
        expect(vm.$el.classList.contains('kd-tag')).to.be.true;
    });
    it('create success Tag', () => {
        vm = createCons(Tag, {
            type: 'success'
        });
        expect(vm.$el.classList.contains('kd-tag-success')).to.be.true;
    });
    it('create disabled Tag', () => {
        vm = createCons(Tag, {
            disabled: true
        });
        expect(vm.$el.classList.contains('kd-tag-disabled')).to.be.true;
    });
    it('create solid success Tag', () => {
        vm = createCons(Tag, {
            type: 'success',
            isSolid: true
        });
        expect(vm.$el.classList.contains('kd-tag-solid')).to.be.true;
    });
    it('create disableAnimation Tag', () => {
        vm = createCons(Tag, {
            type: 'success',
            disableAnimation: true
        });
        expect(vm.$el.classList.contains('kd-tag')).to.be.true;
    });
    it('create large Tag', () => {
        vm = createCons(Tag, {
            type: 'success',
            size: 'large'
        });
        expect(vm.$el.classList.contains('kd-tag-large')).to.be.true;
    });
    it('create can close Tag', async () => {
        vm = createVue({
            template: `
                <kd-tag closable @close="close">标签一</kd-tag>
            `,
            data() {
                return {
                    flag: false
                }
            },
            methods: {
                close() {
                    this.flag = true
                }
              },
        });
        await vm.$nextTick().then((_) => {
            vm.$el.querySelector('.kd-tag-close').click();
            expect(vm.flag).to.be.true;
          });
    });
    it('create can not close Tag', async () => {
        vm = createVue({
            template: `
                <kd-tag closable disabled @close="close">标签一</kd-tag>
            `,
            data() {
                return {
                    flag: false
                }
            },
            methods: {
                close() {
                    this.flag = true
                }
              },
        });
        await vm.$nextTick().then((_) => {
            vm.$el.querySelector('.kd-tag-close').click();
            expect(vm.flag).to.be.false;
          });
    });

    it('click Tag', async () => {
        vm = createVue({
            template: `
                <kd-tag closable @click="handlerClick">标签一</kd-tag>
            `,
            data() {
                return {
                    flag: false
                }
            },
            methods: {
                handlerClick() {
                    this.flag = true
                }
              },
        });
        await vm.$nextTick().then((_) => {
            vm.$el.click();
            expect(vm.flag).to.be.true;
          });
    });
    it('can not click Tag', async () => {
        vm = createVue({
            template: `
                <kd-tag closable disabled @click="handlerClick">标签一</kd-tag>
            `,
            data() {
                return {
                    flag: false
                }
            },
            methods: {
                handlerClick() {
                    this.flag = true
                }
              },
        });
        await vm.$nextTick().then((_) => {
            vm.$el.click();
            expect(vm.flag).to.be.false;
          });
    });
})