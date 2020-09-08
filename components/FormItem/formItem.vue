<template>
    <div
            class="kd-form-item"
            @focusout="validate"
            @change="validate"
            @input="_dirty"
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
                        v-if="!isValid"
                        class="kd-form-Item-validate-error"
                >
                    {{ warning }}
                </div>
            </transition>
        </div>
        <div
                v-if="$slots.append"
                class="kd-formItem-append"
        >
            <slot name="append"></slot>
        </div>
    </div>
</template>

<script>
    import {defaultMessage, methods as _ruleHandlers} from './ruleHandlers';

    export default {
        name: 'FormItem',
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
            message: {
                type: Object
            },
            isDirty: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                isValid: true,
                oldValue: '',
                warning: ''
            };
        },
        computed: {
            labelStyle() {
                return {width: this.labelWidth || this.form.labelStyle};
            }
        },
        watch: {
            rules() {
                this._dirty();
            }
        },
        created() {
            // 找到顶层form
            let form = this.$parent;
            while (form && form !== this.form) {
                console.log(form);
                form = form.$parent;
            }
            if (!form) {
                return console.error('FormItem must be used as the descendant of Form');
            }
            if (this.model) {
                // 没有model，则不对对此formItem进行验证，所以不要push
                form.formItems.push(this);
            }
        },
        destroyed() {
            if (!(this.model && this.form)) return;
            const items = this.form.formItems;
            items.splice(items.indexOf(this), 1);
        },
        methods: {
            _dirty() {
                if (!this.isDirty) {
                    this.validate();
                }
            },
            validate() {
                if (!(this.model && this.form)) {
                    return;
                }
                // 用当前规则验证当前value
                const handlers = [];
                const rules = Object.assign({}, this.rules);
                const keys = [];
                const value = this.deepGetValue(this.$vnode.context.$data, this.model).value;
                if (value !== this.oldValue) {
                    this.oldValue = value;
                } else {
                    return;
                }
                // 先判断是否required, 并将required规则和校验结果先抽离出来
                const valIsExist = _ruleHandlers.required(value);
                if (rules.required) {
                    handlers.push(valIsExist);
                    keys.push('required');
                }
                let handler = null;
                if (valIsExist) {
                    for (const key in rules) {
                        const rule = rules[key];
                        if (key === 'required') continue;
                        // 其他规则
                        // rule是function说明是自定义规则
                        if (typeof rule !== 'function') {
                            handler = _ruleHandlers[key];
                            if (!handler) {
                                console.warn(`Can not find validate method: ${key}`);
                                continue;
                            }
                        } else {
                            handler = rule;
                        }
                        // 将除了required的校验函数执行结果都加到handlers中
                        handlers.push(handler(value, this, rule));
                        keys.push(key);
                    }
                }
                Promise.all(handlers)
                    .then(res => {
                        for (let i = 0; i < res.length; i++) {
                            if (res[i] !== true) {
                                // 说明校验失败
                                const message = res[i] || this.getMessage(keys[i], value);
                                return [false, message];
                            }
                        }
                        return [true, ''];
                    })
                    .then(([isValid, message]) => {
                        this.isValid = isValid;
                        this.warning = message;
                        return isValid;
                    });
            },
            getMessage(ruleName, value) {
                const message = this.message && this.message[ruleName] ? this.message[ruleName] : defaultMessage[ruleName];
                debugger;
                console.log(defaultMessage[ruleName]);
                return typeof message === 'function' ? message(value, this, this.rules[ruleName]) : message;
            },
            deepGetValue(data, path) {
                path = Array.isArray(path) ? path : path.replace('[', '.').replace(']', '').split('.');
                const res = path.reduce((initVal, current) => {
                    return initVal[current];
                }, data);
                return {value: res || ''};
            }
        }
    };
</script>
