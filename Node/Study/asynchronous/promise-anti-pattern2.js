function myWork(work) {
  return new Promise((resolve, reject) => {
    resolve(work.toUpperCase());
  });
}

function playGame(work) {
  return new Promise((resolve, reject) => {
    if (work === "DONE") {
      resolve("게임 가능");
    } else {
      reject(new Error("DON'T"));
    }
  });
}

// Promise를 중첩해서 사용
myWork("done")
    .then(function(result){
        playGame(result).then(function(val){
            console.log(val);
        })
    });

myWork('done')
    .then(playGame)
    .then(console.log)


