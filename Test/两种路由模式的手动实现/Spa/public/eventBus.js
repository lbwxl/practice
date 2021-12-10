class EventBus {
    events = {}
    on(event, cb) {
        // 如果订阅列表没有这个订阅，那就给他一个数组
        let cbs = this.events[event] || [];
        this.events[event] = [...cbs, cb];
    }
    off(event, cb) {
        let cbs = this.events[event] || [];
        let index = cbs.indexOf(cb);
        if (index != -1) {
            this.events[event].splice(index, 1);
        }
    }
    emit(event) {
        // for
        // this.events[event]
        let cbs = this.events[event] || [];
        cbs.forEach(item => item());
    }
}

// cbs = {
//   event: [...this.cbs,cb]
// }