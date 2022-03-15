<script>
    export default {
        name: 'KdTag',
        props: {
            closable: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: '' // success 、 info 、warning danger
            },
            disabled: {
                type: Boolean,
                default: false
            },
            isSolid: {
                type: Boolean,
                default: false
            },
            disableAnimation: {
                type: Boolean,
                default: false
            },
            color: String,
            backgroundColor: String,
            borderColor: String,
            size: {
                type: String,
                default: '' // large default small
            }
        },
        data() {
            return {
                disabledValue: false
            };
        },
        computed: {
            tagSize() {
                return this.size || (this.$ELEMENT || {}).size;
            }
        },
        watch: {
            disabled: {
                immediate: true,
                handler(v) {
                    this.disabledValue = v;
                }
            }
        },
        methods: {
            handleClose(event) {
                event.stopPropagation();
                if (this.disabledValue) return;
                this.$emit('close', event);
            },
            handleClick(event) {
                event.stopPropagation();
                if (this.disabledValue) return;
                this.$emit('click', event);
            }
        },
        render(h) {
            const { type, tagSize, disabledValue, isSolid} = this;
            const classes = [
                'kd-tag',
                type ? `kd-tag-${type}` : '',
                tagSize ? `kd-tag-${tagSize}` : '',
                disabledValue ? 'kd-tag-disabled' : '',
                isSolid ? 'kd-tag-solid' : ''
            ];
            const styles = {
                backgroundColor: this.backgroundColor,
                color: this.color,
                borderColor: this.borderColor
            };
            const tagEl = (
                <span
                    class={ classes }
                    style={styles}
                    on-click={ this.handleClick }
                >
                    { this.$slots.default }
                    {
                        this.closable && <i class='kd-tag-close kd-icon-close' on-click={ this.handleClose }></i>
                    }
                </span>
            );
            // return tagEl;
            return this.disableAnimation ? tagEl : <transition name='kd-tag-zoom-in-center'>{ tagEl }</transition>;
        }
    };
</script>
