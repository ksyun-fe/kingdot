import {_$, isNumber} from './utils.js';

function count(num) {
    return num === 2 ? _$('两') : num;
}

export const methods = {
    required(value) {
        return value != null &&
            ((typeof value === 'string' || Array.isArray(value)) ? value.length > 0 : true);
    },

    digits(value) {
        return /^\d+$/.test(value);
    },

    email(value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
    },

    url(value) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
    },

    date(value) {
        return !/Invalid|NaN/.test(new Date(value).toString());
    },

    dateISO(value) {
        return /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
    },

    number(value) {
        return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
    },

    minLength(value, item, param) {
        if (isNumber(value)) value = String(value);
        return value.length >= Number(param);
    },

    maxLength(value, item, param) {
        if (isNumber(value)) value = String(value);
        return value.length <= Number(param);
    },

    rangeLength(value, item, param) {
        if (isNumber(value)) value = String(value);
        const length = value.length;
        return length >= Number(param[0]) && length <= Number(param[1]);
    },

    min(value, item, param) {
        return Number(value) >= Number(param);
    },

    max(value, item, param) {
        return Number(value) <= Number(param);
    },

    range(value, item, param) {
        return Number(value) >= Number(param[0]) && Number(value) <= Number(param[1]);
    }
};
export const defaultMessage = {
    required: () => _$('必须填写'),
    digits: () => _$('请输入数字'),
    email: () => _$('请输入正确的邮箱地址'),
    url: () => _$('请输入正确的网址'),
    date: () => _$('请输入正确的日期'),
    dateISO: () => _$('请输入正确的日期 (YYYY-MM-DD)'),
    number: () => _$('请输入正确的数'),
    maxLength(value, item, param) {
        if (Array.isArray(value)) {
            return _$(`最多选择 {n} 项`, {n: count(param)});
        } else {
            return _$(`最多输入 {n} 个字符`, {n: count(param)});
        }
    },
    minLength(value, item, param) {
        if (Array.isArray(value)) {
            return _$(`最少选择 {n} 项`, {n: count(param)});
        } else {
            return _$(`最少输入 {n} 个字符`, {n: count(param)});
        }
    },
    rangeLength(value, item, param) {
        if (Array.isArray(value)) {
            return _$(`请选择 {n} 到 {m} 项`, {n: count(param[0]), m: count(param[1])});
        } else {
            return _$(`请输入 {n} 到 {m} 个字符`, {n: count(param[0]), m: count(param[1])});
        }
    },
    max(value, item, param) {
        return _$(`请输入不大于 {n} 的数`, {n: param});
    },
    min(value, item, param) {
        return _$(`请输入不小于 {n} 的数`, {n: param});
    },
    range(value, item, param) {
        return _$(`请输入 {n[0]} 到 {n[1]} 之间的数`, {n: param});
    },
    equalTo: () => _$('两次输入不一致')
};
