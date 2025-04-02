// 필요한 모듈들을 불러옵니다
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Person = require('./person-model');

// mongoose의 strictQuery 옵션을 비활성화하여 경고 메시지를 제거합니다
mongoose.set('strictQuery', false);

// Express 애플리케이션을 생성합니다
const app = express();

// JSON 파싱 에러 처리를 위한 미들웨어
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            error: "잘못된 JSON 형식입니다. 올바른 JSON 형식으로 다시 시도해주세요." 
        });
    }
    next();
});

// JSON 형식의 요청 본문을 파싱하기 위한 미들웨어를 사용합니다
app.use(bodyParser.json());

// 서버를 3000번 포트에서 실행합니다
app.listen(3000, async() => {
    try {
        console.log("서버 실행중");
        // MongoDB Atlas 연결 URI
        const mongodbUri = "mongodb+srv://zhffkwhdkp:bb020926@nodejs.fnazjbe.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs";
        // MongoDB에 연결합니다
        await mongoose.connect(mongodbUri, {useNewUrlParser: true});
        console.log("몽고디비 연결 성공");
    } catch (error) {
        console.error("MongoDB 연결 실패:", error);
    }
});

// 모든 person 데이터를 조회하는 GET 엔드포인트
app.get("/person", async(req, res) => {
    try {
        const person = await Person.find({});
        res.send(person);
    } catch (error) {
        console.error("조회 중 오류 발생:", error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// 새로운 person 데이터를 생성하는 POST 엔드포인트
app.post("/person", async(req, res) => {
    try {
        // 필수 필드 검증
        if (!req.body.email) {
            return res.status(400).send("이메일은 필수 입력 항목입니다.");
        }

        const person = new Person(req.body);
        await person.save();
        res.send(person);
    } catch (error) {
        console.error("생성 중 오류 발생:", error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// 특정 person 데이터를 수정하는 PUT 엔드포인트
app.put("/person/:email", async(req, res) => {
    try {
        const person = await Person.findOneAndUpdate(
            {email: req.params.email},
            { $set: req.body},
            { new: true }
        );
        if (!person) {
            return res.status(404).send("해당 이메일을 가진 사용자를 찾을 수 없습니다.");
        }
        res.send(person);
    } catch (error) {
        console.error("수정 중 오류 발생:", error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});

// 특정 person 데이터를 삭제하는 DELETE 엔드포인트
app.delete("/person/:email", async(req, res) => {
    try {
        const result = await Person.deleteMany({email: req.params.email});
        if (result.deletedCount === 0) {
            return res.status(404).send("해당 이메일을 가진 사용자를 찾을 수 없습니다.");
        }
        res.send("삭제 완료");
    } catch (error) {
        console.error("삭제 중 오류 발생:", error);
        res.status(500).send("서버 오류가 발생했습니다.");
    }
});
