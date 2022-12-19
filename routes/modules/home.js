const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/show', (req, res) => {
  const originalURL = req.body.originalURL
  res.redirect('/show')
})

router.get('/show', (req, res) => {

  URL.find()
    .lean()
    // .then(URLinDB => )
    .then(res.render('show'))
    .catch(error => console.error(error))
})

module.exports = router