# [17장] 생성자 함수에 의한 객체 생성

<br>

## 1. Object 생성자 함수

- 생성자 함수란?

  - new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
  - 인스턴스: 생성자 함수에 의해 생성된 객체
  - `new` 연산자와 함께 생성자 함수를 호출하면 빈 객체를 생성하여 반환
  - 이후 프로퍼티 또는 메서드를 추가하여 객체를 완성
  - `Object` 생성자 함수 외에도 `String` `Number` `Boolean` `Function` `Array` `Date` `RegExp.` `Promise` 등의 빌트인 생성자 함수를 제공

  ```js
  // 빈 객체 생성
  const person = new Object();

  // 프로퍼티와 메서드 추가
  person.name = "Bang";
  person.sayHello = function () {
    console.log("Hi! My name is " + this.name);
  };

  console.log(person); // {name: "Bang", sayHello: f}
  person.sayHello(); // Hi! My name is Bang
  ```

<br>

## 2. 생성자 함수

### 2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

- 장점: 직관적이고 간편
- 한계: 단 하나의 객체만 생성 <br>
  → 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 비효율적

  <br>

### 2.2 생성자 함수에 의한 객체 생성 방식의 장점

- 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성 가능
- 일반 함수와 동일한 방법으로 생성자 함수를 정의하고 `new` 연산자와 함께 호출하면 생성자 함수로 동작

  ```js
  //생성자 함수
  function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;
    };
  }

  //인스턴스의 생성
  const circle1 = new Circle(5); //반지름이 5인 Circle 객체를 생성
  const circle2 = new Circle(10); //반지름이 10인 Circle 객체를 생성

  console.log(circle1.getDiameter()); // 10
  console.log(circle2.getDiameter()); // 20

  //new 연산자가 없으면 일반 함수로서 호출됨
  const circle3 = Circle(15);

  //일반 함수로서 호출된 Circle 은 반환문이 없으므로 암묵적으로 undefined를 반환
  console.log(circle3); // undefined

  //일반 함수로서 호출된 Circle 내의 this는 전역 객체를 가리킴
  console.log(radius); // 15
  ```

<br>

- **this란?**

  → 객체 자신의 프로퍼티나 메서드를 잠조하기 위한 자기 참조 변수 <br>
  **this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 따라 동적으로 결정됨**

  일반 함수로서 호출: 전역 객체 <br>
  메서드로서 호출: 메서드를 호출한 객체 <br>
  생성자 함수로서 호출: 생성자 함수가 생성할 인스턴스

<br>

### 2.3 생성자 함수의 인스턴스 생성 과정

- 생성자 함수의 역할
  - 인스턴스를 생성 _→ 필수_
  - 생성된 인스턴스를 초기화 (인스턴스 프로퍼티 추가 및 초기값 할당) _→ 옵션_
- 인스턴스를 생성하고 반환하는 코드는 보이지 않음 <br>
  → 자바스크립트 엔진이 다음의 과정을 거쳐 암묵적으로 인스턴스를 생성하고 초기화한 후 반환함

  1. **인스턴스 생성과 this 바인딩**

     암묵적으로 빈 객체(인스턴스)가 생성. 인스턴스는 `this`에 바인딩됨 (런타임 이전에 실행)

  2. **인스턴스 초기화**

     생성자 함수에 기술되어 있는 코드가 한 줄씩 실행되어 `this`에 바인딩되어 있는 인스턴스를 초기화 <br>

  3. **인스턴스 반환**

     생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 `this` 가 암묵적으로 반환됨 <br>

     → 생성자 함수 내부 return 문에 다른 객체를 명시하면 그 객체가 반환되고, 원시 값을 명시하면 원시 값은 무시되고 `this` 가 반환됨 <br>

     ⇒ 생성자 함수 내부에서 `this` 가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손하므로 return 문을 반드시 생략해야 함!

     ```js
     //return 다른 객체 -> this가 아닌 다른 객체가 반환
     function Circle(radius) {
       this.radius = radius;
       this.getDiameter = function () {
         return 2 * this.radius;
       };
       return {};
     }

     const circle = new Circle(1);
     console.log(circle); // {}

     //return 원시 값 -> 무시되고 this 반환
     function Circle(radius) {
       this.radius = radius;
       this.getDiameter = function () {
         return 2 * this.radius;
       };
       return 100;
     }

     const circle = new Circle(1);
     console.log(circle); // Circle {radius: 1, getDiameter: f}
     ```

<br>

### 2.4 내부 메서드 [[Call]]과 [[Construct]]

