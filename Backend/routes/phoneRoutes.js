const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phoneController');

router.get('/phone', phoneController.getPhoneNumber);
router.post('/phone', phoneController.addPhoneNumber);
router.put('/phone', phoneController.updatePhoneNumber);
router.delete('/phone', phoneController.deletePhoneNumber);

module.exports = router;
