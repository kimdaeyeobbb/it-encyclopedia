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

console.log(me);