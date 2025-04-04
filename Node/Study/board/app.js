// 컨트롤러 역할 
const express = require('express');
const handlebars = require('express-handlebars');
const app = express();

const mongodbConnection = require('./configs/mongodb-connection');

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');      // 웹 페이지 로드 시 사용할 템플릿 엔진
app.set("views", __dirname + "/views");    // 뷰 디렉터리를 views 폴더로 설정

// 라우터 설정
app.get('/', (req, res) => {
    res.render("home", {title : "테스트 게시판", message : "만나서 반갑습니다!" });
});
app.get('/write', (req, res) => {
    res.render("write", {title : "테스트 게시판"});
});
app.get('/detail/:id', (req, res) => {
    res.render("detail", {title : "테스트 게시판"});
});

let collection;
app.listen(3000, async() => {
    console.log("Server started");
    const mongoClient = await mongodbConnection()
    collection = mongoClient.db().collection("post")
    console.log("MongoDB connected");
});