const PricingPlan = require('../models/PricingPlan');

// Fetch all pricing plans
exports.getPricingPlans = async (req, res) => {
  try {
    const plans = await PricingPlan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new pricing plan
exports.createPricingPlan = async (req, res) => {
  try {
    const newPlan = new PricingPlan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an existing pricing plan
exports.updatePricingPlan = async (req, res) => {
  try {
    const updatedPlan = await PricingPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a pricing plan
exports.deletePricingPlan = async (req, res) => {
  try {
    await PricingPlan.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pricing plan deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hide or unhide a pricing plan
exports.toggleVisibility = async (req, res) => {
  try {
    const plan = await PricingPlan.findById(req.params.id);
    plan.isHidden = !plan.isHidden;
    await plan.save();
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
