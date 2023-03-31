# 클래스

- 클래스는 생성자를 이용한 타입 생성과 그 결과가 일치함
- 자바스크립트만의 사용자 정의 타입 생성 방법을 다른 언어의 클래스 문법처럼 바꿔 준것이 `자바스크립트 클래스`



## 클래스를 사용하지 않은 예시

```js
/* 클래스를 사용하지 않은 예시 */

/* 생성자 함수 */
function User2(name){
    this.name = name;
}

/* 메서드 추가시 prototype 이용 */
/* 사용자 정의 타입 */
User2.prototype.sayName = function(){
    console.log(this.name);
}

var user = new User2("Danny");
user.sayName();
```

- 타입을 생성함
- prototype chain이나 생성자 훔쳐오기 방식으로 할 수 있는 것은 클래스 방식을 이용해서 구현할 수 있다



## 클래스를 사용한 예시

```js
class User{
    /* 클래스의 생성자 함수 */
    constructor(name) {
        this.name = name;
    }

    /* 메서드 */
    sayName(){
        console.log(this.name);
    }
}

/* 클래스는 인스턴스를 만들어서 이용한다 */
var me = new User("Wade");
// 인스턴스 생성시 생성자 함수가 자동으로 실행됨

me.sayName();
```

- 클래스를 사용하지 않은 것에 비해 더 보기 좋고 편리하게 개선된 문법이므로 `슈가 신텍스`라 할 수 있음



## [사용자 정의 객체](https://opentutorials.org/module/1597/9783)


## 슈가 신택스 

- 내부적인 동작은 동일하지만 더 보기 좋고 편리하게 개선된 문법


## 클래스의 상속

- 타입 상속처럼 클래스 또한 상속이 가능하다

```js
class Sausage{
    constructor(el1, el2){
        this.inside1 = el1;
        this.inside2 = el2;
    }

    /* 메서드 */
    taste(){
        return this.inside1
            +"와 "
            +this.inside2
            + " 맛이 난다!";
    }
}

var classicSausage = new Sausage("닭고기", "양파");
console.log(classicSausage.taste());

/* 상속받는 FireSausage */
class FireSausage extends Sausage{

}

/* 인스턴스 */
var classicFireSausage = new FireSausage("소고기","파");
console.log(classicFireSausage.taste());


/* inside1과 inside2가 잘 들어있는지 확인 */
console.log(classicSausage.inside1);
console.log(classicSausage.inside2);
```

- extends 연산자를 이용해 상위 타입의 프로퍼티를 상속 받을 수 있다

## super

```js
class Sausage{
    constructor(el1, el2){
        this.inside1 = el1;
        this.inside2 = el2;
    }

    /* 메서드 */
    taste(){
        return this.inside1
            +"와 "
            +this.inside2
            + " 맛이 난다!";
    }
}

var classicSausage = new Sausage("닭고기", "양파");
console.log(classicSausage.taste());

/* 상속받는 FireSausage */
class FireSausage extends Sausage{
    constructor(el1,el2,el3) {
        super(el1,el2);  // 얘가 없으면 에러 발생 (얘로 인해 상위의 constructor가 실행되었다고 볼 수있음)
        this.inside3 = el3;
    }

    flavor(){
        return this.inside3+"의 풍미도 있다!";
    }
}

/* 인스턴스 */
var classicFireSausage = new FireSausage("소고기","파","불");
console.log(classicFireSausage.taste());


/* inside1과 inside2가 잘 들어있는지 확인 */
console.log(classicFireSausage.inside1);
console.log(classicFireSausage.inside2);

console.log(classicFireSausage.flavor());
```

### super()를 삽입하지 않으면 에러가 남

- 프포퍼티를 추가하기 위해 자식 클래스에 constructor 함수를 선언하면 부모클래스의 constructor 함수를 덮어쓴다
- 이를 해결하기 위해서는 super 메서드가 필요하다
- super 메서드는 슈퍼타입의 생성자를 호출한다

- 즉, super() 메서드를 이용해서 자식 클래스의 생성자 함수가 부모 클래스의 생성자 함수를 덮어 씌우는것을 방지할 수 있다
