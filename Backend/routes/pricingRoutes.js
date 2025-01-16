const express = require('express');
const router = express.Router();
const pricingController = require('../controllers/pricingController');

// Routes
router.get('/', pricingController.getPricingPlans);
router.post('/', pricingController.createPricingPlan);
router.put('/:id', pricingController.updatePricingPlan);
router.delete('/:id', pricingController.deletePricingPlan);
router.patch('/toggle/:id', pricingController.toggleVisibility);

module.exports = router;
