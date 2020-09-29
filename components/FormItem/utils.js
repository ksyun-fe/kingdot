function isNullOrUndefined(o) {
    return o === null || o === undefined;
}

export function isNumber(o) {
    return typeof o === 'number';
}

const pathMap = {};
const i18n = {};
const hasOwn = Object.prototype.hasOwnProperty;
const charCodeOfDot = '.'.charCodeAt(0);
const rePropName = RegExp(
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
const valueRegexp = /\{([^\}\s]+)\}/g;

function castPath(path) {
    if (typeof path !== 'string') return path;
    if (pathMap[path]) return pathMap[path];

    var result = [];
    if (path.charCodeAt(0) === charCodeOfDot) {
        result.push('');
    }
    path.replace(rePropName, function (match, expression, quote, subString) {
        var key = match;
        console.log(`quote: ${quote}`);
        if (expression) {
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

    let index = 0;
    const length = path.length;

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
