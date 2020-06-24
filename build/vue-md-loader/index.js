const path = require('path');
// const { getOptions } = require('loader-utils');
const vueTemplateCompiler = require('vue-template-compiler');

const md = require('./md.js');

const parseDemoComponent = (content, loaderContext) => {
    const tempReg = /<(template)>([\s\S]*?)<\/\1>/;

    if (!tempReg.test(content)) {
        content = `<template>${content}</template>`;
    }

    const sfc = vueTemplateCompiler.parseComponent(content);

    if (sfc.error && sfc.error.length) {
        sfc.error.forEach(e => {
            console.log(e);
        });
    }
    sfc.script = sfc.script || {content: '{}'};

    return sfc;
};

module.exports = function (source) {
    // let option = getOptions(this);
    const fileName = path.parse(this.resourcePath).name;
    let code = md.render(source);
    const demoComponents = code.match(/<(demo-content)>[\s\S]*?<\/\1>/g);
    const components = [];

    if (demoComponents) {
        demoComponents.forEach((c, index) => {
            const sfc = parseDemoComponent(c.replace(/<(demo-content)>([\s\S]*)<\/\1>/, '$2'), this);
            const name = `${fileName}-demo-${index}`;

            components.push(
                `'${name}': {
                    template: \`${sfc.template.content}\`,
                    ...${sfc.script.content.replace(/export\s+default/, '').trim()}
                }`
            );
            code = code.replace(c, `<${name}/>`);
        });
    }

    return `
            <template>
                <div>${code}</div>
            </template>
            <script>
                export default {
                    components: {${components.join(',')}}
                }
            </script>
    `;
};
