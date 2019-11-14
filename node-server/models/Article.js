const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  avatar: String,
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  image: String,
  intro: String,
  resource: String,
  body: String,

  views_number: Number,
  likes: Number,
  comments: Number
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

module.exports = mongoose.model('Article', schema)