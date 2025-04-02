//  몽고디비 CRUD API 만들기
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://zhffkwhdkp:bb020926@nodejs.fnazjbe.mongodb.net/?retryWrites=true&w=majority&appName=Nodejs";

// ① 몽고디비 클라이언트 생성
const client = new MongoClient(url, {useNewUrlParser : true});

async function main(){
    try{
        // ② 커넥션을 생성하고 연결 시도
        await client.connect();
        console.log("몽고디비 연결 성공");
        // ③ test DB의 person 컬렉션 가져오기
        const collection = client.db('test').collection('person');
        // ④ 문서 하나 추가
        await collection.insertOne({name : '홍길동', age : 20});
        console.log("문서 추가 완료");
        // ⑤ 문서 찾기
        const documents = await collection.find({name : '홍길동'}).toArray();
        console.log("찾은 문서 : ", documents);
        // ⑥ 문서 갱신
        await collection.updateOne({name : '홍길동'}, {$set : {age : 21}});
        console.log("문서 갱신 완료");
        // ⑦ 갱신된 문서 확인
        const updatedDocuments = await collection.find({ name: '홍길동'}).toArray();
        console.log("갱신된 문서 : ", updatedDocuments);

        // ⑧ 연결 끊기
        await client.close();
    } catch(err){
        console.error("몽고디비 오류 : ", err);
    }
}

main();
