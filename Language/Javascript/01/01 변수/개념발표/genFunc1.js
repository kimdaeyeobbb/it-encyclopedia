function* generator(i) {
    yield i;
    yield i + 10;
}

const gen = generator(10);



console.log(gen) // generator {<suspended>}
console.log(gen.next)  // ƒ next() { [native code] }
console.log(gen.next())  // {value: 10, done: false}
console.log(gen.next().value) // 10
console.log(gen.next().value)  //20
console.log(gen.next().value)  // undefined