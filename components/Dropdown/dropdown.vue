<template>
    <div
            ref="dropdown"
            class="kd-dropdown"
    >
        <kd-tooltip
                v-model="isShowMenu"
                :trigger="trigger"
                :placement="placement"
                :disabled="disabled"
                can-hover
                :width-limit="false"
                :content-class="dropdownClass"
        >
            <div v-if="!splitButton">
                <slot/>
            </div>
            <!-- <kd-button
                    v-if="!splitButton"
                    ref="defaultBtn"
                    :type="type"
                    :size="size"
                    :disabled="disabled"
            >
            </kd-button> -->
            <!-- 按钮组合 带分割线 -->
            <kd-button-group
                    v-else
            >
                <kd-button
                        :size="size"
                        type="primary"
                        @click="onClick"
                >
                    <slot/>
                </kd-button>
                <kd-button
                        ref="trigger"
                        type="primary"
                        split
                        icon="kd-icon-arrow-down"
                ></kd-button>
            </kd-button-group>
            <template
                    slot="content"
            >
                <slot name="dropdown"/>
            </template>
        </kd-tooltip>

    </div>
</template>
<script>
    import bus from 'src/mixin/bus.js';
    import Lang from 'src/mixin/lang.js';

    export default {
        name: 'KdDropdown',
        mixins: [Lang],
        props: {
            trigger: {
                type: String,
                default: 'hover'
            },
            splitButton: {
                type: Boolean,
                default: false
            },
            clickHide: {
                type: Boolean,
                default: true
            },
            placement: {
                type: String,
                default: 'bottom'
            },
            type: {
                type: String,
                default: 'default'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            contentClass: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isShowMenu: false
            };
        },
        computed: {
            dropdownClass() {
                return `kd-dropdown-tooltip ${this.contentClass}`;
            }
        },
        watch: {
            isShowMenu(v) {
                this.$emit('menu-change', v);
            }
        },
        mounted() {
            bus.$on('item-click', this.itemClick);
        },
        methods: {
            //  左侧菜单点击回调事件
            onClick(e) {
                e.stopPropagation();
                this.$emit('click', e);
            },
            // 菜单项点击事件
            itemClick() {
                if (this.clickHide) {
                    this.isShowMenu = false;
                }
            }
        }
    };

</script>
