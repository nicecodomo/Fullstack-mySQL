const conn = require('../config/db');
const fs = require('fs');
const path = require('path');

// ดึงข้อมูล user หลังจาก authen เสร็จ path: get'/'
exports.user = async (req, res) => {
    try {
        // req.user มาจาก middleware verifyToken
        const userId = req.user.id;
        const [rows] = await conn.query('SELECT name, email, image FROM users WHERE id = ?', [userId])

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        let imageUrl = null;

        if (rows[0].image) {
            const imageFilePath = path.join(__dirname, '../uploads', rows[0].image);
            if (fs.existsSync(imageFilePath)) {
                imageUrl = `${req.protocol}://${req.get('host')}/uploads/${rows[0].image}`;
            }
        }

        res.json({
            // user: rows[0]
            user: {
                name: rows[0].name,
                email: rows[0].email,
                image: imageUrl // ส่ง URL รูปภาพที่สามารถเข้าถึงได้
            }
        })
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({
            message: 'Failed to authenticate token',
        })
    }
}

// แก้ไขข้อมูลผู้ใช้ path: put'/user'
exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
        // req.user มาจาก middleware verifyToken
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // ตรวจสอบว่า email นี้มีอยู่ในระบบหรือไม่ ยกเว้นผู้ใช้ปัจจุบัน
        const [existingEmail] = await conn.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
        if (existingEmail.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // ดึงข้อมูลผู้ใช้เพื่อเช็คว่ามีรูปภาพเดิมหรือไม่
        const [existingUser] = await conn.query('SELECT image FROM users WHERE id = ?', [userId]);
        if (existingUser.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ใช้รูปภาพใหม่ถ้ามีการอัปโหลด, ถ้าไม่มีให้ใช้รูปเดิม
        let imagePath = req.file ? req.file.filename : existingUser[0].image;
        if (imagePath) {
            // ตรวจสอบว่า imagePath มีค่าหรือไม่ก่อนจะใช้กับ path.join
            const imageFilePath = path.join(__dirname, '../uploads', imagePath);
            if (!fs.existsSync(imageFilePath)) {
                // ถ้าไม่มีไฟล์ในโฟลเดอร์ 'uploads' ให้ตั้งค่า image เป็น null
                imagePath = null;
            }
        }

        const [results] = await conn.query('UPDATE users SET name = ?, email = ?, image = ? WHERE id = ?',
            [name, email, imagePath, userId]
        );
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// // ดึงข้อมูลผู้ใช้ทั้งหมด path: get'/users'
// exports.getUsers = async (req, res) => {
//     try {
//         const [rows] = await conn.query('SELECT * FROM users');
//         res.json(rows);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users' });
//     }
// };

// // ดึงข้อมูลผู้ใช้ด้วย id path: get'/user/:id'
// exports.getUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [rows] = await conn.query('SELECT * FROM users WHERE emp_id = ?', [id]);
//         res.json(rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching users' });
//     }
// };

// // เพิ่มผู้ใช้ใหม่ path: post'/users'
// exports.createUser = async (req, res) => {
//     const { name, email } = req.body;
//     try {
//         const [result] = await conn.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
//         res.status(201).json({ id: result.insertId, name, email });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error creating users' });
//     }
// };

// // แก้ไขข้อมูลผู้ใช้ path: put'/users/:id'
// exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     try {
//         await conn.query('UPDATE users SET name = ?, email = ? WHERE emp_id = ?', [name, email, id]);
//         res.json({ message: 'User updated successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user' });
//     }
// };

// // ลบผู้ใช้ path: delete'/users/:id'
// exports.deleteUser = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await conn.query('DELETE FROM users WHERE emp_id = ?', [id]);
//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user' });
//     }
// };