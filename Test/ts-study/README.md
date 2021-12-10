# TypeScript 入门

### typescript 中的原始类型
 - 布尔类型: boolean
 - 数字类型: number
 - 字符串类型: string
 - 空值: void
 - Null 和 Undefined: null 和 undefined
 - Symbol 类型: symbol
 - BigInt 大数整数类型: bigint

### typescript 中其它常见类型
  - any
  - unknow
`unknown 和 any 的主要区别是 unknown 类型会更加严格:在对unknown类型的值执行大多数操作之前,我们必须进行某种形式的检查,而在对 any 类型的值执行操作之前,我们不必进行任何检查。`

```js
let value: any;

value = true;             // OK
value = 1;                // OK
value = "Hello World";    // OK
value = Symbol("type");   // OK
value = {}                // OK
value = []                // OK

// 如果我们换成unknow, 结果也一样
let value: unknown;

value = true;             // OK
value = 1;                // OK
value = "Hello World";    // OK
value = Symbol("type");   // OK
value = {}                // OK
value = []                // OK
```

---
#### 那我们看看他们区别在哪里
```js
let value: any;

value.foo.bar;  // OK
value();        // OK
new value();    // OK
value[0][1];    // OK

// 如果是 unknown 类型,那么结果大不相同:
let value: unknown;

value.foo.bar;  // ERROR
value();        // ERROR
new value();    // ERROR
value[0][1];    // ERROR

// 那么什么时候可以使用unknown，那就是缩小其类型范围[类型保护],它就可以缩小类型范围,比如:
function getValue(value: unknown): string {
  if (value instanceof Date) { // 这里由于把value的类型缩小为Date实例的范围内,所以`value.toISOString()`
    return value.toISOString();
  }

  return String(value);
}


```

#### 总结：我们看到,这就是 unknown 与 any 的不同之处,虽然它们都可以是任何类型,但是当 unknown 类型被确定是某个类型之前,它不能被进行任何操作比如实例化、getter、函数执行等等。
---

### never类型
never 类型表示的是那些永不存在的值的类型，`never 类型是任何类型的子类型，也可以赋值给任何类型`；然而，`没有类型是 never 的子类型`或可以赋值给 never 类型（除了never本身之外）。
<font color=red>即使any也不可以赋值给never</font>

```js
两个场景中 never 比较常见:

// 抛出异常的函数永远不会有返回值
function error(message: string): never {
    throw new Error(message);
}

// 空数组，而且永远是空的
const empty: never[] = []
```

### 声明数组的两种方式
```js
采用泛型的方式
const list: Array<number> = [1,2,3]

另一种使用更加广泛那就是在元素类型后面接上[]
const list: number[] = [1,2,3]
```

### 元组Tuple
```js
元组类型和数组类型非常相似,但是他比数组更为strict
let x: [string,number];
x = ['hello',10];
x = [10,'hello']; // Error

我们可以把元组看成严格版的数组，比如[string, number]我们可以看成是:

interface Tuple extends Array<string | number> {
  0: string;
  1: number;
  length: 2;
}

元组继承于数组，但是比数组拥有更严格的类型检查。

此外，还有一个个元组越界问题，比如 Typescript 允许向元组中使用数组的push方法插入新元素:

const tuple: [string, number] = ['a', 1];
tuple.push(2); // ok
console.log(tuple); // ["a", 1, 2] -> 正常打印出来
但是当我们访问新加入的元素时，会报错:

console.log(tuple[2]); // Tuple type '[string, number]' of length '2' has no element at index '2'
```

### object 表示非原始类型，也就是除 number，string，boolean，symbol，null 或 undefined 之外的类型。


// 这是下一节会提到的枚举类型
enum Direction {
    Center = 1
}

let value: object

value = Direction
value = [1]
value = [1, 'hello']
value = {}
我们看到,普通对象、枚举、数组、元组通通都是 object 类型。

### 枚举
#### 数字枚举
```js
enum Direction {
  Up,
  Down,
  Left,
  Right
}
// 如果不给定值的话，和数组一样从零开始，如果前面给定了值，那么后面也会累加
console.log(Direction.Up === 0);

enum Direction {
  Up,
  Down = 11,
  Left,
  Right
}
console.log(Direction.Up === 0); // true
console.log(Direction.Left === 12);   // true
```

#### 字符串枚举
```js
enum Direction {
  Up = 'Up',
  Down = 'Down',
}
console.log(Direction.Up);    // Up
console.log(Direction[Donw]);    // Down
```

#### 异构枚举
```js
enum Direction {
  No = 0,
  Yes = 'Yes'
}
是的，这样也是没问题的，通常情况下我们很少会这样使用枚举，但是从技术的角度来说，它是可行的。
```

#### 反向映射
```js
enum Direction {
  Up,
  Down
}

Direction.Up === 0;   // true
Direction[0] === Up;  // true
这就很奇怪了，我们印象中一个 JavaScript 对象一般都是正向映射的，即 name => value，为什么在枚举中是可以正反向同时映射的？即 name <=> value。

编译后的js是这样的
var Direction;
( function (Direction) {
  Direction[ Direction[Up] = 0 ] = 'Up';
  Direction[ Direction[Down] = 1 ] = 'Down'
})(Direction || {});

编译这个 Direction[ Direction[Up] = 0 ] = 'Up';
就是下面这个
 Direction[Up] = 10 编译后就是 Direction[10] = 'Up';

就是因为这样所以枚举这个特殊的对象就有了 正反向同时映射的特性
```

#### 常量枚举
枚举其实可以被 const 声明为常量的,这样有什么好处?我们看以下例子:
```js
const enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right'
}

const a = Direction.Up;
它被编译为 JavaScript 后是怎样的?

var a = "Up";

当枚举被使用完之后，后面不在用得上，那么这个枚举Direction就没有存在的必要了，
因为就是 a 取值的时候用了一下，后面就没有用了，如果后面还继续用的话，那么枚举仍然存在，
类似于垃圾回收机制
```

### 联合枚举类型
由于联合联合枚举，类型系统可以知道枚举里的值的集合。
```js

enum Direction {
    Up,
    Down,
    Left,
    Right
}

declare let a: Direction

enum Animal {
    Dog,
    Cat
}

a = Direction.Up // ok
a = Animal.Dog // 不能将类型“Animal.Dog”分配给类型“Direction”
我们把 a 声明为 Direction 类型，可以看成我们声明了一个联合类型 Direction.Up | Direction.Down | Direction.Left | Direction.Right，只有这四个类型其中的成员才符合要求。
```