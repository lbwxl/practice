class Promise {
    constructor(options) {
        if (typeof options !== "function") {
            console.log(`Promise resolver ${options} is not a function`);
            throw new TypeError(`Promise resolver ${options} is not a function`)
        }

        // 初始化值
        this.initValue();

        this.initBind();

        try {
            options(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    initValue() {
        this.state = Promise.PENDING;
        this.value = "";
        this.reason = "";
    }
    // resolve => setTimeout(() => resolve("RESOLVED"))
    // 替换this指向
    initBind() {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    resolve(value) {
        if (this.state === Promise.PENDING) {
            this.state = Promise.FULFILLED;
            this.value = value;
        }
    }

    reject(reason) {
        if (this.state === Promise.PENDING) {
            this.state = Promise.REJECTED;
            this.reason = reason;
        }
    }

    then(onfulfilled, onrejected) {
        if(this.state === Promise.FULFILLED) {
            onfulfilled(this.value);
        }

        if(this.state === Promise.REJECTED) {
            onrejected(this.reason);
        }
    }
}

// Promise的三种状态
Promise.PENDING = 'pending';
Promise.FULFILLED = "fulfilled";
Promise.REJECTED = "rejected";

module.exports = Promise;