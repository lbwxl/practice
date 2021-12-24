function* quips(name) {
    yield " 你好 " + name + "!";
    yield " 希望你能喜欢这篇介绍 ES6 的译文 ";
    if (name.startsWith("X")) {
        yield " 你的名字 " + name + "  首字母是 X，这很酷！";
    }
    yield " 我们下次再见！";
}

var iter = quips("jorendorff");
// [object Generator]
console.log(iter.next());
// { value: " 你好 jorendorff!", done: false }
iter.next()
// { value: " 希望你能喜欢这篇介绍 ES6 的译文 ", done: false }
iter.next()
// { value: " 我们下次再见！", done: false }
iter.next()
// { value: undefined, done: true }


const result = quips('wxl');
console.log(result);