const axios = require("axios");

async function getTop20Movies(){
    const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";
    try {
        const result = await axios.get(url); // 비동기처리
        const {data} = result; // 결과값에는 data 프로퍼티가 있음
        //예외처리
        if (!data.articleList || data.articleList.size == 0) {
            throw new Error("데이터가 없습니다.");
        }
        // 제목과 순위 정보 뽑아내기
        const movieInfos = data.articleList.map((article, idx) => {
            return{ title : article.title, rank : idx + 1};
        });
        // 데이터 출력
        for (let movieInfo of movieInfos) {
            console.log(`${movieInfo.rank}위 : ${movieInfo.title}`);
        }
    } catch (err) {
        throw new Error(err);
    }
}

getTop20Movies();
// 기존 코드의 과도한 then 처리 대체
// 예외 처리는 try catch 블록으로 처리
// 비동기 처리는 await 키워드로 처리
