const hljs = require('highlight.js/lib/highlight.js');
require('highlight.js/styles/color-brewer.css');

hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));

function highlightEl(el) {
    const blocks = el.querySelectorAll('pre code');

    for (let i = 0; i < blocks.length; i++) {
        hljs.highlightBlock(blocks[i]);
    }
}

export default {
    install(Vue) {
        Vue.directive('highlight', {
            inserted(el) {
                highlightEl(el);
            },
            componentUpdated(el) {
                highlightEl(el);
            }
        });
    }
};
