const path = require('path');
const fs = require('fs');
const os = require('os');
const string = require('json-templater').string;
const EOL = os.EOL;
const filePath = path.resolve(__dirname, '../../src/index.js');
const componentsPath = path.resolve(__dirname, '../../components');

const importTemplate = 'import {{name}} from \'{{path}}\';';

const componentFiles = fs.readdirSync(componentsPath, {encoding: 'utf-8'});
const template =
`{{import}}
import enable from './utils/enabled.js';
const components = [
    {{components}}
];

const install = (Vue, opts = {}) => {
    const $KD = Vue.prototype.$KD = {};
    $KD.zIndex = opts.zIndex || 2000;
    $KD.getEnabledStatus = enable.createEnabled(opts.getEnabledStatus);
    Vue.prototype.$message = Message.creators;
    components.forEach(c => {
        Vue.component(c.name, c);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: '{{version}}',
    install,
    getAuthList: enable.getAuthList,
    changeAuthList: enable.changeAuthList,
    {{components}}
};
`;

const importContent = [];
const components = [];
componentFiles.forEach(i => {
    const stats = fs.statSync(path.join(componentsPath, i));

    if (stats.isDirectory()) {
        components.push(i);
        importContent.push(string(
            importTemplate,
            {
                name: i,
                path: `../components/${i}/index.js`
            }
        ));
    }
});

fs.writeFileSync(filePath, string(template, {
    import: importContent.join(EOL),
    version: process.env.version || require('../../package.json').version,
    components: components.join(',' + EOL + '    ')
}));

fs.writeFileSync(path.resolve(process.cwd(), 'components.json'), `{
    ${components.map((c) => {
        return `"${c}": "./components/${c}/index.js"`;
    }).join(',' + EOL + '    ')}
}`);

// eslint-disable-next-line no-console
console.log('create src/index.js success');
