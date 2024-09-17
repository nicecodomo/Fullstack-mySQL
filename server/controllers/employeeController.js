const conn = require('../config/db');
const fs = require('fs');
const path = require('path');

// ดึงข้อมูล emp ทั้งหมด path: get'/emp'
exports.getEmployees = async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM employees');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// ดึงข้อมูล emp ด้วย id path: get'/emp/:id'
exports.getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await conn.query('SELECT * FROM employees WHERE emp_id = ?', [id]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// เพิ่ม emp ใหม่ path: post'/emp'
exports.createEmployee = async (req, res) => {
    const { name, age, phone } = req.body;
    let imagePath = null;

    // ตรวจสอบว่ามีการอัปโหลดรูปภาพหรือไม่
    if (req.file) {
        imagePath = req.file.filename;
    }

    try {
        const [result] = await conn.query(
            'INSERT INTO employees (name, age, phone, image) VALUES (?, ?, ?, ?)',
            [name, age, phone, imagePath]);
        res.status(201).json({ id: result.insertId, name, age, phone, image: imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating employee' });
    }
};

// แก้ไขข้อมูล emp path: put'/emp/:id'
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, age, phone } = req.body;
    let imagePath = null;

    try {
        // ตรวจสอบว่ามีการอัปโหลดรูปภาพใหม่หรือไม่
        if (req.file) {
            imagePath = req.file.filename;

            // ดึงข้อมูล emp ปัจจุบันเพื่อลบรูปเก่าออก (ถ้ามี)
            const [rows] = await conn.query('SELECT image FROM employees WHERE emp_id = ?', [id]);
            const currentImage = rows[0].image;

            if (currentImage) {
                const filePath = path.join(__dirname, '..', 'uploads', currentImage);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // ลบไฟล์รูปเก่า
                }
            }

            await conn.query(
                'UPDATE employees SET name = ?, age = ?, phone = ?, image = ? WHERE emp_id = ?',
                [name, age, phone, imagePath, id]);
        } else {
            await conn.query(
                'UPDATE employees SET name = ?, age = ?, phone = ? WHERE emp_id = ?',
                [name, age, phone, id]);
        }

        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee' });
    }
};

// ลบ emp path: delete'/emp/:id'
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        // ลบรูปภาพที่เกี่ยวข้องกับพนักงาน (ถ้ามี)
        const [rows] = await conn.query('SELECT image FROM employees WHERE emp_id = ?', [id]);
        const currentImage = rows[0].image;

        if (currentImage) {
            const filePath = path.join(__dirname, '..', 'uploads', currentImage);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); // ลบไฟล์รูปเก่า
            }
        }

        await conn.query('DELETE FROM employees WHERE emp_id = ?', [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee' });
    }
};