let foo = 1;
console.log('전역 변수로서의 foo: ', foo)

{
    let foo = 2;
    console.log('지역 변수로서의 foo: ', foo)
    console.log()

    let bar = 3;
    console.log('지역 변수로서의 bar: ', bar)
}

console.log()

console.log(foo)   // 1
console.log(bar)   // ReferenceError: bar is not defined