const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  path: { type: String }
}, { timestamps: { updatedAt: 'updated' } })

module.exports = mongoose.model('Menu', schema)