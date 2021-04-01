import TimePicker from './time-picker.vue';

TimePicker.install = (Vue) => {
    Vue.component(TimePicker.name, TimePicker);
};

export default TimePicker;
