const express = require('express')
const router = express.Router()
const generateShortURL = require('../../random-generator')

const URL = require('../../models/URL')

let shortURL = ""
let inDB = 0

router.get('/', (req, res) => {
  shortURL = "" //重置
  res.render('index')
})

router.post('/show', (req, res) => {
  const originalURL = req.body.originalURL
  // 在DB中找是否已經產生過對應短網址
  URL.find({ originalURL })
    .lean()
    .then(function (url) {
      if (url.length !== 0) {
        inDB = 1
        shortURL = url[0].shortURL
        return res.redirect('/show')
      }
      inDB = 0
      return shortURL = generateShortURL()
    })
    .then(function check() {
      // 如果DB沒有才執行
      if (inDB === 0) {
        URL.find({ shortURL })
          .lean()
          .then(function (url) {
            // 沒有重複的已存短網址
            if (url.length === 0) { } else {
              // 有重複的，重造
              shortURL = generateShortURL()
              return check()
            }
          })
      }
      return
    })
    .then(() => {
      // 如果DB沒有才執行
      if (inDB === 0) {
        URL.create({ originalURL, shortURL })
          .then(() => {
            console.log('done.')
            return res.redirect('/show')
          })
      }
      return
    })
})

router.get('/show', (req, res) => {
  res.render('show', { shortURL })
})

// 跳轉路由
router.get('/:shortURL', (req, res) => {
  // 以短網址在DB中找原網址
  const shortURL = req.params.shortURL
  URL.find({ shortURL })
    .lean()
    .then(function (url) {
      //若無
      if (url.length === 0) {
        return error
      }
      const originalURL = url[0].originalURL
      return res.redirect(originalURL)
    })
})

module.exports = router