//  프로미스가 깔끔한 코드를 유지할 수 있지만,
// 잘못 사용될 수 있는 여지가 남아있다.

//첫 번째 예
// 성공 시와 실패 시 처리할 함수를 둘 다 넘기는 경우
// 좋은 방법은 catch 함수로 예외처리를 하는 것

function myWork(work){
    return new Promise((resolve, reject) => {
        if (work === 'done'){
            resolve('게임 가능');
        }
        else{
            reject(new Error("게임 불가능"));
        }
    })
}

// 성공 시와 실패 시 처리할 함수를 둘 다 넘기는 경우 = 콜백과 다를 바 없음

//myWork('done').then(function(value){
//    console.log(value);
//}, function(error){
//    console.error(err);
//});


myWork('doing')
    .then(function(value){console.log(value)})
    .catch(function(err){console.error(err)});



