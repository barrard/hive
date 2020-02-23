const mongoose = require('mongoose')

const worker_schema = mongoose.Schema({

  firstname: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  street_address: {
    type: String,
    default: '',
    require: true
  },
  city: {
    type: String,
    default: '',
    require: true
  },
  state: {
    type: String,
    default: '',
    require: true
  },
  zip: {
    type: String,
    default: '',
    require: true
  },
  phone: {
    type: String,
    // default: '',
    require: true
  },
  email: {
    type: String,
    // default: '',
    require: true
  },
  services: {
    type: [String],
    // default: '',
    require: true
  },

}, {
  timestamps: true
})
// logger.log({worker_schema})


module.exports = mongoose.model('Worker', worker_schema)