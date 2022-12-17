// .bin -> 命令列
// 下載 npm install (套件名稱)
// ./node_modules/.bin/cowsay(或其他的)

//------------------------------------

// 為什麼要使用 Prepared Statement?
// Prepared Statement是目前公認防禦SQL Injection攻擊最有效的方法。當然除了安全方面，它在效能上也佔有優勢

// 什麼是 SQL Injection?
// SQL Injection 是發生於應用程式與資料庫層的安全漏洞。簡而言之，是在輸入的字串之中夾帶SQL指令，在設計不良的程式當中忽略了字元檢查，那麼這些夾帶進去的惡意指令就會被資料庫伺服器誤認為是正常的SQL指令而執行，因此遭到破壞或是入侵。

// SQL Injection 示範
// 某個網站的登入驗證的SQL查詢代碼為 
// $strSQL = "SELECT * FROM users WHERE (name = '" . $userName . "') and (pw = '" . $passWord ."');"
// 被惡意填入
// $userName = "1' OR '1'='1";
// 和
// $passWord = "1' OR '1'='1";

// SQL Injection 示範2
// SQL 查詢會變成：
// strSQL = "SELECT * FROM users WHERE (name = '1' OR '1'='1') and (pw = '1' OR '1'='1');"
// 等同於：
// strSQL = "SELECT * FROM users;"
// 這樣就可以不用帳號密碼也能登入網站

// SQL Injection 示範2
// 又如果原本的 SQL 是這樣
// "SELECT * FROM users WHERE username=''
// 比較惡意的話像這樣輸入
// '; DROP TABLE 'users
// SQL 會變成
// "SELECT * FROM users WHERE username=''; DROP TABLE 'users'";
// 這樣就會把 users 的 TABLE 刪掉了

//------------------------------------

// cookie -> 存在瀏覽器
// session -> 存在server

