# 4주차 질의응답 (딥다이브 23장-26장)

<br>

## 23. 실행 컨텍스트

---

1. 소스코드의 타입에 대해 설명해주세요.

- 소스코드의 타입에는 4가지가 있습니다. 1) 전역 코드: 전역에 존재하며 전역 실행 컨텍스트가 생성, 2) 함수 코드: 함수 내부에 존재하며 함수 실행 컨텍스트가 생성, 3) eval 코드: 빌트인 전역 함수인 eval 함수에 인수로 전달되어 실행되는 코드로 eval 실행 컨텍스트가 생성, 4) 모듈 코드: 모듈 내부에 있으며 모듈 실행 컨텍스트가 생성됩니다.

2. 실행 컨텍스트 생성 과정에 대해 설명해주세요.

- 전역 객체 생성, 전역 실행 컨텍스트 생성, 스코프 체인 생성 및 초기화, 변수 객체화, 함수 선언 처리, 변수 선언 처리, this 바인딩 결정, 코드 실행, 변수 값 할당, 함수 실행 컨텍스트 생성, 스코프 체인 생성 및 초기화, this 바인딩 결정, 함수 실행, 지역 변수 값 할당, 내부 함수 실행 컨텍스트 생성, ... 순서로 실행 컨텍스트가 생성됩니다.

3. 실행 컨텍스트에 대해 말해보세요

- 실행 컨텍스트는 소스코드를 실행하는 데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역입니다. 코드가 실행되려면 스코프, 식별자, 코드 실행 순서 등의 관리가 필요한데 이를 관리합니다.

4. 식별자 검색 과정에 대해 설명해주세요.

- 먼저 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색하기 시작하여 스코프 체인 상의 상위 스코프로 이동하면서 전역 렉시컬 환경까지 이동해서 검색합니다.

5. 실행컨텍스트 를 활용하여, var로 선언된 변수가 어떻게 호이스팅되는지 설명해주세요.

- var 키워드로 선언한 전역 변수는 객체 환경 레코드에서 관리되고, 객체 환경 레코드와 연결된 BindingObject를 통해 전역 객체의 프로퍼티가 됩니다. 전역 코드 평가 시점에 객체 환경 레코드에 바인딩된 BindingObject를 통해 전역 객체에 var 키워드로 선언한 변수 식별자를 키로 등록한 다음, 암묵적으로 undefined를 바인딩합니다. 그렇기 때문에 호이스팅이 일어나고 TDZ에 영향을 받지 않습니다.

<br>

## 24. 클로저

---

1. 클로저에 대해서 설명해주세요.

- 클로저는 반환된 내부함수가 자신이 선언됐을 때의 스코프를 기억하여 자신이 선언됐을 때의 스코프 밖에서 호출되어도 그 스코프에 접근할 수 있는 함수를 말합니다. 주로 정보를 은닉하기 위해 사용하며 메모리가 누수된다는 단점이 있습니다.

2. 캡슐화를 정보 은닉 개념과 함께 설명해주세요.

- 캡슐화는 객체의 상태를 나타내는 프로퍼티와 프로퍼티를 참조하고 조작할 수 있는 동작인 메서드를 하나로 묶는 것을 말합니다. 캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 정보 은닉이라고 한다.

3. 클로저를 사용하는 이유는 무엇인가요?

- 클로저를 사용하는 이유는 상태가 의도치 않게 변경되지 않도록 상태를 안전하게 은닉하고 특정 함수에게만 상태 변경을 허용 하기 위해서입니다.

4. 클로저를 어떻게 생성하나요?

- 클로저를 생성하기 위해선 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 생명 주기가 길게 하여야 합니다.

5. 클로저의 장점과 단점에 대해 설명해주세요.

- 클로저의 장점은 특정 데이터를 스코프 안에 가두어 보존할 수 있고, 캡슐화를 하여 정보의 접근을 제한할 수 있습니다. 그렇지만 메모리가 누수될 수 있다는 단점이 있습니다.

<br>

## 25. 클래스

---

1. 클래스와 함수 생성자의 차이점은 무엇인가요?

-

1. new 연산자 없이 호출하면 클래스는 에러가 발생하고, 생성자 함수는 일반 함수로 호출 됩니다.
2. 클래스는 상속을 지원하는 extends와 super 키워드를 제공합니다.
3. 클래스는 호이스팅이 발생하지 않는 것처럼 동작합니다.
4. 클래스 내 모든 코드는 암묵적으로 strict mode가 지정됩니다.

5. 정적 메서드와 프로토타입 메서드의 차이점은 무엇인가요?

- 정적 메서드는 클래스로 호출하고, 프로토타입 메서드는 인스턴스로 호출합니다. 그리고 정적 메서드는 인스턴스의 프로퍼티를 참조하지 않지만 프로토타입 메서드는 인스턴스의 프로퍼티를 참조합니다.

3. 클래스의 상속에 대해서 말해보세요

- 클래스 상속을 사용하면 클래스를 다른 클래스로 확장할 수 있습니다. extends 키워드를 사용하여 부모 클래스와 자식 클래스 간의 상속 관계를 설정할 수 있습니다. 그리고 super 키워드를 사용하여 부모 클래스의 constructor 나 메서드를 호출할 수 있습니다.

4. 클래스의 정의에 대해 설명해주세요.

- 클래스는 어떤 사물의 공통 속성을 모아 정의한 추상적인 개념이고, 인스턴스는 클래스의 속성을 지닌 구체적인 사례입니다.

5. 정적 클래스 멤버를 만드는 이유는 무엇인가요?

- 정적 클래스 멤버(static)으로 만들어진 메서드, 프로퍼티는 클래스의 인스턴스에서 호출될 수 없고, 클래스 자체에서 호출될 수 있는데, 복제가 필요 없는 데이터를 다루기에 효과적이기 때문에 사용합니다.

<br>

## 26. ES6 함수의 추가 기능

---

1. 화살표 함수와 일반 함수의 차이를 설명해주세요.

- 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이고, 중복된 이름의 매개변수를 선언할 수 없습니다. 그리고 화살표 함수는 this, arguments, super, new.target을 갖지 않고, 해당 키워드를 참조하면 상위 스코프 체인에서 참조합니다.

2. 매개변수 기본값에 대해 설명해주세요.

- ES6에서는 함수의 인자에 기본값을 지정할 수 있습니다. 그리고 Rest 파라미터에는 기본값을 지정할 수 없습니다.

3. ES6의 메서드에 대해 설명해주세요.

- ES6에서 메서드는 메서드 축약 표현으로 정의된 함수를 의미합니다. 그리고 메서드는 내부 슬롯 [[HomeObject]]을 갖고, super 키워드를 사용할 수 있습니다.

4. Rest 파라미터에 대해 설명해주세요.

- Rest 파라미터는 매개변수의 이름 앞에 ...을 붙여 정의합니다. 함수에 전달된 인수들의 목록을 배열로 전달 받고, 다른 인자와 함께 사용될 때는 반드시 마지막 파라미터로 사용해야 합니다.

5. Map 오브젝트에 대해 설명해주세요.

- Map 객체는 키와 값의 쌍으로 이루어진 집합입니다. 하나의 Map에서 키는 단 하나만 존재해야 하기 때문에 중복될 수 없습니다. 그리고 기존 객체와는 다르게 메서드만을 이용해서 값을 넣고 뺍니다.
