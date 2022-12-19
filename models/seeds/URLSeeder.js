const db = require('../../config/mongoose')
const URL = require('../URL')

// 隨便找三個網址
const URLs = [
  {
    originalURL: "https://www.google.com",
    shortURL: "6y7UP"
  },
  {
    originalURL: "https://www.facebook.com",
    shortURL: "jcmB3"
  },
  {
    originalURL: "https://www.instagram.com",
    shortURL: "Ecp3Y"
  }
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