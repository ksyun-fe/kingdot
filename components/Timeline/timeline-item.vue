<template>
    <li class="kd-timeline-item">
        <div class="kd-timeline-item-tail"></div>
        <div
                :class="dotClasses"
                :style="
                    color && {
                        color: color,
                    }
                "
        >
            <slot name="dot"></slot>
        </div>
        <div class="kd-timeline-item-content">
            <slot></slot>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'KdTimelineItem',
        props: {
            type: {
                type: String,
                default: 'primary',
                validate(v) {
                    return ['success', 'danger', 'primary'].includes(v);
                }
            },
            color: {
                type: String,
                default: ''
            }
        },
        computed: {
            dotClasses() {
                return {
                    'kd-timeline-item-head': true,
                    'kd-timeline-item-head-custom': this.$slots.dot,
                    [`kd-timeline-item-head-${this.type}`]: !this.color
                };
            }
        }
    };
</script>
