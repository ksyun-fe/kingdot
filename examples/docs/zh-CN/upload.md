### Upload
将文件通过网页上传到服务器。

:::demo #上传 ##介绍上传使用，tip提示用户的信息，accept属性限制上传文件的格式。

```html
<template>
    <kd-upload
        :auto-upload="false"
        tip="只能上传jpg/png文件，且不超过500kb"
        accept=".png,.jpg"
    >
        <kd-button>点击上传</kd-button>
    </kd-upload>
</template>
```
:::

:::demo #上传 ##添加multiple属性可以选择多个文件，同时上传。限制最多上传3个文件。

```html
<template>
    <kd-upload 
        multiple 
        action="http://127.0.0.1/chunk/api/upload"
        :limit="3"
        :on-exceed="handleExceed"
        :before-upload="beforeaUpload"
    >
        <kd-button type='primary'>点击上传</kd-button>
        <div slot="tip" class="kd-upload-tip">只能上传jpg/png文件，且不超过500kb</div>
    </kd-upload>
</template>
<script>
    export default {
        data(){
            return{
            }
        },
        methods:{
            handleExceed(v,a){
                console.log(v,a);
                this.$message.error('超出文件个数');
            },
            beforeaUpload(file){
                // console.log(file.type,'默认格式错误')
                return true
            }
        }
    }
</script>
```
:::
### 分块上传
:::demo #上传 ##支持分块上传，设置每块的上传大小，支持暂停，恢复功能。

```html
<template>
    <kd-upload 
        multiple 
        :chunk="true"
        :chunkSize="chunkSize"
        action="http://127.0.0.1/chunk/api/upload"
        :onSuspend="handleSuspend"
        :limit="limit"
    >
        <kd-button type='primary'>点击上传</kd-button>
        <div slot="tip" class="kd-upload-tip">只能上传jpg/png文件，且不超过500kb</div>
    </kd-upload>
</template>
<script>
    export default {
        data(){
            return{
                chunkSize:20000,
                limit:3
            }
        },
        methods:{
            handleSuspend(file,fileList){
                console.log(file)
            }
        }
    }
</script>
```
:::

### 用户头像上传
:::demo #上传 ##头像格式上传,自定义限制规则。

```html
<template>
    <kd-upload multiple 
        :file-change="hanleFileChange"
        :auto-upload="false"
        :show-file-list="isFileList"
        >
        <img v-if="headImage" :src="headImage" class="kd-upload-head">
        <i v-else class="kd-upload-add-icon kdicon kd-icon-plus"></i>
    </kd-upload>
</template>
<script>
    export default{
        data() {
            return {
                isFileList:false,
                headImage: ''
            }
        },
        methods:{
            hanleFileChange(file,fileList){
                const isImage = file.type.indexOf('image') > -1;
                const isSize = file.size / 1024 / 1024 < 3;
                const isLimit = fileList.length <= 5;
                if(!isImage){
                    this.$message.error('上传图片只能是 image 格式!')
                }
                if(!isSize){
                    this.$message.error('上传图片不能超过3MB!')
                }   
                let rules = isImage && isSize 
                if(rules){
                    this.headImage = URL.createObjectURL(file)
                }
                return rules
            },
        }
    }
</script>
```
https://jsonplaceholder.typicode.com/posts/ 
:::
### 照片墙上传
:::demo #上传 ##照片墙格式上传,自定义限制规则。

```html
<template>
    <kd-upload multiple 
        action="http://127.0.0.1/chunk/api/upload"
        :data="data"
        :init-file-list="fileList"
        :on-change="hanldeChange"
        :before-change="handleBeforeChange"
        :on-error="handleError"
        list-type="picture-card">
        <i class="kd-upload-add-icon kdicon kd-icon-plus" v-if="isShow"></i>
    </kd-upload>
</template>
<script>
    export default{
        data() {
            return {
                isShow: true,
                fileList: [{name:'testimg',url:'http://127.0.0.1/image/download.jpg'}],
                data:{type:'image'}
            }
        },
        methods:{
            handleBeforeChange(file,fileList){
                console.log(file,fileList)
                //上传前钩子
            },
            hanldeChange(file,fileList){
                //状态更改
                console.log(file)
            },
            handleError(res,file,fileList){
                console.log(res)
            }
        }
    }
</script>
```
:::

