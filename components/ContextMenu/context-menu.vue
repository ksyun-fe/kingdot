<template>
    <kd-transition
            type="fade"
            class="kd-context-menu"
    >
        <div
                v-if="visiable"
                class="kd-context-menu-wrap"
                :style="positionStyle"
                @mouseleave="closeMenu"
        >
            <ul
                    v-if="menus && menus.length"
                    class="kd-context-menu-dropdown"
            >
                <template v-for="(item, index) in menus">
                    <template v-if="group">
                        <div
                                v-if="item.length"
                                :key="index"
                                class="kd-context-menu-group-li"
                        >
                            <li
                                    v-for="i in item"
                                    :key="i.type"
                                    :class="{
                                        'kd-context-menu-dropdown-li': true,
                                        'is-disabled': i.disabled
                                    }"
                                    @click="menuClick(i)"
                            >
                                <i
                                        v-if="i.icon"
                                        :class="'kd-context-menu-drop-icon ' + i.icon"
                                />{{ i.label }}
                            </li>
                        </div>
                    </template>
                    <li
                            v-else
                            :key="item.type"
                            :class="{
                                'kd-context-menu-dropdown-li': true,
                                'is-disabled': item.disabled
                            }"
                            @click="menuClick(item)"
                    >
                        <i
                                v-if="item.icon"
                                :class="'kd-context-menu-drop-icon ' + item.icon"
                        />{{ item.label }}
                    </li>
                </template>
            </ul>
            <div
                    v-else
                    class="kd-context-menu-no-text"
            >无数据</div>
        </div>
    </kd-transition>
</template>
<script>
    import nextZIndex from '../../src/utils/zIndex.js';
    export default {
        name: 'KdContextMenu',
        props: {
            maxWidth: {
                type: [Number, String],
                default: 220
            },
            maxHeight: {
                type: [Number, String],
                default: 260
            },
            options: {
                required: true,
                type: Array,
                default: function () { return []; }
            },
            group: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                visiable: false,
                menuPosition: {
                    y: 0,
                    x: 0
                }
            };
        },
        computed: {
            positionStyle() {
                const offsetWidth = this.maxWidth;
                let height = 0;
                if (this.group) {
                    const num = this.menus.reduce((len, item) => {
                        len += item.length;
                        return len;
                    }, 0);
                    height = num * 30 + (this.menus.length - 1) * 1;
                } else {
                    height = this.menus.length * 30;
                }
                const offsetHeight = height > this.maxHeight ? this.maxHeight : height;
                const clientWidth = window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth;
                const clientHeight = window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight;
                const {x, y} = this.menuPosition;
                const leftOrRight = clientWidth - x > offsetWidth ? 'left' : 'right';
                const topOrBottom = clientHeight - y > offsetHeight ? 'top' : 'bottom';
                return {
                    zIndex: nextZIndex(),
                    maxWidth: this.maxWidth + 'px',
                    maxHeight: this.maxHeight + 'px',
                    [topOrBottom]: topOrBottom === 'bottom' ? `${clientHeight - y}px` : `${y}px`,
                    [leftOrRight]: leftOrRight === 'left' ? `${x}px` : `${clientWidth - x}px`
                };
            },
            menus() {
                if (this.group) {
                    return this.options.map(item => {
                        return this.getMenus(item);
                    });
                } else {
                    return this.getMenus(this.options);
                }
            },
            btnShowStatus() {
                return this.$KD && this.$KD.setBtnEnableType ? this.$KD.setBtnEnableType() === 'disabled' : true;
            }
        },
        mounted() {
            document.querySelector('body').addEventListener('click', this.closeMenu);
        },
        beforeDestroy() {
            document.querySelector('body').removeEventListener('click', this.closeMenu);
        },
        methods: {
            getMenus(item) {
                return item.reduce((pre, cur) => {
                    const {show} = cur;
                    const canShow = show !== undefined ? show : true;
                    if (canShow) {
                        if (this.btnShowStatus) {
                            cur.disabled = this.authid(cur.authid) ? cur.disabled : true;
                            pre.push(cur);
                        } else {
                            if (this.authid(cur.authid)) pre.push(cur);
                        }
                    }
                    return pre;
                }, []);
            },
            authid(code) {
                if (!code) return true;
                return this.$KD && this.$KD.getEnabledStatus ? this.$KD.getEnabledStatus(code) : true;
            },
            show(x, y) {
                this.$set(this.menuPosition, 'x', x);
                this.$set(this.menuPosition, 'y', y);
                this.visiable = true;
            },
            closeMenu() {
                this.visiable = false;
            },
            menuClick(item) {
                if (item.disabled) return;
                this.$emit('select', item);
            }
        }
    };
</script>
