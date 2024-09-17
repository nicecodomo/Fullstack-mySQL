const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const verifyToken = require('../Middleware/authMiddleware');

router.put('/', verifyToken, settingsController.updateSettings);

module.exports = router;
