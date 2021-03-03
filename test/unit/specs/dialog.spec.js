import { expect } from "chai";
import Dialog from "components/Dialog/index.js";
import { createCons, createVue, destroyVM, triggerEvent } from "../util";

describe("dialog", () => {
    //创建一个默认的dialog
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });
    it("create dialog of default", () => {
        vm = createCons(Dialog, {
            type: "default",
            value: true,
            height: 800,
        });
        expect(
            vm.$el.querySelector('.kd-dialog').classList.contains("kd-dialog-default")
        ).to.be.true;
    });
    //创建一个提示类的dialog,且提示信息居中
    it("create dialog of tips,it is centered", () => {
        vm = createCons(Dialog, {
            type: "tips",
            value: true,
            showTitle: false,
            icon: "success",
            tipsTitle: "操作成功",
            tipsMessage: "Some information about the prompt class",
            tipsIsCenter: true,
        });
        //是否是提示类的dialog
        expect(
            vm.$el.querySelector('.kd-dialog').classList.contains("kd-dialog-tips")
        ).to.be.true;
        //是否居中
        expect(
            vm.$el.querySelector('.kd-dialog-body').classList.contains(
                "kd-dialog-tips-body-center"
            )
        ).to.be.true;
    });
    //创建一个提示类的dialog,且提示信息左对齐
    it("create dialog of tips,it is left aligned", () => {
        vm = createCons(Dialog, {
            type: "tips",
            value: true,
            showTitle: false,
            icon: "error",
            tipsTitle: "这是一条成功通知信息",
            tipsMessage: "Some information about the prompt class",
            tipsIsCenter: false,
        });
        //是否是提示类的dialog
        expect(
            vm.$el.querySelector('.kd-dialog').classList.contains("kd-dialog-tips")
        ).to.be.true;
        //是否居中
        expect(
            vm.$el.querySelector('.kd-dialog-body').classList.contains(
                "kd-dialog-tips-body-center"
            )
        ).to.be.false;
    });
    //创建一个提示类的dialog,且无底部
    it("create dialog of tips,it has not bottom", () => {
        vm = createCons(Dialog, {
            type: "tips",
            value: true,
            showTitle: false,
            showFooter: false,
            icon: "error",
            tipsTitle: "这是一条成功通知信息",
            tipsMessage: "Some information about the prompt class",
            tipsIsCenter: false,
        });
        //是否是提示类的dialog
        expect(
            vm.$el.querySelector('.kd-dialog').classList.contains("kd-dialog-tips")
        ).to.be.true;
        //是否🈶️底部
        let footerSecionIndex =
            vm.$el.querySelector('.kd-dialog').childNodes.length;
        let footerSection =
            vm.$el.querySelector('.kd-dialog').childNodes[footerSecionIndex - 1];
        expect(footerSection.classList.contains("kd-dialog-footer-height")).to.be
            .true;
    });
    //创建一个二次确认类dialog，且没有标题
    it("create dialog of confirm,it has not title", () => {
        vm = createCons(Dialog, {
            type: "confirm",
            value: true,
            showTitle: false,
            icon: "failed",
            confirmTips: "Some information about the prompt class",
        });
        //是否是二次确认类的dialog
        expect(
            vm.$el.querySelector('.kd-dialog').classList.contains("kd-dialog-confirm")
        ).to.be.true;
        //是否有标题
        let confirmTitle = vm.$el.querySelector('.kd-dialog-confirm-title');
        expect(confirmTitle.textContent).to.equal("");
    });
    //创建一个二次确认类dialog，且有标题
    it("create dialog of confirm,it has title", () => {
        vm = createCons(Dialog, {
            type: "confirm",
            value: true,
            showTitle: false,
            confirmTitle: "二次确认标题",
            icon: "failed",
            confirmTips: "Some information about the prompt class",
        });
        //是否是二次确认类的dialog
        expect(
            vm.$el.querySelector('.kd-dialog').classList.contains("kd-dialog-confirm")
        ).to.be.true;
        //是否有标题
        let confirmTitle = vm.$el.querySelector('.kd-dialog-confirm-title');
        expect(confirmTitle.textContent).to.equal("二次确认标题");
    });
    //自定义底部
    it("create dialog of custom bottom", () => {
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
                        confirmTips: "Some information about the prompt class",
                    };
                },
            },
            true
        );
        const _dialog = vm.$el;
        let footerSecionIndex =
            _dialog.querySelector('.kd-dialog').childNodes.length;
        let footerSectionBtn =
            _dialog.querySelector('.kd-dialog').childNodes[footerSecionIndex - 1]
            .childNodes[1].childNodes[0];
        expect(footerSectionBtn.classList.contains("customBtn")).to.be.true;
    });
    //自定义body
    it("create dialog of custom body", () => {
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
                },
            },
            true
        );
        const _dialog =
            vm.$el.querySelector('.kd-dialog').childNodes[1].childNodes[0];
        expect(_dialog.classList.contains("confirmBody")).to.be.true;
    });
    //自定义按钮文案
    it("custom buttom text", () => {
        vm = createCons(Dialog, {
            type: "default",
            value: true,
            cancelText: "上一步",
            okText: "关闭",
        });
        let footerSecionIndex =
            vm.$el.querySelector('.kd-dialog').childNodes.length;
        expect(
            vm.$el.querySelector('.kd-dialog').childNodes[
                footerSecionIndex - 1
            ].childNodes[1].textContent.trim()
        ).to.equal("上一步");
        expect(
            vm.$el.querySelector('.kd-dialog').childNodes[
                footerSecionIndex - 1
            ].childNodes[2].childNodes[2].childNodes[0].textContent.trim()
        ).to.equal("关闭");
    });
    //点击“X”，关闭dialog
    it('click "X" close the dialog', (done) => {
        vm = createCons(Dialog, {
            type: "default",
            value: true,
        });
        vm.$el.querySelector('.kd-icon-close').click();
        setTimeout(() => {
            expect(vm.visible).to.be.false;
            done();
        }, 500);
    });
    //增加滚动
    it("a scrollable dialog", () => {
        vm = createCons(Dialog, {
            type: "default",
            value: true,
            height: 300,
            isScroll: true,
        });
        expect(
            vm.$el.querySelector(".kd-dialog-body").style["overflow-y"]
        ).to.equal("scroll");
    });
    //点击遮罩层关闭对话框
    it("click mask to close the dialog", () => {
        vm = createCons(Dialog, {
            type: "default",
            value: true,
            clickModalToClose: true,
        });
        vm.$el.querySelector(".kd-dialog-mask").click();
        setTimeout(() => {
            expect(vm.visible).to.be.false;
        }, 500);
    });
    //'取消'&‘确认’操作
    it("cancel & ok", async() => {
        vm = createVue({
            template: `
              <kd-dialog v-model="isShowDialog" :ok="OK" :cancel="close" width="800" height="800">
              <div>{{num}}</div>
              </kd-dialog>
            `,
            data() {
                return {
                    isShowDialog: false,
                    num: 1,
                };
            },
            methods: {
                OK(dialog) {
                    this.num = 2;
                    dialog.showLoading();
                    dialog.hideLoading();
                },
                close() {
                    this.isShowDialog = false;
                },
            },
        });
        vm.isShowDialog = true;
        await vm.$nextTick().then((_) => {
            vm.$el.querySelectorAll(".kd-dialog-btn")[1].click();
            setTimeout(function() {
                expect(
                    vm.$el.querySelector(".kd-dialog-body").childNodes[0].innerText
                ).to.equal("2");
            }, 200);
            vm.$el.querySelectorAll(".kd-dialog-btn")[0].click();
        }, 300);
    });
    it("ok is not a function", async() => {
        vm = createVue({
            template: `
              <kd-dialog v-model="isShowDialog" width="800" height="800">
              <div>{{num}}</div>
              </kd-dialog>
            `,
            data() {
                return {
                    isShowDialog: true,
                    num: 1,
                };
            },
        });
        await vm.$nextTick().then((_) => {
            vm.$el.querySelectorAll(".kd-dialog-btn")[1].click();
            setTimeout(function() {
                expect(
                    vm.$el.querySelector(".kd-dialog-body").childNodes[0].innerText
                ).to.equal("2");
            }, 200);
        }, 300);
    });
    //dialog可以移动
    it("dialog to move", async() => {
        vm = createCons(Dialog, {
            type: "default",
            value: true,
        });
        await vm.$nextTick().then((_) => {
            triggerEvent(vm.$el.querySelector(".kd-dialog-header"), "mousedown");
            triggerEvent(
                vm.$el.querySelector(".kd-dialog-header"),
                "mousemove",
                true,
                false, { x: 88, y: 260 }
            );
            setTimeout(() => {
                expect(vm.$el.querySelector(".kd-dialog").style.webkitTransform).to.equal('translate(0px, -25px)')
                triggerEvent(document, "mouseup");
            }, 200);
        }, 500)
    });
});