const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const PORT = process.env.PORT || 8888

//Routes
const indexRoute = require('./routes/index')

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))

// Cache Headers
app.use((req, res, next) => {
  res.set('Cache-control', 'public, max-age=300')
  next()
})

// Compress all response
app.use(compression())

app.use('/', indexRoute)

app.listen(PORT, () => console.log(`Listening on http://[::]:${PORT}`))
