import Dialog from 'components/Dialog/index.js';
import { iteratee } from 'lodash';
import { createCons, createVue, destroyVM } from '../util';

describe('dialog',()=>{
    //创建一个默认的dialog
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it('create dialog of default', () => {
        vm = createCons(Dialog, {
            type: 'default',
            value:true
        });
        expect(vm.$el.childNodes[1].childNodes[0].classList.contains('kd-dialog-default')).to.be.true;
    });
    //创建一个提示类的dialog,且提示信息居中
    it('create dialog of tips,it is centered', () => {
        vm = createCons(Dialog, {
            type: 'tips',
            value:true,
            showTitle:false,
            icon:'success',
            tipsTitle:'操作成功',
            tipsMessage:'Some information about the prompt class',
            tipsIsCenter:true
        });
        //是否是提示类的dialog
        expect(vm.$el.childNodes[1].childNodes[0].classList.contains('kd-dialog-tips')).to.be.true;
        //是否居中
        expect(vm.$el.childNodes[1].childNodes[0].childNodes[3].classList.contains('kd-dialog-tips-body-center')).to.be.true;

    });
    //创建一个提示类的dialog,且提示信息左对齐
    it('create dialog of tips,it is left aligned', () => {
        vm = createCons(Dialog, {
            type: 'tips',
            value:true,
            showTitle:false,
            icon:'error',
            tipsTitle:'这是一条成功通知信息',
            tipsMessage:'Some information about the prompt class',
            tipsIsCenter:false
        });
        //是否是提示类的dialog
        expect(vm.$el.childNodes[1].childNodes[0].classList.contains('kd-dialog-tips')).to.be.true;
        //是否居中
        expect(vm.$el.childNodes[1].childNodes[0].childNodes[3].classList.contains('kd-dialog-tips-body-center')).to.be.false;
    });
    //创建一个提示类的dialog,且无底部
    it('create dialog of tips,it has not bottom', () => {
        vm = createCons(Dialog, {
            type: 'tips',
            value:true,
            showTitle:false,
            showFooter:false,
            icon:'error',
            tipsTitle:'这是一条成功通知信息',
            tipsMessage:'Some information about the prompt class',
            tipsIsCenter:false
        });
        //是否是提示类的dialog
        expect(vm.$el.childNodes[1].childNodes[0].classList.contains('kd-dialog-tips')).to.be.true;
        //是否🈶️底部
        let footerSecionIndex = vm.$el.childNodes[1].childNodes[0].childNodes.length;
        let footerSection = vm.$el.childNodes[1].childNodes[0].childNodes[footerSecionIndex-1]
        expect(footerSection.classList.contains('kd-dialog-footer-height')).to.be.true;
    });
    //创建一个二次确认类dialog，且没有标题
    it('create dialog of confirm,it has not title', () => {
        vm = createCons(Dialog, {
            type: 'confirm',
            value:true,
            showTitle:false,
            icon:'failed',
            confirmTips:'Some information about the prompt class',
        });
        //是否是二次确认类的dialog
        expect(vm.$el.childNodes[1].childNodes[0].classList.contains('kd-dialog-confirm')).to.be.true;
        //是否有标题
        let confirmTitle = vm.$el.childNodes[1].childNodes[0].childNodes[2].childNodes[1]
        expect(confirmTitle.textContent).to.equal('');
    });
    //创建一个二次确认类dialog，且有标题
    it('create dialog of confirm,it has title', () => {
        vm = createCons(Dialog, {
            type: 'confirm',
            value:true,
            showTitle:false,
            confirmTitle:'二次确认标题',
            icon:'failed',
            confirmTips:'Some information about the prompt class',
        });
        //是否是二次确认类的dialog
        expect(vm.$el.childNodes[1].childNodes[0].classList.contains('kd-dialog-confirm')).to.be.true;
        //是否有标题
        let confirmTitle = vm.$el.childNodes[1].childNodes[0].childNodes[2].childNodes[1]
        expect(confirmTitle.textContent).to.equal('二次确认标题');
    });
    //自定义底部
    it('create dialog of custom bottom', () => {
        vm = createVue({
            template: `
                    <kd-dialog v-model="visible"
                        type="confirm"
                        :showTitle="false" 
                        icon="failed"
                        :confirmTips="confirmTips">
                        <div slot="footer">
                            <Button class="customBtn" type="primary" @click="()=>{visible=false}">确定</Button>
                        </div>
                    </kd-dialog>
            `,
            data() {
              return {
                visible: true,
                confirmTips:'Some information about the prompt class'
              };
            }
          }, true);
        const _dialog = vm.$el;
        let footerSecionIndex = _dialog.childNodes[1].childNodes[0].childNodes.length;
        let footerSectionBtn = _dialog.childNodes[1].childNodes[0].childNodes[footerSecionIndex-1].childNodes[1].childNodes[0]
        expect(footerSectionBtn.classList.contains('customBtn')).to.be.true;
    });
    //自定义body
    it('create dialog of custom body', () => {
        vm = createVue({
            template: `
                <kd-dialog title="创建提醒" v-model="visible">
                    <div class="confirmBody">
                        <p style="text-align:left">该任务暂未创建tensorboard</p>
                        <p style="text-align:left; color:red">是否要创建？</p>
                    </div>
                </kd-dialog>
            `,
            data() {
              return {
                visible: true,
              };
            }
          }, true);
        const _dialog = vm.$el.childNodes[1].childNodes[0].childNodes[1].childNodes[0]
        expect(_dialog.classList.contains('confirmBody')).to.be.true;
    });
    //自定义按钮文案
    it('custom buttom text', () => {
        vm = createCons(Dialog, {
            type: 'default',
            value:true,
            cancelText:'上一步',
            okText:'关闭'
        });
        let footerSecionIndex = vm.$el.childNodes[1].childNodes[0].childNodes.length;
        expect(vm.$el.childNodes[1].childNodes[0].childNodes[footerSecionIndex-1].childNodes[1].textContent.trim()).to.equal('上一步');
        expect(vm.$el.childNodes[1].childNodes[0].childNodes[footerSecionIndex-1].childNodes[2].childNodes[2].childNodes[0].textContent.trim()).to.equal('关闭');
    });
    //点击“X”，关闭dialog
    it('click "X" close the dialog', done => {
        vm = createCons(Dialog, {
            type: 'default',
            value:true,
        });
        vm.$el.childNodes[1].childNodes[0].childNodes[0].childNodes[1].click();
        setTimeout(() => {
            expect(vm.visible).to.be.false;
            done();
          }, 500);
    });
    //确认按钮增加加载中状态
    // it('dialog button loading', () => {
    //     vm = createVue({
    //         template: `
    //           <div>
    //             <Dialog v-model="showDialog" :disableOk="disableOk" :ok="OK" width="800" height="800"></Dialog>
    //           </div>
    //         `,
      
    //         data() {
    //           return {
    //             showDialog: false,
    //             disableOk:false
    //           };
    //         },
    //         methods:{
    //             openDialog(){
    //                 this.showDialog = true;
    //             },
    //             OK(dialog){
    //                 console.log(dialog)
    //                 dialog.showLoading()
    //                 this.disableOk = true
    //             }
    //         }
    //       }, true);
    //       vm.showDialog = true;
    //       vm.OK();          
    //     let footerSecionIndex = vm.$el.childNodes[1].childNodes[0].childNodes.length;
    //     let ok_bth = vm.$el.childNodes[1].childNodes[0].childNodes[footerSecionIndex-1].childNodes[2]
    //     // vm.ok();
    //     // vm.showLoading();
    //     console.log(vm.$el.childNodes[1].childNodes[0].childNodes[footerSecionIndex-1].childNodes[2])
    //     expect(vm.$el.childNodes[1].childNodes[0].childNodes[2].childNodes[2].childNodes[0].classList.contains('kd-dialog-btn-loading')).to.be.true;
    // });
})