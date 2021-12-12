class Mypromise {
    // 每一个promise实例都有的状态
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";

    constructor(options) {
        // 不能相信用户的输入，做容错处理
        if (typeof options !== "function") throw new TypeError(`${options} is not a function`)

        this.initValue();
        this.initBind();

        // 执行传入的函数 try catch 捕获错误信息
        try {
            options(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    // 初始化 promise 实例需要的值
    initValue() {
        // 用来保存 正确执行完以后的结果
        this.value = "";

        // 用来保存执行错误后的错误信息
        this.reason = "";

        // 用来保存Promise实例的初始状态
        this.state = Mypromise.PENDING;

        // 生成一个队列用来保存所有 onfulfilled 方法
        this.onFulfilledTask = [];

        // 生成一个队列保存所有 onrejected 方法
        this.onRejectedTask = [];
    }

    // 替换resolve、reject函数的this指向，让其一直指向该实例对象
    initBind() {
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    // 传入promise中的函数的第一个参数
    resolve(value) {
        /**
         * promise归档一旦状态改变那么就无法在改变所以改变状态的前提是状态处于PENDING(初始化状态)
         * resolve方法就是为了改变promise的执行状态的
         * */

        if (this.state === Mypromise.PENDING) {
            setTimeout(() => {
                // 改变状态 并且将resolve传入的结果赋值保存到promise实例上
                this.state = Mypromise.FULFILLED;
                this.value = value;
                this.onFulfilledTask.forEach(cb => cb(this.value));
            })
        }
    }

    reject(error) {
        if (this.state === Mypromise.PENDING) {
            setTimeout(() => {
                // 改变状态 并且将resolve传入的结果赋值保存到promise实例上
                this.state = Mypromise.REJECTED;
                this.reason = error;
                this.onRejectedTask.forEach(cd => cd(this.value));
            })
        }
    }

    then(onfulfilled, onrejected) {
        /**
         * then 接收两个参数(不是必传项)，两个回调 onfulfilled、onrejected 
         * onfulfilled 回调函数中的第一个参数是promise实例上的value值(也就是resolve传入的值) 
         * onrejected 回调函数中的第一个参数是promise实例上的reason值(也就是reject传入的值)
         */
        // 如果没传这两个参数的话||或者传的不是一个函数的话，会自动包一层
        onfulfilled = typeof onfulfilled == 'function' ? onfulfilled : value => value;
        onrejected = typeof onrejected == 'function' ? onrejected : value => value;
        // 如果promise状态已经改变的话那就执行他对应的回调

        if (this.state === Mypromise.FULFILLED) {
            let p2 = new Mypromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let result = onfulfilled(this.value);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
            return p2;
        }

        if (this.state === Mypromise.REJECTED) {
            return new Mypromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        let result = onrejected(this.reason);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                })
            })
        }

        if (this.state === Mypromise.PENDING) {
            this.onFulfilledTask.push((value) => {
                onfulfilled(value);
            });
            this.onRejectedTask.push((reason) => {
                onrejected(reason)
            });
        }
    }
}

// const people = new Mypromise((resolve, reject) => {
//     let num = Number.parseInt(Math.random() * 10);
//     if (num < 5) {
//         resolve(`满足条件的num -- ${num}`,);
//     } else {
//         reject(`不满足条件的num -- ${num}`);
//     }
// })

// people.then( res => {
//     console.log('res',res);
//     console.log('res+1',res+1);
// },err => {
//     console.log('err',err);
// })

// console.log("START")
// const p2 = new Mypromise(resolve => setTimeout(() => resolve("RESOLVED")))
// p2.then(res => {
//     console.log('then', res);
// })
// console.log("END")

console.log("===START===")
const p4 = new Mypromise(resolve => setTimeout(() => resolve("RESOLVED")));
p4.then(data => console.log(1, data))
p4.then(data => console.log(2, data))
p4.then(data => console.log(3, data))
console.log("===END===")