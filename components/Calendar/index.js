import Calendar from './calendar.vue';

Calendar.install = function (Vue) {
    Vue.component(Calendar.name, Calendar);
};

export default Calendar;
