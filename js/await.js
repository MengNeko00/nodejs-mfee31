// Promise 是一個表示非同步運算的最終完成或失敗的物件。
// 1. Promise 是一個物件 new Promise()
//    new Promise(executor)
//    executor: function(resolve, reject) {}
// 2. 執行非同步工作
// 3. 最終完成或失敗
//    完成 -> 呼叫 resolve
//    失敗 -> 呼叫 reject

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
//  return 就是 callstack 的 pop*****

//  await 暫停「async函式」，當resole或reject才會解除暫停
let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);
let brushPromise = doWorkPromise("刷牙", 3000);

async function doJob() {
  try {
    let result1 = await brushPromise;
    console.log("這是await後的結果1", result1);
    //這裡有一個return

    let result2 = await doWorkPromise("吃早餐", 5000);
    console.log("這是await後的結果2", result2);

    let result3 = await doWorkPromise("寫功課", 3000);
    console.log("這是await後的結果3", result3);
  } catch (error) {
    console.error("發生錯誤了", error);
  } finally {
    console.log("行程完成!")
  }
}

doJob();
console.log("after");

// await 一定要寫在 async 函式裡
// 用來「暫停」函式的，只暫停 async 函式範圍
// 被 await 的這個 promise 物件 resolve 或者 reject
// 沒有提供錯誤處理機制，只能用 js 內建的 try-catch
