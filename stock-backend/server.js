const { response } = require("express");
const { request } = require("http");
const { application } = require("express");
const express = require("express");
// 利用 express 這個框架建立一個 web app
const app = express();

require("dotenv").config();
const mysql2 = require("mysql2/promise");

let pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_DATABASE,
  // 限制 pool 連線數的上限
  connectionLimit: 10,
});

// 如果要讓 express 認得 json 資料
// request Content-Type: application/json
// 需要加上這個中間件
app.use(express.json());

// 允許跨源存取
// 預設是全部都開放，也可以設定做部分限制，參考 npm cors 的官方文件
const cors = require("cors");
app.use(cors());

// middleware => pipeline pattern

// 設定 express 處理靜態檔案 -> express 內建 -> 不需要安裝任何東西
// (第一種)localhost:3001/
// app.use(express, static("./static"));
// (第二種[比較合理])localhost:3001/2048
app.use("/2048", express.static("./static"));

//寫中間件:
//執行任何程式碼
//改變request或response物件
//結束 request-response cycle
//呼叫下一個 middleware next()
app.use((request, response, next) => {
  console.log("這裡是No.1 第一個中間件");
  request.mfee31 = "職訓班";
  next();
});
app.use((request, response, next) => {
  console.log("這裡是No.2 第二個中間件");
  request.dt = new Date().toISOString();
  next();
});

//app.[Method]
//get, post, put, patch, delete, option, head
//路由中間件
app.get("/", (request, response) => {
  console.log("首頁", request.mfee31, request.dt);
  response.send("Hello Express");
});

app.get("/api", (request, response, text) => {
  response.json({
    name: "Joe",
    age: 18,
  });
});

app.get("/api/stocks", async (request, response, next) => {
  // let results = await connection.query('SELECT * FROM stocks');
  // let data = results[0];

  let [data] = await pool.query("SELECT * FROM stocks");
  response.json(data);
});

app.get("/api/stocks/:stockId", async (request, response, next) => {
  // console.log("/api/stocks/:stockId => ", request.params.stockId);
  let [data] = await pool.query("SELECT * FROM stock_prices WHERE stock_id=?", [
    request.params.stockId,
  ]);
  response.json(data);
});

app.post("/api/stocks", (request, response) => {
  console.log("POST /api/stocks", request.body);
  // request.body.stockId, request.body.stockName
  // TODO: 完成 insert
  // let results = await pool.query("");
  // console.log(results);
  response.json({});
});

app.use((request, response, next) => {
  console.log("這裡是No.3 第三個中間件");
  next();
});

app.get("/test", (request, response, next) => {
  console.log("這裡是 test 頁面");
  response.send("Hello Test");
});

//錯誤處理頁
//放在所有的路由中間件的後面
//前面所有的路由都比不到的網址時，就會到這裡來
//-->這就是一個404的情況
//利用中間件會依照程式碼順序的特性
app.use((request, response, next) => {
  console.log("這裡是404");
  response.send("沒有此網頁");
});

app.listen(3001, () => {
  console.log("Server running by port 3001");
});

//自我複習 理解:

//若在「首頁」，前端會印出app.get的"Hello Express"，後端會印出這裡是No.1 第一個中間件 / 這裡是No.2 第二個中間件 / 首頁 職訓班 2022-12-17T08:27:30.639Z，然後停住(因為有response)

//若是到「test頁」，前端則是會印出app.get的"Hello Test"，後端會印出這裡是No.1 第一個中間件 / 這裡是No.2 第二個中間件 / 這裡是No.3 第三個中間件 /首頁 職訓班 2022-12-17T08:27:30.639Z，然後停住(因為有response)

//若是到「其他不存在的頁面」，前端會印出app.use的"沒有此網頁"，後端會印出這裡是No.1 第一個中間件 / 這裡是No.2 第二個中間件 / 這裡是No.3 第三個中間件 / 這裡是404，然後停住(因為有response)
