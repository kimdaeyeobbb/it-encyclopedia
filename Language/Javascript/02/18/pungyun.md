# 15. 함수와 일급 객체

## 15.1 일급 객체

### 일급 객체

    - 일급 객체란 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다.
    - 보통 함수에 인자로 넘기기, 수정하기, 변수에 대입하기와 같은 연산을 지원할 때 일급 객체라고 한다.
    - 자바스크립트에서 모든 함수는 아래의 조건을 만족하여 일급 객체이다.
    - 함수는 객체를 생성하기도 하며, 함수 자체가 객체이기도 하다.
    - 함수는 객체이지만 일반 객체와 차이가 있다.
    - 일반함수는 호출할 수 없지만, 함수는 호출할 수 있다.
    - 일반객체에는 없는 함수 고유의 프로퍼티를 소유한다.

1.  무명의 리터럴로 생성할 수 있다. 런타임(할당단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.

    ```js
    const increase = function (num) {
      return ++num;
    };

    const decrease = function (num) {
      return --num;
    };
    ```

2.  변수나 자료구조(객체, 배열 등)에 저장할 수 있다.

    ```js
    const auxs = { increase, decrease };
    ```

3.  함수의 반환값으로 사용할 수 있다.

    ```js
    function makeCounter(aux) {
      let num = 0;

      return function () {
        num = aux(num);
        return num;
      };
    }
    ```

4.  함수의 매개변수에 전달할 수 있다.
    ```js
    const increaser = makeCounter(auxs.increase);
    console.log(increaser()); // 1
    const decreaser = makeCounter(auxs.decrease);
    console.log(decreaser()); // 0
    ```

## 15.2 함수 객체의 프로퍼티

    - 함수는 객체이기 때문에 프로퍼티를 갖는다. 하지만 일반 객체에는 없는 함수 고유의 프로퍼티이다.
    - argument, caller, length, name, prototype이 함수 객체의 데이터 프로퍼티이다.

### 15.2.1 argument 프로퍼티

    - 함수 호출 시 전달되는 인수들의 정보를 담고 있는 배열
    - 자바스크립트는 함수의 매개변수와 인수의 개수가 일치하는지 확인하지 않는다.
    - 함수 호출 시 개수만큼 인수를 전달하지 않아도 에러가 발생하지 않는다.
    - 선언된 매개변수보다 인수를 적게 전달했을 경우, 인수가 전달되지 않은 매개변수는 undefined로 초기화 상태를 유지한다.
    - 선언된 매개변수보다 인수를 더 많이 전달한 경우, 초과된 인수는 무시된다.
    - 그렇다고 초과된 인수가 그냥 버려지는 것이 아니다.
    - 모든 인수는 argument 객체의 프로퍼티로 보관된다.

<img width="481" alt="argument 프로퍼티" src="https://user-images.githubusercontent.com/71264780/217065721-cc8005ea-3418-4ef0-b004-4a1fd5a8bb80.png">

    - argument 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.
    - argument은 배열이 아닌 유사 배열 객체다.
    - 유사 배열 객체는 length 프로퍼티를 가진 객체로 for문으로 순회할 수 있는 객체이다.

<img width="481" alt="argument 객체" src="https://user-images.githubusercontent.com/71264780/217066447-7349165a-bdd0-4cfd-ab96-9584d56181e4.png">

### 15.2.2 caller 프로퍼티

    - caller 프로퍼티는 자신을 호출한 함수를 의미합니다.
    - bar 함수의 caller 프로퍼티는 bar 함수를 호출한 foo함수를 가리킵니다.

<img width="481" alt="caller 프로퍼티" src="https://user-images.githubusercontent.com/71264780/217067797-a5badfc8-760c-4bd7-a9b2-4fd325ff4d76.png">

### 15.2.3 length 프로퍼티

    - length 프로퍼티는 함수 정의 시 작성된 매개변수 개수를 의미합니다.

<img width="481" alt="length 프로퍼티" src="https://user-images.githubusercontent.com/71264780/217068999-61a51246-327d-4d93-9baf-b5e0b28e876a.png">

### 15.2.4 name 프로퍼티

    - name 프로퍼티는 함수명을 의미합니다.
    - 기명 함수(이름을 명시한 함수)의 경우 함수명을 값으로 갖고 익명 함수인 경우 빈 문자열을 값으로 갖게 됩니다.
    - 단, ES6 이후부터는 익명 함수의 이름이 name의 값으로 할당됩니다.

<img width="481" alt="name 프로퍼티" src="https://user-images.githubusercontent.com/71264780/217070273-a31c7a6d-7263-4c87-9769-36913e981aa0.png">

### 15.2.5 `__proto__` 접근자 프로퍼티

    - 모든 객체는 [[Prototype]]이라는 내부 슬롯이 있고, 프로토타입 객체를 가리킵니다.
    - 프로토타입 객체란 객체 간의 상속을 구현하기 위해 사용됩니다.
    - __proto__ 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티입니다.
    - 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype입니다.
    - __proto__ 프로퍼티는 객체가 직접 소유한 것이 아니고 Object.prototype 객체의 프로퍼티를 상속받은 것입니다.

<img width="481" alt="proto 접근자 프로퍼티" src="https://user-images.githubusercontent.com/71264780/217072848-55c67d86-6969-4b2e-9761-5c8552337103.png">

### 15.2.6 prototype 프로퍼티

    - prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체입니다.
    - 일반 객체와 생성자 함수로 호출할 수 없는 non-constructor에는 prototype 프로퍼티가 없습니다.
    - prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킵니다.

<img width="481" alt="prototype 프로퍼티" src="https://user-images.githubusercontent.com/71264780/217074678-960df40b-a722-474c-aa8c-13c0845eab33.png">
