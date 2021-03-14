export function strPad(str, length, pad) {
    str = str.toString();
    pad = pad === undefined ? '0' : pad;
    var l = str.length;
    if (l < length) {
        str = new Array(length - l + 1).join(pad) + str;
    }
    return str;
}

// 可接受 数组 或 时间字符串 "01:00:00" 输出以秒为单位的时间 number 值
export function parseTime(time) {
    let h = 0;
    let m = 0;
    let s = 0;
    if (typeof time === 'string') {
        [h = 0, m = 0, s = 0] = time.split(':').map(i => Number(i));
    } else if (Array.isArray(time)) {
        [h = 0, m = 0, s = 0] = time.map(i => Number(i));
    }
    return (h * 60 + m) * 60 + s;
}

// 可接受 时间戳, 不规整时间字符串 "1:1:00", 输出规整时间字符串"01:01:00"
export function stringTime(time, accuracy = 'second') {
    let h = 0;
    let m = 0;
    let s = 0;
    if (typeof time === 'number') {
        h = Math.floor(time / 3600);
        m = Math.floor((time % 3600) / 60);
        s = time % 60;
    } else if (typeof time === 'string') {
        [h = 0, m = 0, s = 0] = time.split(':').map(i => Number(i));
    } else {
        return new Error('stringTime 传入参数格式错误. ');
    }

    if (accuracy === 'minute') {
        return `${strPad(h, 2)}:${strPad(m, 2)}`;
    } else {
        return `${strPad(h, 2)}:${strPad(m, 2)}:${strPad(s, 2)}`;
    }
}

export function getDateString(date, type) {
    const year = `${date.getFullYear()}`;
    if (type === 'year') {
        return year;
    }
    const month = `${year}/${strPad(date.getMonth() + 1, 2)}`;
    if (type === 'month') {
        return month;
    }
    const _date = `${month}/${strPad(date.getDate(), 2)}`;

    if (type !== 'datetime') {
        return _date;
    }

    return `${_date} ${getTimeString(date)}`;
}

export function getTimeString(date) {
    return [
        strPad(date.getHours(), 2),
        strPad(date.getMinutes(), 2),
        strPad(date.getSeconds(), 2)
    ].join(':');
}
