import Steps from "components/Steps/index.js";
import { createCons, createVue, destroyVM } from "../util";

describe("Steps", () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  // 创建一个简单的steps
  it("steps spot", async () => {
    vm = createVue({
      template: `
		<div>
                    <kd-steps v-model="stepIndex1" type="spot">
                        <kd-step title="步骤一" ></kd-step>
                        <kd-step title="步骤二" ></kd-step>
                        <kd-step title="步骤三" ></kd-step>
                        <kd-step title="完成" ></kd-step>
                    </kd-steps>
					<kd-button ref="focusBtn" @click="_next">下一步</kd-button>
					</div>
                `,
      data() {
        return {
          stepIndex1: 2,
        };
      },
      methods: {
        _next() {
          this.stepIndex1 = this.stepIndex1 < 4 ? this.stepIndex1 + 1 : 1;
        },
      },
    });
    vm._next();
    await vm.$nextTick().then((_) => {
      expect(
        vm.$el.querySelector('.kd-step').classList.contains("kd-step-type-spot")
      ).to.be.true;
    });
  });
  // 创建一个默认的steps
  it('create default step', () => {
    vm = createVue({
      template: `
        <div>
          <kd-steps v-model="stepIndex1">
              <kd-step title="步骤一" ></kd-step>
              <kd-step title="步骤二" ></kd-step>
          </kd-steps>
          <kd-steps v-model="stepIndex1">
              <kd-step title=""></kd-step>
              <kd-step title=""></kd-step>
          </kd-steps>
          <kd-steps v-model="stepIndex1">
              <kd-step title=""></kd-step>
              <kd-step title=""></kd-step>
              <kd-step title=""></kd-step>
          </kd-steps>
        </div>
                `,
      data() {
        return {
          stepIndex1: 1,
        };
      },
    });
    expect(
      vm.$el.querySelector('.kd-step').classList.contains(
        "kd-step-type-default"
      )
    ).to.be.true;
    expect(
      vm.$el.querySelectorAll('.kd-step')[1].classList.contains(
        "kd-step-type-default"
      )
    ).to.be.true;
    expect(
      vm.$el.querySelectorAll('.kd-step')[2].classList.contains(
        "kd-step-type-default"
      )
    ).to.be.true;
  });
  // 创建一个 描述在下面的steps
  it('create position is bottom', () => {
    vm = createVue({
      template: `
        <kd-steps v-model="stepIndex1" position="bottom">
            <kd-step title="步骤一"></kd-step>
            <kd-step title="步骤二"></kd-step>
            <kd-step title="步骤三"></kd-step>
            <kd-step title="完成完成完成完成"></kd-step>
        </kd-steps>
                `,
      data() {
        return {
          stepIndex1: 1,
        };
      },
    });
    expect(
      vm.$el.querySelector('.kd-step-main').classList.contains(
        "kd-step-main-bottom"
      )
    ).to.be.true;
  })
  //创建一个有状态的steps
  it("steps has status", async () => {
    vm = createVue({
      template: `
        <kd-steps v-model="stepIndex1">
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
    await vm.$nextTick().then((_) => {
      expect(
        vm.$el.querySelector('.kd-step-index').classList.contains(
          "kd-step-custom-status-wait"
        )
      ).to.be.true;
      expect(
        vm.$el.querySelectorAll('.kd-step-index')[1].classList.contains(
          "kd-step-custom-status-wrong"
        )
      ).to.be.true;
      expect(
        vm.$el.querySelectorAll('.kd-step-index')[2].classList.contains(
          "kd-step-custom-status-active"
        )
      ).to.be.true;
    });
  });
  //创建简约版的steps
  it("steps simple", async () => {
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

    await vm.$nextTick().then((_) => {
      expect(vm.$el.querySelector('.kd-step').classList.contains("kd-step-type-simple")).to.be
        .true;
    });
  });
  //自定义图标的steps
  it("steps custom icons", async () => {
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
    await vm.$nextTick().then((_) => {
      expect(
        vm.$el.querySelector('.kd-step-index i').classList.contains(
          "kd-step-icon"
        )
      ).to.be.true;
    });
  });
  //竖式steps
  it("steps vertical", async () => {
    vm = createVue({
      template: `
        <div>
          <div style="height:300px">
              <kd-steps v-model="stepIndex1" style="margin-bottom:40px" direction="vertical">
                  <kd-step title="步骤一"></kd-step>
                  <kd-step title="步骤二" :description="description"></kd-step>
                  <kd-step></kd-step>
              </kd-steps>
              
          </div>
          <div  style="height:300px">
              <kd-steps v-model="stepIndex1" style="margin-bottom:40px" direction="vertical">
                  <kd-step title="步骤一"></kd-step>
                  <kd-step title="步骤二" ></kd-step>
                  <kd-step title="步骤三"></kd-step>
              </kd-steps>
          </div>
        </div>

                `,
      data() {
        return {
          stepIndex1: 1,
          description: "xxx",
        };
      },
    });

    await vm.$nextTick().then((_) => {
      expect(
        vm.$el.querySelector('.kd-steps-container').classList.contains("kd-steps-vertical")
      ).to.be.true;
    });
  });
  //可以点击的steps
  it("create a clickable step", async () => {
    vm = createVue({
      template: `
			<div>
				<kd-steps v-model="stepIndex1" type="spot" :isClick="true">
					<kd-step title="步骤一" ></kd-step>
					<kd-step title="步骤二" ></kd-step>
					<kd-step title="步骤三" ></kd-step>
					<kd-step title="完成" ></kd-step>
				</kd-steps>
				<kd-button ref="focusBtn" @click="_next">下一步</kd-button>
			</div>`,
      data() {
        return {
          stepIndex1: 2,
        };
      },
      methods: {
        _next() {
          this.stepIndex1 = this.stepIndex1 < 4 ? this.stepIndex1 + 1 : 1;
        },
      },
    });
    await vm.$nextTick().then((_) => {
      vm.$el.querySelectorAll(".kd-step-cursor")[0].click();
    });
  });
  //自定义宽度的steps
  it("create a custom width step", async () => {
    vm = createVue({
      template: `
		  <kd-steps v-model="stepIndex1" :width="width">
			  <kd-step title="步骤一"></kd-step>
			  <kd-step title="步骤二"></kd-step>
			  <kd-step title="步骤三"></kd-step>
		  </kd-steps>
				  `,
      data() {
        return {
          stepIndex1: 1,
          width: 1280,
        };
      },
    });
    //
    await vm.$nextTick().then((_) => {
      expect(vm.$el.style.width).to.equal("1280px");
    });
  });
});
