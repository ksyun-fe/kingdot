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
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            };
        },
        computed: {
            classNameObj() {
                return [
                    'kd-menu-item-group-title',
                    this.menu.mode === 'horizontal' ? 'kd-menu-item-group-title-horizontal' : 'kd-menu-item-group-title-vertical'
                ];
            }
        }
    };
</script>
