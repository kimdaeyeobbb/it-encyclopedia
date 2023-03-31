/* 객체 리터럴에 의한 객체 생성 방식 */
const circle1 = {
    radius: 5,
    getDiameter(){
        return 2*this.radius;
    }
}

console.log(circle1.getDiameter());

const circle2 = {
    radius: 10,
    getDiameter(){
        return 2*this.radius;
    }
}

console.log(circle2.getDiameter());

// 객체 리터럴 단 하나의 객체만 생성함
// 동일한 프로퍼티를 갖는 객체를 여러개 생성해야 하는 경우에 매번 같은 프로퍼티를 기술해야하므로 비효율적임
// -> 생성자 함수 이용

/* 생성자 함수에 의해 객체를 생성 */
// 객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간단히 생성할 수 있음