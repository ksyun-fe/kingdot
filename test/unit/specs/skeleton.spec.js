import { expect } from "chai";
import Skeleton from "../../../components/Skeleton/skeleton.vue";
import SkeletonItem from "../../../components/SkeletonItem/skeletonItem.vue";
import { createCons, createVue, destroyVM } from "../util";
describe("skeleton", () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  //创建一个默认的Skeleton
  it("create Skeleton of default", () => {
    vm = createCons(Skeleton, {
      value: true,
    });
    expect(vm.$el.querySelector(".skeleton_box")).to.be.have;
  });

  //开启动画效果
  it("create Skeleton of default active", () => {
    vm = createCons(Skeleton, {
      value: true,
      active:true
    });
    expect(vm.$el.querySelector(".skeleton_box_active")).to.be.have;
  });
  //验证rows
  it("create Skeleton of default active", () => {
    vm = createCons(Skeleton, {
      value: true,
      active:true,
      rows:1
    });
    expect(vm.$el.querySelector(".skeleton_item_last")).to.be.null;
  });

  //创建round类型的骨架形状
  it("different types Skeleton of round", () => {
    //圆形
    vm = createVue(
      {
        template: `
                <kd-skeleton 
                   v-model="visible"
               >
                 <kd-skeleton-item type="round" slot="skeleton" />
               </kd-skeleton>
            `,
        data() {
          return {
            visible: true,
          };
        },
      },
      true
    );
    expect(vm.$el.querySelector(".skeleton_item_round")).to.be.have;
  });

  //创建img类型的骨架形状
  it("different types Skeleton of img", () => {
    //圆形
    vm = createVue(
      {
        template: `
               <kd-skeleton 
                  v-model="visible"
              >
                <kd-skeleton-item type="img" slot="skeleton" />
              </kd-skeleton>
           `,
        data() {
          return {
            visible: true,
          };
        },
      },
      true
    );
    expect(vm.$el.querySelector(".skeleton_item_img")).to.be.have;
  });

  //改变宽高
  it("change skeletonitem of width&height", () => {
    vm = createVue(
      {
        template: `
           <kd-skeleton 
              v-model="visible"
          >
            <kd-skeleton-item type="img" slot="skeleton" :width="width" :height="height" />
          </kd-skeleton>
       `,
        data() {
          return {
            visible: true,
            width: 200,
            height: 100,
          };
        },
      },
      true
    );
    let el = vm.$el.querySelector(".skeleton_item_img");
    expect(el.style["width"]).to.equal(
      "200px"
    );
    expect(el.style["height"]).to.equal(
        "100px"
      );
  });
});
