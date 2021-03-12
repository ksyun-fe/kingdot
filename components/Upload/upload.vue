<template>
    <div class="kd-upload">
        <transition-group
                v-if="listType==='picture-card' && showFileList"
                class="kd-upload-list-picture"
                tag="ul"
        >
            <!-- 照片墙格式列表和上传按钮 -->
            <li
                    v-for="file in fileList"
                    :key="file.uid"
                    class="kd-upload-picture-item"
            >
                <slot
                        name="file"
                        :file="file"
                >
                    <div class="kd-upload-pictureitem-wrap">
                        <img :src="file.url"/>
                        <div class="kd-upload-pictureitem-pop">
                            <i
                                    class="kd-icon-delete kd-upload-photo-icon"
                                    @click="handleRemove(file)"
                            ></i>
                        </div>
                    </div>
                </slot>
            </li>
        </transition-group>
        <div
                class="kd-upload-btn-wrap"
                @click="handleClick"
        >
            <!-- 可拖动 -->
            <upload-drag
                    v-if="drag"
                    @dropFiles="updateFile"
            >
                <slot/>
            </upload-drag>
            <slot v-if="!drag"></slot>
            <input
                    ref="uploadInput"
                    class="kd-upload-input"
                    type="file"
                    :multiple="multiple"
                    :accept="accept"
                    @change="handleChange"
            />
        </div>
        <!-- 跟随上传按钮后面 -->
        <slot name="other"/>
        <!-- 提示 -->
        <slot
                name="tip"
        >
            <div class="kd-upload-tip">{{ tip }}</div>
        </slot>
        <!-- 上传文件的列表 -->
        <upload-list
                v-if="listType!== 'picture-card' && showFileList"
                :list-type="listType"
                :file-list="fileList"
                :chunk="chunk"
                @handleRemove="handleRemove"
                @uploadSwitch="uploadSwitch"
        ></upload-list>

    </div>
</template>

