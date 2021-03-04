<template>
    <!-- <transition
            name="kd-downmenu"
    >
        <div
                v-show="isShowMenu"
                class="kd-dropdown-menu"
                :class="originStyle"
                :style="menuStyle"
                refs="dropdownMenu"
                @click.stop="()=>{}"
        >
            <slot/>
        </div>
    </transition> -->
    <div class="kd-dropdown-menu">
        <slot name="dropdownItem"/>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';
    export default {
        name: 'KdDropdownMenu',
        mixins: [Lang],
        props: {
            isShowMenu: {
                type: Boolean,
                default: false
            },
            menuStyle: {
                type: Object,
                default() {
                    return {};
                }
            },
            placement: {
                type: String,
                default: 'boottom'
            }
        },
        computed: {
            originStyle() {
                if (this.placement === 'bottom') {
                    return 'kd-transform-origin-top';
                } else {
                    return 'kd-transform-origin-bottom';
                }
            }
        }
    };

</script>
