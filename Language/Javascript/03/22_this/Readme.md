## this

자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수

this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메소드를 참조할 수 있다.

this를 사용하는 이유는 함수를 다른 객체에서도 재사용할 수 있기 때문이다.

자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다.

this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 **동적으로 결정**된다.

<pre>
📌 this 바인딩 (this binding)?

바인딩이란 식별자와 값을 연결하는 과정을 의미
변수 선언은 변수 이름과 확보된 메모리 공간의 주소를 바인딩하는 것
this 바인딩은 this와 this가 가리킬 객체를 바인딩하는 것
</pre>

```jsx
// this는 어디서든지 참조 가능하다.
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number;
}
square(2);

const person = {
  name: "Lee",
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this); // {name: "Lee", getName: ƒ}
    return this.name;
  },
};
console.log(person.getName()); // Lee

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {name: "Lee"}
}

const me = new Person("Lee");
```

this는 자기 참조 변수이므로 일반적으로 **객체의 메소드 내부** 또는 **생성자 함수 내부**에서만 의미가 있다.

<br>

<pre>
📌 `렉시컬 스코프`와 `this 바인딩`은 결정 시기가 다르다.

- 함수의 상위 스코프를 결정하는 방식인 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다.
- 반면 `this 바인딩`은 함수 호출 시점에 this에 바인딩 될 값이 결정된다.
</pre>

<br>

### 함수 호출 방식

<br>

> **this 바인딩의 함수 호출 방식**
>
> 1. 일반 함수 호출
> 2. 메소드 호출
> 3. 생성자 함수 호출
> 4. Function.prototype.apply/call/bind 메소드에 의한 간접 호출

<br>

**1. 일반 함수 호출**

기본적으로 this에는 전역 객체가 바인딩

```jsx
function foo() {
  console.log("foo's this: ", this); // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

전역 함수는 물론이고 **중첩 함수를 일반 함수로 호출하면 함수 내부의 this에는 전역 객체가 바인딩**된다.

this는 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.

따라서 **strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩**된다. 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다. 엄격 모드에서 `this` 값은 실행 문맥에 진입하며 설정되는 값을 유지한다.

> **엄격 모드에서의 this**
>
> 1. this값이 undefined 혹은 null이라면, 비엄격모드일 경우 this에 전역 객체를 바인딩한다. 하지만, 엄격 모드라면 바인딩하지 않는다.
>
> ```jsx
> function foo() {
>   "use strict";
>
>   console.log("foo's this: ", this); // undefined
>   function bar() {
>     console.log("bar's this: ", this); // undefined
>   }
>   bar();
> }
> foo();
> ```
>
> 2. this값이 원시값이라면, 비엄격모드일 경우 autoboxing이 수행된다. 하지만, 엄격 모드라면 수행되지 않는다(=원시 값 그대로를 가진다). this값이 Function.prototype.call 혹은 Function.prototype.apply에 의해 전달된 경우 또한 동일하다.
>
> ```js
> function 비엄격모드() {
>   console.log(this);
> }
> function 엄격모드() {
>   "use strict";
>   console.log(this);
> }
> 비엄격모드.call(123); // Number {123}
> 엄격모드.call(123); // 123
> ```
>
> autoboxing : 원시 타입의 값을 해당하는 wrapper 클래스의 객체로 바꾸는 과정을 의미

<br>

콜백 함수가 일반 함수로 호출된다면 **콜백 함수 내부의 this에도 전역 객체가 바인딩**된다.

```jsx
var value = 1; // 전역 변수 (전역 객체의 프로퍼티)

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  },
};

obj.foo();
```

⇒ 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.

중첩 함수와 콜백 함수는 외부 함수를 돕는 헬퍼 함수의 역할을 하므로 외부 함수의 일부 로직을 대신하는 경우가 대부분이다. 하지만 외부 함수인 메소드와 중첩 함수 또는 콜백 함수의 this가 일치하지 않는다는 것은 중첩 함수와 콜백 함수를 헬퍼 함수로 동작하기 어렵게 만든다.

<br>

> 📌 메소드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메소드의 this 바인딩과 일치시키기 위한 방법
>
> 1. 새로운 변수에 할당
>
> ```jsx
> var value = 1;
>
> const obj = {
>   value: 100,
>   foo() {
>     // this 바인딩(obj)을 변수 that에 할당한다.
>     const that = this;
>
>     // 콜백 함수 내부에서 this 대신 that을 참조한다.
>     setTimeout(function () {
>       console.log(that.value); // 100
>     }, 100);
>   },
> };
>
> obj.foo();
> ```
>
> 2. Function.prototype.apply/call/bind 메소드에 의한 간접 호출
>
> ```js
> var value = 1;
>
> const obj = {
>   value: 100,
>   foo() {
>     // 콜백 함수에 명시적으로 this를 바인딩한다.
>     setTimeout(
>       function () {
>         console.log(this.value); // 100
>       }.bind(this),
>       100
>     );
>   },
> };
>
> obj.foo();
> ```
>
> 3. 화살표 함수 사용
>
> - 일반적인 this처럼 함수를 호출한 객체를 할당하지 않고, 상위 스코프의 this를 할당한다
>
> ```jsx
> var value = 1;
>
> const obj = {
>   value: 100,
>   foo() {
>     // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
>     setTimeout(() => console.log(this.value), 100); // 100
>   },
> };
>
> obj.foo();
> ```

<br>

**2. 메소드 호출**

메소드 내부의 this에는 **메소드를 호출한 객체** (메소드를 호출할 때 메소드 이름 앞의 마침표 연산자 앞에 기술한 객체)가 바인딩된다.

메소드 내부의 this는 메소드를 소유한 객체가 아닌 **메소드를 호출한 객체에 바인딩**된다.

```jsx
const person = {
  name: "Lee",
  getName() {
    // 메서드 내부의 this는 메서드를 호출한 객체에 바인딩된다.
    return this.name;
  },
};

