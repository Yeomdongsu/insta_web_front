[ 프로젝트 소개 ]
---
Dongsutagram은 인스타그램 앱을 클론 코딩한 웹 플랫폼입니다.

이 프로젝트는 Front 개발은 React를 사용하고 그 외 REST API 설계와 개발, <br>Docker 이미지를 통한 배포, Git Actions를 활용한 배포 자동화,
그리고 S3를 이용한 정적 웹 호스팅 등을 활용하기 위해 시작되었습니다.

또한 Kakao Login API와 boto3 라이브러리를 활용하여 AWS Rekognition 객체 감지 API를 구현하여 사용자가 게시한 이미지에 포함된 객체를 감지하고 표시하는 기능을 추가했습니다.<br><br><br><br>
## [ 프로젝트 설계 ]
* 클라이언트 개발과 서버 개발을 분리하여 설계

* AWS RDS MySql(region : 아시아 태평양(서울) ap-northeast-2) 사용하여 테이블 설계

* DB 테이블 명세서로는 erd cloud 이용

* DB 테이블을 기반으로 사용할 API 명세서(postman) 설계 <br><br><br><br>

## [프로젝트 개발 순서]
* 화면기획서(생략) -≫ DB 설계 -≫ rest api 설계, 개발 -≫ postman으로 테스트 -≫ 서버 Docker image로 배포 -≫ Git Actions를 이용한 배포 자동화 -≫ 웹에서 배포한 서버로 통신 -≫ 웹은 S3 정적 웹 호스팅 이용하여 배포 <br><br><br><br>

## [ [DB 테이블 ERD](https://www.erdcloud.com/d/qhoGo5ockkJvrPFha)🔽 ]<br><br>
![image](https://github.com/Yeomdongsu/insta_web_front/assets/117874997/2b007a64-497f-4562-9901-75fd480bf974)<br><br><br><br>

## [ [API 명세서 보기](https://documenter.getpostman.com/view/31597978/2sA2r813Tv)🔽 ]<br><br>
![image](https://github.com/Yeomdongsu/insta_web_front/assets/117874997/dc6e4c84-dc0f-4cb9-b5a9-558203cee81e)<br><br><br><br>

## [ Web 실행 Click🔽] <br><br>
[![image](https://github.com/Yeomdongsu/insta_web_front/assets/117874997/8a3c3405-e3e4-4398-b35b-2f04a3c10f27)](http://dzsx20-insta-web.s3-website.ap-northeast-2.amazonaws.com/)
