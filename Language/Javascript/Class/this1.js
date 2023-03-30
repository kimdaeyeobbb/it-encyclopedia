/* this */
// 객체가 자기자신의 프로퍼티 혹은 메서드를 참조하기 위한 참조 변수
// this 바인딩(this가 가리키는 값)은 함수 호출 방식에 따라 동적으로 결정됨


/* 일반 함수 */
function gen_func(){
    console.log(this);
}

gen_func(); // 일반함수에서 this바인딩 -> 전역 객체

console.log();

/* 메서드 */
const obj = {  method1(){
    console.log(this);
}}

obj.method1();