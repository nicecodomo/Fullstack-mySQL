const conn = require('../config/db');
const fs = require('fs');
const path = require('path');

const checkAndUpdateImage = async (employee) => {
    if (employee.image) {
        const filePath = path.join(__dirname, '..', 'uploads', employee.image);

        // ตรวจสอบว่าไฟล์รูปยังอยู่ในโฟลเดอร์หรือไม่
        if (!fs.existsSync(filePath)) {
            // ถ้าไฟล์รูปไม่อยู่ ให้ตั้งค่า image เป็น NULL ในฐานข้อมูล
            await conn.query('UPDATE employees SET image = NULL WHERE emp_id = ?', [employee.emp_id]);
            employee.image = null; // อัปเดตใน object เพื่อส่งกลับ
        }
    }
};

const deleteOldImageIfExists = async (image, id) => {
    if (image) {
        const filePath = path.join(__dirname, '..', 'uploads', image);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // ลบไฟล์รูปเก่า
        } else {
            // อัปเดตฐานข้อมูลถ้าไฟล์เก่าไม่อยู่
            await conn.query('UPDATE employees SET image = NULL WHERE emp_id = ?', [id]);
        }
    }
};

// ดึงข้อมูล emp ทั้งหมด path: get'/emp'
exports.getEmployees = async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM employees');

        if (rows.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        // วนลูปพนักงานแต่ละคนและตรวจสอบไฟล์รูป
        await Promise.all(rows.map(checkAndUpdateImage));

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// ดึงข้อมูล emp ด้วย id path: get'/emp/:id'
exports.getEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await conn.query('SELECT * FROM employees WHERE emp_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const employee = rows[0];

        // ตรวจสอบไฟล์รูปของพนักงาน
        await checkAndUpdateImage(employee);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching employee' });
    }
};


// เพิ่ม emp ใหม่ path: post'/emp'
exports.createEmployee = async (req, res) => {
    const { name, dob, phone } = req.body;
    let imagePath = null;

    // ตรวจสอบว่ามีการอัปโหลดรูปภาพหรือไม่
    if (req.file) {
        imagePath = req.file.filename;
    }

    try {
        const [result] = await conn.query(
            'INSERT INTO employees (name, dob, phone, image) VALUES (?, ?, ?, ?)',
            [name, dob, phone, imagePath]);
        res.status(201).json({ id: result.insertId, name, dob, phone, image: imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating employee' });
    }
};

// แก้ไขข้อมูล emp path: put'/emp/:id'
exports.updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, dob, phone } = req.body;
    let imagePath = req.file ? req.file.filename : null;

    try {
        const [rows] = await conn.query('SELECT image FROM employees WHERE emp_id = ?', [id]);
        const currentImage = rows[0].image;

        // ลบรูปเก่าออกถ้ามีการอัปโหลดใหม่หรือไฟล์รูปภาพเก่าไม่อยู่แล้ว
        if (imagePath || !fs.existsSync(path.join(__dirname, '..', 'uploads', currentImage))) {
            await deleteOldImageIfExists(currentImage, id);
        }

        const query = imagePath
            ? 'UPDATE employees SET name = ?, dob = ?, phone = ?, image = ? WHERE emp_id = ?'
            : 'UPDATE employees SET name = ?, dob = ?, phone = ? WHERE emp_id = ?';
        const params = imagePath ? [name, dob, phone, imagePath, id] : [name, dob, phone, id];

        await conn.query(query, params);

        res.json({ message: 'Employee updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating employee' });
    }
};

// ลบ emp path: delete'/emp/:id'
exports.deleteEmployee = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await conn.query('SELECT image FROM employees WHERE emp_id = ?', [id]);
        await deleteOldImageIfExists(rows[0].image, id);

        await conn.query('DELETE FROM employees WHERE emp_id = ?', [id]);
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting employee' });
    }
};
