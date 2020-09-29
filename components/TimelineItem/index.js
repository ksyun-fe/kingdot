import TimelineItem from '../Timeline/timeline-item.vue';

TimelineItem.install = function (Vue) {
    Vue.component(TimelineItem.name, TimelineItem);
};

export default TimelineItem;
