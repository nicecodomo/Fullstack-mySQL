const express = require('express');
const router = express.Router();
const { upload, multerErrorHandler } = require('../config/multerConfig');
const { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

// เส้นทางสำหรับการล็อกอิน app.use('/api', authRoutes);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.post('/', upload.single('image'), multerErrorHandler, createEmployee);
router.put('/:id', upload.single('image'), multerErrorHandler, updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;