<script>
    import uploadDrag from './upload-drag.vue';
    import uploadList from './upload-list.vue';
    import ajax from './ajax.js';
    export default {
        name: 'KdUpload',
        components: {
            uploadDrag,
            uploadList
        },
        props: {
            disabled: Boolean,
            multiple: Boolean,
            listType: {
                type: String,
                default: ''
            },
            drag: Boolean,
            tip: {
                type: String,
                default: ''
            },
            showFileList: {
                type: Boolean,
                default: true
            },
            accept: {
                type: String,
                default: ''
            },
            limit: {
                type: Number
            },
            action: {
                type: String,
                default: ''
            },
            withCredentials: Boolean,
            httpRequest: {
                type: Function,
                default: ajax
            },
            headers: {
                type: Object,
                default() {
                    return {};
                }
            },
            data: {
                type: Object,
                default() {
                    return {};
                }
            },
            initFileList: {
                type: Array,
                default() {
                    return [];
                }
            },
            autoUpload: {
                type: Boolean,
                default: true
            },
            fileChange: {
                type: Function,
                default() {
                    return {};
                }
            },
            beforeUpload: {
                type: Function,
                default() {
                    return {};
                }
            },
            onChange: {
                type: Function,
                default() {
                    return {};
                }
            },
            onRemove: {
                type: Function,
                default() {
                    return {};
                }
            },
            onProgress: {
                type: Function,
                default() {
                    return {};
                }
            },
            onSuccess: {
                type: Function,
                default() {
                    return {};
                }
            },
            onError: {
                type: Function,
                default() {
                    return {};
                }
            },
            onSuspend: {
                type: Function,
                default() {
                    return {};
                }
            },
            chunk: {
                type: Boolean,
                default: false
            },
            chunkSize: {
                type: Number,
                default: 0
            },
            onExceed: {
                type: Function
            }
        },
        data() {
            return {
                files: [],
                reqs: {},
                fileIndex: 1,
                fileList: [],
                uploadStop: false
            };
        },
        watch: {
            initFileList: {
                immediate: true,
                handler(fileList) {
                    this.fileList = fileList.map(file => {
                        file.uid = file.uid || (Date.now() + this.fileIndex++);
                        file.status = file.status || 'success';
                        return file;
                    });
                }
            }
        },
        methods: {
            handleClick() {
                if (!this.disabled) {
                    this.$refs.uploadInput.value = null;
                    this.$refs.uploadInput.click();
                }
            },
            //  @change
            handleChange(e) {
                const files = e.target.files;
                this.updateFile(files);
            },
            // 提交数据
            submit() {
                this.fileList.forEach(file => {
                    if (file.status === 'ready') {
                        this.upload(file);
                    }
                });
            },
            //  上传的文件进行加工
            updateFile(v) {
                const fileList = Array.from(v);
                fileList.forEach((file, index) => {
                    //  加工file文件
                    this.proccess(file, index);
                });
            },
            //  加工文件
            proccess(file, index) {
                const proccessFile = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    raw: file,
                    uid: Date.now() + this.fileIndex++,
                    status: 'ready'
                };
                if (file.type.indexOf('image') !== -1) {
                    proccessFile.url = URL.createObjectURL(file);
                }
                this.fileList.push(proccessFile);
                //  超出个数删除
                if (this.limitFile()) {
                    this.onExceed && this.onExceed(proccessFile, this.fileList);
                    this.handleRemove(proccessFile);
                    return;
                }
                //  没有file改变回调，自动上传
                if (!this.fileChange && this.autoUpload) {
                    this.upload(proccessFile);
                    return;
                }
                //  回调为false,没有通过限制。删除文件
                if (this.fileChange(file, this.fileList)) {
                    if (this.autoUpload) {
                        this.upload(proccessFile);
                    }
                } else {
                    this.handleRemove(proccessFile);
                }
            },
            limitFile(proccessFile) {
                const limit = this.limit;
                return limit ? this.fileList.length > limit : false;
            },
            upload(proccessFile) {
                //  上传之前的回调
                if (!this.beforeUpload) {
                    return this.sliceChunk(proccessFile);
                }
                if (this.beforeUpload(proccessFile)) {
                    //  状态改变
                    this.sliceChunk(proccessFile);
                } else {
                    // 删除
                    this.handleRemove(proccessFile);
                }
            },
            sliceChunk(file) {
                //  是否分块上传
                if (this.chunk) {
                    const chunkSize = this.chunkSize;
                    const sliceTotal = Math.ceil(file.size / chunkSize);
                    file.chunkTotal = sliceTotal;
                    file.currentChunk = 0;
                    this.chunks(file);
                } else {
                    this.http(file);
                }
            },
            chunks(file) {
                //  块级上传文件的加工。添加当前次数，截取文件
                const chunkSize = this.chunkSize;
                const sliceFile = file.raw.slice(file.currentChunk * chunkSize, (file.currentChunk * chunkSize + chunkSize));
                file.currentChunk += 1;
                file.sliceFile = sliceFile;
                this.http(file);
            },
            http(file) {
                //  调用ajax上传。如果是块级，在data添加分块数据
                const that = this;
                const { uid } = file.raw;
                const data = this.data;
                let rawFile = file.raw;
                if (this.chunk) {
                    data.currentChunk = file.currentChunk;
                    data.chunkTotal = file.chunkTotal;
                    rawFile = file.sliceFile;
                }
                const options = {
                    headers: this.headers,
                    withCredentials: this.withCredentials,
                    file: rawFile,
                    data: data,
                    filename: file.name,
                    action: this.action,
                    onProgress: e => {
                        that.handleProgress(e, file);
                    },
                    onSuccess: res => {
                        that.handleSuccess(res, file);
                        delete this.reqs[uid];
                    },
                    onError: err => {
                        that.handleError(err, file);
                        delete this.reqs[uid];
                    }
                };
                const request = this.httpRequest(options);
                this.reqs[uid] = request;
                if (request && request.then) {
                    request.then(options.onSuccess, options.onError);
                }
            },
            //  取消上传
            abort(file) {
                const reqs = this.reqs;
                if (file) {
                    const uid = file.uid;
                    if (reqs[uid]) {
                        reqs[uid].abort();
                    }
                }
            },
            //  进度条
            handleProgress(e, file) {
                const index = this.getFile(file);
                file.status = 'uploading';
                //  分块返回的要每次计算
                if (this.chunk) {
                    let progress = file.progress || 0;
                    if (file.currentChunk * this.chunkSize > file.size) {
                        progress = 100;
                    } else {
                        progress = parseInt(file.currentChunk * this.chunkSize / file.size * 100);
                    }
                    file.progress = progress;
                } else {
                    file.progress = e.percent;
                }
                this.$set(this.fileList, index, file);
                this.onProgress(e, file, this.fileList);
                this.onChange(file, this.fileList);
            },
            handleSuccess(e, file) {
                this.onSuccess(e, file, this.fileList);
                this.onChange(file, this.fileList);
                if (file.uploadStop) return;
                if (this.chunk) {
                    if (file.currentChunk * this.chunkSize < file.size) {
                        this.chunks(file);
                        file.status = 'chunkUploading';
                    } else {
                        file.status = 'success';
                    }
                } else {
                    file.status = 'success';
                }
            },
            handleError(e, file) {
                const fileList = this.fileList;
                file.status = 'error';
                fileList.splice(fileList.indexOf(file), 1);
                this.onError(e, file, fileList);
                this.onChange(file, fileList);
            },
            //  获取当前文件的位置
            getFile(file) {
                return this.fileList.findIndex(item => {
                    return item.uid === file.uid;
                });
            },
            //  上传失败后，手动恢复上传
            uploadSwitch(file) {
                file.uploadStop = !file.uploadStop;
                if (!file.uploadStop) {
                    this.chunks(file);
                } else {
                    this.onSuspend(file, this.fileList);
                }
            },
            //  删除文件
            handleRemove(file) {
                const index = this.fileList.findIndex(f => {
                    return f.uid === file.uid;
                });
                // 取消上传
                this.abort(file);
                this.fileList.splice(index, 1);
                if (this.onRemove) {
                    this.onRemove(this.fileList);
                }
            }
        }
    };
</script>
