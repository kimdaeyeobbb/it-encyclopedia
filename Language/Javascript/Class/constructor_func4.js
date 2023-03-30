function Circle(radius){
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 지칭
    this.radius = radius;
    this.getDiameter = function(){
        return this.radius*2;
    }
}

/* 인스턴스 생성 */
const circleA = new Circle(50);
const circleB = new Circle(100);

console.log(circleA.getDiameter());
console.log(circleB.getDiameter());