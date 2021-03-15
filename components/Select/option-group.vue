<template>
    <li
            v-show="isGroup"
            class="kd-option-group"
    >
        <span class="kd-option-group-item">{{ scope.label }}</span>
        <ul>
            <slot/>
        </ul>
    </li>
</template>
<script>
    export default {
        name: 'KdOptionGroup',
        props: {
            scope: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                isGroup: true
            };
        }
    };
</script>
