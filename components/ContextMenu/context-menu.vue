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
            <ul class="kd-context-menu-dropdown">
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
        </div>
    </kd-transition>
</template>
<script>
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
                const offsetHeight = this.menus.length * 30 > this.maxHeight ? this.maxHeight : this.menus.length * 30;
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
                    maxWidth: this.maxWidth + 'px',
                    maxHeight: this.maxHeight + 'px',
                    [topOrBottom]: topOrBottom === 'bottom' ? `${clientHeight - y}px` : `${y}px`,
                    [leftOrRight]: leftOrRight === 'left' ? `${x}px` : `${clientWidth - x}px`
                };
            },
            menus() {
                if (this.group) {
                    return this.options.map(item => {
                        return item.filter(i => this.authid(i.authid));
                    });
                } else {
                    return this.options.filter(i => this.authid(i.authid));
                }
            }
        },
        mounted() {
            document.querySelector('body').addEventListener('click', this.closeMenu);
        },
        beforeDestroy() {
            document.querySelector('body').removeEventListener('click', this.closeMenu);
        },
        methods: {
            authid(code) {
                if (!code) return true;
                return (window.Header && window.Header.getButtonType) ? window.Header.getButtonType(code) : false;
            },
            show(x, y) {
                this.$set(this.menuPosition, 'x', x);
                this.$set(this.menuPosition, 'y', y);
                this.visiable = true;
            },
            closeMenu() {
                this.visiable = false;
            },
            menuClick({disabled, type}) {
                if (disabled) return;
                this.$emit('select', type);
            }
        }
    };
</script>
