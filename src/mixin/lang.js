import { translate } from '../lang/index.js';
export default {
    methods: {
        translate(...args) {
            return translate.apply(this, args);
        }
    }
};
