import { createVue, destroyVM } from '../util';

describe('Timeline', () => {
    afterEach(() => {
        if (!vm) return;
        destroyVM(vm);
    });
    let vm;
    let template = `
        <kd-timeline :reverse="reverse">
            <kd-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
            >{{ activity.content }}</kd-timeline-item>
        </kd-timeline>
    `;
    it('reverse', function(done) {
        vm = createVue({
            template: `
                <kd-timeline :reverse="reverse">
                    <kd-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                    >{{ activity.content }}</kd-timeline-item>
                </kd-timeline>
            `,
            data() {
                return {
                    reverse: false,
                    activities: [{
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }, {
                        content: '通过审核',
                        timestamp: '2018-04-13'
                    }, {
                        content: '活动按期开始',
                        timestamp: '2018-04-15'
                    }]
                }
            }
        });
        this.timeout(8000);
        setTimeout(() => {
            const contentElms = vm.$el.querySelectorAll('.kd-timeline-item-content');
            expect(contentElms[0].innerText).to.equal(vm.activities[0].content);
            // contentElms.forEach((elm, index) => {
            //     expect(elm.innerText).to.equal(vm.activities[vm.activities.length - index - 1].content);
            // });
            vm.reverse = true;
            setTimeout(() => {
                const contentElms = vm.$el.querySelectorAll('.kd-timeline-item-content');
                expect(contentElms[0].innerText).to.equal(vm.activities[2].content);
                // contentElms.forEach((elm, index) => {
                //     expect(elm.innerText).to.equal(vm.activities[index].content);
                // });
                done();
            }, 3000);
        }, 3000);
    });
    it('type', () => {
        vm = createVue({
            template: `
                <kd-timeline>
                    <kd-timeline-item type="success">创建成功</kd-timeline-item>
                </kd-timeline>
            `
        });
        const nodeElm = vm.$el.querySelector('.kd-timeline-item-head');
        expect(nodeElm.classList.contains('kd-timeline-item-head-success')).to.true;
    });
    it('color', () => {
        vm = createVue({
            template: `
                <kd-timeline>
                    <kd-timeline-item color="#f00">创建成功</kd-timeline-item>
                </kd-timeline>
            `
        });
        const nodeElm = vm.$el.querySelector('.kd-timeline-item-head');
        expect(nodeElm.style.color).to.equal('rgb(255, 0, 0)');
    });
})
