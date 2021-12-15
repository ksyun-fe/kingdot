export const expandMenu = {
    data() {
        return {
            isShowMenu: false
        };
    },
    methods: {
        showMenu() {
            this.isShowMenu = !this.isShowMenu;
        },
        hideMenu() {
            this.isShowMenu = false;
        }
    }
};
export default {
    methods: {
        _request(params) {
            return new Promise((resolve, reject) => {
                const method = (params.method || 'get').toLowerCase();
                const body = params.data || params;
                this.$http[method](params.url, body, params).then((res) => {
                    res.data = res.body;
                    resolve(res);
                }, (e) => {
                    reject({
                        status: e.status,
                        message: e.statusText
                    });
                });
            });
        }
    }
};
