// Promise 是一個表示非同步運算的最終完成或失敗的物件。
// 1. Promise 是一個物件 new Promise()
//    new Promise(executor)
//    executor: function(resolve, reject) {}
// 2. 執行非同步工作
// 3. 最終完成或失敗
//    完成 -> 呼叫 resolve
//    失敗 -> 呼叫 reject
let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
let doWorkPromise = function (job, timer) {
  // 1. 物件 -> new
  return new Promise((resolve, reject) => {
    // 2. 執行非同步工作
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
      reject("故意發生錯誤");
    }, timer);
  });
};

// 同時刷牙，花3秒
// 同時吃早餐，花5秒
// 同時寫功課，花3秒

let p1 = doWorkPromise("刷牙", 3000);
let p2 = doWorkPromise("刷牙", 5000);
let p3 = doWorkPromise("刷牙", 3000);

// Promise.all([p1, p2, p3]).then((data) => {
//   console.log(data);
// });

//Promise.all: 要全部都成功
//Promise.race 比賽
(async () => {
  let data = await Promise.all([p1, p2, p3]);
  console.log("await 版本", data);
})();
