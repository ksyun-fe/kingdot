<template>
    <div
            class="kd-upload-drag"
            @drop.prevent="onDrop"
            @dragover.prevent="onDragover"
            @dragleave.prevent="onDragleave"
    >
        <slot>
            <i class="kd-upload-drag-icon kd-icon-path"></i>
            <span class="kd-upload-drag-tip">点击或将文件拖拽到这里上传</span>
        </slot>
    </div>
</template>

<script>
    export default {
        name: 'UploadDrag',
        methods: {
            onDrop(e) {
                const files = e.dataTransfer.files;
                this.$emit('dropFiles', files);
            },
            onDragover(e) {
                // console.log('over', e);
            },
            onDragleave(e) {
                // console.log('leave', e);
            }
        }
    };
</script>
