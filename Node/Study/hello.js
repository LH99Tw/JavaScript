const http = require("http");
let count = 0; // 1. http 객체 생성

const server = http.createServer((req, res) => { // 2. 서버 객체 생성 (request, response)
    log(count)                                    // 3. 카운트 1 증가
    res.statusCode = 200;                         // 4. 결괏값값 200
    res.setHeader("Content-Type", "text/plain");  // 5. 헤더 설정
    
    setTimeout(() => {
        res.write("hello\n");                     // 6. 응답값 작성
        res.end("Node.js");                       // 7. 2초 후 Node.js 출력
    }, 2000);
});

function log(count){
    console.log((count += 1));
}

server.listen(8000, () => console.log("Hello Node.js")); // 8. 8000번 포트로 접속 대기


