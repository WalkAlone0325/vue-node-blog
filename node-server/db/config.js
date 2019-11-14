module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node_koa_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Mongodb Connected...')
  }).catch(err => {
    console.log(err)
  })
}