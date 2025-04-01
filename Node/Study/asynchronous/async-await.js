// async 예제
async function myName() {
  return "Andy";
}

console.log(myName()); // Promise { "Andy" } 를 반환함

// async - await 예제
async function showName(){
  const name = await myName();
  console.log(name);
}

console.log(showName());
// 1. Promise {<pending>}
// 2. Andy 출력

function waitOneSecond(msg) {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(`${msg}`), 1000);
  });
}

async function countOneToTen() {
  // 10초 동안 1초마다 메시지 출력
  for (let x of [...Array(10).keys()]) {
    // 0 ~ 9 까지 루프
    let result = await waitOneSecond(`${x + 1}초 대기중 ...`);
    console.log(result);
  }
  console.log("완료");
}

countOneToTen();
