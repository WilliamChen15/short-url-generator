const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')

router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router