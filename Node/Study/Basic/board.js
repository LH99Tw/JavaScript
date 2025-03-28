// 익스프레스로 간단한 API 서버 만들기
// 메모리 기반의 휘발성 게시판

// 경로 ( / , /posts , /posts/:id)
// 메서드 ( GET , POST , DELETE)
// 역할 ( 게시글 목록 조회 , 게시글 생성 , 게시글 삭제 )

const express = require("express");
const app = express();
let posts = [];  // 1. 게시글 리스트로 사용할 빈 리스트 생성
// req.body 를 사용하기 위해서는 JSON 미들웨어 설정
// 사용하지 않으면 undefined 반환
app.use(express.json()); // 2. JSON 미들웨어 설정

//POST 요청 시 컨텐트 타입이 application/x-www-form-urlencoded 일 때 파싱
app.use(express.urlencoded({ extended: true })); // 3. JSON 미들웨어와 사용
// HTML 폼 데이터를 JS 객체 형태로 req.body 에 넣어줌
app.get("/", (req, res) => {
    res.json(posts);               // 4. 게시글 목록 조회
});

app.post("/posts", (req, res) => {
    const { title, name, text } = req.body;

    posts.push({ id : posts.length + 1, title, name, text, createdDt : Date() });
    res.json({title, name, text});
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length !== filteredPosts.length;

    posts = filteredPosts;
    if (isLengthChanged) {
        res.json("OK");
        return;
    }
    res.json("NOT CHANGED");
});

app.listen(3000, () => {
    console.log("welcome posts START!");
});



