require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT
const bookingRoute = require('./routes/booking.routes')

app.use(bodyParser.json())
app.use(bookingRoute)

app.get('/', (req, res) => {
    res.status(200).json({
        message:"Hello World"
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

