<template>
    <div class="kd-dropdown-menu">
        <slot/>
    </div>
</template>

<script>
    import Lang from 'src/mixin/lang.js';
    export default {
        name: 'KdDropdownMenu',
        mixins: [Lang]
    };

</script>
