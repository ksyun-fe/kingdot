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
    // var isDefault = theme === 'theme-default';
    var reset = '@import "../../../fonts/iconfont.css";\n@import "../reset.styl";\n';
    // reset += isDefault ? '@import "../../reset.styl";\n' : '@import "../../resetOne.styl";\n';
    var indexContent = reset;
    Components.forEach(function (key) {
        // if (['icon', 'option', 'option-group'].indexOf(key) > -1) return;
        var fileName = key + '.styl';
        indexContent += '@import "./' + fileName + '";\n';
        var filePath = path.resolve(basepath, theme, 'src', fileName);
        if (!fileExists(filePath)) {
            // var stylStr = isDefault ? '@import "../../default.styl";\n' : '@import "../../theme.styl";\n';
            var stylStr = '@import "../default.styl";\n';
            fs.writeFileSync(filePath, stylStr, 'utf8');
            console.log(theme, ' 新建缺失的 ', fileName, ' 文件');
        }
        //  else if (!isDefault && fileExists(filePath)) {
        //     var data = fs.readFileSync(filePath, 'utf8');
        //     var str = data.replace('default.styl', 'theme.styl');
        //     fs.writeFileSync(filePath, str, 'utf8');
        // }
    });
    fs.writeFileSync(path.resolve(basepath, theme, 'src', 'index.styl'), indexContent);
});
