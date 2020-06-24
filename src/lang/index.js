import zh from './zh-CN/index.js';
const defaultComponentWords = zh;
let currentComponentWords = defaultComponentWords;
export const translate = function (path) {
    if (i18nHandler) { // 支持vue-i18n 改写组件语言
        return i18nHandler.apply(this, arguments) || '';
    }
    const currentLang = currentComponentWords;
    const array = path.split('.');
    return currentLang[array[0]][array[1]];
};
let i18nHandler;
export const i18n = function (fn) {
    i18nHandler = fn;
};

export const use = function (wordsMap) {
    currentComponentWords = wordsMap || defaultComponentWords;
};
