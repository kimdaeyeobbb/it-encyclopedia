let i = 10;
console.log("전역 스코프의 i: ", i);

/* 함수 레벨 스코프 */
function foo() {
    let i = 100;

    for (let i = 0; i < 5; i++) {
        console.log("블록 레벨 스코프의 i: ", i);
    }

    console.log("함수 레벨 스코프의 i: ", i);
}

foo();
console.log("전역 스코프의 i: ", i);