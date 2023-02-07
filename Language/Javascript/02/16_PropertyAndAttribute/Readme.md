# 프로퍼티와 어트리뷰트

**내부 슬롯**과 **내부 메서드**는 자바스크립트 엔진의 내부 동작을 설명하기 위한 의사코드로
ECMAScript에서 정의한 **의사 프로퍼티(pseudo property)** 와 **의사 메서드(pseudo method)** 이다.

- 즉 ECMAScript 사양에 등장하는 [[...]]로 감싼 이름들이 내부 슬롯과 내부 메서드이다
  - 조금 쉽게 이야기 하면 ECMAScript 문서에서 자바스크립트 내부 동작의 설명을 위해 정의해 놓은 가상 메소드라고 이해하면 될 듯 하다.

모든 객체는 `[[Prototype]]` 라는 **내부 슬롯**을 갖는다.

내부 슬롯이란?

- 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 구현 알고리즘을 설명하기 위해
  ECMAScript 사양에서 사용하는 pseudo property, pseudo method이다.
- JS엔진의 내부 로직이므로 원칙적으로 직접 접근할 수 없지만,
  `[[Prototype]]` 내부 슬롯의 경우에는 `__prototype__` 을 통해서 간접적으로 접근이 가능하다.

**‘내부 슬롯’** 은 자바스크립트 엔진의 내부 로직이라서 직접적으로 접근이 불가능하대

```jsx
const o = {};

// 내부 슬롯은 JS엔진의 내부 로직이기 때문에 직접 접근할 수 없다.
// (근데 왜 내부 슬롯이 내부로직이면 직접 접근 안됨?)
o.[[Protytype]] // → Uncaught SyntaxError: Unexpected token '['

// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하긴 한다.
o__protytype__ // → Object.prototype
```

<br><br>

## 프로퍼티 어트리뷰트란?

- 프로퍼티 어트리뷰트란 ‘**프로퍼티의 상태’** 를 나타내는 것을 말한다.
  - 프로퍼티의 값(value)
  - 값의 갱신 가능 여부(writable)
  - 열거 가능 여부(enumerable)
  - 재정의 가능 여부(configurable)
- JS엔진이 프로퍼티를 생성할 때, **‘프로퍼티 어트리뷰트’**를 기본값으로 자동 정의한다.

- 프로퍼티 어트리뷰트는 JS 엔진이 관리하는 내부 상태 값인
  내부 슬롯 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 이다.
- 따라서 프로퍼티 어트리뷰트에 직접 접근은 불가하지만 `Object.getOwnPropertyDescriptor` 메서드를 사용해 간접적으로 확인이 가능하다.

  - 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
  - 만약 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립트를 요구하면 undefined를 반환한다.

- `Object.getOwnPropertyDescriptor` : 하나의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환한다.

```jsx
const person = {
	name: 'Kim'
}

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(객체의 참조, '프로퍼티 키'));
console.log(Object.getOwnPropertyDescriptor(person, 'name'));

// {value: "Kim", writable: true, enumerable: true, configurable: true}
```

- `Object.getOwnPropertyDescriptors` : 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립트 객체들을 반환한다.

```jsx
const person = {
	name: "Kim",
};

// 동적으로 프로퍼티 생성
person.age = 27;

// 모든 프로퍼티의 '프로퍼티 어트리뷰트' 정보를 제공하는 '프로퍼티 디스크립터' 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));

// name: {value: "Kim", writable: true, enumerable: true, configurable: true}
// age: {value: 27, writable: true, enumerable: true, configurable: true}
//
// }
```

<br><br>

## 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티는 크게 두 가지로 구분이 가능하다.

<br>

### 데이터 프로퍼티(data property)

- 키와 값으로 구성된 일반적인 프로퍼티이다.
- 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티이다.

```jsx
const person = {
	name: "minzyee",
	age: 27,
};
```

데이터 프로퍼티는 다음과 같은 프로퍼티 어트리뷰트를 갖는다.

- 이 프로퍼티 어트리뷰트는 JS엔진이 프로퍼티를 생성할 때, 기본값으로 자동 정의된다.

