// 익스프레스 서버 만들기
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.set({"Content-Type" : "text/html; charset=utf-8"}); // 응답 헤더 설정
    res.end("헬로 익스프레스");
});

app.listen(port, () => {    // 서버 실행
    console.log(`START SERVER, use ${port}`);
});

