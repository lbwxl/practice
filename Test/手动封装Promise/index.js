/**
 *  index.js   正常调用promise
 *  promise.js 自己封装的原生promise
 *  test.js    用来测试自己封装的promise
 */
console.log(1);
const person = new Promise( (resolve, reject) => {
    console.log(2);
    resolve(4);
} )
console.log(3);
console.log(person.then(123));
// person.then(data=>console.log(data))