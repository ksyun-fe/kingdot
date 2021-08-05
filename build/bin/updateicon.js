const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../../src/styles/fonts/iconfont.css');
const stylPath = path.join(__dirname, '../../src/styles/common/iconfont.styl');
fs.readFile(cssPath, 'utf8', function (err, data) {
    if (err) throw err;

    const content = data.replace(/url\('iconfont/g, 'url($-font-path + \'/iconfont');
    fs.writeFile(stylPath, content, 'utf8', (err) => {
        if (err) throw err;
        // eslint-disable-next-line no-console
        console.log('update iconfont.styl success');
    });
});
