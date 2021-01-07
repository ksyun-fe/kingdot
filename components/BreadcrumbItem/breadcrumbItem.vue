<template>
    <div class="kd-breadcrumb-item">
        <a
                v-if="href != undefined || to != undefined"
                :class="[
                    'kd-breadcrumb-item-text',
                    {
                        'kd-breadcrumb-item-text-last': isLast(),
                        'kd-breadcrumb-item-link': href != undefined || to != undefined,
                    },
                ]"
                :href="href"
                @click="handleLink"
        >
            <slot></slot>
        </a>
        <span
                v-else
                :class="[
                    'kd-breadcrumb-item-text',
                    { 'kd-breadcrumb-item-text-last': isLast() },
                ]"
        >
            <slot></slot>
        </span>
        <span
                v-if="!isLast()"
                class="kd-separator"
        >
            <span
                    v-if="separator != ''"
                    class="kd-separator-item"
            >{{
                separator
            }}</span>
            <i
                    v-else
                    :class="['kd-separator-item', 'kdicon', separatorClass]"
            ></i>
        </span>
    </div>
</template>

<script type="text/javascript">
    export default {
        name: 'KdBreadcrumbItem',
        components: {},
        props: {
            href: {
                type: String
            },
            to: [String, Object, Function],
            // 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录  replace:[Boolean]
            replace: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {};
        },
        computed: {
            separator() {
                return this.$parent.separator;
            },
            separatorClass() {
                return this.$parent.separatorClass;
            }
        },
        created() {
            this.$parent.getChildren(this);
        },
        methods: {
            // 处理跳转
            handleLink(e) {
                if (this.href !== undefined) return;
                if (this.to === undefined) {
                    this.$emit('click', e);
                } else {
                    if (typeof this.to === 'function') {
                        this.to();
                    } else {
                        e.preventDefault();
                        this.replace
                            ? this.$router.replace(this.to)
                            : this.$router.push(this.to);
                    }
                }
            },
            // 判断是否是最后一个
            isLast() {
                const parent = this.$parent;
                return parent.children[parent.children.length - 1] === this;
            }
        }
    };
</script>

<style scoped lang="stylus">
// @import './index.styl'
</style>
