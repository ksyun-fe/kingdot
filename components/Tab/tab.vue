<template>
    <div
            class="kd-tab"
            :class="{
                'kd-active':checked,
                'kd-disabled':disabled,
            }"
            @click="clickTab"
    >
        <a class="kd-tab-text">
            <slot>标签页</slot>
        </a>
        <div
                v-if="this.$parent.closable&&this.$parent.size!=='mini'&&!this.$parent.isVertical"
                class="kd-guanbi"
                @click="closTab"
        >
            <i class="kd-icon-close"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tab',
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
                let flag = false;
                flag = this.$parent.value == this.value;
                return flag;
            },
            innerValue() {
                return this.$parent.value;
            }
        },
        watch: {
            innerValue: function (v) {
                if (this.$parent.value == this.value) {
                    this.clickTab();
                }
            }
        },
        created() {
            this.$nextTick(() => {
                this.checked && this.$parent.tabsActive({
                    val: this.value,
                    marginLeft: this.$el.offsetLeft,
                    marginTop: this.$el.offsetTop,
                    width: this.$el.offsetWidth
                });
            });
        },
        methods: {
            clickTab() {
                if (this.disabled) return;
                this.$parent.tabHandelMove({
                    marginLeft: this.$el.offsetLeft
                });
                this.$parent.tabsActive({
                    val: this.value,
                    marginLeft: this.$el.offsetLeft,
                    marginTop: this.$el.offsetTop,
                    width: this.$el.offsetWidth
                });
            },
            closTab(v) {
                v.event && v.event.stopPropagation();   // 兼容
                this.$parent.close(this.value);
                this.$el.remove();
            }
        }
    };
</script>
