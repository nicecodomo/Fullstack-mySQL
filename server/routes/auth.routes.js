// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../Middleware/authMiddleware');

// เส้นทางสำหรับการล็อกอิน app.use('/api', authRoutes);
router.post('/login', authController.login);
router.get('/register', authController.register);
router.post('/logout', authController.logout);

// เส้นทางที่ต้องการการตรวจสอบสิทธิ์
router.get('/validate-token', verifyToken, (req, res) => {
    res.json({ message: 'คุณได้รับสิทธิ์เข้าถึงข้อมูลนี้', user: req.user, isAuthenticated: true });
});

module.exports = router;
