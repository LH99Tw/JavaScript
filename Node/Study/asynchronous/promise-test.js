// 약속은 이행, 불이행, 대기 3가지의 상태를 가질 수 있다.

const DB = [];

function saveDB(user){
    const oldDBSize = DB.length;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if(DB.length > oldDBSize){
            resolve(user);
        }else{
            reject(new Error('Save DB Error!'));
        }
    });
}

function sendEmail(user){
    console.log(`email to ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user){
    return new Promise((resolve, reject) => {
        resolve(`success register ${user.name}`);
    });
}

function registerByPromise(user){
    // 비동기 호출이지만 순서를 지킴
    const result = saveDB(user).then(sendEmail).then(getResult);
    // 아직 완료되지 않았으므로 지연(pending) 상태
    console.log(result);
    return result;
}

const myUser = {
    email: 'test@test.com',
    password: '1234567890',
    name: 'test'
}

const result = registerByPromise(myUser);
result.then(console.log);