// 메서드 getName을 호출한 객체는 person이다.
console.log(person.getName()); // Lee
```

getName메소드는 person 객체의 메소드로 정의되었다.

즉, person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 **독립적으로 존재하는 별도의 객체**다.

<img src="https://user-images.githubusercontent.com/78911818/217437640-775bad4c-c673-4c52-aaee-6e1d1a6e9e88.png" />

getName 프로퍼티가 가리키는 함수 객체, 즉 getName 메소드는 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메소드가 될 수도 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

```jsx
const person = {
  name: "Lee",
  getName() {
    return this.name;
  },
};
const anotherPerson = {
  name: "Kim",
};

anotherPerson.getName = person.getName;
console.log(anotherPerson.getName()); // Kim

const getName = person.getName;
console.log(getName()); // ''
// 일반 함수로 호출된 getName 함수 내부의 this.name은 브라우저 환경에서 window.name과 같다.
```

메소드 내부의 this는 프로퍼티로 메소드를 가리키고 있는 객체와는 관계가 없고, 메소드를 호출한 객체에 바인딩된다.

<img src="https://user-images.githubusercontent.com/78911818/217437816-85e7f287-2225-469d-961a-ca7dc5322526.png" />

<br>

**3. 생성자 함수 호출**

생성자 함수 내부의 this에는 **생성자 함수가 생성할 인스턴스**를 가리킨다

```jsx
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 반지름이 5인 Circle 객체를 생성
const circle1 = new Circle(5);
// 반지름이 10인 Circle 객체를 생성
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

**4. Function.prototype.apply/call/bind 메소드에 의한 간접호출**

- **apply, call**

첫 번째 인수로 전달한 특정 객체를 호출함 함수의 this에 바인딩한다.

```jsx
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding()); // window (일반 함수로 호출했기 때문에)

console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

- **bind**

apply, call과 달리 함수를 호출하지 않는다. 다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

```jsx
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

// getThisBinding 함수를 새롭게 생성해 반환한다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding

// bind 메서드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

bind 메서드는 **메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결**하기 위해 유용하게 사용된다.

```js
const person = {
  name: "dan",
  sayHi(callback) {
    // ①
    console.log(this); // {name :'dan' ...}
    setTimeout(callback, 3000);
  },
};

person.sayHi(function () {
  console.log(this); // Window
  console.log(`Hi! ${this.name}`); // ② Hi!
});
```

- ①의 시점에서 this는 person을 가리키고 있지만, ②에서 person.foo의 콜밷함수가 일반 함수로 호출되면서 this는 전역 객체를 가리키게 된다.

- 콜백 함수 내부의 this와 외부 함수 내부의 this를 bind 메소드를 활용해 일치시킨다.

```js
const person = {
  name: "dan",
  sayHi(callback) {
    console.log(this); // {name :'dan' ...}

    // bind 메서드로 callback 함수 내부의 this 바인딩을 전달한다.
    setTimeout(callback.bind(this), 3000);
  },
};

person.sayHi(function () {
  console.log(this); // {name :'dan' ...}
  console.log(`Hi! ${this.name}`); // Hi! dan
});
```

## 정리

- this는 함수를 호출하는 객체를 의미한다.
- 전역 공간에서의 this는 전역객체를 참조한다.
- 어떤 함수를 메소드로서 호출한 경우, this는 메소드명 앞의 객체를 참조한다.
- 어떤 함수를 함수로서 호출하거나, 메소드의 내부함수로 호출한 경우 전역 객체를 참조한다.
- call, apply는 this에 할당되는 객체를 지정할 수 있다.
- bind는 this에 할당되는 객체가 고정된 새로운 함수를 생성한다.
- 화살표 함수에서 this는 상위 스코프의 객체를 할당받는다.

| 함수 호출 방식                                             | this 바인딩                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| 일반 함수 호출                                             | 전역 객체                                                              |
| 메소드 호출                                                | 메소드를 호출한 객체                                                   |
| 생성자 함수 호출                                           | 생성자 함수가 (미래에) 생성할 인스턴스                                 |
| Function.prototype.apply/call/bind 메소드에 의한 간접 호출 | Function.prototype.apply/call/bind 메소드에 첫 번째 인수로 전달한 객체 |
