<template>
    <div
            ref="tab"
            :class="{
                'kd-tab':true,
                'kd-tab-active':checked,
                'kd-disabled':disabled,
            }"
            @click="clickTab"
            @contextmenu.prevent="contextmenu"
    >
        <span class="kd-tab-text">
            <slot>标签页</slot>
        </span>
        <div
                v-if="$parent.closable && $parent.size !== 'mini' && !$parent.isVertical"
                class="kd-close"
                @click.stop="closTab"
        >
            <i class="kd-icon-close"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'KdTab',
        props: {
            // eslint-disable-next-line vue/require-prop-types
            value: {
                default: ''
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                flag: false
            };
        },
        computed: {
            checked() {
                return this.$parent.value === this.value;
            },
            innerValue() {
                return this.$parent.value;
            }
        },
        watch: {
            innerValue: function () {
                if (this.checked) {
                    this.autoMove(false);
                }
            }
        },
        mounted() {
            this.updatedStatus();
        },
        updated() {
            if (this.checked) {
                this.updatedStatus();
            }
        },
        methods: {
            updatedStatus() {
                this.checked && this.$parent.setMoveBarPosition({
                    marginLeft: this.$el.offsetLeft,
                    marginTop: this.$el.offsetTop,
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight
                });
            },
            clickTab() {
                if (this.disabled) return;
                const cliclFlag = true;
                if (this.$parent.handleTabMove) {
                    this.$parent.tabHandelMove({
                        marginLeft: this.$el.offsetLeft
                    });
                }
                this.autoMove(cliclFlag);
            },
            contextmenu(e) {
                this.$emit('contextmenu', e);
            },
            autoMove(cliclFlag) {
                this.$parent.tabsActive({
                    val: this.value,
                    marginLeft: this.$el.offsetLeft,
                    marginTop: this.$el.offsetTop,
                    width: this.$el.offsetWidth,
                    height: this.$el.offsetHeight,
                    cliclFlag
                });
            },
            closTab(v) {
                this.$parent.close(this.value);
                this.$el.remove();
            }
        }
    };
</script>
