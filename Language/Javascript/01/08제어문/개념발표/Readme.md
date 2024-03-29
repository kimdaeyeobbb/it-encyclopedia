# 자바스크립트 딥다이브 개념 발표

## 05. 제어문

### 제어문을 사용하는 이유는?

제어문은 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다.
일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행되지만, 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.

<br>
<br>

### 8.1 블록문

- 0개 이상의 문을 중괄호로 묶은 것이다.
- 코드 블록 또는 블록이라고 부른다.
- JS는 블록문 하나를 실행 단위로 취급한다.
- 블록문 자체로 종결성을 갖기 때문에 끝에 세미콜론을 붙이지 않는다.

<br>
<br>

### 8.2 조건문

- 주어진 조건식의 평과 결과에 따라 코드 블록의 실행을 결정한다.
- 조건식은 true 또는 false 둘 중 하나로 평가된다.

<br>

#### 8.2.1 if…else 문

- if문과 else 문은 2번 이상 사용 불가하지만, else if 문은 여러번 사용가능하다.
- else if문과 else문은 옵션이기 때문에 사용하는 경우도, 그렇지 않은 경우도 있다.
- 주어진 조건식이 불리언 값으로 평가되지 않을 경우 JS엔진에 의해 암묵적으로 불리언 값으로 강제 변환되어 실행할 코드 블록을 결정한다.
- 논리적 참, 거짓으로 실행할 코드 블록을 결정하는데 사용한다.

```jsx
if (조건식1) {
	// 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
	// 조건식2가 참이면 이 코드 블록이 실행된다.
} else {
	// 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}
```

- if…else 문은 삼항 조건 연산자로 바꿔 쓸 수 있다.
  - 삼항 조건 연산자는 표현식인 문으로, 값으로 평가되는 표현식을 만든다. → 변수에 할당 가능하다는 뜻
  - if…else 문은 표현식이 아닌 문으로, 변수에 할당이 불가하다.

```jsx
// if...else 문
let x = 2;
let result;

if (x % 2) {
	result = "홀수";
} else {
	result = "짝수";
}

console.log(result); // 짝수

// 삼항 연조건 연산자
let x = 2;
let result = x % 2 ? "홀수" : "짝수";
console.log(result); // 짝수
```

<br>

#### 8.2.2 switch 문

- switch 문은 주어진 표현식(상황)을 평가하여 그 값과 일치하는 표현식을 갖는 case 문으로 실행 흐름을 옮긴다.
- switch 문의 표현식과 일치하는 case 문이 없다면 실행 순서는 default 문으로 이동한다. default 문은 선택사항으로 사용할 수도 있고 아닐 수도 있다.
- 논리적 참, 거짓보다는 다양한 상황에 따라 실행할 코드 블록을 결정할 때 사용한다.

```jsx
switch (표혀식) {
	case 표현식1:
		switch 문의 표현식과 표현식1이 일치하면 실행될 문;
		break;

	case 표현식2:
		switch 문의 표현식과 표현식2이 일치하면 실행될 문;
		break;

	default:
		switch 문의 표현식과 일치하는 case 문이 없을 때 실행될 문;
}
```

<br>
<br>

### 8.3 반복문

- 반복문은 조건식의 평가 결과가 참인 경우 동안에 코드 블록을 실행하고, 조건식이 거짓일 때 까지 반복한다.

<br>

#### 8.3.1 for 문

- for 문은 조건식이 거짓으로 평가될 때까지 코드 블록을 반복 실행한다.
- for 문의 변수 선언문, 조건식, 증감식은 모두 옵션이기 때문에 반드시 사용할 필요는 없다.
- for 문의 조건식에 아무것도 적지 않은 경우 무한루프가 된다.

```jsx
for (변수 선언문 또는 할당문; 조건식; 증감식) {
	조건식이 참인 경우 반복 실행될 문;
}

for (let i = 0; i < 3; i++) {
	console.log(i); // 0 1 2
}

// 무한루프
for (;;) {
	...
}
```

<br>

#### 8.3.2 while 문

- while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다.
  - for 문: 반복 횟수가 명확할 때
  - while문: 반복 횟수가 불명확할 때

```jsx
let count = 0;

while (count < 3) {
	console.log(count); // 0 1 2
	count++;
}

// 무한루프
while (true) {
	...
}
```

<br>

#### 8.3.3 do…while 문

- do…while 문은 코드 블록을 먼저 실행하고 조건식을 평가한다.
- 무조건 한 번 이상 코드 블록을 실행한다.

```jsx
let count = 0;

do {
	console.log(count); // 0 1 2
	count++;
} while (count < 3);
```

<br>
<br>

### 8.4 break 문

- break 문은 레이블 문, 반복문(for, for…in, for…of, while, do…while) 또는 switch 문의 코드 블록을 탈출한다.
- 레이블 문, 반복문, switch 문 이외의 코드 블럭에 break를 사용하면 문법 에러가 발생된다.

<br>

### 8.5 continue 문

- continue 문은 반복문의 코드 블록 실행을 현 지점에서 중단하고, 반복문의 증감식을 실행 흐름을 이동시킨다. break 문처럼 반복문을 탈출하지는 않는다.
