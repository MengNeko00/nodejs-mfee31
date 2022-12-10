const fs = require("fs");
const { resolve } = require("path");

// // error-first callback
// fs.readFile("test.txt", "utf-8", (err, data) => {
//   if (err) {
//     // 如果 err 有值，表示有錯誤發生
//     // 這裡應該要處理錯誤
//     console.error("發生錯誤了", err);
//   } else {
//     // 進來這裡，表示 err 是空的 (可能是 null)
//     console.log("成功讀到資料:", data);
//   }
// });


// Promise 是一個表示非同步運算的最終完成或失敗的物件。
// 所以要 new Promise(executor)
// executor: function(resolve, reject) {}
let p = new Promise((resolve, reject) => {
  fs.readFile("test.txt", "utf-8", (err, data) => {
    if (err) {
      reject(err);
    } else {
      //  進來這裡  
      resolve(data);
      //  console.log("成功讀到資料:", data);
    }
  });
});

//真正使用的人
p.then((data) => {
  console.log("成功讀到資料: ", data);
}).catch((err) => {
  console.error("發生問題了", err);
});
