const DB = [];

//회원 가입 API 함수
function register(user){                            // 콜백이 3중으로 중첩된 함수
    return saveDB(user, function(user){             // 콜백
        return sendEmail(user, function(user){      // 콜백
            return getResult(user)                  // 콜백
        })
    })
}

// DB에 저장 후 콜백 실행
function saveDB(user, callback){
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return callback(user);
}

// 이메일 발송 로그만 남기는 코드 실행 후 콜백 실행
function sendEmail(user, callback){
    console.log(`email to ${user.email}`);  
    return callback(user);
}

// 결과 반환
function getResult(user){
    return `success register ${user.name}`;
}

const result = register({
    email: 'test@test.com',
    password: '1234567890',
    name: 'test'
});

console.log(result);


