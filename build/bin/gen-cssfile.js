var fs = require('fs');
var path = require('path');
var Components = require('../../components.json');
var themes = [
    'theme-default', 'theme'
];
Components = Object.keys(Components);
var basepath = path.resolve(__dirname, '../../src/styles/themes/');

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

themes.forEach((theme) => {
    var reset = '@import "../../../fonts/iconfont.css";\n@import "../reset.styl";\n';
    var indexContent = reset;
    Components.forEach(function (key) {
        var fileName = key + '.styl';
        indexContent += '@import "./' + fileName + '";\n';
        var filePath = path.resolve(basepath, theme, 'src', fileName);
        if (!fileExists(filePath)) {
            var stylStr = '@import "../default.styl";\n';
            fs.writeFileSync(filePath, stylStr, 'utf8');
            console.log(theme, ' 新建缺失的 ', fileName, ' 文件');
        }
    });
    fs.writeFileSync(path.resolve(basepath, theme, 'src', 'index.styl'), indexContent);
});
