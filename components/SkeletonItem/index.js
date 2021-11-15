import SkeletonItem from './skeletonItem.vue';

SkeletonItem.install = (Vue) => {
    Vue.component(SkeletonItem.name, SkeletonItem);
};

export default SkeletonItem;
