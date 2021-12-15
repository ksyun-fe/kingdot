// eslint-disable-next-line no-undef
const host = isProd ? 'http://kingdot-api.ksyun.com' : 'http://localhost:8100';
const prefix = '/theme';
export default {
    host,
    prefix,
    // 获取资源列表
    getVariable: prefix + '/getVariable',
    uploadTheme: prefix + '/uploadTheme',
    loadTheme: prefix + '/loadTheme'

};
