class EventEmitter {
    store = {};
    on(type, cb) {
        if (!this.store[type]) {
            this.store[type] = [cb];
        } else {
            this.store[type].push(cb);
        }
    }
    emit(type, payload) {
        if (!this.store[type]) return
        this.store[type].forEach(v => v(payload));
    }
    off(type, cb) {
        if (!this.store[type]) return
        let index = this.store[type].findIndex(cb);
        this.store[type].splice(index, 1);
    }
}