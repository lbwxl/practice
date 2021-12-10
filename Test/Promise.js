// 手动封装一个Promise

function MyPromise(fn) {
    // 保存this指向
    that = this;
    // 初始化状态
    that.status = "pending";
    this.value = null;
    fn(resolve, reject);
    function resolve(value) {
        // 如果状态是最初的 pending 那么可以执行
        if (that.status === 'pending') {
            that.status = 'resolve';
            that.value = value;
        }
    }

    function reject(value) {
        if (that.status === 'pending') {
            that.status = 'reject';
            that.value = value;
        }
    }
}

MyPromise.prototype.then = function (fn) {
    if (this.status === 'resolve') {
        // this.value = value
        fn(this.value);
    } else if (this.status === 'reject') {
        console.log(this.value);
    }
}

let person1 = new MyPromise((resolve, reject) => {
    let sum = 10 + 100;
    // resolve(sum);
    reject(error);
});

person1.then(data => {
    console.log('data', data);
}, err => console.log('err', err))