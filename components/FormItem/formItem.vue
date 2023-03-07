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
                :class="{'kd-form-item-error': !isValid}"
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
                type: [String, Array]
            },
            rules: {
                type: Object,
                default: () => ({})
            },
            messages: {
                type: [Object, String],
                default: () => ({})
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
                oldValue: undefined,
                message: '',
                timerForRuleChange: null,
                timerForValidate: null
            };
        },
        computed: {
            labelStyle() {
                const labelWidth = this.labelWidth ? this.labelWidth.indexOf('px') !== -1 ? this.labelWidth : this.labelWidth + 'px' : '';
                return {width: labelWidth || this.form.labelStyle};
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
                // eslint-disable-next-line no-console
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
            _dirty() {
                if (!this.model) return;
                if (this.timerForValidate) {
                    clearTimeout(this.timerForValidate);
                }
                this.timerForValidate = setTimeout(() => {
                    // const $data = Object.keys(this.$vnode.context.$data).length ? this.$vnode.context.$data : this.$vnode.context.$props;
                    // const newValue = this.deepGetValue($data, this.model).value;
                    let newValue = this.getValidateValue('data');
                    if (newValue === undefined) {
                        newValue = this.getValidateValue('props');
                    }
                    if (this.oldValue !== newValue) {
                        this.oldValue = newValue;
                        this.validate();
                    }
                }, 200);
            },
            // 修复组件不存在data，只存在props的校验
            getValidateValue(code) {
                const $data = this.$vnode.context[`$${code}`];
                const value = this.deepGetValue($data, this.model).value;
                return value;
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
                // const $data = Object.keys(this.$vnode.context.$data).length ? this.$vnode.context.$data : this.$vnode.context.$props;
                // const value = this.deepGetValue($data, this.model).value;
                let value = this.getValidateValue('data');
                if (value === undefined) {
                    value = this.getValidateValue('props');
                }
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
                        let ruleConfig;
                        if (typeof rule === 'function') {
                            ruleConfig = rule;
                        } else {
                            ruleConfig = _ruleHandlers[key];
                            if (!ruleConfig) {
                                // eslint-disable-next-line no-console
                                console.warn(`Can not find validate method: ${key}`);
                                continue;
                            }
                        }
                        if (Object.prototype.toString.call(ruleConfig) === '[object RegExp]') {
                            promises.push(ruleConfig.test(value));
                        } else if (Object.prototype.toString.call(ruleConfig) === '[object Function]') {
                            promises.push(ruleConfig(value, this, rule));
                        } else {
                            // eslint-disable-next-line no-console
                            console.warn(`validate method must be function or regexp`);
                            continue;
                        }
                        keys.push(key);
                    }
                }
                const p = this.promise = Promise.all(promises)
                    .then(values => {
                        for (let i = 0; i < values.length; i++) {
                            // 对每一项进行校验,查看校验结果,如果失败,则结果包含false以及提示信息
                            if (values[i] !== true) {
                                return [false, this.getMessage(keys[i]) || values[i]];
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
                const message = customMessages[ruleName] || defaultMessage[ruleName];
                if (typeof message === 'function') {
                    return message(value, this, rules[ruleName]);
                }
                return message;
            },
            deepGetValue(data, path) {
                const result = (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/]/g, '').split('.') : path)
                    .reduce((o, k) => (o || {})[k], data);
                if (result === false) {
                    return {value: ''};
                } else {
                    return {value: result};
                }
            }
        }
    };
</script>
