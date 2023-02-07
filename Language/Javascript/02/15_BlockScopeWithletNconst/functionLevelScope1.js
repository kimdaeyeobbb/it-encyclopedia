var x = 1;
if (true) {
    var x = 10;
    console.log('함수 내에서 x확인: ', x);
}

console.log('함수 밖에서 x확인: ', x);