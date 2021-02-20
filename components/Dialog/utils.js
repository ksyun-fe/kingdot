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
        // var x = e.x;
        // var y = e.y;
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
