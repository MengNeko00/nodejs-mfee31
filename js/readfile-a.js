const fs = require("fs");
const { resolve } = require("path");

// Promise 是一個表示非同步運算的最終完成或失敗的物件。
let p = new Promise((resolve, reject) => {
  fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
      // 如果 err 有值，表示有錯誤發生
      // 這裡應該要處理錯誤
      reject(err);
    } else {
      //  進來這裡
      resolve(data);
      //  console.log("成功讀到資料:", data);
    }
  });
});

//  函式名稱() -> 呼叫
// doJob();

// IIEF
(async () => {
  try {
    let data = await p;
    console.log("用await拿到的結果", data);
  } catch (error) {
    console.log("catch到錯誤!", error);
  } finally {
    console.log("這是finally，結束!")  //finally一定會執行
  }
})();
// (function test() {})();
