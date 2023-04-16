// 쉬운 예제
let p = new Promise(function (resolve, reject) {
    resolve('hello world');
}).then(메시지 => {
    console.log(메시지);   // hello world
    return 메시지.split(' ')[0]
}).then(메시지 => {
    console.log(메시지);   // hello
    return 메시지[0]
}).then(메시지 => {
    console.log(메시지);   // h
});
