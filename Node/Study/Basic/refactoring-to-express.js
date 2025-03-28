const express = require("express");
const url = require("url");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("익스프레스로 라우터 리팩토링하기");
});

app.get("/", (_, res) => { 
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("홈페이지 입니다."); });
// 사용하지 않는 변수 공간이지만 넣어야 할 때 _ 사용
app.get("/user", user);
app.get("/feed", feed);

function user(req, res) {
    const user = url.parse(req.url, true).query;
    res.json(`[user] name : ${user.name}, age : ${user.age}`);  
}

function feed(req, res) {
    res.json(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `);
}
