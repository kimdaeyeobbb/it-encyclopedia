# 20장. strict mode

## 20.1 strict mode란?

```js
function foo() {
  x = 10;
}
foo();

console.log(x);
```

1. foo 함수 내에서 선언하지 않은 변수 x에 10을 할당함
2. 변수 x를 찾아야 x에 값을 할당할 수 있으므로 자바스크립트 엔진은 변수 x가 어디에서 선언되었는지 스코프 체인을 통해 검색하기 시작함
3. 자바스크립트 엔진은 우선적으로 foo 함수의 스코프에서 변수 x의 선언을 검색함
4. foo 함수의 스코프에는 변수 x의 선언이 없으므로 검색에 실패함
5. 자바스크립트 엔진은 변수 x를 검색하기 위해 foo 함수 컨텍스트의 상위 스코프 (여기서는 전역 스코프)에서 변수 x의 선언을 검색함
6. 전역 스코프에도 변수 x의 선언이 존재하지 않음
7. Reference Error가 발생할 것 같지만 그렇지 않고, 자바스크립트 엔진은 암묵적으로 전역 객체에 x 프로퍼티를 동적 생성함
8. 이때 전역 객체의 x프로퍼티는 마치 전역 변수처럼 사용할 수 있음
9. 이러한 현상을 `암묵적 전역(implicit global)`이라 함
10. 암묵적 전역은 개발자의 의도와 달리 발생하므로 오류를 발생시킬 확률이 높음.
11. 따라서 반드시 var, let, const 키워드를 사용하여 변수를 선언한 다음 사용해야 함
12. 하지만 오타나 문법 지식이 부족해서 실수가 발생할 수 있음.
13. 오류를 줄여서 안정적인 코드를 생산하기 위해서 ES5부터 strict mode가 추가 되었다.

### strict mode

- 자바스크립트 언어의 문법을 엄격히 적용시켜 오류를 발생시킬 확률이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킴

- ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용됨

### ESLint

- ESLint 와 같은 린트 도구(lint tool)는 정적분석(static analysis)기능을 통해 소스코드를 스캔하여 문법적 오류뿐만 아니라 잠재적 오류까지 찾아내고 오류의 원인을 리포팅해주는 유용한 도구임

- 린트 도구는 strict mode가 제한하는 오류를 포함하여 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있으므로 strict mode보다 더 강력한 효과를 얻을 수 있음

### 스코프 체인

- 유효범위를 나타내는 스코프가 scope property로 각 함수 객체 내에서 연결리스트 형식으로 관리될때, 스코프 간의 상하관계
- 실행 컨텍스트가 생성되면 js엔진은 해당 컨텍스트에서 실행에 필요한 여러가지 정보를 담은 활성객체라는 객체를 생성함. 이 활성 객체에 함수의 인자들을 유사 배열 형태로 담는 arguments라는 객체가 생성되고, 현재 컨텍스트의 유효 범위를 나타내는 스코프 정보를 생성한다. 이후 변수 생성과 this 바인딩(프로그램에서 변수들이 갖는 속성이나 값이 결정되는 것)을 함. 스코프 정보는 현재 실행중인 실행 컨텍스트 내에서 연결 리스트와 유사한 형태로 만들어지는데, 이 리스트를 `스코프 체인`이라 함. 스코프 체인은 scope property로 참조됨

### 렉시컬 환경 (lexical environment)

