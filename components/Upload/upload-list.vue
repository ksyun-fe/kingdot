<template>
    <transition-group
            name="kd-translateY"
            tag="ul"
            class="kd-upload-list-wrap"
    >
        <!-- 默认列表 -->
        <li
                v-for="file in fileList"
                :key="file.uid"
                transition="fade"
                class="kd-upload-list-item"
                :class="{'kd-upload-item-uploading':file.progress !== 100 && file.progress}"
        >
            <div class="kd-upload-item-wrap">
                <span class="kd-upload-list-name">
                    <i class="kd-upload-icon kd-file-icon kd-icon-upload-file"></i>
                    {{ file.name }}
                </span>
                <!-- 删除、状态图标 -->
                <i
                        class="kd-upload-icon kd-upload-list-delete kd-upload-status-icon kd-icon-close"
                        @click="$emit('handleRemove',file)"
                ></i>
                <i
                        v-if="file.status =='success'"
                        class="kd-upload-icon kd-upload-status-icon kd-icon-success-solid"
                ></i>
                <i
                        v-if="file.status =='error'"
                        class="kd-upload-icon kd-upload-status-icon kd-icon-error-solid"
                ></i>
            </div>

            <!-- 进度条 -->
            <div
                    v-if="file.progress !== 100 && file.progress"
                    class="kd-upload-progress"
            >
                <kd-progress
                        type="line"
                        :percentage="file.progress"
                        :active="true"
                        :stroke-width="2"
                        status="error"
                        color="#557DFC"
                />
                <div class="kd-upload-progress-wrap">
                    <div class="kd-upload-progress-value"> {{ !file.uploadStop?file.progress + '%':'已暂停' }}</div>
                    <i
                            v-if="chunk"
                            :class="['kd-upload-progress-stop',!file.uploadStop?'kd-icon-video-pause':'kd-icon-video-play']"
                            @click="$emit('uploadSwitch',file)"
                    ></i>
                </div>
            </div>
        </li>

    </transition-group>
</template>

<script>
    export default {
        name: 'UploadList',
        props: {
            listType: {
                type: String,
                default: ''
            },
            fileList: {
                type: Array,
                default() {
                    return [];
                }
            },
            chunk: {
                type: Boolean,
                default: false
            }
        }
    };
</script>
