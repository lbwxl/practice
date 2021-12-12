/*
 * @Author: WangXinLe 
 * @Date: 2021-12-11 18:24:49 
 * @Last Modified by: WangXinLe
 * @Last Modified time: 2021-12-11 18:26:11
 */
// 微任务和宏任务的执行顺序

const p = function() {
    return new Promise( (resolve, reject) => {
        const p1 = new Promise( (resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            },0)
        })
        p1.then(res => {
            console.log(res)
        })
        console.log(3);
        resolve(4);
    } )
}

p().then((res) => {
    console.log(res);
})
console.log('end');

/**
 * 先执行   3
 * 后执行   end
 * 后执行   4
 * 最后执行 1
 */