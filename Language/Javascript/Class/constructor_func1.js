// 빈 객체 생성
const person = new Object();

// 프로퍼티 추가
person.name = "Lee";
person.sayHello = function (){
    console.log("HI! My name is "+ this.name);
}

console.log(person);
person.sayHello();