import { createVue, destroyVM } from '../util';

describe('Datepicker', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    // create
    it('create', done => {
        vm = createVue({
            template: `
                <kd-date-picker> </kd-date-picker>
            `
        });
        vm.$el.querySelector('.kd-input-inner').click();
        
        setTimeout(() => {
            const tooltip = document.querySelector('.kd-tooltip-inner');

            expect(vm.$el.querySelector('.kd-input-inner')).to.be.ok; // 需要在tooltip 中检查日历渲染
            expect(document.querySelector('.kd-input-inner')).to.have.property('placeholder', '请选择日期');
            expect(tooltip.querySelector('.kd-picker-panel')).to.be.exist;
            expect(tooltip.querySelector('.kd-calendar-wrapper')).to.be.exist;
            done();
        }, 500);
    });

    // disabled
    it('disabled', done => {
      vm = createVue({
          template: `
              <kd-date-picker :disabled="true"> </kd-date-picker>
          `
      });
      vm.$el.querySelector('.kd-input-inner').click()
      
      setTimeout(() => {
          expect(vm.$el.querySelector('.kd-input-inner')).to.be.ok;

          const inputWrapperElem = document.querySelector('.kd-input-inner');
          expect(inputWrapperElem.getAttribute('disabled')).to.equal('disabled');

          expect(document.querySelector('.kd-tooltip-inner')).to.not.exist;
          done();
      }, 500);
    });
    
    // shortcuts
    it('shortcuts', done => {
      vm = createVue({
          template: `
              <kd-date-picker :shortcuts="data"> </kd-date-picker>
          `,
          data() {
            return {
                data: [
                    {
                        label: '今天',
                        offset: {
                            value: 0,
                            unit: 'day'
                        }
                    }, {
                        label: '昨天',
                        offset: {
                            value: -1,
                            unit: 'day'
                        }
                    }, {
                        label: '明天',
                        offset: {
                            value: 1,
                            unit: 'day'
                        }
                    }
                ]
            }
        }
    });
    vm.$el.querySelector('.kd-input-inner').click();
      
      
    setTimeout(() => {
          expect(vm.$el.querySelector('.kd-input-inner')).to.be.ok;

          expect(document.querySelector('.kd-panel-sidebar')).to.be.exist;

          document.querySelectorAll('.kd-sidebar-row')[1].click(); // 昨天

          // 验证 input 框里的 value 
          // expect(inputElem.getAttribute('maxlength')).to.equal();

          done();
      }, 500);
    });

    // shortcuts range
    it('shortcuts range', done => {
      vm = createVue({
          template: `
              <kd-date-picker :is-range="true" :shortcuts="data"> </kd-date-picker>
          `,
          data() {
            return {
                data: [{
                    label: '最近3天',
                    offset: {
                        value: -3,
                        unit: 'day'
                    }
                }, {
                    label: '最近一周',
                    offset: {
                        value: -1,
                        unit: 'week'
                    }
                }, {
                    label: '近一个月',
                    offset: {
                        value: -1,
                        unit: 'month'
                    }
                }]
              }
          }
      });
      vm.$el.querySelector('.kd-input-inner').click();
      
      
      setTimeout(() => {
          expect(vm.$el.querySelector('.kd-input-inner')).to.be.ok;

          expect(document.querySelector('.kd-panel-sidebar')).to.be.exist;

          document.querySelectorAll('.kd-sidebar-row')[1].click(); // 最近一周

          // 验证 input 框里的 value  
          // expect(inputElem.getAttribute('maxlength')).to.equal('');

          done();
      }, 500);
    });
})
