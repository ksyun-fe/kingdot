import { createVue, triggerEvent, destroyVM } from '../util';
import { methods } from '../../../components/FormItem/ruleHandlers';

describe('Tree', () => {
    let vm;
    afterEach(() => {
        destroyVM(vm);
    });

    //
    const getTreeVm = (props, options) => {
        return createVue(Object.assign({
            template: `
                <kd-tree ref="tree" allowGetParentNode showLine :data="data" ${props} />
            `,
            data() {
                return {
                    expandedKeys: [1],
                    checkedKeys: [1],
                    checkedKeys2: [11],
                    data: [{
                        id: 1,
                        title: '一级 1',
                        children: [
                            {
                                id: 11,
                                title: '二级 1-1'
                            },
                            {
                                id: 12,
                                title: '二级 1-2'
                            }
                        ]
                    }],
                };
            }
        }, options), true);
    };
    // create
    it('create', () => {
        vm = getTreeVm();
        expect(document.querySelector('.kd-tree')).to.exist;
        expect(document.querySelectorAll('.kd-tree > li > .kd-tree-node-el').length).to.equal(3);
    });
    // expand
    it('expand', function(done) {
        vm = getTreeVm(':expandedKeys="expandedKeys"');
        let firstLi = document.querySelectorAll('.kd-tree > li')[0].children[1]; // children 1: of 2rd childnode
        expect(firstLi.style.display != 'none').to.equal(true);
        // switcher click
        let switcher = document.querySelectorAll('.kd-tree-switcher')[0];
        switcher.click();
        this.timeout(3000);
        setTimeout(() => {
            let firstLi = document.querySelectorAll('.kd-tree > li')[0].children[1]; // children 1: of 2rd childnode
            expect(firstLi.style.display).to.equal('none');
            done();
        }, 1000)
    });
    // checkbox
    it('checkbox: click', function(done) {
        vm = getTreeVm('checkbox :expandedKeys="expandedKeys"');
        this.timeout(3000);
        setTimeout(() => {
            let ck = document.querySelectorAll('.kd-tree-checkbox.kd-checkbox');
            ck[0].click();
            setTimeout(() => {
                let ckeckedNodes = vm.$refs.tree.getCheckedNodes({isLeaf: true}); // 叶子节点
                expect(ckeckedNodes.length).to.equal(2);
                done();
            }, 1000)
        }, 1000)
    });
    it('checkbox: parent', () => {
        vm = getTreeVm('checkbox :checkedKeys="checkedKeys"');
        let ckeckedNodes = vm.$refs.tree.getCheckedNodes({isLeaf: true}); // 叶子节点
        expect(ckeckedNodes.length).to.equal(2);
    });
    it('checkbox: children', () => {
        vm = getTreeVm('checkbox :checkedKeys="checkedKeys2"');
        let ckeckedNodes = vm.$refs.tree.getCheckedNodes({isLeaf: true}); // 叶子节点
        expect(ckeckedNodes.length).to.equal(1);
        expect(ckeckedNodes[0].id).to.equal(11);
    });
    it('node: click', () => {
        vm = getTreeVm(':expandedKeys="expandedKeys"');
        let firstNode = document.querySelectorAll('.kd-tree-node-el > .node-title')[0];
        firstNode.click();
        let selectedNodes = vm.$refs.tree.getSelectedNodes();
        expect(selectedNodes.length).to.equal(1);
        expect(selectedNodes[0].id).to.equal(1);
    });
    // search
    it('search', function(done) {
        vm = getTreeVm(':halfcheck="false"');
        vm.$refs.tree.searchNodes(node => node.title.includes('1-1'));
        this.timeout(3000);
        setTimeout(() => {
            let search = document.querySelectorAll('.node-title.node-searched');
            expect(search.length).to.equal(1);
            done();
        }, 1000);
    });
    // drag test
    it('drag', function(done) {
        vm = getTreeVm(':draggable="true" :expandedKeys="expandedKeys"');
        let el= document.querySelectorAll('.kd-tree-node-el');
        this.timeout(15000);

        triggerEvent(el[1], 'mousedown');
        // 尝试把第一个子节点拖放到第二个子节点内部
        // eventName, true, false, null, 0, 0, 0, ofsx, ofsy
        triggerEvent(
            el[1],
            'mousemove',
            true,
            false,
            { x: 1, y: 1 },
        );
        // fix: 未拖放到其他节点下，只做拖放到测试
        triggerEvent(document, 'mouseup');

        setTimeout(() => {
            expect(vm.data[0].children.length).to.equal(2);
            done();
        }, 8000);
    });







})
