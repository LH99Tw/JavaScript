// 더 복잡한 프로미스 예제를 위해 axios 라이브러리 사용
const axios = require('axios');

const url = "https://raw.githubusercontent.com/wapj/jsbackend/main/movieinfo.json";

axios
    .get(url)                    //get 요청
    .then((result) => {          //결괏값처리
        if (result.status != 200){
            throw new Error('Failed to fetch data');
        }
        if (result.data){
            return result.data;
        }
        throw new Error('데이터가 없습니다.');
    })
    .then((data) => {
        if (!data.articleList || data.articleList.size == 0){
            throw new Error('영화 정보가 없습니다.');
        }
        return data.articleList;
    })
    .then((articles) => {
        return articles.map((article, idx) => {
            return{
                title: article.title,
                rank: idx + 1,
            };
        });
    })
    .then((results) => {
        for (let movieInfo of results){
            console.log(`${movieInfo.rank}위 : ${movieInfo.title}`);
        }
    })
    .catch((err) => {
        console.log("<<에러발생>>");
        console.error(err);
    });