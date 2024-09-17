const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const settingsRoutes = require('./routes/settings.routes');
const employee = require('./routes/employee.routes');
const path = require('path');

// ตั้งค่า middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
require('dotenv').config();


// ใช้เส้นทาง
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/settings', settingsRoutes);
app.use('/api/emp', employee);

// สร้างโฟลเดอร์สำหรับเก็บรูป
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})