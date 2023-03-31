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
        super(el1,el2);
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

console.log(classicFireSausage.flavor())