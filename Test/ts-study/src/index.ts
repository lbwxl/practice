function greeter(person: string) {
  return "Hello, " + person
}

var a: void = undefined;

// var b: number = undefined;

/* 这里需要提示一下，很多 TypeScript 的原始类型比如 boolean、number、string等等，
* 在JavaScript中都有类似的关键字 Boolean、Number、String，后者是 JavaScript 的构造函数，
* 比如我们用 Number 用于数字类型转化或者构造 Number 对象用的
* ，而 TypeScript 中的 number 类型仅仅是表示类型，两者完全不同。 */
let str: String = '123';
let skt: string = '123';

// js中的二进制，十进制、十六进制都可以用 number 类型表示；

const deLiteral: number = 6;
const aeLiteral: number = 0xf00d;
const beLiteral: number = 0b1010;
const ceLiteral: number = 0xf00d;

// 空值
function user(): void {
  console.log(123);
}

// 实际上只有null 和 undefined 可以赋值给void 但是如果 strictNullchecks 规则为 true，那么null就不可以赋值给void了

/* 将strictNullChecks设置为false ，null就可以赋值给void类型了
   let a3: void = null; */
let a4: void = undefined; 

Number.MAX_SAFE_INTEGER
const max = BigInt(Number.MAX_SAFE_INTEGER);
const min = Number.MAX_VALUE;

// let max1 = max + BigInt(1);
// let max2 = max + BigInt(2);
let max1 = max + 1n;
let max2 = max + 2n;
console.log(max1);
console.log(max2);
// 9007199254740991

console.log(max1 == max2);

const empty: never[] = [];

// 数字枚举
enum Direction {
  Up,
  Down = 11,
  Left,
  Right
}

// 如果不给定值的话，和数组一样从
console.log(Direction.Left === 12);

