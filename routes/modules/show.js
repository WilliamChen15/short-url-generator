const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')

// router.get('/', (req, res) => {
//   const originalURL = req.body.originalURL
//   URL.find()
//     .lean()
//     .then(URLinDB => )
//     .catch(error => console.error(error))
// })

module.exports = router