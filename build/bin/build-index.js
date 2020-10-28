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

const components = [
    {{components}}
];

const install = (Vue, opts = {}) => {
    Vue.prototype.$message = Message.creators;
    components.forEach(c => {
        Vue.component(c.name, c);
    });
    Vue.prototype.$KD = {
        zIndex: opts.zIndex || 2000
    };
};
export default {
    version: {{version}},
    install: install,
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
    version: '' + process.env.version || require('../../package.json').version,
    components: components.join(',' + EOL + '    ')
}));

fs.writeFileSync(path.resolve(process.cwd(), 'components.json'), `{
    ${components.map((c) => {
        return `"${c}": "./components/${c}/index.vue"`;
    }).join(',' + EOL + '    ')}
}`);

console.log('create src/index.js success');
