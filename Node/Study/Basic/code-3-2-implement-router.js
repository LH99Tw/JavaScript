// 라우터 만들기
// URL 경로에 따라서 다른 응답을 주는 라우팅 기능
// url 모듈을 사용하면 경로를 간단하게 읽을 수 있다.
// https://goldenrabbit.co.kr/aboutus/#author_recurit 인 경우우
// 프로토콜(https) 호스트명(goldenrabbit.co.kr) 경로(aboutus) 해시 (author_recurit)
// https://www.example.com:80/path/to/file.html?key1=value1#hash
// 프로토콜(https) 도메인인명(www.example.com) 포트(80) 경로(path/to/file.html) 쿼리(key1=value1) 해시(hash)

// 문제 1. localhost:3000/user와 localhost:3000/feed 두 URL에 대해 다른 응답을 주는 코드 작성

const http = require("http");
const url = require("url");      // url 모듈 사용

http
    .createServer((req, res) => {
        const path = url.parse(req.url, true).pathname; // 패스명 할당
        res.setHeader("Content-Type", "text/html");

        if(path === "/user") {
            res.end("[user] name : andy, age : 30");
        }
        else if(path === "/feed") {
            res.end(`
            <ul>
                <li>picture1</li>
                <li>picture2</li>
                <li>picture3</li>
            </ul>
            `);
        }
        else {
            res.statusCode = 404;
            res.end("404 Not Found");
        }
})
.listen(3000, () => console.log("라우터를 만들어보자 !"));

