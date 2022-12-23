const express = require('express')
const router = express.Router()
const generateShortURL = require('../../random-generator')

const URL = require('../../models/URL')

router.get('/', (_req, res) => {
  res.render('index')
})

router.post('/show', (req, res) => {
  const originalURL = req.body.originalURL
  // const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  // // ^:開頭 ; ?:前方字符最多只能出現一次 ; \:標記後面為特殊字符 ; \d: 0-9 ; +:前方字符1~多次 ; *:前方字符0~多次 ; \w: A-Z a-z 0-9 _  ;  \S: 除空格以外的單個字符。 ; -
  // const URLvalid = regex.test(originalURL)
  // console.log('URLvalid:', URLvalid)
  // if (!URLvalid) {
  //   return res.render('index', { wrongURL: !URLvalid, value: originalURL })
  // }
  // 在DB中找是否已經產生過對應短網址
  URL.find({ originalURL })
    .lean()
    .then((data) => {
      if (!data.length) {
        createData(originalURL, res)
      } else {
        const shortURL = data[0].shortURL
        return res.render('show', { shortURL })
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
      if (!data.length) {
        return console.log("the originalURL is not exist")
      }
      const originalURL = data[0].originalURL
      return res.redirect(originalURL) //  *跳回路由 /123，重新進DB找，因此回傳空陣列
    })
    .catch(error => console.log(error))
})

function createData(originalURL, res) {
  const shortURL = generateShortURL()
  return URL.find({ shortURL })
    .lean()
    .then((data) => {
      // 沒有重複的已存短網址
      if (!data.length) {
        URL.create({ originalURL, shortURL })
          .then(() => {
            return res.render('show', { shortURL })
          })
      } else {
        // 有重複的，重造
        return createData(originalURL, res)
      }
    })
}

module.exports = router