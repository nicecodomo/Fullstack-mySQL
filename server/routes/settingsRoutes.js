const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');

router.put('/', settingsController.updateSettings);

module.exports = router;
