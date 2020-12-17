var path = require('path');
var fs = require('fs');
var postcss = require('postcss');

var fontPath = path.resolve(__dirname, '../../src/styles/fonts/iconfont.css');
var jsonPath = path.resolve(__dirname, '../../examples/icon.json');
var fileCont = fs.readFileSync(fontPath, 'utf8');
var nodes = postcss.parse(fileCont).nodes;
var classList = [];
nodes.forEach((node) => {
    var selector = node.selector || '';
    var reg = new RegExp(/\.kd-icon-([^:]+):before/);
    var arr = selector.match(reg);

    if (arr && arr[1]) {
        classList.push(arr[1]);
    }
});

fs.writeFile(jsonPath, JSON.stringify(classList), () => {});
