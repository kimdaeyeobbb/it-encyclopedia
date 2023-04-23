# 프로토타입

- 자바스크립트는 프로토타입 기반의 객체지향 언어임

- 자바스크립트의 모든 객체는 `프로토타입 객체`를 가짐

- 자바스크립트의 모든 객체들이 그들의 프로토타입으로부터 메서드와 프로퍼티들을 상속받음

<br>

## 프로토타입 상속

- `상속`

  - 새로운 클래스에서 기존 클래스의 모든 메서드와 프로퍼티를 사용할 수 있는 것

<br>

- 자바스크립트는 현재 존재하고 있는 객체를 프로토타입으로 사용하여 해당 객체를 복제하여 재사용함

## 프로토타입 생성

- 생성자 함수를 작성하고 new 연산자를 이용하여 객체를 생성하면 같은 프로토타입을 가지는 객체들을 생성할 수 있음

```js
function Car(color, name, age) {
  // 생성자 함수의 첫글자는 대문자로 작성
  this.color = color;
  this.name = name;
  this.age = age;
}

const myCar = new Car("빨간색", "람보르기니", 1);

document.write(
  `내 차 이름: ${myCar.name}, 내 차 색상: ${myCar.color}, 내 차 연식: ${myCar.age}`
);
// 내 차 이름: 람보르기니, 내 차 색상: 빨간색, 내 차 연식: 1
```

### 객체에 프로퍼티 및 메서드 추가

### 프로토타입에 프로퍼티 및 메서드 추가

### prototype 프로퍼티

<br>

## 프로토타입 체인

- 프로토타입이 상속되는 가상의 연결고리

```js
var obj = new Object(); // 프로토타입 - Object.prototype
obj; // [[Prorotype]]: Objct
```

Object.prototype 객체는 어떠한 프로토타입도 가지지 않으며, 아무런 프로퍼티도 상속받지 않음(프로토타입 체인의 최상위에 존재하는 프로토타입)<br>
따라서 JS의 모든 객체는 Object.prototype 객체를 프로토타입으로 상속받음

<br>

```js
var arr = new Array(); // 프로토타입 - Array.prototype
arr; // [[Prototype]]: Object
```

```js
var date = new Date(); // 프로토타입 - Date.prototype과 Object.prototype
```

JS에 내장된 모든 생성자나 사용자 정의 생성자는 Object.prototype 객체를 프로토타입으로 가짐

<br>

- 자바스크립트에서는 객체 initializer를 사용하여 생성된 같은 타입의 객체들은 모두 같은 프로토타입을 가짐
- new 연산자를 사용해 생성한 객체는 생성자의 프로토타입을 자신의 프로토타입으로 상속받음

<br>