:::demo #自定义 ##照片墙自定义缩略图。使用slot="file"自定义。

```html
<template>
    <kd-upload 
        multiple 
        :auto-upload="false"
        list-type="picture-card"
        ref="upload"
    >
        <i class="kd-upload-add-icon kdicon kd-icon-plus"></i>
        <div class="kd-upload-pictureitem-wrap" slot="file" slot-scope="{file}">
            <img :src="file.url"/>
                <div class="kd-upload-pictureitem-pop">
                    <i
                        class="kd-icon-delete kd-upload-photo-icon"
                        @click="handleRemove(file)"
                ></i>
            </div>
        </div>
    </kd-upload>
</template>
<script>
    export default{
        methods:{
            handleRemove(file){
                this.$refs.upload.handleRemove(file);
            }
        }
    }
</script>
```
:::

### 手动上传图片
:::demo #上传 ##照片墙格式上传。

```html
<template>
    <kd-upload 
        multiple 
        :auto-upload="false"
        action="https://jsonplaceholder.typicode.com/posts/"
        ref='upload'
    >
        <kd-button type='primary'>点击上传</kd-button>
        <kd-button type='primary' slot="other" @click="submitUpload" class="ml-20">上传到服务器</kd-button>
    </kd-upload>
</template>
<script>
export default{
    methods:{
        submitUpload(){
            this.$refs.upload.submit();
        }
    }
}
</script>
<style>
.ml-20{
    margin-left:20px
}
</style>
```
:::

### 拖拽上传文件
:::demo #上传 ##拖拽上传文件。

```html
<template>
    <kd-upload 
        multiple
        tip="只能上传jpg/png文件，且不超过500kb"
        :auto-upload="false"
        drag
    >
        <!-- <i class="kd-upload-drag-icon kdicon kd-icon-plus"></i>
        <span>点击或将文件拖拽到这里上传</span> -->
    </kd-upload>
</template>
```
:::

### 属性 {.component__content}
| 属性      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| disabled | 是否禁用 | boolean  | —            | false     |
| multiple | 是否多选 | boolean  |     —        |    false  |
| listType | 列表类型 | string   | picture-card | —         |
| tip | 提示内容 | string   | — | —         |
| drag     | 是否拖动 | boolean  | —            | false     |
| show-file-list | 是否禁用  | boolean | — | true |
| accept | 接受上传的文件类型 | string | — | — |
| limit | 接受文件最大上传的个数 | Number | — | — |
| action | 接受上传地址 | stirng | — | — |
| http-request | 自定义的上传方法 | function | — | — |
| data | 附带的额外参数 | object | — | — |
| init-file-list | 默认的列表数据 | object | — | — |
| auto-upload | 是否自动上传 | boolean | — | — |
| file-change | 新文件值的钩子 | function | — | — |
| before-upload | 文件上传前的钩子 | function | — | — |
| on-change | 文件状态改变的钩子 | function | — | — |
| on-success | 文件上传成功的钩子 |function | — | — |
| on-error | 文件上传失败的钩子 | function | — | — |
| on-remove | 删除文件返回的钩子 | function | — | — |
| on-progress | 文件上传时的钩子 | function | — | — |
| chunk | 文件分段上传 | boolean | — | — |
| chunkSize | 文件分段的大小(byte) | number | — | — |
| on-suspend | 分段上传是暂停返回的钩子 | function | — | — |
| on-exceed | 文件超出个数限制时的钩子 | function(files, fileList) | — | — |

### slot属性 {.component__content}
| 属性      | 说明    |
|---------- |-------- |
| file | 自定义照片墙内容 |
| other | 用于跟随上传按钮后面 |
| tip | 用于自定义提示说明文字 |

### Methods方法 {.component__content}
| 属性      | 说明    | 参数 |
|---------- |-------- |-------- |
| submit | 手动上传文件列表 | — |
| handleRemove | 删除单个文件 | — |
| abort | 取消上传 | — |