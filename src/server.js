const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()

app.set('port', process.env.PORT || 5000)

//Middlewares
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(require('./routes/api.blog.routes'))
app.use(require('./routes/api.posts.routes'))
app.use(require('./routes/api.uploads.routes'))
app.use(require('./routes/api.admin.routes'))
app.use(require('./routes/index.routes'))

module.exports = app
