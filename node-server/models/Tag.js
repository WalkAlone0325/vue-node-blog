const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  tag: { type: String },
  desc: { type: String }

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

module.exports = mongoose.model('Tag', schema)