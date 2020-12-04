import Progress from './progress.vue';

Progress.install = (Vue) => {
    Vue.component(Progress.name, Progress);
};

export default Progress;
