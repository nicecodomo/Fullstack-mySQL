// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const conn = require('../config/db');


// การเข้าสู่ระบบ
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ค้นหาผู้ใช้ในฐานข้อมูล
        const [rows] = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user) {
            return res.json({ message: 'อีเมลไม่ถูกต้อง' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        // สร้าง JSON Web Token
        const token = jwt.sign({ id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        // ส่งคุกกี้พร้อมกับ Token
        res.cookie('token', token, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        })

        // ส่งการตอบกลับว่าเข้าสู่ระบบสำเร็จ
        res.json({ isAuthenticated: true, token: token, name: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'ข้อผิดพลาดของเซิร์ฟเวอร์' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        const userData = {
            email,
            password: passwordHash,
            name
        }
        const [results] = await conn.query('INSERT INTO users SET ? ', userData)
        res.json({
            message: 'insert ok',
            results
        })
    } catch (error) {
        console.log('error', error)
        res.json({
            message: 'insert error',
            error
        })
    }
}

exports.logout = (req, res) => {
    // ล้างคุกกี้ที่เก็บ JWT
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });

    return res.json({ message: 'Logout successful' });
};