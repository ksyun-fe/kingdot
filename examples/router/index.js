import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
// config language for route;
import componentsConfig from '../i18n/config/components';
const defaultI18n = [
    {
        'lang': 'zh-CN'
    },
    {
        'lang': 'en-US'
    }
];
// eslint-disable-next-line camelcase
const file_map = {
    'zh-CN': name => {
        return r => require.ensure([],
            () => r(require(`../i18n/template/zh-CN/${name}.vue`)),
            'zh-CN');
    },
    'en-US': name => {
        return r => require.ensure([],
            () => r(require(`../i18n/template/en-US/${name}.vue`)),
            'zh-CN');
    }
};
// eslint-disable-next-line camelcase
const load_file = (lang, path) => {
    return file_map[lang](path);
};

let routes = [];

// eslint-disable-next-line camelcase
const component_map = {
    'zh-CN': name => {
        return r => require.ensure([],
            () => r(require(`../docs/zh-CN${name}.md`)),
            'zh-CN');
    },
    'en-US': name => {
        return r => require.ensure([],
            () => r(require(`../docs/en-US${name}.md`)),
            'en-US');
    }
};
// eslint-disable-next-line camelcase
function load_component(lang, name) {
    return component_map[lang](name);
}
const generateComponentsRoute = (componentsConfig) => {
    Object.entries(componentsConfig).forEach(([lang, types], index) => {
        types.forEach((groups) => {
            groups.children.forEach((components) => {
                routes.push({
                    path: `/${lang}/component`,
                    redirect: `/${lang}/component/installation`,
                    component: load_file(lang, 'component'),
                    children: []
                });
                components.children.forEach(component => {
                    if (component.path) {
                        addComponentRoute(component, lang, index);
                    }
                });
            });
        });
    });
    function addComponentRoute(component, lang, index) {
        const child = {
            path: component.path.slice(1),
            name: component.name,
            meta: { lang },
            component: load_component(lang, component.path)
        };
        routes[index].children.push(child);
    }
};
generateComponentsRoute(componentsConfig);

const navRoutes = (lang) => {
    // 首页 + 设计
    const indexRoute = {
        path: `/${lang}`,
        meta: { lang },
        component: load_file(lang, 'index')
    };
    const designRoute = {
        path: `/${lang}/design`,
        redirect: `/${lang}/design/lang`,
        component: load_file(lang, 'design'),
        children: [{
            path: 'lang',
            meta: { lang },
            component: load_file(lang, 'lang')
        }, {
            path: 'color',
            meta: { lang },
            component: load_file(lang, 'color')
        },
        {
            path: 'updatelog',
            meta: { lang },
            component: load_file(lang, 'updatelog')
        }]

    };
    return [indexRoute, designRoute];
};
defaultI18n.forEach(item => {
    routes = routes.concat(navRoutes(item.lang));
});

const initLang = window.navigator.language || 'zh-CN';
const initPath = '/' + initLang;
const router = new Router({
    mode: 'hash',
    routes: [
        {
            path: '/',
            redirect: initPath
        },
        ...routes,
        {
            path: '*',
            redirect: initPath
        }
    ]

});
export default router;
