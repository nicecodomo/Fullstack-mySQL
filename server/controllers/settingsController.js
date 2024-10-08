const conn = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET

// Controller function to update user settings
const updateSettings = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        // req.user มาจาก middleware verifyToken
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new passwords are required' });
        }

        // Get user data from the database
        const [rows] = await conn.query('SELECT password FROM users WHERE id = ?', [userId]);
        const user = rows[0];

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare current password with the stored password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password and update it in the database
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await conn.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);

        res.status(200).json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    updateSettings,
};
