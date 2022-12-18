const db = require('../../config/mongoose')
const URL = require('../URL')

// 隨便找三個網址
const URLs = [
  {},
  {},
  {}
]

db.on("error", () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  URL.create(URLs)
    .then(() => {
      console.log("done.")
      db.close()
    })
    .catch(err => console.log(err))
})