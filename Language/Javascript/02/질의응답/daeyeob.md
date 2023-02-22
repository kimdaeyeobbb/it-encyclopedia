# 11. 전역 변수의 문제점

## :one: 전역 변수 사용을 억제하는 방법에는 무엇이 있는가?

<hr>

```js
(function () {
  var foo = 10; //즉시 실행함수의 지역 변수
  //..
})();

console.log(foo); // ReferenceError
```

- 모든 코드를 즉시 실행함수로 감싸서 모든 변수가 즉시 실행 함수의 지역변수가 되게 만듦

## :two: 변수의 생명 주기에 대해 설명해주세요

<hr>

- 변수가 자신이 생성된 위치에서 생성되고 소멸되기까지의 기간을 뜻함
- 전역 변수의 생명주기는 애플리케이션의 경우 생명주기와 동일하지만, 함수 내부에서 선언된 지역 변수는 함수가 호출되면 생성되고 함수가 종료되면 소멸됨

## :three: 전역 변수의 문제점에 대해 설명해주세요

<hr>

- 전역 변수는 전역 코드가 종료될 때까지 계속해서 살아있으므로 사용하지 않아도 살아있으므로 메모리가 낭비됨
- 스코프 체인 상 종점에 존재하므로 변수 검색시 가장 마지막에 검색된다. 즉, 검색 속도가 가장 늦어진다.

## :four: 전역 변수를 반드시 사용해야 할 경우에 대해 설명해주세요

<hr>

- 정석적인 대답

  - 프로그램이 실행되는 내내 변하지 않아야 하는 값이나 여러 함수에 걸쳐서 사용하는 값들은 전역 변수로 선언해서 사용하는것이 좋다. 반면에 특정 함수에서만 사용되는 값들은 지역 변수로 선언하는 것들이 좋다.

- 좋은 예시는 아님
  - 함수외부에서 선언된 전역 변수를 사용하고 싶은 경우. 이 경우, 함수 내부에서는 이 변수에 접근하기 위해 전역 변수를 사용해야함. 동일한 변수명이 함수 내부와 외부 모두에 존재할 경우, 전역변수 키워드를 사용하지 않으면 별개의 변수로 취급한다.

## :five: 네임스페이스에 대해 설명해주세요

<hr>

- 식별자간 충돌을 방지하기 위해서 스코프를 부여하는 프로그래밍 기법
- 자바스크립트에서는 기본적으로 네임스페이스를 제공하지않으나, 전역 객체를 만들어서 이 기능을 흉내낼 수 있다 (반면 타입스크립트에서는 네임스페이스 기능을 제공함 - 네임스페이스 DOM이용)

<br>

# 12. let, const 키워드와 블록 레벨 스코프

## :one: var 키워드로 선언한 전역 변수와 let 키워드로 선언한 전역 변수의 차이를 설명해주세요.

<hr>

- var
  - var 키워드로 선언된 변수를 전역 변수로 사용하면 전역 객체의 프로퍼티가 된다.

- let 
  - let 키워드로 선언된 변수를 전역 변수로 사용하는 경우, let 젼역 변수는 전역 객체의 프로퍼티가 아니다. 

## :two: var보다 let, const 사용을 권장하는 이유를 설명해주세요.

<hr>

- 변수 선언자 var은 재선언을 하여도 에러가 발생하지 않지만 변수 선언자 let과 const는 재선언을 하면 에러가 발생한다. 또한 var로 선언한 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 가진다. 변수를 블록 레벨 스코프를 가지는게 좋으므로 let과 const를 이용해서 변수를 선언하는게 좋다

## :three: 일시적 사각지대(Temporal Dead Zone; TDZ)와 TDZ에 영향을 받는 구문들에 대해 설명해주세요.

<hr>

- TDZ는 `let`, `const`, `클래스` 구문의 유효성을 관리하는 것이다.
TDZ 시멘틱은 선언 전에 변수에 접근하는 것을 금지한다. 


- TDZ의 영향을 받는 구문

1. const 변수
   - const 변수는 선언 및 초기화를 하기 이전 까지는 TDZ에 존재함
    ```js
    pi;   // ReferenceError
    const pi = 3.14;
    ```
   
    - 따라서 `const`변수는 선언한 다음에 사용해야 한다.
   ```js
    const pi = 3.14;
    pi;  // 3.14;
    ```
2. let 변수
   - let 변수는 선언을 하기 전까지는 TDZ에 존재함
   ```JS
   count;  // ReferenceError;
   let count;
   
   count = 9;
   ```
   
    - 따라서 let 변수는 선언을 한 다음에 사용해야 한다
   ```js
   let count;
   
   count;  // undefined
   count = 9;
   
   count;  // 9
    ```

