const path = require('path');
const version = require('../../package.json').version;
const themes = require('../../src/styles/themes.js');
const fs = require('fs');

themes.forEach(theme => {
    fs.writeFileSync(
        path.resolve(__dirname, `../../docs/${theme}.${version}.css`),
        fs.readFileSync(path.resolve(__dirname, `../../lib/${theme}/index.css`))
    );
});
