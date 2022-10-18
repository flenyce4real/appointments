const express = require('express')
const router = express.Router()
const { booking }  = require('../controllers/booking.controllers')


router.post('/book-appointments', booking)


module.exports = router