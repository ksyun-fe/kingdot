<template>
    <div
            id="container"
            ref="container"
            class="container"
    >
        <div class="panel">
            <h1>King Dot</h1>
            <p class="desc">
                <%= 1 >
            </p>
            <div class="button-wrapper">
                <router-link
                        :to="componentRouter"
                        tag="button"
                        exact
                ><%= 2 ></router-link>
                <button @click="openGithub">Github</button>
            </div>
        </div>
        <div
                ref="canvas"
                class="canvas"
        ></div>
    </div>
</template>
<script>
    const THREE = require('three-js')();
    const CanvasRenderer = require('three-js/addons/CanvasRenderer.js');
    const Projector = require('three-js/addons/Projector.js');
    Projector(THREE);
    CanvasRenderer(THREE);

    export default {
        props: {
            theme: {
                type: String
            }
        },
        data() {
            return {
                material: null,
                changeCanvasTheme: null,
                componentRouter: ''
            };
        },
        computed: {
            canvasColor() {
                return {
                    materialColor: this.theme === 'theme' ? '#50586E' : '#a6bace',
                    renderColor: this.theme === 'theme' ? '#1A1E33' : '#F2F6FA'
                };
            }
        },
        watch: {
            theme: {
                immediate: true,
                handler(v) {
                    this.changeCanvasTheme && this.changeCanvasTheme(v);
                }
            }
        },
        created() {
            this.componentRouter = '/' + this.$route.meta.lang + '/component';
        },
        mounted() {
            const SEPARATION = 80;
            const AMOUNTX = 50;
            const AMOUNTY = 30;
            let renderer;
            let scene;
            let container;
            let camera;
            let material;
            let particles;
            let count = 0;
            const mouseX = -30;
            const mouseY = -200;
            const wrapWidth = this.$refs.container.offsetWidth;
            const wrapHeight = this.$refs.container.offsetHeight;

            const init = () => {
                container = this.$refs.canvas;

                camera = new THREE.PerspectiveCamera(12000, wrapWidth / wrapHeight, 2, 10000);
                camera.position.z = 1000;

                scene = new THREE.Scene();

                particles = [];

                material = new THREE.SpriteCanvasMaterial({
                    color: this.canvasColor.materialColor,
                    program: function (context) {
                        context.beginPath();
                        context.arc(0, 0, 0.6, 0, Math.PI * 2, true);
                        context.fill();
                    }
                });

                let i = 0;
                let particle = 0;
                for (let ix = 0; ix < AMOUNTX; ix++) {
                    for (let iy = 0; iy < AMOUNTY; iy++) {
                        particle = particles[i++] = new THREE.Sprite(material);
                        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
                        scene.add(particle);
                    }
                }
                renderer = new THREE.CanvasRenderer();
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(wrapWidth, wrapHeight);
                renderer.setClearColor(this.canvasColor.renderColor, 1);
                container.appendChild(renderer.domElement);
                window.addEventListener('resize', onWindowResize, false);
            };
            const onWindowResize = () => {
                const wrapWidth = this.$refs.container.offsetWidth;
                const wrapHeight = this.$refs.container.offsetHeight;

                camera.aspect = wrapWidth / wrapHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(wrapWidth, wrapHeight);
            };
            const animate = () => {
                requestAnimationFrame(animate);
                render();
            };
            const render = () => {
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
                camera.lookAt(scene.position);

                let i = 0;
                let particle = 0;

                for (let ix = 0; ix < AMOUNTX; ix++) {
                    for (let iy = 0; iy < AMOUNTY; iy++) {
                        particle = particles[i++];
                        particle.position.y = (
                            Math.sin((ix + count) * 0.3) * 50) + (Math.sin((iy + count) * 0.5) * 50
                        );
                        particle.scale.x = particle.scale.y =
                            (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
                    }
                }

                renderer.render(scene, camera);

                count += 0.05;
            };
            this.changeCanvasTheme = () => {
                material.setValues({
                    color: this.canvasColor.materialColor
                });
                renderer.setClearColor(this.canvasColor.renderColor, 1);
                onWindowResize();
            };
            init();
            animate();
        },
        methods: {
            openGithub() {
                window.open('https://github.com/ksyun-fe/kingdot', '_blank');
            }
        }
    };
</script>
<style scoped ref="stylesheet/stylus" lang="stylus" type="text/stylus">
    .canvas
        position absolute
        width 100%
        height 100%
        overflow hidden
        z-index 0
    body.dark
        .container
            .panel
                color: #FFF
                background: #222A41;
                box-shadow: 0 0 15px 0 rgba(0,0,0,0.15);
                h1
                    color: #FFF
                    &:after
                        background-image: linear-gradient(90deg, #F8334C 0%, #4E284D 100%)
                .desc
                    color: #FFF
                .button-wrapper
                    button
                        color: #FFF
                        background-color: #222A41
                        border: 1px solid #ED3351
                        &.active, &:nth-of-type(1)
                            color #fff
                            background-image: linear-gradient(90deg, #F8334C 0%, #4E284D 100%);

    .container
        height: 100%
        text-align center
        position relative
        .panel
            position absolute
            left 50%
            top 50%
            transform translate(-50%)
            padding 0 58px
            height: 398px
            margin-top -(@height / 2)
            background-color: #fff
            box-shadow: 0 0 15px 0 rgba(0,0,0,0.15)
            border-radius: 4px
            z-index 1
            h1
                position relative
                padding 68px 0 24px 0
                font-size: 42px
                color: #353535
                &:after
                    content ''
                    position absolute
                    bottom 0
                    left calc(50% - 23px)
                    width: 46px
                    height: 4px
                    background-color #557DFC
            .desc
                margin 40px auto 0
                width: 442px
                font-size 14px
                line-height: 32px
                color: #353535
            .button-wrapper
                position absolute
                left 163px
                right 163px
                bottom 58px
                display flex
                justify-content space-between
                button
                    box-sizing border-box
                    width: 104px
                    height: 40px
                    font-size 14px
                    border 1px solid #557DFC
                    background-color: #fff
                    border-radius 40px
                    cursor pointer
                    &.active, &:nth-of-type(1)
                        color #fff
                        background-color: #557DFC
    @media (max-width: 780px)
        .container
            .panel
                padding 20px
                height 348px
                h1
                    margin 16px 0
                    padding 0 0 16px 0
                .desc
                    margin 26px auto 0
                    width 320px
                .button-wrapper
                    margin 0
                    left 20px
                    right 20px
                    bottom 30px
                    justify-content space-around
</style>
