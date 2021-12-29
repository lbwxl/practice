// PromiseAll 方法的实现

function PromiseAll(task) {
    /**
     * 首先返回的是一个Promise
     * 接受的参数是一个数组
     */
    return new Promise((resolve, reject) => {
        if (!Array.isArray(task)) {
            reject(new TypeError(`${task} is not a Array`))
        }
        let res = [];   // 用来保存返回结果
        let current = 0;
        let taskLength = task.length;
        for (let i = 0; i < taskLength; i++) {
            // 校验参数的每一项是否是一个promise
            Promise.resolve(task[i]).then(result => {
                current++;
                // 保证结果的索引和我们传进来时一致
                res[i] = result;
                // console.log('current',current);

                if (current === taskLength) {
                    resolve(res);
                }
                // 
            }, err => reject(err))
        }
    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('第一次执行');
        resolve(1);
    }, 3000)
})
let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('第二次执行');
        reject(2);
        // resolve(2);
    }, 2000)
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('第三执行');
        // resolve(3);
        reject(3);
    }, 1000)
})
let p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('第四次执行');
        resolve(4);
    }, 1500)
})

let a = PromiseAll([p1, p2, p3, p4]).then(res => {
    console.log('res', res);
}, err => console.log('errrr', err))
// let a = Promise.all([p1,p2,p3,'123']);
// a.then(res => console.log('res',res))