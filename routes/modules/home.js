const express = require('express')
const router = express.Router()
const generateShortURL = require('../../random-generator')


const URL = require('../../models/URL')

let shortURL = ""
let inDB = 0 // 解決非同步用的判斷變數

router.get('/', (_req, res) => {
  shortURL = "" //重置
  res.render('index')
})

router.post('/show', (req, res) => {
  const originalURL = req.body.originalURL
  // 在DB中找是否已經產生過對應短網址
  URL.find({ originalURL })
    .lean()
    .then(function (data) {
      if (data.length !== 0) {
        inDB = 1
        shortURL = data[0].shortURL
        return res.redirect('/show')
      }
      inDB = 0
      return shortURL = generateShortURL()
    })
    // 檢查產生的短網址是否重複
    .then(function check() {
      // 如果DB沒有才執行
      if (inDB === 0) {
        URL.find({ shortURL })
          .lean()
          .then(function (data) {
            // 沒有重複的已存短網址
            if (data.length === 0) { } else {
              // 有重複的，重造
              shortURL = generateShortURL()
              return check()
            }
          })
      }
      return
    })
    // 不重複後在DB中創建資料
    .then(() => {
      // 一樣，如果DB沒有才執行
      if (inDB === 0) {
        URL.create({ originalURL, shortURL })
          .then(() => {
            console.log('done.')
            return res.redirect('/show')
          })
      }
      return
    })
    .catch(error => console.log(error))
})

router.get('/show', (_req, res) => {
  res.render('show', { shortURL })
})

// 跳轉路由
router.get('/:shortURL', (req, res) => {
  // 以短網址在DB中找原網址
  const shortURL = req.params.shortURL
  // 這玩意兒怎麼冒出來的...? 首頁路徑後面藏著這玩意兒? 
  if (shortURL === 'favicon.ico') {
    return
  }
  URL.find({ shortURL })
    .lean()
    .then(function (data) {
      console.log("data:", data)
      //若無
      if (data.length === 0) { // 為啥可以這樣= =? // 先問助教，若沒問題，可在後面執行remove，減少DB中無用資料數量
        return console.log("the originalURL is not exist")
      }
      const originalURL = data[0].originalURL
      return res.redirect(originalURL)
    })
    .catch(error => console.log(error))
})


module.exports = router