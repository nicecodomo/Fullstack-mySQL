const jwt = require('jsonwebtoken');
const conn = require('../config/db');

require('dotenv').config();
const secret = process.env.JWT_SECRET

// ดึงข้อมูล user หลังจาก authen เสร็จ
exports.user = async (req, res) => {
    const authToken = req.cookies.token

    if (!authToken) {
        return res.status(404).json({ message: 'Cookie not found' });
    }

    try {
        const decoded = jwt.verify(authToken, secret)
        const userId = decoded.id

        const [rows] = await conn.query('SELECT id, email, name FROM users WHERE id = ?', [userId])

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            user: rows[0]
        })
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({
            message: 'Failed to authenticate token',
        })
    }
}

// ดึงข้อมูลผู้ใช้ทั้งหมด
exports.getUsers = async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// ดึงข้อมูลผู้ใช้ด้วย id
exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// เพิ่มผู้ใช้ใหม่
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await conn.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

// แก้ไขข้อมูลผู้ใช้
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await conn.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { name, email } = req.body;
    const authToken = req.cookies.token

    if (!authToken) {
        return res.status(404).json({ message: 'Cookie not found' });
    }

    try {
        const decoded = jwt.verify(authToken, secret)
        const userId = decoded.id

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' });
        }

        // Update user in the database
        await conn.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name, email, userId]
        );

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// ลบผู้ใช้
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};