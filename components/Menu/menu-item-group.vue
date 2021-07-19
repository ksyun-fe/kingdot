<template>
    <li class="kd-menu-item-group">
        <div
                :class="classNameObj"
                :style="[paddingStyle]"
        >
            <template v-if="title">{{ title }}</template>
            <slot
                    v-else
                    name="title"
            ></slot>
        </div>
        <ul>
            <slot></slot>
        </ul>
    </li>
</template>

<script>
    import Menu from './menu-mixin';
    export default {
        name: 'KdMenuItemGroup',
        componentName: 'KdMenuItemGroup',
        mixins: [Menu],
        inject: ['menu'],
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                classNameObj: [
                    'kd-menu-item-group-title',
                    this.menu.mode === 'horizontal' ? 'kd-menu-item-group-title-horizontal' : 'kd-menu-item-group-title-vertical'
                ]
            };
        },
        computed: {

        },
        watch: {

        },
        methods: {
            isActiveFun() {
                if (this.$parent.$options.componentName === 'KdSubmenu') {
                    this.$parent.isActiveFun();
                }
            }
        }
    };
</script>
