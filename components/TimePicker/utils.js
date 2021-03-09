export function strPad(str, length, pad) {
    str = str.toString();
    pad = pad === undefined ? '0' : pad;
    var l = str.length;
    if (l < length) {
        str = new Array(length - l + 1).join(pad) + str;
    }
    return str;
}
export function parseTime(time) {
    const [h = 0, m = 0, s = 0] = time.split(':').map(i => Number(i));
    return (h * 60 + m) * 60 + s;
}
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
