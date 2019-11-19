const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  project_name: { type: String },
  desc: { type: String },
  img_url: { type: String },
  project_url: { type: String }

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } })

module.exports = mongoose.model('Project', schema)