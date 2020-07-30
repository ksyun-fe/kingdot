const LRU = require('lru-cache');
const hash = require('hash-sum');
const cache = new LRU(500);

function parse(option) {
    let {
        template,
        parsers,
        resourcePath
    } = option;
    let modules = '';
    let script = '';
    let code = '';
    const components = [];
    const sfcMap = {};
    const cacheKey = hash(resourcePath + template);
    let output = cache.get(cacheKey);
    if (output) {
        return output;
    }
    if (!Array.isArray(parsers)) {
        parsers = [parsers];
    }
    parsers.forEach(parser => {
        let index = 0;
        const cReg = `<(${parser.flag})>([\\s\\S]*?)</\\1>`;
        template = template.replace(new RegExp(cReg, 'g'), (item, flag, content) => {
            const cid = hash(resourcePath + item);
            const Ctor = typeof parser.ctor === 'function' ? parser.ctor(item, index++, cid) : parser.ctor;
            modules += `import ${Ctor} from '${resourcePath}?md&cid=${cid}';`;
            components.push(Ctor);
            sfcMap[cid] = {
                cid,
                content
            };
            return `<${Ctor}/>`;
        });
    });

    script = `${modules} export default {components: {${components.join(',')}}}`;
    code = `<template>${template}</template><script>${script}</script>`;
    output = {
        components,
        sfcMap,
        template,
        script,
        code
    };
    cache.set(cacheKey, output);
    return output;
}

module.exports = parse;
