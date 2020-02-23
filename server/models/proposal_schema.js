const mongoose = require('mongoose')

const proposal_schema = mongoose.Schema({

  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    required:true
  },
  street_address: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  zip: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    // default: '',
  },
  email: {
    type: String,
    // default: '',
  },
  price: {
    type: String,
  },
  type: {
    type: String,
    default: '',
  },
  panel_model: {
    type: String,
    default: '',
  },
  panel_count: {
    type: String,
    default: '',
  },
  battery: {
    type: String,
    default: '',
  },
  total_kw: {
    type: String,
    default: '',
  },
  inverter_model: {
    type: String,
    default: '',
  },
  inverter_count: {
    type: String,
    default: '',
  },

}, {
  timestamps: true
})


module.exports = mongoose.model('Proposal', proposal_schema)