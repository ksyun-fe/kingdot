let authList = ['zzz'];
const defaultEnabledStatus = (authList, authid) => {
    if (authid) {
        return authList.indexOf(authid) >= 0;
    }
};

const createEnabled = (enable) => {
    return (authid) => {
        return (enable || defaultEnabledStatus)(authList, authid);
    };
};

const getAuthList = () => {
    return authList;
};
const changeAuthList = (list) => {
    authList = list;
};
export default {
    createEnabled,
    getAuthList,
    changeAuthList
};
