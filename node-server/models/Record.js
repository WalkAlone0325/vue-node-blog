const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String },
  url: { type: String }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

module.exports = mongoose.model('Record', schema)