- `코드가 어디에서 실행되며 주변에 어떤 코드가 있는지`를 뜻함
- 자바스크립트 내에서 실행 중인 함수, 코드 블록, 스크립트 전체를 뜻함
- 렉시컬 환경은 명세서 상에 존재하는 개념임
- [참고자료](https://ko.javascript.info/closure)

#### 렉시컬 객체 구분

- 렉시컬 환경 객체는 두 부분으로 구성됨

##### 1. 환경 레코드 (Environment Record)

- 모든 지역 변수를 프로퍼티로 저장하고 있는 객체
- `this`값과 같은 기타 정보등은 환경 레코드에 저장됨

- `변수`는 특수 내부 객체인 `환경 레코드의 프로퍼티`일 뿐임
- 변수를 가져오거나 변경시키는 행위
  - 환경 레코드의 프로퍼티를 가져오거나 변경하는 것을 뜻함

##### 2. 외부 렉시컬 환경 (Outer Lexical Environment)

- 외부 코드와 연관됨

<br>

## 20.2 strict mode의 적용

- `use strict`를 전역의 선두나 함수 몸체의 선두에 추가하여 strict mode를 적용시킬 수 있다
-

### 전역의 선두에 추가할 경우, 스크립트 전체에 strict mode가 적용됨

- 해당 함수와 중첩함수에 strict mode가 적용됨

```js
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
```

### `use strict`를 함수 몸체의 선두에 추가

```js
function foo() {
  "use strict";

  x = 10; // ReferenceError: x i s not defined
}
foo();
```

### 코드의 선두에 'use strict'를 위치시키지 않으면 strict mode가 제대로 동작하지 않음

```js
function foo() {
  x = 10; // 에러 발생 X
  ("use strict");
}
```

<BR>

## 20.3 전역에 strict mode를 적용하는 것은 피하자

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      "use script";
    </script>
    <script>
      x = 1; // error발생 X
      console.log(x); // 1
    </script>
    <script>
      "use strict";
      y = 1; // ReferenceError
    </script>
  </body>
</html>
```

- 전역에 적용한 strict mode는 스크립트 단위로 적용됨
- 스크립트 단위로 적용된 strict mode는 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용됨
- 외부 서드파티 라이브러리는 non-strict mode일 수 있음. 따라서 전역에 strict mode를 적용하는 것은 옳지 않음.
- 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 strict mode를 적용하는 것이 바람직하다.

<br>

## 20.4 함수단위로 strict mode를 적용하는 것을 피하자

```js
(function () {
  /* non strict mode */
  var let = 10; // 에러가 발생하지 않음

  /* strict mode */
  function foo() {
    "use strict";

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
})();
```

- 함수가 여러개 존재할 경우 특정한 함수에만 strict mode를 적용하는 것은 옳지 않다.
- 그렇다고해서 모든 함수에 일일이 strict mode를 적용하는 것은 번거롭다.
- 또한 strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이 또한 문제가 발생할 수 있다.

- 따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

<br>

## 20.5 strict mode가 발생시키는 에러

### 20.5.1 암묵적 전역

```js
(function () {
  "use strict";

  x = 1;
  console.log(x); // ReferenceError: x is not defined
})();
```

- 선언하지 않은 변수를 참조하면 ReferenceError가 발생함

### 20.5.2 변수, 함수, 매개변수의 삭제

```js
(function () {
  "use strict";

  var x = 1;
  delete x; // SyntaxError: Delete of an unqualified identifier in strict mode

  function foo(a) {
    delete a; // SyntaxError: Delete of an unqualified identifier in strict mode
  }

  delete foo; // SyntaxError: Delete of an unqualified identifier in strict mode
})();
```

- [delete 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/delete)로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생함

- delete 연산자
  - 객체의 속성을 제거함
  - 제거한 객체의 참조를 어디에서도 사용하지 않는다면 나중에 자원을 회수함

### 20.5.3 매개변수 이름의 중복

```js
(function () {
  "use strict";

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
})();
```

- 중복된 매개변수명을 사용하면 SyntaxError가 발생함

### 20.5.4 with문의 사용

```js
(function () {
  "use strict";

  // SyntaxError: Strict mode code may not include a with statement
  with ({ x: 1 }) {
    console.log(x);
  }
})();
```

- with문을 사용할 경우 SyntaxError가 발생함

- with문
  - with문은 전달된 객체를 스코프 체인에 추가함
  - 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체명을 생략할 수 있어 코드가 간단해짐
  - 반면 성능과 가독성이 나빠짐
  - 따라서 with문은 사용하지 않는 것이 좋음

## 20.6 strict mode 적용에 의한 변화

### 20.6.1 일반 함수의 this

```js
(function () {
  "use strict";

  function foo() {
    console.log(this); // undefined
  }
  foo();

  function Foo() {
    console.log(this); // Foo
  }

  new Foo();
})();
```

- strict mode에서 함수를 일반 함수로서 호출하면 this에는 undefined가 바인딩 됨 ([생성자 함수](https://ko.javascript.info/constructor-new)가 아닌 일반 함수의 내부에서는 this를 사용할 필요가 없기 때문)

- 이 경우 에러는 발생하지 않음

#### 바인딩

- [참고자료](https://poiemaweb.com/js-this)
- [참고자료2](https://ko.javascript.info/bind)

- 프로그램에서 사용된 구성 요소의 실제 값 또는 프로퍼티를 결정짓는 행위.
- ex) 함수를 호출하는 부분에서 실제 함수가 위치한 메모리를 연결하는 것

- 자바스크립트는 함수의 호출 방식에 의해 this에 바인딩될 어떤 객체가 동적으로 결정됨 (함수를 선언할 때 this에 바인딩될 객체가 정적으로 결정되는 것이 아니고, 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩될 객체가 동적으로 결정됨)

##### 1. 정적 바인딩

- 실행 시간 전에 일어나고, 실행 시간에는 변하지 않은 상태로 유지하는 바인딩

##### 2. 동적 바인딩

- 실행 시간에 이루어지거나 실행 시간에 변경되는 바인딩

### 20.6.2 arguments 객체

```js
(function (a) {
  "use strict";
  // 매개변수에 전달된 인수를 재할당하여 변경하려고 시도
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않음
  console.log(arguments); // {0: 1, length: 1}
})(1);
```

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않음
