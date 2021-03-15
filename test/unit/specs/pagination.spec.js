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
    });
    // change current
    it('change current and total', async () => {
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
        vm.$refs.pagination.changePage({value:1,label:1});
        vm.$refs.pagination.next();
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(2);
        });
        vm.$refs.pagination.prev();
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(1);
        });
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.total).to.be.equal(200);
        });
    });
    // change limit
    it('limit', async () => {
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
        vm.$refs.pagination.selectSize(10);
        expect(vm.$refs.pagination.limit).to.be.equal(10);
    });
    // change limit
    it('change limit', async () => {
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
        vm.$refs.pagination.limit = 20;
        vm.$refs.pagination.selectSize(20);
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.limit).to.be.equal(20);
        });
    });
    // click the first page
    it('click the first page', async () => {
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
        vm.$refs.pagination.changePage({value:1,label:1});
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(1);
        });
    });
    // click the last page
    it('click the last page', async () => {
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
        vm.$refs.pagination.changePage({value:10,label:10});
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(10);
        });
    });
    // jump
    it('jump', async () => {
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
                    total: 200,
                }
            },
            created() {
                // this.current = 10;
            },
            methods: {
                change({current, limit}){
                    this.current = current;
                    this.limit = limit;
                }
            }
        });
        vm.$refs.pagination.inputCurrent = 10;
        vm.$refs.pagination.jumpEnterAction();
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(10);
        });
        vm.$refs.pagination.inputCurrent = 40;
        vm.$refs.pagination.jumpEnterAction();
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(20);
        });
    });
    // jump
    it('wrong value', async () => {
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
                    total: 200,
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
        vm.$refs.pagination.inputCurrent = 'a7b';
        triggerEvent(vm.$el.querySelector('.kd-pagination-input'), 'keyup');
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(1);
        });
    });
    // click left ···
    it('click left ···', async () => {
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
                    current: 6,
                    limit: 10,
                    total: 120,
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
        vm.$refs.pagination.changePage({value:'left',label:'···'});
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(4);
        });
    });
    // click right ···
    it('click right ···', async () => {
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
                    current: 6,
                    limit: 10,
                    total: 120,
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
        vm.$refs.pagination.changePage({value:'right',label:'···'});
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(8);
        });
    });
    // superMini
    it('superMini', async () => {
        vm = createVue({
            template: `
                <div>
                    <kd-pagination
                            superMini
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
                    current: 6,
                    limit: 10,
                    total: 120,
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
        vm.$refs.pagination.changePage({value:'right',label:'···'});
        await vm.$nextTick().then(() => {
            expect(vm.$refs.pagination.current).to.be.equal(8);
        });
    });
})
