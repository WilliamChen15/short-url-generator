# 短網址產生器  

## 功能  

### 使用者可以輸入原網址，按下產生按鈕後，可以獲得一個 「  http://localhost:3000/*****  」的短網址。
### 注 : ***** 為五碼英數亂數。  

### 使用者可以直接點擊或者複製此網址，透過此短網址連線到原網址。

## 安裝

### 在終端機輸入以下指令複製此專案於本機
```
git clone https://github.com/WilliamChen15/short-url-generator.git
```
### 移動到專案資料夾
```
cd short-url-generator  
```
### 安裝必要套件  
```
npm install   
```
### 載入種子資料(google、facebook、instagram)    
```
npm run seed  
```
### 開啟專案  
```
npm run start  
```
若看見此訊息則代表順利運行，打開瀏覽器進入到以下網址:  
```
App is running on http://localhost:3000
```  
## 環境及安裝套件
Visual Studio Code - 開發環境  
Express - 4.16.4  
Express-handlebars - 3.0.0  
Bootstrap - 5.2.2  
Mongoose - 5.9.7  
Method-override - 3.0.0(沒用到)   
dotenv - 16.0.3  
