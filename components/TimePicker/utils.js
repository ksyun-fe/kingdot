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
    const [h = 0, m = 0, s = 0] = time.split(':').map(i => +i);
    return (h * 60 + m) * 60 + s;
}
export function stringTime(time, accuracy = 'second') {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    if (accuracy === 'minute') {
        return `${strPad(h, 2)}:${strPad(m, 2)}`;
    } else {
        return `${strPad(h, 2)}:${strPad(m, 2)}:${strPad(s, 2)}`;
    }
}
