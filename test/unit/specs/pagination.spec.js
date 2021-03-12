import Pagination from 'components/Pagination/index.js';
import { createCons, createVue, destroyVM, triggerEvent} from '../util';

describe('Pagination', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // limit:10,total:111,current:1....
    it('create Pagination', () => {
        vm = createCons(Pagination, {
            limit: 10,
            total: 111,
            current: 1,
            limits: [10,20,30],
            counts: 7,
            prevText: '上一页',
            nextText: '下一页',
            limitsIcon: 'kd-icon-arrow-down'
        });
        expect(vm.$el.querySelector('.kd-pagination-limits-icon').classList.contains('kd-icon-arrow-down')).to.be.true;
        expect(vm.$el.querySelector('.kd-pagination-prev-text').innerText).to.equal('上一页');
        expect(vm.$el.querySelector('.kd-pagination-next-text').innerText).to.equal('下一页');
        // expect(vm.$el.querySelector('.kd-pagination-limits').classList.contains('kd-icon-arrow-down')).to.be.true;
    });
    // change cureent
    it('change current', async () => {
        vm = createVue({
            template: `
                <div>
                    <kd-pagination
                            :total="total"
                            :limit="limit"
                            :current="current"
                            ref="pagination"
                            @change="change"
                    />
                </div>
            `,
            data() {
                return {
                    current: 1,
                    limit: 10,
                    total: 100,
                }
            },
            created() {

            },
            methods: {
                change({current, limit}){
                    this.current = current;
                    this.limit = limit;
                    this.total = 200;
                }
            }
        });
        vm.$refs.pagination.next();
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(2);
        });
        vm.$refs.pagination.prev();
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(1);
        });
        expect(vm.$refs.pagination.total).to.be.equal(200);
    });
    // change cureent
    it('change current', async () => {
        vm = createVue({
            template: `
                <div>
                    <kd-pagination
                            :total="total"
                            :limit="limit"
                            :current="current"
                            ref="pagination"
                            @change="change"
                    />
                </div>
            `,
            data() {
                return {
                    current: 1,
                    limit: 10,
                    total: 100,
                }
            },
            created() {

            },
            methods: {
                change({current, limit}){
                    this.current = current;
                    this.limit = limit;
                }
            }
        });
        triggerEvent(document.querySelector('.kd-pagination-limits'), 'mouseover');
        await vm.$nextTick().then(() => {
            console.log(document.querySelectorAll('.kd-dropdown-item').length)
        });
        // setTimeout(() => {
        //     console.log(document.querySelectorAll('.kd-dropdown-item').length)
        //     done();
        // }, 1500);
    });
})
