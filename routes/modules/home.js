const express = require('express')
const router = express.Router()
const generateShortURL = require('../../random-generator')

const URL = require('../../models/URL')

router.get('/', (_req, res) => {
  res.render('index')
})

router.post('/show', (req, res) => {
  const originalURL = req.body.originalURL
  // 在DB中找是否已經產生過對應短網址
  let inDB = 0
  URL.find({ originalURL })
    .lean()
    .then(function (data) {
      if (data.length !== 0) {
        inDB = 1 // DB中有對應資料
        const shortURL = data[0].shortURL
        return res.render('show', { shortURL })
      }
    })
    .then(function check() {
      // 如果DB沒有才執行
      if (inDB === 0) {
        const shortURL = generateShortURL()
        URL.find({ shortURL })
          .lean()
          .then(function (data) {
            // 沒有重複的已存短網址
            if (data.length === 0) {
              URL.create({ originalURL, shortURL })
                .then(() => {
                  return res.render('show', { shortURL })
                })
            } else {
              // 有重複的，重造      
              return check()
            }
          })
          .catch(error => console.log(error))
      } else {
        return
      }
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
  if (shortURL === 'favicon.ico') {
    return
  }
  URL.find({ shortURL })
    .lean()
    .then(function (data) {
      //若無
      if (data.length === 0) {
        return console.log("the originalURL is not exist")
      }
      const originalURL = data[0].originalURL
      return res.redirect(originalURL) //  *跳回路由 /123，重新進DB找，因此回傳空陣列
    })
    .catch(error => console.log(error))
})


module.exports = router