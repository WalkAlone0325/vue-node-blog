const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  avatar: String,
  tags: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  image: String,
  intro: String,
  resource: Number, // 0 => 存为草稿  1=> 已发表
  body: String,

  views_number: Number,
  likes: Number,
  comments: Number
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

module.exports = mongoose.model('Article', schema)