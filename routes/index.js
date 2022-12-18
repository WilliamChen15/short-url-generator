const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const show = require('./modules/show')

router.use('/show', show)
router.use('/', home)

module.exports = router