<br>

### 접근자 프로퍼티(accessor poperty)

- 접근자 프로퍼티는 자체적으로는 값을 갖지 않고, 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용(호출되는)하는 접근자 함수로 구성된 프로퍼티이다.
  ```jsx
  person.name; // minzyee
  person.age; // 27
  ```

접근자 프로퍼티는 다음과 같은 프로퍼티 어트리뷰트를 갖는다.

- 접근자 함수는 `getter / setter` 함수라고도 부른다.
- 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있다.

<br>

### 데이터 프로퍼티와 접근자 프로퍼티를 구별하는 방법

- `Object.getOwnPropertyDescriptor` 메서드가 반환한 프로퍼티 디스크립트 객체의 프로퍼티가 다르다.

```jsx
// 함수 객체의 prototype은 데이터 프로퍼티이다.
Object.getOwnPropertyDescriptor(function () {}, "prototype");
// {value: {...}, writable: true, enumable: false, configurable: true}

// 일반 객체의 __proto__는 접근자 프로퍼티이다.
Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");
// {get: f, set: f, enumable: false, configurable: true}
```

<br>

### 프로퍼티 정의란?

- 프로퍼티 정의란 새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의 하는 것을 말한다.
- 예를 들어, 프로퍼티 값을 갱신 가능하도록 할 것인지, 프로퍼티를 열거 가능하도록 할 것인지, 프로퍼티를 재정의 가능하도록 할 것인지 정의할 수 있다.
  (이를 통해 객체의 프로퍼티가 어떻게 동작해야 하는지를 명확하게 정의할 수 있다)
- `Object.defineProperty` 메서드를 사용하면 프로퍼티 어트리뷰트를 재정의할 수 있다.
  인수로는 객체의 참조와 데이터 프로퍼티의 키인 문자열, 프로퍼티 디스크립트럴 전달한다.

```jsx
// 데이터 프로퍼티 정의

const person = {};

Object.defineProperty(person, "firstName", {
	value: "minzyee",
	writable: true,
	enumerable: true,
	configurable: true,
});

Object.defineProperty(person, "lastName", {
	value: "Kim",
});

let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
// firstName {value: "minzyee", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, "lastName");
console.log("lastName", descriptor);
// lastName {value: "Kim", false: true, enumerable: false, configurable: false}
```

```jsx
// 접근자 프로퍼티 정의

const person = {};

Object.defineProperty(person, 'fullName', {
	// getter 함수 사용
	get() {
		return ${this.firstName} ${this.lastName};
	},
	// setter 함수 사용
	set(name) {
		[this.firstName, this.lastName] = name.split('');
	},
	enumerable: true,
	configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: f, set: f, enumerable: true, configurable: true}

person.fullName = 'minji Kim';
console.log(person); // {firstName: "minji", lastName: "kim"}
```

<br>

### attribute와 property의 차이점

- attribute

  - HTML 마크업에 정의되어 있는 것으로 HTML요소의 추가적인 정보를 전달하고 `key=’value’` 형태로 작성한다.
  - attribute는 default 값이 변하지 않는다.(→ 정적)
  - elements에 추가적인 정보를 넣을 때 사용되는 요소이다.
  - attribute는 html document/file 안에서 존재한다.

  ```javascript
  <div class="my-class"></div>
  ```

- property

  - property는 html DOM tree 안에서 attribute를 가리키는 표현이다.
  - default 값이 변할 수 있다.(→ 동적)
  - 위의 코드 예시에서 attribute는 값이 'my-class'이며 'className'인 property를 가진다.

<br>

### 프로토타입이란?

`프로토타입`이란 어떤 객체의 **‘상위(부모) 객체의 역할을 하는 객체’** 이다.

**프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메서드를 상속** 한다.

프로토타입 객체(부모 객체 역할 하는 객체)의 프로퍼티나 메서드를 상속받은 하위 객체는

자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용할 수 있다.

`‘프로토타입 체인’`은 **프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 상속 구조**를 말한다.

객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면

프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색한다.
