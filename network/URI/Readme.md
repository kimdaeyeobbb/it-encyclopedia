# URI

- 통합 자원 식별자 (Uniform Resourec Identifier)


- 인터넷상 웹 페이지, 이미지, 동영상, 파일 등 다양한 리소스를 식별하는 방법을 제공하기 위해 표준화된 형식 


- URI는 스킴, 인증벙보, 호스트, 포트, 경로, 쿼리 문자열 등 다양한 구성 요소로 이루어져 있음




## URI 문법

- 일반적으로 URI는 다음과 형태를 띔

```http request
scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
```


## URI 구성 요소


### `scheme`
- 포로토콜을 구분하는 구분자 `:`의 앞 부분 (URI의 가장 처음에 오는 부분)
- 리소스 접근을 위해 사용하는 프로토콜
<br> ex) `http`, `https`, `ftp`

- `http`는 HyperText Transfer Protocol을 사용하는 URI를 뜻함
<br> (웹 페이지 전송을 위해 사용되는 표준 프로토콜이며, 주로 웹 브라우저를 통해 접근하는 경우에 사용함)

  
### Authority (인증정보)

- 리소스에 접근하기 위해 필요한 인증정보를 포함
- 일반적으로 사용자명이나 비밀번호를 포함할 수 있음


### `host`

- 리소스가 위치한 서버의 도메인명이나 IP주소를 나타냄


### `포트 (port)`


- 서버에 접근하기 위해 사용되는 포트 번호
- 기본적으로 필요하지 않은 경우 생략될 수 있음 (80번 포트 등)


### 경로 (path)

- 서버 내의 리소스의 위치를 나타냄
- 일반적으로 디렉토리 구조로 표현되며, 리소스의 식별 경로를 제공함


### 쿼리 문자열 (Query String)

- 추가적인 매개변수를 전달하기 위해 사용
- 주로 웹 애플리케이션에서 사용되며, key-value쌍으로 사용됨