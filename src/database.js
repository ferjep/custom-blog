const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})

const db_conn = mongoose.connection

db_conn
  .then(e => console.log('Database is connected'))
  .catch(err => {
    console.log('Mongoose error', err)
    process.exit()
  })

module.exports = db_conn
