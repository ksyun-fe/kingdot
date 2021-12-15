<template>
    <div class="container">
        <div
                v-if="!showEditTheme"
                class=""
                :style="{padding: '20px'}"
        >
            <div>
                <div>官方主题</div>
                <div>
                    <kd-button @click="editTheme">编辑</kd-button>
                </div>
            </div>
            <div>
                <div>我的主题</div>
                <div>
                    <kd-button @click="editTheme('custum')">编辑</kd-button>
                </div>
            </div>
        </div>
        <div
                v-if="showEditTheme"
                class="edit-theme-wrap"
                :style="{padding: '20px'}"
        >
            <kd-button @click="goback">返回</kd-button>
            <EtitorTheme></EtitorTheme>
        </div>
    </div>
</template>

<script>
    import {expandMenu} from 'examples/js/mixin';
    import EtitorTheme from 'examples/components/editorTheme.vue';
    export default {
        name: 'Design',
        components: {
            EtitorTheme
        },
        mixins: [expandMenu],
        data() {
            return {
                showEditTheme: false
            };
        },
        methods: {
            editTheme() {
                this.showEditTheme = true;
            },
            goback() {
                this.showEditTheme = false;
            }
        }
    };
</script>
