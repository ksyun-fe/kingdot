import Steps from "components/Steps/index.js";
import { createCons, createVue, destroyVM } from "../util";

describe("Steps", () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 创建一个简单的steps
  it("steps spot", (done) => {
    vm = createVue({
      template: `
                    <kd-steps v-model="stepIndex1" type="spot">
                        <kd-step title="步骤一" ></kd-step>
                        <kd-step title="步骤二" ></kd-step>
                        <kd-step title="步骤三" ></kd-step>
                        <kd-step title="完成" ></kd-step>
                    </kd-steps>
                `,
      data() {
        return {
          stepIndex1: 1,
        };
      },
    });

    vm.$nextTick((_) => {
      expect(vm.$el.childNodes[0].classList.contains("kd-step-spot")).to.be
        .true;
      done();
    }, 500);
  });
  //创建一个有状态的steps
  it("steps has status", function (done){
    vm = createVue({
      template: `
        <kd-steps v-model="stepIndex1" finishStatus='finished'>
            <kd-step title="步骤一" status="wait"></kd-step>
            <kd-step title="步骤二" status="error"></kd-step>
            <kd-step title="步骤三" status="active"></kd-step>
            <kd-step title="完成完成完成完成"></kd-step>
        </kd-steps>
                `,
      data() {
        return {
          stepIndex1: 1,
        };
      },
    });
    vm.$nextTick( (_) => {
        expect(vm.$el.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].classList.contains('kd-step-custom-status-wait')).to.be
        .true;
        expect(vm.$el.childNodes[2].childNodes[1].childNodes[0].childNodes[0].childNodes[0].classList.contains('kd-step-custom-status-error')).to.be
        .true;
        expect(vm.$el.childNodes[4].childNodes[1].childNodes[0].childNodes[0].childNodes[0].classList.contains('kd-step-custom-status-active')).to.be
        .true;
      done();
    }, 500);
  });
  //创建简约版的steps
  it("steps simple", (done) => {
    vm = createVue({
      template: `
                    <kd-steps v-model="stepIndex1" type="simple">
                        <kd-step title="步骤一" ></kd-step>
                        <kd-step title="步骤二" ></kd-step>
                        <kd-step title="步骤三" ></kd-step>
                        <kd-step title="完成" ></kd-step>
                    </kd-steps>
                `,
      data() {
        return {
          stepIndex1: 1,
        };
      },
    });

    vm.$nextTick((_) => {
      expect(vm.$el.childNodes[0].classList.contains("kd-step-simple")).to.be
        .true;
      done();
    }, 500);
  });
  //自定义图标的steps
  it("steps custom icons", (done) => {
    vm = createVue({
      template: `
        <kd-steps v-model="stepIndex1">
            <kd-step title="步骤一" icon="kd-icon-upload-file"></kd-step>
            <kd-step title="步骤二" icon="kd-icon-menu-more"></kd-step>
            <kd-step title="步骤三" icon="kd-icon-success-circle"></kd-step>
        </kd-steps>
                `,
      data() {
        return {
          stepIndex1: 1,
        };
      },
    });
    vm.$nextTick((_) => {
        expect(vm.$el.childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].childNodes[2].classList.contains('kd-step-icon')).to.be
        .true;
      done();
    }, 500);
  });
  //竖式steps
  it("steps vertical", (done) => {
    vm = createVue({
      template: `
        <div style="height:300px">
            <kd-steps v-model="stepIndex1" style="margin-bottom:40px" direction="vertical">
                <kd-step title="步骤一"></kd-step>
                <kd-step title="步骤二"></kd-step>
                <kd-step title="步骤三" :description="description"></kd-step>
            </kd-steps>
        </div>
                `,
      data() {
        return {
          stepIndex1: 1,
          description:'xxx'
        };
      },
    });

    vm.$nextTick((_) => {
      expect(vm.$el.childNodes[0].classList.contains("kd-steps-container-vertical")).to.be
        .true;
      done();
    }, 500);
  });
});
