const fs = require('fs');
const path = require('path');
const pageConfig = require('../../examples/i18n/config/page.json');
pageConfig.forEach(ele => {
    try {
        fs.statSync(path.resolve(__dirname, `../../examples/i18n/template/${ele.lang}`));
    } catch (e) {
        fs.mkdirSync(path.resolve(__dirname, `../../examples/i18n/template/${ele.lang}`));
    }
    // 替换模板中的字符
    Object.entries(ele.page).forEach(([pageName, pageWords]) => {
        const tplPath = path.resolve(__dirname, `../../examples/i18n/template/${pageName}.tpl`);
        const vuePath = path.resolve(__dirname, `../../examples/i18n/template/${ele.lang}/${pageName}.vue`);
        let content = fs.readFileSync(tplPath, 'utf8');

        Object.entries(pageWords).forEach(([key, val]) => {
            const reg = new RegExp(`<%=\\s*${key}\\s*>`, 'g');
            content = content.replace(reg, val);
        });

        fs.writeFileSync(vuePath, content);
    });
});