3. class 구문

   - 선언 전에는 class를 사용할 수 없다
    ```js
    const myHyundai = new Car('blue'); // `ReferenceError`
    
    class Car {
      constructor(color) {
        this.color = color;
      }
    }
    ```

   - 클래스는 선언한 이후에 사용할 수 있다

    ```js
    class Car {
      constructor(color) {
        this.color = color;
      }
    }
    
    const myHyundai = new Car('blue');
    myHyundai.color; // => 'red'
    ```




4. constructor() 내부의 super()

  - 부모 클래스를 상속 받았다면, 생성자 안에서 `super()`를 호출하기 전까지 `this` 바인딩은 TDZ에 있다
    - 따라서`constructor()` 내에서 `super`가 호출되기 전까지 `this`를 사용할 수 없다. 
    ```js
    class MuscleCar extends Car {
         constructor(color, power) {
             this.power = power;
             super(color);
         }
    }
   
    const myCar = new MuscleCar(‘blue’, ‘300HP’); // `ReferenceError`
    ```

  - TDZ는 인스턴스 초기화를 위해 부모 클래스의 생성자를 호출할 것을 제안한다.
    - 부모 클래스의 생성자를 호출하고 인스턴스가 준비되면 자식 클래스에서 this값을 변경할 수 있다  

      ```js
      class MuscleCar extends Car {
        constructor(color, power) {
          super(color);
          this.power = power;
        }
      }
  
      // Works!
      const myCar = new MuscleCar('blue', '300HP');
      myCar.power; // => '300HP'
      ```


5. 기본 함수 매개변수 (Default Function Parameter)

  - 기본 함수의 매개변수는 global과 function scope의 중간스코프(intermediate scope)에 위치함
    - 기본 매개변수 또한 TDZ에 제한이 있다.
    - 기본 매개변수가 선언전에 사용되면 ReferenceError가 발생한다
    ```js
    const a = 10;
    function suqare(a = a){  // 선언전에 사용됨
        return a*a;
    } 
    
    // Doesn't work
    square();  // ReferenceError
    ```
    
  - 기본 매개변수는 선언 및 초기화를 한 다음에 사용 되어야 한다.
    - 아래의 예시에서는 `init`이라는 다른 변수를 이용해서 a를 초기화한 다음에 사용함
    ```js
    const init = 7;
    function sqaure(a = init){
        return a*a;
    }
    
    // works!
    square();   // 49
    ```

## :four: const 키워드로 선언한 값을 변경할 수 있는 방법에 대해 설명해주세요

<hr>

- const 변수의 타입이 객체인 경우에는 재할당은 불가능 하지만 객체의 내용(프로퍼티 추가 및 삭제, 프로퍼티 값의 변경)은 변경할 수 있다


## :five: 클로저는 어떤 문제를 회피하기 위해 사용하는 방법인지 스코프를 들어 설명해주세요

<hr>

- var 키워드를 사용해서 자바스크립트의 함수 레벨 스코프로 인하여 
블록 내에서 사용된 변수가 전역 스코프를 갖게 되어 
발생하는 문제를 회피하기 위해 클로저를 활용함

<br>

# 13. 프로퍼티 어트리뷰트

## :one: attribute와 property의 차이점은 무엇인가요?

<hr>

- 답변

## :two: 데이터 프로퍼티와 접근자 프로퍼티에 대해 설명해주세요.

<hr>

- 답변

## :three: 객체 변경을 방지하는 메소드들에 대해 설명해주세요.

<hr>

- 답변

## :four: 자바스크립트는 내부 슬롯과 내부 메서드를 통해 접근이 가능한지에 대해 설명해주세요.

<hr>

- 답변

## :five: 프로퍼티가 생성될 때 어떠한 것들을 정의하나요?

<hr>

- 답변

<br>

# 14. 생성자 함수에 의한 객체 생성

## :one: 클래스와 생성자 함수의 차이점은 무엇인가요?

<hr>

- 답변

## :two: 객체를 생성하는 방식과 방식에 대한 문제점과 장점에 대해 설명해주세요.

<hr>

- 답변

## :three: constructor와 non-constructor 함수 객체의 차이점에 대해 설명해주세요.

<hr>

- 답변

## :four: 생성자 함수의 인스턴스 생성 과정을 설명해주세요.

<hr>

- 답변

## :five: 생성자 함수의 this 는 무엇을 의미하나요?

<hr>

- 답변

<br>

# 15. 함수와 일급 객체

## :one: 순수함수란 무엇이며, 일반함수와의 차이점은 무엇인가요?

<hr>

- 답변

## :two: 유사 배열 객체와 이터러블의 차이점에 대해 설명해주세요.

<hr>

- 답변

## :three: 일급 객체의 조건에 대해 설명해주세요.

<hr>

- 답변

## :four: arguments 프로퍼티에 대해 설명해주세요.

<hr>

- 답변

## :five: name 프로퍼티는 ES5 와 ES6 에서 어떤식으로 동작을 하나요?

<hr>

- 답변

<br>