- 함수는 객체이지만 호출이 가능하다는 점에서 일반 객체와 다름 <br>
  → 함수 객체만을 위한 내부 슬롯`[[Environment]]` `[[FormalParameters]]` 등과 내부 메서드`[[Call]]` `[[Construct]]` 등을 추가로 가지고 있음

- 함수가 일반 함수로 호출되면 함수 내부 메서드 `[[Call]]` 이 호출됨

- `new` 연산자와 함께 생성자 함수로서 호출되면 내부 메서드 `[[Construct]]` 가 호출됨

  ```js
  function func() {}

  //일반적인 함수로서 호출: [[Call]]이 호출됨
  func();

  //생성자 함수로서 호출: [[Construct]]가 호출됨
  new func();
  ```

  <br>

- 내부 메서드 `[[Call]]` 을 갖는 함수 객체 → callable (호출할 수 있는 함수)
- 내부 메서드 `[[Construct]]` 를 갖는 함수 객체 → constructor (생성자 함수로서 호출할 수 있는 함수)
- 내부 메서드 `[[Construct]]` 를 갖지 않는 함수 객체 → non-constructor (생성자 함수로서 호출할 수 없는 함수)
  <br>

⇒ 모든 함수 객체는 `[[Call]]`을 갖고 있지만 모든 함수 객체가 `[[Construct]]`를 갖는 것은 아님

<br>

### 2.5 constructor와 non-constructor의 구분

- 함수 정의 방식에 따라 구분
  - constructor: 함수 선언문, 함수 표현식, 클래스(클래스도 함수)
  - non-constructor: 메서드, 화살표 함수 <br>
    → 메서드 축약 표현만을 의미

<br>

### 2.6 new 연산자

- `new` 연산자와 함께 함수를 호출하면 생성자 함수로 동작 <br>
  → 함수 객체의 내부 메서드 `[[Call]]` 이 아닌 `[[Construct]]` 가 호출됨

  ```js
  //생성자 함수로서 정의하지 않은 일반 함수
  function add(x, y) {
    return x + y;
  }

  //생성자 함수로서 정의하지 않은 일반 함수를 new 연산자와 함께 호출
  let inst = new add();

  //함수가 객체를 반환하지 않았으므로 반환문이 무시됨 -> 빈 객체가 생성되어 반환됨
  console.log(inst); // {}

  //객체를 반환하는 일반 함수
  function createUser(name, role) {
    return { name, role };
  }

  //일반 함수를 new 연산자와 함께 호출
  let inst = new createUser("Bang", "admin");

  //함수가 생성한 객체를 반환
  console.log(inst); // {name: "Bang", role: "admin"}
  ```

- `new` 연산자 없이 생성자 함수를 호출하면 일반함수로 호출됨 <br>
  → 함수 객체의 내부 메서드 `[[Construct]]` 이 아닌 `[[Call]]` 이 호출됨
  이때 `this` 는 전역 객체 `window` 를 가리킴
- 일반 함수와 생성자 함수에 특별한 형식적 차이는 없음 <br>
  ⇒ 생성자 함수는 첫 문자를 대문자로 기술하는 파스칼 케이스로 명명하여 구별하자!

<br>

### 2.7 new.target

- 생성자 함수가 `new` 연산자 없이 호출되는 것을 방지하기 위해 ES6부터 `new.target` 을 지원함 (IE는 지원 X)
- `this` 와 유사하게 constructor인 모든 함수 내부에서 암묵적인 지역 변수처럼 사용됨 <br>
  → 메타 프로퍼티라고 부름
- `new.target` 을 사용하면 `new` 연산자와 함께 생성자 함수로서 호출되었는지 확인 가능

  - `new` 연산자와 함께 호출되면 `new.target` 은 함수 자신을 가리킴
  - `new` 연산자와 함께 호출되지 않으면 `undefined` <br>
    → `new` 연산자와 생성자 함수로서 호출하지 않았을 경우 `new` 연산자와 함께 재귀 호출을 통해 생성자 함수로서 호출 가능

  ```js
  function Circle(radius) {
    if (!new.target) {
      return new Circle(radius);
    }
    this.radius = radius;
    this.getDiameter = function () {
      return 2 * this.radius;
    };
  }

  const circle = Circle(5);
  console.log(circle.getDiameter());
  ```

- 대부분의 빌트인 생성자 함수는 `new` 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환
  - `Object` `Function` : `new` 연산자 없이 호출해도 함께 호출했을 때와 동일하게 동작
  - `String` `Number` `Boolean` : `new` 연산자와 함께 호출하면 해당 타입의 객체를 생성하여 반환하지만 없이 호출하면 문자열, 숫자, 불리언 값을 반환 → 이를 통해 데이터 타입을 변환하기도 함
