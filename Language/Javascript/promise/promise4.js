let p = new Promise(function (resolve, reject) {
    // resolve('hello world');
    // reject('hello world');
    resolve('hello world');
}).then(메시지 => {
    alert("첫번째 then: ", 메시지);
    throw Error("에러 발생!")
    return 메시지.split(' ')[0]
}).then(메시지 => {
    alert("두번째 then: ", 메시지);
    return 메시지[0]
}).then(메시지 => {
    alert("세번째 then: ", 메시지);
}).catch(메시지 => {
    alert('catch 실행!! :' + 메시지);
});