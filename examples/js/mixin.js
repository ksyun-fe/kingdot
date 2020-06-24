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
