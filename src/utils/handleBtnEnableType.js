let type = 'disabled'; // disabled or hide
const defaultType = (type) => {
    if (type) {
        return type;
    }
};

const createBtnEnableType = (handleType) => {
    return (type) => {
        return (handleType || defaultType)(type);
    };
};

const getBtnEnableType = () => {
    return type;
};
const changeBtnEnableType = (enableType) => {
    type = enableType;
};
export default {
    createBtnEnableType,
    getBtnEnableType,
    changeBtnEnableType
};
