


// Function.prototype.myCall = function (context = window, ...args) {
//     // 正确考虑到不去传递指向参数的时候的处理
//     // 生成一个Symbol值确保不会被覆盖
//     let eve = Symbol('eve');
//     let res; // 用来保存结果
//     // 替换this指向的关键一步
//     context[eve] = this;
//     // 判断是否需要传递参数
//     if (args.length > 0) {
//         res = context[eve](...args);
//     } else {
//         res = context[eve]();
//     }

//     // 删除方法 防止内存泄漏
//     delete context[eve];
//     // 由于myCall方法是替换this立即执行的，所以直接返回结果
//     return res;
// }


// console.log(Function.prototype.myCall);


// let Fun = Function.prototype;
// let Func = Object.create(Fun);
Function.prototype.Mycall = function (context = {}, ...args) {
    const cname = Symbol('cname');
    context[cname] = this;
    if (args.length != 0) {
        let res = context[cname](...args);
        delete context[cname];
        return res;
    } else {
        let res = context[cname]();
        delete context[cname];
        return res;
    }
}
function say(...args) {
    console.log(this.name);
    console.log('args',args);
}
console.log(say.Mycall({
    name: '替换'
}, 123));
