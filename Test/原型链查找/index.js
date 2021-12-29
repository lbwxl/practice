function find(Person, cname) {
    let pro = Person.prototype;
    let result;
    while(pro) {
        console.log('pro',pro);
        if(!pro[cname]){
            pro = pro.__proto__;
        }else{
            result = pro[cname];
            pro = null;
        }
    }
    return result;
}

function searchProto(obj, property) {
    while(obj) {
        if(obj.hasOwnProperty(property)) {
            return obj[property]
        }else{
            obj = obj.__proto__;
        }
    }
    return undefined;
}