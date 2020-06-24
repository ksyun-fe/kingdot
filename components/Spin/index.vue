<template>
    <div
            :class="[{
                'k-spin':true,
                [`k-spin-${size}`]: size !== 'default',
                [`k-spin-font-${size}`]: size,
                'k-spin-center': !overlay && center,
                'k-spin-overlay': overlay,
                'k-spin-local': local
            }]"
            a:transition="c-fade"
            :style="{ backgroundColor: overlay ? background : '' }"
    >
        <div :class="{'k-spin-wrapper':overlay}">
            <div
                    v-if="!spinner"
                    class="k-spin-canvas"
            >
                <svg viewBox="0 0 120 120">
                    <circle
                            cx="60"
                            cy="60"
                            class="k-spin-circle"
                            r="57"
                    />
                </svg>
            </div>
            <div
                    v-else
                    class="k-spin-canvas-defined"
            >
                <slot/>
            </div>
            <div class="k-spin-loading-text">{{ text }}</div>
        </div>
    </div>

</template>

<script>
    import js from './index.js';
    export default js;
</script>
