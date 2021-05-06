<template>
    <div
            v-transfer-dom
            class="kd-offline-fixed"
    >
        <div
                v-if="mask"
                :class="{
                    'kd-offline-mask': true,
                    'kd-message-warning': type === 'error',
                    'kd-message-success': type === 'success'
                }"
        >
            <h2 class="kd-offline-title">
                <i
                        :class="{
                            'kd-kdicon-mask': true,
                            'kd-offline-icon': true,
                            'kd-icon-warning-solid': type === 'error',
                            'kd-icon-success-circle': type === 'success'
                        }"
                ></i>
                {{ title }}
            </h2>
        </div>
    </div>
</template>

<script>
    import transferDom from '../Dialog/transfer-dom.js';
    import nextZIndex from '../../src/utils/zIndex.js';

    export default {
        name: 'KdOffline',
        directives: {
            transferDom
        },
        props: {
            offlineTitle: {
                type: String,
                default: '网络已断开，请检查网络连接'
            },
            onlineTitle: {
                type: String,
                default: '网络已连接'
            },
            duration: {
                type: Number,
                default: 5000
            }
        },
        data() {
            return {
                mask: false,
                title: '',
                type: '',
                timer: null
            };
        },
        watch: {
            mask(newValue) {
                if (newValue) {
                    this.$el.style.zIndex = nextZIndex();
                }
            }
        },
        mounted() {
            window.addEventListener('offline', this.eventHandle);
            window.addEventListener('online', this.eventHandle);
        },
        beforeDestroy() {
            window.removeEventListener('offline', this.eventHandle);
            window.removeEventListener('online', this.eventHandle);
        },
        methods: {
            eventHandle(event) {
                const type = event.type === 'offline' ? 'error' : 'success';
                this.type = type;
                this.title = type === 'error' ? this.offlineTitle : this.onlineTitle;
                this.mask = true;
                if (this.duration > 0) {
                    this.timer && clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.mask = false;
                    }, this.duration);
                }
            }
        }
    };
</script>

