import Vue from 'vue';
import "babel-polyfill";
import kingdot from '../../src/index';
import 'src/styles/theme-default/index.styl';
describe('use component', () => {
    Object.keys(kingdot).forEach(c => {
        const component = kingdot[c];
        if (Object.prototype.toString.call(component) === '[object Object]' && component.install) {
            it(`use ${c}`, () => {
                Vue.use(component);
                expect(Vue._installedPlugins.includes(component)).to.be.true;
            });
        }
    });
});
Vue.use(kingdot);
kingdot.changeAuthList(['xxx']);//测试用例button,权限功能点
const testsContext = require.context('./specs', true, /skeleton\.spec$/);


testsContext.keys().forEach(testsContext);
