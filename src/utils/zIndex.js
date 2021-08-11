import Vue from 'vue';
let zIndex;

export const setZIndex = (value) => {
    zIndex = value;
};

export default function nextZIndex() {
    zIndex = zIndex || (Vue.prototype.$KD || {}).zIndex || 2000;
    return zIndex++;
}
