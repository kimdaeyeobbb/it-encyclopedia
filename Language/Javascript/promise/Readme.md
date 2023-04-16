# Promise

- JS Object이며 비동기 작업 수행시 콜백함수를 대신하여 사용함

- `promise`를 이용해서 콜백 지옥을 탈출할 수 있음

- `promise`: 대기상태(pending)을 거쳐서 콜백함수를 다시 부르겠다는 뜻

<br>

## promise의 상태

- pending(대기상태) => resolve(해결) => fulfilled(성공)
- pending(대기상태) => reject(거부) => rejected(실패)

<br>

## Promise 기본 꼴

```js
let p = new Promise(function (resolve, reject) {
  /* 실행코드 */
});
```

- `resolve(value)` : 작업이 성공적으로 마무리되면 호출됨. 결과는 value에 담김
- `reject(error)` : 작업이 실패시 호출됨. 에러결과는 error에 담김

<br>

### 예제

```js
// 쉬운 예제
let p = new Promise(function (resolve, reject) {
  resolve("hello world");
})
  .then((메시지) => {
    console.log(메시지); // hello world
    return 메시지.split(" ")[0];
  })
  .then((메시지) => {
    console.log(메시지); // hello
    return 메시지[0];
  })
  .then((메시지) => {
    console.log(메시지); // h
  });
```

### 예제2

```js
let p = new Promise(function (resolve, reject) {
  // resolve('hello world');
  reject("hello world");
})
  .then((메시지) => {
    alert(메시지);
    return 메시지.split(" ")[0];
  })
  .then((메시지) => {
    alert(메시지);
    return 메시지[0];
  })
  .then((메시지) => {
    alert(메시지);
  })
  .catch((메시지) => {
    alert("catch 실행!! :" + 메시지); // catch 실행!! :hello world
  });
```

### 예제3

```js
let p = new Promise(function (resolve, reject) {
  // resolve('hello world');
  reject("hello world");
})
  .then((메시지) => {
    alert(메시지);
    throw Error("에러 발생!");
    return 메시지.split(" ")[0];
  })
  .then((메시지) => {
    alert(메시지);
    return 메시지[0];
  })
  .then((메시지) => {
    alert(메시지);
  })
  .catch((메시지) => {
    alert("catch 실행!! :" + 메시지); //  catch 실행!! :hello world
  });
```

### 예제4

```js
let p = new Promise(function (resolve, reject) {
  // resolve('hello world');
  // reject('hello world');
  resolve("hello world");
})
  .then((메시지) => {
    alert("첫번째 then: ", 메시지);
    throw Error("에러 발생!");
    return 메시지.split(" ")[0];
  })
  .then((메시지) => {
    alert("두번째 then: ", 메시지);
    return 메시지[0];
  })
  .then((메시지) => {
    alert("세번째 then: ", 메시지);
  })
  .catch((메시지) => {
    alert("catch 실행!! :" + 메시지);
  });
```
