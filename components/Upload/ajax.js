function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    // if (!text) {
    //     return text;
    // }
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function getError(action, options, xhr) {
    let msg;
    if (xhr.response) {
        msg = `${xhr.response.error || xhr.response}`;
    } else if (xhr.responseText) {
        msg = `${xhr.responseText}`;
    } else {
        msg = `fail to post ${action} ${xhr.status}`;
    }
    const err = new Error(msg);
    err.method = 'post';
    err.url = action;
    err.status = xhr.status;
    return err;
}

export default function ajax(options) {
    if (typeof XMLHttpRequest === 'undefined') {
        return;
    }
    const xhr = new XMLHttpRequest();
    //  上传地址
    const action = options.action;
    if (xhr.upload) {
        //  上传进度
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = parseInt((e.loaded / e.total) * 100);
            }
            options.onProgress(e);
        };
    }
    const formData = new FormData();
    xhr.onerror = function error(e) {
        options.onError(e);
    };

    xhr.onload = function onload() {
        if (xhr.status < 200 || xhr.status >= 300) {
            return options.onError(getError(action, options, xhr));
        }
        //  返回成功信息
        options.onSuccess(getBody(xhr));
    };
    //  把数据添加到fromData里
    if (options.data) {
        Object.keys(options.data).forEach((item) => {
            formData.append(item, options.data[item]);
        });
    }
    formData.append(options.filename, options.file);
    //  默认post请求
    xhr.open('post', action, true);
    //  添加headers
    const headers = options.headers || {};
    for (var headItem in headers) {
        if (headers[headItem]) {
            xhr.setRequestHeader(headItem, headers[headItem]);
        }
    }
    //  是否携带cookie
    if (options.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }
    xhr.send(formData);
    return xhr;
}
