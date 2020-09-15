const mediaBreakpoints = {
    xs: 'max-width: 767px',
    sm: 'min-width: 768px',
    md: 'min-width: 992px',
    lg: 'min-width: 1200px',
    xl: 'min-width: 1920px'
};
const mediaBreakSize = Object.keys(mediaBreakpoints);

module.exports = function defineStylusVariable() {
    return (stylus) => {
        stylus.define('mediaBreakSize', () => mediaBreakSize);
        stylus.define('getMediaBreakSizeInfo', (size) => mediaBreakpoints[size.val]);
    };
};

module.exports.mediaBreakpoints = mediaBreakpoints;
module.exports.mediaBreakSize = mediaBreakSize;