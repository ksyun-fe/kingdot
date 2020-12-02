import { createPopper } from '@popperjs/core';

// 实际使用的位置和popper.js的位置
const placements = [
    'top', 'top-start', 'top-end',
    'right', 'right-start', 'right-end',
    'bottom', 'bottom-start', 'bottom-end',
    'left', 'left-start', 'left-end'
];

export default {
    props: {
        placement: {
            type: String,
            default: 'top',
            validator(v) {
                return placements.indexOf(v) !== -1;
            }
        },
        popperModifiers: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            placements: placements,
            popper: null,
            reference: null,
            visible: false,
            visibleArrow: false,
            arrowEl: null,
            currentPlacement: ''
        };
    },
    watch: {
        visible(val) {
            if (val) {
                this.updatePopper();
            } else {
                this.destroyPopper();
            }
        },
        placement() {
            this.currentPlacement = this.placement;
            if (this.popperJS) {
                this.popperJS.setOptions({
                    placement: this.currentPlacement
                });
            }
        }
    },
    computed: {
        placementCls() {
            return [`kd-tooltip-placement-${this.currentPlacement}`];
        }
    },
    created() {
        this.currentPlacement = this.placement;
    },
    methods: {
        _createPopper() {
            const self = this;
            if (this.placements.indexOf(this.placement) === -1) return;
            this.popper = this.popper || this.$refs.popper;
            const options = Object.create(null);
            if (!this.popper || !this.reference) return;
            if (this.visibleArrow) this.appendArrow(this.popper);
            document.body.appendChild(this.popper);
            if (this.popperJS && this.popperJS.destroy) {
                this.popperJS.destroy();
            }
            options.placement = this.currentPlacement;
            options.strategy = 'fixed';
            const defaultModifiers = [
                // computeStyle
                {
                    name: 'computeStyle',
                    options: {
                        gpuAcceleration: true,
                        adaptive: false
                    }
                },
                // arrow
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: this.arrowEl
                    }
                },
                // applyArrowHide: hide the arrow once it reaches the edge of its popper
                {
                    name: 'applyArrowHide',
                    enabled: true,
                    phase: 'write',
                    fn({ state }) {
                        const { arrow } = state.elements;
                        if (arrow) {
                            if (state.modifiersData.arrow.centerOffset !== 0) {
                                arrow.setAttribute('data-hide', '');
                            } else {
                                arrow.removeAttribute('data-hide');
                            }
                        }
                    }
                },
                // update current placement
                {
                    name: 'updateCurrentPlacementModifiers',
                    enabled: true,
                    phase: 'main',
                    fn({ state }) {
                        self.currentPlacement = state.placement;
                    }
                }
            ];
            options.modifiers = [...defaultModifiers, ...this.popperModifiers];
            options.onFirstUpdate = () => {
                this.currentPlacement = this.popper.getAttribute('data-popper-placement');
            };
            this.popperJS = createPopper(this.reference, this.popper, options);
        },
        updatePopper() {
            if (this.popperJS) {
                this.popperJS.update();
            } else {
                this._createPopper();
            }
        },
        destroyPopper() {
            if (!this.popperJS) return;
            this.popperJS.destroy();
            this.popperJS = null;
            if (this.popper && this.popper.parentNode === document.body) {
                document.body.removeChild(this.popper);
            }
            this.currentPlacement = this.placement; // reset
        },
        appendArrow(element) {
            if (this.appended) return;
            this.appended = true;
            const arrow = document.createElement('div');
            arrow.className = 'kd-tooltip-arrow';
            arrow.setAttribute('data-popper-arrow', '');
            this.arrowEl = arrow;
            element.querySelector(`.kd-tooltip-content`).appendChild(arrow);
        }
    },
    beforeDestroy() {
        this.destroyPopper();
    }
};
