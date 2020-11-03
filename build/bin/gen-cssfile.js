const fs = require('fs');
const path = require('path');
const componentsJson = require('../../components.json');
const themes = [
    'theme-default', 'theme'
];
const components = Object.keys(componentsJson);
const basepath = path.resolve(__dirname, '../../src/styles/');

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

themes.forEach((theme) => {
    components.forEach(function (key) {
        const fileName = key + '.styl';
        const filePath = path.resolve(basepath, theme, 'src', fileName);
        if (!fileExists(filePath)) {
            const stylStr = '';
            fs.writeFileSync(filePath, stylStr, 'utf8');
            console.log(theme, ' create the missing file ', fileName, '.styl');
        }
    });
});
