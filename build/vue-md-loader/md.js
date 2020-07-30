const container = require('markdown-it-container');
const markdownItAttrs = require('markdown-it-attrs');
const md = require('markdown-it')();
const defaultFence = md.renderer.rules.fence;
const languages = {
    js: 'javascript',
    javascript: 'javascript',
    shell: 'shell',
    html: 'xml',
    css: 'css'
};
const demoTitleReg = /^demo\s+#(.*?)\s*?##(.+)$/;
md.use(markdownItAttrs, {
    leftDelimiter: '{',
    rightDelimiter: '}',
    allowedAttributes: []
});

md.renderer.rules.fence = function fence(tokens, idx, options, env, slf) {
    const preToken = tokens[idx - 1];
    const currentToken = tokens[idx];

    if (preToken.type === 'container_demo_open' && currentToken.info === 'html') {
        return `
            <template
                    slot="demo"
            >
                <demo-content>${currentToken.content}</demo-content>
            </template>
            <template
                    slot="code"
            >
                <pre v-highlight class="code-highlight">
                    <code v-pre>${defaultFence.call(this, tokens, idx, options, env, slf)}</code>
                </pre>
            </template>
         `;
    } else {
        if (languages[currentToken.info]) {
            return `<pre v-highlight class="code-highlight ${languages[currentToken.info]}">
                        <code v-pre>${defaultFence.call(this, tokens, idx, options, env, slf)}</code>
                 </pre>`;
        }
        return defaultFence.call(this, tokens, idx, options, env, slf);
    }
};

md.use(container, 'demo', {

    validate: function (params) {
        return params.trim().match(/^demo\s+(.*)$/);
    },
    render: function (tokens, idx) {
        const token = tokens[idx];
        const m = token.info.trim().match(demoTitleReg);
        if (tokens[idx].nesting === 1 && m) {
            return `<component-demo class="title">
                        <template slot="title">${m[1].trim()}</template>
                        <template slot="description">
                            ${md.render(m[2])}
                        </template>
                        `;
        } else {
            return '</component-demo>';
        }
    },
    marker: ':'
});

module.exports = md;
