import { arrayEquals } from '../../src/utils/utils.js';

let uid = 0;

export default class Node {
    constructor(data, config, parent) {
        this.data = data;
        // 配置
        this.config = config;
        this.parent = parent || null;
        this.uid = uid++;
        this.level = this.parent ? this.parent.level + 1 : 1;

        const { labelName, valueName } = this.config;
        this.value = this.data[valueName];
        this.label = this.data[labelName];

        // 路径
        this.pathNodes = this.calculatePathNodes();
        this.pathValue = this.pathNodes.map(node => node.value);
        this.pathLabels = this.pathNodes.map(node => node.label);
        this.labelText = this.pathLabels.join(' / ');

        // lazy
        this.loading = false;
        this.loaded = false;

        // 初始化子元素
        const childrenData = this.data.children;
        this.children = (childrenData || []).map(child => new Node(child, config, this));
    }

    calculatePathNodes() {
        const nodes = [this];
        let parent = this.parent;
        while (parent) {
            nodes.unshift(parent);
            parent = parent.parent;
        }
        return nodes;
    }

    get isLeaf() {
        const { loaded, children, data } = this;
        const { lazy } = this.config;
        const len = children.length;
        if (lazy) {
            if (data.leaf !== undefined && data.leaf !== null) {
                return data.leaf;
            }
            return loaded ? !len : false;
        }
        return !len;
    }

    get isDisabled() {
        const { data, parent } = this;
        return data.disabled || (parent && parent.isDisabled);
    }

    // 多选
    multiCheck(checked) {
        if (this.checked !== checked) {
            if (this.config.checkStrictly) {
                this.checked = checked;
            } else {
                // 先处理children
                this.broadcast('check', checked);
                this.setCheckState(checked);
                // 处理parent
                this.emit('check');
            }
        }
    }

    broadcast(event, checked) {
        this.children && this.children.forEach(child => {
            if (child) {
                child.broadcast(event, checked);
                if (!child.isDisabled) {
                    child.setCheckState(checked);
                }
            }
        });
    }
    emit(event) {
        const { parent } = this;
        if (parent) {
            parent.childCheck && parent.childCheck();
            parent.emit(event);
        }
    }
    setCheckState(checked) {
        const totalNum = this.children.length;
        const checkedNum = this.children.reduce((c, p) => {
            const num = p.checked ? 1 : (p.indeterminate ? 0.5 : 0);
            return c + num;
        }, 0);
        this.indeterminate = checkedNum !== totalNum && checkedNum > 0;
        this.checked = checked;
    }
    childCheck() {
        const { children } = this;
        const validChildren = children.filter(child => !child.isDisabled);
        const checked = validChildren.length
            ? validChildren.every(child => child.checked)
            : false;
        this.setCheckState(checked);
    }
    // 更新选中状态
    syncCheckState(checkedValue) {
        const checked = this.isContainNode(checkedValue, this.pathValue);
        this.multiCheck(checked);
    }
    isContainNode(checkedValue) {
        const value = this.pathValue;
        return this.config.multiple && checkedValue.length
            ? checkedValue.some(val => arrayEquals(val, value))
            : arrayEquals(checkedValue, value);
    }
}
