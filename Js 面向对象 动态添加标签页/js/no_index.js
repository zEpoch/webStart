let that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.ul = this.main.querySelector('ul');
        this.add = this.main.querySelector('.tabadd');
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }

    init() {
        that.updateNode();
        this.add.onclick = this.addTab;
        for(let i = 0;i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }
    clearClass() {
        for(let i =0;i<this.lis.length;i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 切换功能
    toggleTab(){
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }
    // 增加功能
    addTab() {
        that.clearClass();
        let random = Math.random();
        let li = '<li class="liactive"><span>测试1'+random+'</span><span class="iconfont icon-guanbi amove"></span></li>';
        let section = '<section class="conactive">测试1'+random+'</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 移除功能
    removeTab(e) {
        e.stopPropagation();
        let index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        if(document.querySelector('.liactive')) return;
        index--;
        that.lis[index] && that.lis[index].click();
    }
    // 修改功能
    editTab() {
        let str = this.innerHTML;
        console.log(str);
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>';
        let input = this.children[0];
        input.value = str;
        input.select(); 
        input.onblur = function () {
            this.parentNode.innerHTML = input.value;
        }
        input.onkeyup = function (e) {
            if(e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');