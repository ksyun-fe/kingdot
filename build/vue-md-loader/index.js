const path = require('path');
const qs = require('querystring');
const md = require('./md.js');
const parse = require('./parse.js');

module.exports = function (source) {
    const html = md.render(source);
    const {
        resourcePath,
        resourceQuery
    } = this;
    const fileName = path.parse(resourcePath).name;
    const query = qs.parse(resourceQuery.slice(1));
    const descriptor = parse({
        fileName,
        template: `<div>${html}</div>`,
        parsers: [{
            flag: 'demo-content',
            ctor: (c, index) => {
                return `${fileName}_demo_${index}`;
            }
        }],
        resourcePath
    });
    let sfc;
    if (query.md != null) {
        sfc = descriptor.sfcMap[query.cid];
        return this.callback(null, sfc.content);
    }
    this.callback(null, descriptor.code);
};
