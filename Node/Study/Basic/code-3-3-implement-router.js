// 이전 코드에 대한 리팩토링 진행
// 라우터와 실행 함수의 분리

// HTTP 서버 생성을 위한 모듈 불러오기
const http = require("http");
// URL 파싱을 위한 모듈 불러오기
const url = require("url");

// HTTP 서버 생성 및 요청 처리
http
    .createServer((req, res) => {
        // URL에서 경로 추출
        const path = url.parse(req.url, true).pathname;
        // 응답 헤더 설정
        res.setHeader("Content-Type", "text/html");

        // 경로에 따른 라우팅 처리
        if(path === "/user") {
            user(req, res);
        }
        else if(path === "/feed") {
            feed(req, res);
        }
        else {
            notFound(req, res);
        }
    })
    .listen(3000, () => console.log("라우터를 만들어보자 !"));

// 사용자 정보를 반환하는 함수
const user = (req, res) => {
    res.end(`[user] name : andy, age : 30`);
};

// 피드 정보를 HTML 형식으로 반환하는 함수
const feed = (req, res) => {
    res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `);
};

// 404 에러를 처리하는 함수
const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 Not Found");
};



