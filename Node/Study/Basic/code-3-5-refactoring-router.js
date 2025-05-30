// 맵 자료구조를 통한 라우터 리팩토링

const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");
    if (path in urlMap) {
        urlMap[path](req, res);
    }
    else {
        notFound(req, res);
    }
}).listen(3000, () => console.log("라우터를 만들어보자 !"));

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name : ${userInfo.name}, age : ${userInfo.age}`);
};

const feed = (req, res) => {
    res.end(`
    <ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
    </ul>
    `);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 Not Found");
};

const urlMap = {
    "/user" : user,
    "/feed" : feed,
    "/" : (req, res) => res.end("HOME")
}
