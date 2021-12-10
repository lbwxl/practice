const promise = require("./promise");

// let a = new promise(1213)

let a = new promise((resolve, reject) => {
    // resolve(1)
    reject('出错了');
})
resolve => {
    setTimeout(() => resolve("RESOLVED"))
}
a.then( res => {
    console.log('res',res)
}, error => {
    console.log('error',error)
})