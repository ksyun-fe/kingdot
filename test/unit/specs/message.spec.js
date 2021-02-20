import {createCons, createVue, destroyVM, triggerEvent} from '../util';
import Vue from 'vue';
describe('Message', () => {
    let vm;
    function destroyMessage (message) {
        if (!message) return;
        message.close && message.close();
        destroyVM(message);
    }
    afterEach(() => {
        destroyMessage(vm);
    });

    it('call $message', () => {
        vm = Vue.prototype.$message('call $message');
        expect(document.querySelector('.kd-message')).to.be.equal(vm.$el);
        expect(vm.$el.classList.contains('kd-message')).to.be.ok;
        expect(vm.$el.classList.contains('kd-message-fixed')).to.be.ok;
    });

    it('call $message.success', async () => {
        vm = Vue.prototype.$message({
            content: 'call $message.success',
            type: 'success'
        });
        expect(document.querySelector('.kd-message')).to.be.equal(vm.$el);
        expect(vm.$el.classList.contains('kd-message')).to.be.ok;
        expect(vm.$el.classList.contains('kd-message-fixed')).to.be.ok;
        expect(vm.$el.classList.contains('kd-message-success')).to.be.ok;
    });

    it('call static method', async () => {
        vm = Vue.prototype.$message.success('call static method');
        expect(document.querySelector('.kd-message')).to.be.equal(vm.$el);
        expect(vm.$el.classList.contains('kd-message')).to.be.ok;
        expect(vm.$el.classList.contains('kd-message-fixed')).to.be.ok;
        expect(vm.$el.classList.contains('kd-message-success')).to.be.ok;
    });

    it('custom content', function () {
        vm = Vue.prototype.$message.success({
            content: 'custom content',
        });
        expect(vm.$el.querySelector('.kd-message-content').textContent).to.be.equal('custom content');
    });

    it('custom content function', function () {
        vm = Vue.prototype.$message.success({
            content() {
                return 'custom content function'
            }
        });
        expect(vm.$el.querySelector('.kd-message-content').textContent).to.be.equal('custom content function');
    });

    it('custom content vnode', function () {
        vm = Vue.prototype.$message.success({
            content: () =>  {
                const instance = new Vue();
                const h = instance.$createElement;
                instance.$destroy();
                return h(
                    'div',
                    { class: "my-message" },
                    '自定义展示内容'
                );
            }
        });
        expect(vm.$el.querySelector('.my-message')).to.be.exist;
    });


    ['success', 'error', 'info', 'warning'].forEach((type) => {
        it(`message ${type} type`, function () {
            let el;
            vm = Vue.prototype.$message[type](type);
            el = vm.$el;
            expect(el.classList.contains('kd-message')).to.be.ok;
            expect(el.classList.contains('kd-message-fixed')).to.be.ok;
            expect(el.classList.contains(`kd-message-${type}`)).to.be.ok;
        })
    });

    it('closable', function () {

        vm = Vue.prototype.$message.success({
            content: 'closable false',
            closable: false
        });

        expect(vm.$el.querySelector('.kd-icon-close')).to.not.exist;
    });

    it('hideIcon', function () {

        vm = Vue.prototype.$message.success({
            content: 'hideIcon true',
            hideIcon: true
        });

        expect(vm.$el.querySelector('.kd-message-icon')).to.not.exist;

    });

    it('offset', function () {
        let offset = 200;

        vm = Vue.prototype.$message.success({
            content: 'offset',
            offset
        });

        expect(vm.$el.style.top).to.be.equal(`${offset}px`);
    });

    it('center', function () {

        vm = Vue.prototype.$message.success({
            content: 'center',
            center: true
        });

        expect(vm.$el.classList.contains(`kd-message-center`)).to.be.ok;
    });

    it('custom class', function () {

        vm = Vue.prototype.$message.success({
            content: 'customClass',
            customClass: 'my-message'
        });

        expect(vm.$el.classList.contains(`my-message`)).to.be.ok;
    });

    it('custom icon', function () {

        vm = Vue.prototype.$message.success({
            content: 'custom icon',
            iconClass: 'kd-icon-view'
        });

        expect(document.querySelector('.kd-message-icon.kd-icon-view')).to.exist;

    });

    it('custom width', function () {

        vm = Vue.prototype.$message.success({
            content: 'custom icon',
            width: '300'
        });

        expect(vm.$el.style.width).to.be.equal('300px');

    });

    it('custom width auto', function () {

        vm = Vue.prototype.$message.success({
            content: 'custom icon',
            width: 'auto'
        });

        expect(vm.$el.style.width).to.be.equal('auto');

    });

    it('dangerouslyUseHTMLString', function () {

        vm = Vue.prototype.$message.success({
            content: '<span class="">dangerouslyUseHTMLString</span>',
            dangerouslyUseHTMLString: true
        });

        expect(vm.$el.querySelector('.kd-message-content').textContent).to.be.equal('dangerouslyUseHTMLString');

    });

    it('onClose prop', function () {
        let closeCalled = false;

        vm = Vue.prototype.$message.success({
            content: 'onClose prop',
            onClose: () => {
                closeCalled = true;
            }
        });

        vm.$el.querySelector('.kd-message-close').click();

        expect(closeCalled).to.be.true;

    });

    it('vm.close()', function (done) {

        vm = Vue.prototype.$message.success({
            content: 'vm.close()',
        });

        setTimeout(() => {
            vm.close();
            setTimeout(() => {
                expect(document.querySelector('.kd-message')).to.not.exist;
                done();
            }, 500);
        }, 500);

    });

    it('default duration', function (done) {
        vm = Vue.prototype.$message.error('default duration');
        this.timeout(vm.duration + 3000);

        setTimeout(() => {
            expect(document.querySelector('.kd-message')).to.exist;
            setTimeout(() => {
                expect(document.querySelector('.kd-message')).to.not.exist;
                done();
            }, 1000);
        }, vm.duration - 500);

    });

    it('custom duration', function (done) {
        vm = Vue.prototype.$message.error('custom duration 2000', 2000);
        this.timeout(5000);

        setTimeout(() => {
            expect(document.querySelector('.kd-message')).to.exist;
            setTimeout(() => {
                expect(document.querySelector('.kd-message')).to.not.exist;
                done();
            }, 1500);
        }, 1000);

    });

    it('auto close', function (done) {
        vm = Vue.prototype.$message.error('auto close', 500);
        this.timeout(4000);
        setTimeout(() => {
            expect(document.querySelector('.kd-message')).to.not.exist;
            done();
        }, 1000);
    });

    it('manual close', function (done) {
        vm = Vue.prototype.$message.success('manual close', 3000);
        this.timeout(5000);
        setTimeout(() => {
            document.querySelector('.kd-message-close').click();
            setTimeout(() => {
                expect(document.querySelector('.kd-message')).to.not.exist;
                done();
            }, 500);
        }, 500);
    });

    it('mouseover mouseout', function (done) {
        vm = Vue.prototype.$message.success('mouseover', 1000);
        this.timeout(5000);
        setTimeout(() => {
            let el = document.querySelector('.kd-message');
            expect(el).to.be.exist;
            triggerEvent(el, 'mouseover');
            setTimeout(() => {
                expect(document.querySelector('.kd-message')).to.be.exist;
                triggerEvent(el, 'mouseout');
                setTimeout(() => {
                    expect(document.querySelector('.kd-message')).to.not.exist;
                    done();
                }, 1500);
            }, 1500);
        }, 500);
    });

    it('create multiple vm in a cycle', function (done) {
        let offset = 200;
        let vm2;
        vm = Vue.prototype.$message.success({
            content: 'message 1',
            offset
        });
        this.timeout(5000);
        vm2 = Vue.prototype.$message.success({
            content: 'message 2',
            offset
        });
        setTimeout(() => {
            expect(vm.$el.style.top).to.be.equal(`${offset}px`);
            expect(vm2.$el.style.top).to.be.equal(`${offset + vm.$el.offsetHeight + 16}px`);
            setTimeout(() => {
                vm2.close();
                setTimeout(() => {
                    done();
                }, 500);
            }, 1000);
        }, 1000);
    });

    it('as a component', function () {
        vm = createVue({
            template: `
                <KdMessage type="warning">Message</KdMessage>
            `
        });

        expect(vm.$el.classList.contains('kd-message')).to.be.true;
        expect(vm.$el.classList.contains('kd-message-warning')).to.be.true;

    });

});
