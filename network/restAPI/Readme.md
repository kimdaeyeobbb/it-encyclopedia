# REST API


## API (Application Programming Interface)


- 어떤 서버의 특정 부분에 접속해서 그 안에 있는 데이터와 서비스를 이용할 수 있게 해주는 S/W 도구


- S/W가 다른 S/W로부터 지정된 형식으로 요청 및 명령을 받을 수 있는
수단 <br>
  (API를 사용하여 두 개의 S/W가 통신을 주고 받을 수 있음)



- 로컬 프로그램인 브라우저는 Web APi를 통해서 자바스크립트로부터 특정 동작을 지시받음

<br>

## REST API (Representational State Transfer API) 란?  

- 네트워크를 통해서 컴퓨터들끼리 통신할 수 있게 해주는 아키텍처 스타일


- 프론트엔드 웹에서 서버에 데이터를 요청하거나 배달앱에서 서버에 주문을 넣거나하는 등 이러한 서비스들이 오늘날 널리 사용되는 것이 `REST`라는 형식의 `API`임

<br>

## REST API의 특성

- REST API는 인터넷 식별자(URI)와 HTTP 프로토콜을 기반으로 함
  - HTTP 프로토콜을 기반으로 하므로 `단순함`을 특성으로 가짐


- 각 요청이 어떤 동작이나 정보를 위한 것인지를 `요청의 모습 그자체로 추론이 가능`함


- 단일한 인터페이스를 가짐
  - 해당 API를 가지는 애플리케이션이 동일한 경로를 통해 접속해야 함
  


- `JSON을 데이터 포맷으로 가짐`
  - 따라서 브라우저간 확장성이 좋음



- REST는 HTTP와 JSON을 사용하므로 `페이로드(클라이언트-서버간 실제로 전달하려는 내용)의 무게를 가볍게 할 수 있음`  


<br>

## REST는 왜 필요한가?

- 만드려는 서비스에서 기능 자체만 중요시한다면 REST를 고려할 필요없이 동작만 하게 만들면 그만일 것임


- 예시
  - 어떤 스포츠 그룹의 팀과 팀원들에 대한 API를 만드는 경우

```http request
# 스포츠 그룹의 스포츠 팀 리스트 요청
https://(사이트도메인)/a
```


```http request
# 스포츠 팀의 팀원 리스트
https://(사이트도메인)/123
```

```http request
# 팀원들의 정보 수정
https://(사이트도메인)/red-devil
```

이런식으로 서버를 구성해도 이에 맞춰 요청을 보내는 앱을 짜면 서비스의 기능 자체에는 아무런 문제가 없을 것이다
<br>

하지만 서비스는 개발자 혼자 만드는 것이 아니고, 이 일을 인계받는 개발자나 해당 API를 사용하여 
다른 제품을 만들게 되는 다른 개발자들은 이러한 구성방식을 이용하여 일하는것이 어려울 것이다


- 이와 달리 RESTful하게 만든 API는 요청을 보내는 주소만으로 대략적으로 이것이 무엇을 하는 요청인지 파악이 가능하다
  - 예컨데, 스포츠 그룹 DB에게 정보를 보내달라는 요청을 할 때 주소에 `team`이 붙어서 `https://(도메인)/team`꼴이 된다면 아마도 해당
  스포츠 재단에 속하는 스포츠 팀의 목록을 받아오는 요청일 것이다
  - 그 뒤에 index(고유번호 역할)가 따라 붙어서 `https://(도메인)/team/3`꼴이 된다면 보통은 해당 스포츠 재단의 팀들 중
  해당 인덱스 번호(여기서는 3번)를 가지는 스포츠 팀의 정보가 올것이다
    - 또 뒤에 `teammates`가 붙어서 `https://(도메인)/team/3/teammates`라는 형식으로 보내면 해당 팀의 팀원들 정보가 될것이고 그 뒤에 인덱스를 붙여서
    `https://(도메인)/team/3/teammates/11`이 된다면 팀원들 중 11번을 가진 팀원에 대한 정보가 올 것이다

<br>

## REST API 메서드

- 서버에 REST API로 요청을 보낼 때에는 HTTP 규약에 따라서 신호를 전송함
- 우체국에서 물건을 부칠 때 `일반우편`,`등기`, `택배`등 다양한 방법으로 부칠 수 있듯, HTTP로 요청을 보낼 때에도 여러 메서드를 활용하여 요청을 보낼 수 있다


- REST API에는 대표적으로 GET, POST, DELETE, PUT, PATCH 등이 존재한다
- 소포가 편지보다 더 많은 것을 담을 수 있듯, `POST`, `PUT`, `PATCH`에는 body라는 주머니가 있어 정보들을 GET이나 DELETE 보다 많이, 그리고 비교적
안전하게 감춰서 실어 보낼 수 있음

### REST API 메서드는 왜 필요한가?

- REST API 메서드의 기능이 특정용도에 제한되어있지는 않다
- 하지만 누구든 각 요청의 의도를 쉽게 파악할 수 있도록 `RESTful 하게 API를 만들기`위해서는 이들을 목적에 따라 구분해서 사용해야 한다


- REST API가 없다면 URI에 `https://(도메인)/team/3/findteammates`처럼 동작까지 표시해야할 것이다
- 하지만 이는 깔끔하지 못하고, 이러한 것들을 지양하기 위해 REST의 규칙 중 하나로 URI는 동사가 아닌 명사로 구성되어야 한다는 규칙이 존재한다




### REST API 메서드별 특징

#### GET

- READ
- 데이터 조회

```http request
# 팀원들을 조회하는 요청
GET https://(도메인)/team/3/teammates
```


#### POST

- Create
- 새로운 정보 추가

```http request
# 새로이 들어온 팀원의 정보 추가
POST https://(도메인)/team/3/teammates
```


#### PUT

- Update
- 정보 수정
- 정보를 통쨰로 갈아 끼울 때 사용


#### PATCH

- Update
- 정보 수정
- 정보 중 일부를 특정 방식으로 변경할 때 사용


#### DELETE

- Delete
- 정보 삭제

```http request
# 팀원이 팀에서 나간 경우
DELETE https://(도메인)/team/3/teammates
```




<br>

## REST API 결론

- REST API는 HTTP 요청을 보낼 때 어떤 URI에 어떤 메서드를 사용할지에 대한 개발자들 간의 약속이다

- 형식이므로 기술에 구애받지 않음
  - 따라서 앱을 만들거나 웹을 만드는 등 어떤 언어로 만들던간에 S/W간 HTTP로 정보를 주고받는 부분이 있다면 이러한 형식을 준수하여 `RESTful`한 서비스를 만드는 것이 좋다

  