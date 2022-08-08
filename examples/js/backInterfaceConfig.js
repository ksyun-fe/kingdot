const host = 'http://kingdot-api.ksyun.com';
const prefix = '/theme';
export default {
    host,
    prefix,
    getVariable: host + prefix + '/getVariable',
    getVersion: host + prefix + '/getVersion',
    uploadTheme: host + prefix + '/uploadTheme',
    loadTheme: host + prefix + '/loadTheme'

};
