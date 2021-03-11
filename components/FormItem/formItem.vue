<template>
    <div
            class="kd-form-item"
            :class="{'kd-form-item-fluid' : isFluid}"
            @change="_dirty"
            @focusout="_dirty"
    >
        <label
                v-if="!hideLabel"
                class="kd-label"
                :style="labelStyle"
        >
            <slot name="label">{{ label }}</slot>
        </label>
        <div
                class="kd-form-item-content"
                :class="{'kd-form-item-error': isValid}"
        >
            <slot></slot>
            <transition name="validateMessage">
                <div
                        v-if="!isValid && showWarning"
                        class="kd-form-item-validate-error"
                >
                    {{ message }}
                </div>
            </transition>
        </div>
        <div
                v-if="$slots.append"
                class="kd-form-item-append"
        >
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import {defaultMessage, methods as _ruleHandlers} from './ruleHandlers.js';

    export default {
        name: 'KdFormItem',
        inject: ['form'],
        props: {
            label: {
                type: String
            },
            hideLabel: {
                type: Boolean,
                default: false
            },
            labelWidth: {
                type: [String, Number]
            },
            model: {
                type: String
            },
            rules: {
                type: Object,
                default: () => ({})
            },
            messages: {
                type: [Object, String]
            },
            value: {
                type: [Number, String]
            },
            showWarning: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                promise: null,
                forms: [],
                isDirty: false,
                isValid: true,
                oldValue: '',
                message: '',
                timerForRuleChange: null,
                timerForValidate: null
            };
        },
        computed: {
            labelStyle() {
                return {width: this.labelWidth || this.form.labelStyle};
            },
            isFluid() {
                return this.form.fluid;
            }
        },
        watch: {
            rules() {
                if (this.timerForRuleChange) {
                    clearTimeout(this.timerForRuleChange);
                }
                this.timerForRuleChange = setTimeout(() => {
                    this.validateIfDirty();
                }, 100);
            }
        },
        created() {
            // 找到顶层form
            let form = this.$parent;
            while (form && form !== this.form) {
                form = form.$parent;
            }
            if (!form) {
                return console.error('FormItem must be used as the descendant of Form');
            }
            // 没有model，则不对对此formItem进行验证，所以不要push
            if (this.model) {
                if (Array.isArray(this.form.formItems)) {
                    this.form.formItems.push(this);
                } else {
                    this.form.formItems = [this];
                }
            }
        },
        destroyed() {
            if (!(this.model && this.form)) return;
            const items = this.form.formItems;
            items.splice(items.indexOf(this), 1);
        },
        methods: {
            validateIfDirty() {
                if (this.isDirty) {
                    this.validate();
                }
            },
            _cancel() {
                this.isValid = false;
                // cancel the last promise
                if (this.promise) {
                    this.promise.cancelled = true;
                }
            },
            _dirty(e) {
                if (!this.model) return;
                if (this.timerForValidate) {
                    clearTimeout(this.timerForValidate);
                }
                this.timerForValidate = setTimeout(() => {
                    const $data = Object.keys(this.$vnode.context.$data).length ? this.$vnode.context.$data : this.$vnode.context.$props;
                    const newValue = this.deepGetValue($data, this.model).value;
                    if (this.oldValue !== newValue) {
                        this.oldValue = newValue;
                        this.validate();
                    }
                }, 200);
            },
            validate() {
                if (!(this.model && this.form)) {
                    return;
                }
                this._cancel();
                // 用当前规则验证当前value
                const rules = this.getRules();
                const promises = [];
                const keys = [];
                const $data = Object.keys(this.$vnode.context.$data).length ? this.$vnode.context.$data : this.$vnode.context.$props;
                const value = this.deepGetValue($data, this.model).value;
                // check value
                const valueIsExist = _ruleHandlers.required(value);
                // check required rule isTrue
                if (rules.required) {
                    promises.push(valueIsExist);
                    keys.push('required');
                }
                if (valueIsExist) {
                    for (const key in rules) {
                        const rule = rules[key];
                        if (key === 'required' || rule === false) continue;
                        let fn;
                        if (typeof rule === 'function') {
                            fn = rule;
                        } else {
                            fn = _ruleHandlers[key];
                            if (!fn) {
                                console.warn(`Can not find validate method: ${key}`);
                                continue;
                            }
                        }
                        promises.push(fn(value, this, rule));
                        keys.push(key);
                    }
                }
                const p = this.promise = Promise.all(promises)
                    .then(values => {
                        for (let i = 0; i < values.length; i++) {
                            // 对每一项进行校验,查看校验结果,如果失败,则结果包含false以及提示信息
                            if (values[i] !== true) {
                                return [false, this.getMessage(keys[i] || values[i])];
                            }
                        }
                        return [true, ''];
                    }, err => {
                        let message;
                        if (typeof err === 'string') {
                            message = err;
                        } else if (err) {
                            message = err.message || this.getMessage(err.name);
                        }
                        return [false, message];
                    })
                    .then(([isValid, message]) => {
                        if (p.cancelled) return;
                        this.isDirty = true;
                        this.isValid = isValid;
                        this.message = message;
                        return isValid;
                    });
                return p;
            },
            getRules() {
                const selfRules = this.rules;
                return Object.assign({}, selfRules);
            },
            getMessage(ruleName) {
                const customMessages = this.messages;
                const rules = this.getRules();
                const $data = Object.keys(this.$vnode.context.$data).length ? this.$vnode.context.$data : this.$vnode.context.$props;
                const value = this.deepGetValue($data, this.model).value;
                const message = customMessages || defaultMessage[ruleName];
                if (typeof message === 'function') {
                    return message(value, this, rules[ruleName]);
                }
                if (message && message[ruleName]) {
                    return message[ruleName];
                } else {
                    return defaultMessage[ruleName] ? defaultMessage[ruleName](value, this, rules[ruleName]) : '';
                }
            },
            deepGetValue(data, path) {
                path = Array.isArray(path) ? path : path.replace('[', '.').replace(']', '').split('.');
                const res = path.reduce((initVal, current) => {
                    return initVal[current];
                }, data);
                return {value: res === false ? '' : res};
            }
        }
    };
</script>
