export function addEvent(ele, e, func) {
    if (ele.addEventListener) {
        ele.addEventListener(e, func, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + e, func);
    } else {
        ele['on' + e] = func;
    }
}
export function delEvent(ele, e, func) {
    if (ele.removeEventListener) {
        ele.removeEventListener(e, func, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + e, func);
    } else {
        ele['on' + e] = null;
    }
}

export const _requestAnimationFrame = (function () {
    const callbackList = [];
    const requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    const cancelAnimationFrame = window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        Window.webkitCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            window.clearTimeout(id);
        };

    return (callback, event) => {
        callbackList.find((item, index) => {
            if (item.callback === callback) {
                cancelAnimationFrame(item.requestId);
                callbackList.splice(index, 1);
                return true;
            }
        });

        const requestId = requestAnimationFrame(timestamp => {
            const index = callbackList.findIndex(item => item.callback === callback);
            ~index && callbackList.splice(index, 1);
            callback(event, timestamp);
        });
        callbackList.push({
            callback,
            requestId
        });
    };
})();
