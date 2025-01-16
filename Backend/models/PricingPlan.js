const mongoose = require('mongoose');

const PricingPlanSchema = new mongoose.Schema({
  title: { type: String, required: true },
  facility: { type: String, required: true },
  features: { type: [String], required: true },
  pricing: { type: Number, required: true },
  validTime: { type: String, required: true },
  yearlySave: { type: Number },
  footerFacility: { type: String },
  isHidden: { type: Boolean, default: false }
});

module.exports = mongoose.model('PricingPlan', PricingPlanSchema);
