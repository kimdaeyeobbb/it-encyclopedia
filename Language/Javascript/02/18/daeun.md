## 15. 함수와 일급객체

---

## 일급 객체

- 무명의 리터럴로 생성할 수 있다. 즉 런타임에 생성이 가능하다.

```js
const increase = function (num) {
  return ++num;
};
```

- 변수에 할당(assignment)할 수 있다.

```js
// 함수 표현식을 생각하면 된다.
const mul = function (num) {
  return num * num;
};
```

- 다른 함수를 인자(argument)로 전달 받는다.

```js
function mul(num) {
  return num * num;
}

// func는 매개변수
function mulNum(func, number) {
  return func(number);
}

let result = mulNum(mul, 3); // 9
// mul을 인자로 받는 mulNum이 고차함수, mul은 콜백함수
```

- 다른 함수의 결과로서 리턴될 수 있다.

```js
function add(num1) {
  return function (num2) {
    return num1 + num2;
  };
}

add(3)(4); // 7
// 반환값으로 사용할 수 있다.
```

<br>

## 함수

- 함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미
- 객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.

<br>

### 일급 객체로서 함수가 가지는 특징

- `고차함수(Higher order function)`를 만들 수 있다.
- `콜백(callback)`을 사용할 수 있다.

<br>

### 일반 객체와 함수의 차이점

- 일반 객체는 호출할 수 없지만 함수 객체는 호출할 수 있다.
- 함수 객체는 일반 객체에 없는 함수 고유의 프로퍼티를 소유한다.

<br>

### 함수 객체의 프로퍼티

```js
function square(number) {
  return number * number;
}
console.dir(square);
```

<img src="https://user-images.githubusercontent.com/78911818/216824442-d530edd4-ca1a-4486-8d64-97a41ad0fc4e.png" width="350px">

**1. arguments 프로퍼티**

- arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며, 함수 내부에서 지역 변수처럼 사용된다. (함수 외부에서 사용 불가)
- 자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다. 따라서 함수 호출 시 매개변수 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다.

```js
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply()); //NaN
console.log(multiply(1)); //NaN
console.log(multiply(1, 2)); //2
console.log(multiply(1, 2, 3)); //2
```

<img src="https://user-images.githubusercontent.com/78911818/216826647-e78631d0-3b38-4733-8bee-70d2f7d0185b.png" width="350px">

- 매개변수 개수를 초과한 인수는 버려지는 것이 아니라 arguments 객체의 프로퍼티에 암묵적으로 보관된다.
- arguments 객체는 인수를 프로퍼티 값으로 소유하며, 프로퍼티 키는 인수의 순서를 나타낸다.
- callee 프로퍼티는 arguments 객체를 생성한 함수를 가리키며, length 프로퍼티는 인수의 개수를 가리킨다.

<br>

**arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.**
함수가 호출되면 인수 개수를 확인하고 이에 따라 함수의 동작을 정의해야 하는 때 사용된다.

> 가변 인자 함수 : 매개변수(가변 인자) 개수를 미리 고정시키지 않고 임의대로 허용할 수 있는 함수

```js
function sum() {
  let res = 0;

  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }

  return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

<br>

**2. caller 프로퍼티**  
ECMAScript 사양에 포함되지 않은 비표준 프로퍼티 (사용 X)

- 함수 자신을 호출한 함수를 가리킨다.

```js
function foo(func) {
  return func();
}

function bar() {
  return "caller : " + bar.caller;
}

console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar()); // caller : null
```

<br>

**3. length 프로퍼티**

- 함수를 정의할 때 선언한 매개변수의 개수

```js
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1 (x)

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2 (x, y)
```

> arguments 객체의 length 프로퍼티는 인자(arguments)의 개수, 함수 객체의 length 프로퍼티는 매개변수(parameter)의 개수를 가리킨다.

<br>

**4. name 프로퍼티**  
함수 이름을 나타낸다. (ES6부터 정식 표준)

> ES5와 ES6에서 다르게 동작하는 name 프로퍼티
> 익명 함수 표현식의 경우, ES5에서 name 프로퍼티는 빈 문자열을 값으로 가지지만 ES6에서는 함수 객체를 가리키는 식별자를 값으로 가진다.

```js
var 기명함수표현식 = function foo() {};
console.log(기명함수표현식.name); // foo

var 익명함수표현식 = function () {};
console.log(익명함수표현식.name); // 익명함수표현식

function 함수선언문() {}
console.log(함수선언문.name); // 함수선언문
```

<br>

**5. prototype 프로퍼티**

- prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체, 즉 constructor만이 소유하는 프로퍼티
- 일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없다.

```js
// 함수 객체는 prototype 프로퍼티를 소유한다.
(function () {}.hasOwnProperty("prototype")); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
({}.hasOwnProperty("prototype")); // false
```

<img src="https://user-images.githubusercontent.com/78911818/216829125-175b45a3-5433-466f-b2d3-56aebde7de58.png" width="300px">

<img src="https://user-images.githubusercontent.com/78911818/216829199-87a40f74-3d57-4f73-80d6-07ce0da77706.png" width="340px">

- non-constructor인 화살표 함수에는 prototype 프로퍼티가 존재하지 않는다.
