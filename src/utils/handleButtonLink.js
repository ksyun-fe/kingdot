let link = '';
const defaultLink = (herf) => {
    if (herf) {
        return herf;
    }
};

const createLink = (handleHref) => {
    return (href) => {
        return (handleHref || defaultLink)(href);
    };
};

const getLink = () => {
    return link;
};
const changeLink = (herf) => {
    link = herf;
};
export default {
    createLink,
    getLink,
    changeLink
};
