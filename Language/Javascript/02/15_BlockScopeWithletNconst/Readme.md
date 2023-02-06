# [15장] let, const와 블록 레벨 스코프

## 15.1 var 키워드로 선언한 변수의 문제점

### :one: var 키워드로 선언한 변수는 중복 선언이 가능함

```js
var x = 1;
var y = 1;

var x = 100; // 중복 선언. 초기화문이 있는 변수 선언문
var y; // 초기화문이 없는 변수 선언문.

console.log(x); // 100
console.log(y); // 1
```

[예시](./duplicateDeclaration.js)

- var 키워드로 선언된 변수는 동일 스코프 내에서 중복 선언을 허용함
- 초기화문(변수 선언과 동시에 초기값을 할당하는 문)이 있는 변수 선언은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작함<br>=> 위의 예시를 보면 재할당이 일어났음
- 초기화문이 없는 변수 선언문은 무시됨

- 동일한 이름의 변수가 이미 선언되어 있는 것을 모르고 변수를 중복 선언하면서 값까지 할당했다면 의도치 않게 먼저 선언된 변수 값이 재할당되어 변경되는 부작용이 발생함

<br>

### :two: 함수 레벨 스코프

- var 키워드로 선언한 변수는 오로지 함수 코드 블록만을 지역 스코프로 인정함<br>
  => 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 됨

```js
var x = 1; // 함수 외부에서 var 키워드로 선언한 변수

if (true) {
  var x = 10;
}

console.log(x); // 10
```

[예시](./functionLevelScope1.js)

- 함수 레벨 스코프의 영향을 받는것이 아니라 전역 레벨 스코프에서 선언한 것과 동일시 됨

<br><br>

```js
if (true) {
  var y = 20;
  console.log("함수 안의 y값: ", y); // 얘만 지역 스코프로 인정
}

var y = 10;
console.log("함수 밖의 y값: ", y);
```

[예시2](./functionLevelScope2.js)

<br><br>

```js
var i = 10;
for (var i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i);
```

[예시3](./functionLevelScope3.js)

- for문에서 선언한 i는 전역 변수이다. 하지만 이미 선언한 전역 변수 i가 있으므로 중복 선언이 된다.
- for문 내에서 새로 선언된 i로 인해 i가 변질되었다. 중복 선언으로 인해 i의 값이 5로 변경되었다.

- 함수 외부에서 var 키워드로 선언하면 항상 전역 변수 취급을 받기 때문에 함수 레벨 스코프에서도 전역 변수를 남발할 가능성이 높아진다. 이로 인해 전역 변수가 중복 선언될 수도 있다. 따라서 var 키워드를 자제하는 것이 좋으며, 사용하더라도 스코프에 주의를 기울어야 한다.

<br>

### :three: 변수 호이스팅

- `var` 키워드로 변수를 선언할 경우 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.
- 즉, 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있게된다.<br> => 단, 할당문 이전에 변수를 참조할 경우 언제나 undefined를 반환한다.

```js
console.log("변수 선언 및 할당전의 foo: ", foo); // 가)

foo = 123; // 나)
console.log("변수 할당만 한 상태의 foo: ", foo); // 다)

var foo; // 라)
console.log("변수 선언 및 할당을 한 상태의 foo: ", foo); // 마)
```

#### 예제 해석

- 가)

  - :one: 선언단계 - 변수 호이스팅에 의해 이 시점에는 이미 변수 foo가 선언되었다고 봄
  - :two: 초기화 단계 - 변수 foo는 undefined로 초기화 됨
  - 변수 호이스팅에 의해 할당문 이전에 변수를 참조하였으므로 undefined를 반환함

- 나) :three: 할당 단계
- 라) 변수 선언
  - 변수 선언은 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 실행됨

#### 결론

- 변수 선언문 이전에 변수를 참조하는 것은 프로그램의 흐름상 적절하지 않음
  - 가독성을 떨어뜨림
  - 오류를 발생시킬 확률이 높아짐

<br>

## 15.2 let 키워드

### 15.2.1 변수 중복 선언 금지

- let 키워드로 이름이 같은 변수를 중복 선언할 경우 문법 에러(Syntax Error)가 발생함

