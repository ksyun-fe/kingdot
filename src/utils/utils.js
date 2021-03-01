import { factory } from 'ulid';

export const ulid = (function () {
    var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

    if (!crypto || !crypto.getRandomValues) {
        return factory(Math.random);
    } else {
        return factory();
    }
})();

function isNullOrUndefined(o) {
    return o === null || o === undefined;
}
export function isNumber(o) {
    return typeof o === 'number';
}

var pathMap = {};
var i18n = {};
var hasOwn = Object.prototype.hasOwnProperty;
var charCodeOfDot = '.'.charCodeAt(0);
var rePropName = RegExp(
    // Match anything that isn't a dot or bracket.
    '[^.[\\]]+' +
            '|' +
            // Or match property names within brackets.
            '\\[(?:' +
            // Match a non-string expression.
            "([^\"'].*)" +
            '|' +
            // Or match strings (supports escaping characters).
            "([\"'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2" +
            ')\\]' +
            '|' +
            // Or match "" as the space between consecutive dots or empty brackets.
            '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))',
    'g'
);
// eslint-disable-next-line no-useless-escape
var valueRegexp = /\{([^\}\s]+)\}/g;
function castPath(path) {
    if (typeof path !== 'string') return path;
    if (pathMap[path]) return pathMap[path];

    var result = [];
    if (path.charCodeAt(0) === charCodeOfDot) {
        result.push('');
    }
    path.replace(rePropName, function (match, expression, quote, subString) {
        var key = match;
        if (quote) {
            // eslint-disable-next-line no-undef
            key = subString.replace(reEscapeChar, '$1');
        } else if (expression) {
            key = expression;
        }
        result.push(key);
    });
    pathMap[path] = result;
    return result;
}
function get(object, path, defaultValue) {
    if (hasOwn.call(object, path)) return object[path];
    path = castPath(path);

    var index = 0;
    var length = path.length;

    while (!isNullOrUndefined(object) && index < length) {
        object = object[path[index++]];
    }

    return index && index === length && object !== undefined
        ? object
        : defaultValue;
}
export function _$(key, data) {
    let value = get(i18n, key);
    if (isNullOrUndefined(value)) {
        value = key;
    }

    if (data) {
        value = value.replace(valueRegexp, (nouse, variable) => {
            let suffix;
            const index = variable.indexOf(':');
            if (index > 0) {
                suffix = variable.substr(0, index);
                suffix = suffix.split('|');
                variable = variable.substr(index + 1);
                variable = get(data, variable);
                if (variable > 1) {
                    return suffix.length > 1 ? suffix[1] : suffix[0];
                } else {
                    return suffix.length > 1 ? suffix[0] : '';
                }
            } else {
                variable = get(data, variable);
                return isNullOrUndefined(variable) ? nouse : variable;
            }
        });
    }

    return value;
}

export function getElementInScroll(e, eqValue) {
    if (typeof eqValue !== 'number') {
        eqValue = eqValue.offsetHeight;
    }
    const data = e.getBoundingClientRect();
    const clientHeight = document.body.clientHeight;
    const selfHeight = e.offsetHeight;
    let result;
    if (clientHeight - data.y - selfHeight - eqValue > 0) {
        result = true;
    } else if (data.y - eqValue > 0) {
        result = false;
    } else {
        result = true;
    }
    return result;
}
var _scrollbarWdith = null;
var _getScrollbarWidth = function () {
    var odiv = document.createElement('div'); // 创建一个div
    var styles = {
        width: '100px',
        height: '100px',
        overflowY: 'scroll' // 让他有滚动条
    };
    var i;
    var scrollbarWidth;
    for (i in styles) odiv.style[i] = styles[i];
    odiv.setAttribute('id', 'tet_scroll');
    document.body.appendChild(odiv); // 把div添加到body中
    scrollbarWidth = odiv.offsetWidth - odiv.clientWidth; // 相减
    _removeNode(odiv); // 移除创建的div
    return scrollbarWidth; // 返回滚动条宽度
};
function _removeNode(node) {
    node.remove ? node.remove() : node.parentElement.removeChild(node);
}
export function getScrollbarWidth() {
    if (!_scrollbarWdith) {
        _scrollbarWdith = _getScrollbarWidth();
    }
    return _scrollbarWdith;
}

export function getStyle(obj, attr, getNumber) {
    var _result;
    if (obj.currentStyle) {
        _result = obj.currentStyle[attr];
    } else {
        _result = document.defaultView.getComputedStyle(obj, null)[attr];
    }
    return getNumber ? Number.parseInt(_result) : _result;
}

const windowPaddingMin = 1;
export function mouseDragBegin(
    { x, y, target },
    dragFn,
    endFn,
    outBraking = {}
) {
    var startPosition = {
        x,
        y
    };
    var prePosition = {
        x,
        y
    };
    var { top, left, width, height} = target.getClientRects()[0];
    const { offsetHeight, offsetWidth } = document.body;
    const minLeft =
        (outBraking.left || windowPaddingMin) + (startPosition.x - left);
    const minTop = (outBraking.top || windowPaddingMin) + (startPosition.y - top);
    const maxTop = offsetHeight - height;
    const maxLeft =
        offsetWidth -
        (outBraking.right || windowPaddingMin) -
        (width - (startPosition.x - left));
    var mouseMove = function (e) {
        e = window.event || e;
        var _x, _y;

        if (minLeft > e.x) {
            _x = minLeft;
        } else if (e.x > maxLeft) {
            _x = maxLeft;
        } else {
            _x = e.x;
        }
        if (e.y < minTop) {
            _y = minTop;
        } else if (e.y > maxTop) {
            _y = maxTop;
        } else {
            _y = e.y;
        }

        prePosition = { x: _x, y: _y };
        dragFn(startPosition, prePosition);
        e.preventDefault();
    };
    var mouseUp = function () {
        endFn && endFn(startPosition, prePosition);
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    };
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}

var _requestAnimationFrame = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout;
export function animationFrame(fn) {
    return _requestAnimationFrame(fn);
}

export function stopPropagation(event) {
    window.event ? (window.event.cancelBubble = true) : event.stopPropagation();
}
var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串

// eslint-disable-next-line no-unused-vars
var isIE =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1;

export function isIe() {
    var result = false;
    var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    var isIE =
        userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    var isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    var isIE11 =
        userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE || isEdge || isIE11) {
        result = true;
    } else {
        result = false;
    }
    return result;
}
