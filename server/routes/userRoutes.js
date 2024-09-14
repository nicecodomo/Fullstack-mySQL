const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// เส้นทางสำหรับการล็อกอิน app.use('/api', authRoutes);
router.get('/', userController.user);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.put('/user', userController.updateUserProfile);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;
