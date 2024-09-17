const express = require('express');
const router = express.Router();
const { upload, multerErrorHandler } = require('../config/multerConfig');
const { user, updateUserProfile } = require('../controllers/userController');
const verifyToken = require('../Middleware/authMiddleware');

// เส้นทางสำหรับการล็อกอิน app.use('/api', authRoutes);
router.get('/', verifyToken, user);
router.put('/user', verifyToken, upload.single('image'), multerErrorHandler, updateUserProfile);

// router.get('/users', userController.getUsers);
// router.get('/user/:id', userController.getUser);
// router.post('/users', userController.createUser);
// router.put('/users/:id', userController.updateUser);
// router.delete('/users/:id', userController.deleteUser);
module.exports = router;