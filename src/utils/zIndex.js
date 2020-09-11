import Vue from 'vue';
let zIndex = (Vue.prototype.$KD || {}).zIndex || 2000;
export default function nextZIndex() {
    return zIndex++;
}
