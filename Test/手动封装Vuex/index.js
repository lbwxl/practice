export default {
    install,
    Store
}

let Vue;
function install(_Vue) {
    Vue = _Vue; // 缓存Vue构造函数，后面用
    Vue.mixin({
        beforeCreate() {
            // 如果当前实例上有store，那就是当前实例上的
            if(this.$options.store) {
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}