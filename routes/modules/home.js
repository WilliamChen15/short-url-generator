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
  URL.find({ originalURL })
    .lean()
    .then((data) => {
      // data ? data : generateShortURL()
      if (data.length !== 0) {
        console.log('已經有囉!')
        const shortURL = data[0].shortURL
        return res.render('show', { shortURL })
      } else {
        console.log('沒有唷!')
        function check() {
          const shortURL = generateShortURL()
          console.log('1')
          return URL.find({ shortURL })
            .lean()
            .then(function (data) {
              console.log('2')
              // 沒有重複的已存短網址
              if (data.length === 0) {
                console.log('來造資料囉!')
                URL.create({ originalURL, shortURL })
                  .then(() => {
                    console.log('3')
                    return res.render('show', { shortURL })
                  })
              } else {
                // 有重複的，重造
                console.log('4')
                return check()
              }
            })
        }
        check()
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