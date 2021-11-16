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
    expect(vm.$el.querySelector('.kd-dialog-footer').classList.contains("kd-dialog-footer-height")).to.be
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
    expect(vm.showTitle).to.be.false;
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
    vm = createVue(
      {
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
    expect(vm.$el.querySelector('.kd-dialog-footer').querySelector('button').classList.contains("customBtn")).to.be.true;
  });
  //自定义body
  it("create dialog of custom body", () => {
    vm = createVue(
      {
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
    expect(vm.$el.querySelector('.kd-dialog-body>div').classList.contains("confirmBody")).to.be.true;
  });
  //自定义按钮文案
  it("custom buttom text", () => {
    vm = createCons(Dialog, {
      type: "default",
      value: true,
      cancelText: "上一步",
      okText: "关闭",
    });
    expect(
      vm.$el.querySelectorAll('.kd-dialog-btn .kd-btn')[0].querySelector('span').textContent.trim()
    ).to.equal("上一步");
    expect(
      vm.$el.querySelectorAll('.kd-dialog-btn .kd-btn')[1].querySelector('span').textContent.trim()
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
  it("click mask to close the dialog", (done) => {
    vm = createCons(Dialog, {
      type: "default",
      value: true,
      clickModalToClose: true,
    });
    vm.$el.querySelector(".kd-dialog-mask").click();
    setTimeout(() => {
      expect(vm.visible).to.be.false;
      done()
    }, 500);
  });
  //'取消'&‘确认’操作
  it("cancel & ok", (done) => {
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
    vm.$nextTick().then((_) => {
      vm.$el.querySelectorAll(".kd-dialog-btn .kd-btn")[1].click();
      setTimeout(function () {
        expect(vm.num).to.equal(2);
        done()
      }, 300);
      vm.$el.querySelectorAll(".kd-dialog-btn .kd-btn")[0].click();
    });
  });
  it("ok is not a function", (done) => {
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
    vm.$nextTick().then((_) => {
      vm.$el.querySelectorAll(".kd-dialog-btn kd-btn")[1].click();
      setTimeout(function () {
        expect(
          vm.$el.querySelector(".kd-dialog-body>div").innerText
        ).to.equal("1");
        expect(vm.isShowDialog).to.be.false;
        done()
      }, 200);
    });
  });
  //dialog可以移动
  it("dialog to move", (done) => {
    vm = createCons(Dialog, {
      type: "default",
      value: true,
    });
    vm.$nextTick().then((_) => {
      triggerEvent(vm.$el.querySelector(".kd-dialog-header"), "mousedown");
      triggerEvent(
        vm.$el.querySelector(".kd-dialog-header"),
        "mousemove",
        true,
        false,
        { x: 180, y: 160 }
      );
      let _dialog = vm.$el.querySelector(".kd-dialog")
      setTimeout(function() {
        expect(_dialog.style.left).not.to.equal('')
        triggerEvent(document, "mouseup");
        done()
      }, 300);
  })
  });
});
