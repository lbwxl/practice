/*
 * @Author: WangXinLe 
 * @Date: 2021-12-23 19:00:41 
 * @Last Modified by: WangXinLe
 * @Last Modified time: 2021-12-23 19:27:12
 * 防抖 节流
 */

function debounce(fn,wait) {
    let timer;
    return function(...args) {
        let that = this;
        if(timer) clearInterval(timer);
        timer = setTimeout(() => {
            fn().apply(that,args);
        },wait)
    }
}


function throttle(fn,wait) {
    // 保存当前时间戳
    let time = new Date() * 1;
    return function(...args) {
        let that = this;
        let now = new Date() * 1;
        if(now - time > wait) {
            fn().apply(that,args);
            time = now;
        }
    }
}