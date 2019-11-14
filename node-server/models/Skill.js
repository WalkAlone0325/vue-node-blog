const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  progress_bar: { type: Number }

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

module.exports = mongoose.model('Skill', schema)