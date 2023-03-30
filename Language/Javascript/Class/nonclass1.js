
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