```js
let bar = 123; // let이나 const로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용하지 않음
let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

[예제](./duplicateLetDeclaration1.js)

### 15.2.2 블록 레벨 스코프

- let 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 블록 레벨 스코프(block level scope)를 따름<br>(var 키워드로 선언한 변수는 오로지 함수의 코드 블록만을 지역 스코프로 인정하는 함수 레벨 스코프를 따름)

```js
let foo = 1;
console.log("전역 변수로서의 foo: ", foo);

{
  let foo = 2;
  console.log("지역 변수로서의 foo: ", foo);
  console.log();

  let bar = 3;
  console.log("지역 변수로서의 bar: ", bar);
}

console.log();

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

[예제](./blcokLevelScope1.js)

- 위 예제에서는 bar 변수가 블록 레벨 스코프를 갖는 지역 변수이므로 전역에서 bar 변수를 참조할 수 없다.
  - 전역에서 bar변수를 참조할 수 없는데 참조하려고 헀으므로 ReferenceError가 발생하는 것이다

#### 전역 & 함수 레벨 & 블록 레벨 스코프 톺아보기

```js
/* 전역 스코프 */
let i = 10;
console.log("전역 스코프의 i: ", i);

/* 함수 레벨 스코프 */
function foo() {
  let i = 100;
  console.log("함수 레벨 스코프의 i: ", i);

  for (let i = 0; i < 5; i++) {
    console.log("블록 레벨 스코프의 i: ", i);
  }
  console.log(i);
}

foo();
console.log("전역 스코프의 i: ", i);
```

[예제](./allOfScope1.js)

<br>

### 15.2.3 변수 호이스팅

#### 예제1

- (var 키워드로 선언한 변수와 달리)let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 동작함
- let 키워드로 선언한 변수를 변수 선언문 이전에 참조할 경우 참조 에러(Reference Error)가 발생함

```js
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

#### 예제2

```js
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```

- var 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 '선언 단계'와 초기화 단계'가 한번에 이루어진다.
- 즉, 선언 단계에서 스코프(실행 컨텍스트의 렉시컬 환경)에 변수 식별자를 등록해서 자바스크립트 엔진에 변수의 존재를 알린다.
- 그리고 즉시 초기화 단계에서 undefined로 변수를 초기화한다.
- 따라서 변수 선언문 이전에 변수에 접근해도 스코프에 변수가 존재하기 때문에 에러가 발생하지 않는다. (다만 undefined를 반환한다)
- 이후 변수 할당문에 도달하면 비로소 값이 할당 된다.

- [실행 컨텍스트 참고자료](https://www.youtube.com/watch?v=EWfujNzSUmw)

#### 예제3

```js
console.log(foo); // Reference Error

let foo; // 변수 선언문 (에서 초기화 단계가 실행됨)
console.log(foo); // undefined

foo = 1; // 할당문 (에서 할당 단계가 실행됨)
console.log(foo); // 1
```

- `let 키워드로 선언한 변수는 '선언 단계'와 '초기화 단계'가 분리되어 진행된다.`
- 즉, 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 실행된다.

- 만약 초기화 단계가 실행되기 이전에 변수에 접근하려고 하는 경우 참조 에러(Reference Error)가 발생한다.
- let 키워드로 선언한 변수는 스코프의 시작 지점부터 초기화 단계 시작 지점(변수 선언문)까지 변수를 참조할 수 없다.

##### 일시적 사각지대 (TDZ, Temporal Dead Zone)

![TDZ](./TDZ1.png)

- 스코프의 시작 지점부터 초기화 시작 지점까지 변수를 참조할 수 없는 구간을 `일시적 사각지대`라 부름
- 여기서는 `맨 처음`부터 ~ `let foo;`시작 지점까지가 TDZ이다.

#### 예제 4

- let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보인다. 하지만 실제로는 그렇지 않다.

```js
let foo = 1; // 전역 변수
{
  console.log(foo); // Reference Error
}
```

- let 키워드로 선언한 변수의 경우 변수 호이스팅이 발생하지 않는다면

- [호이스팅 참고자료](https://tecoble.techcourse.co.kr/post/2021-04-25-hoisting/)
