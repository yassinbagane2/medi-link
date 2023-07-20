const mongoose = require('mongoose')
const URI = process.env.MONGODB_URI

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error in DB connection: ', error)
  })
