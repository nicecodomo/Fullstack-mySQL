const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// ตั้งค่า middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
require('dotenv').config();

const port = process.env.PORT

// ใช้เส้นทาง
app.use('/auth', authRoutes);
app.use('/api', userRoutes);
app.use('/settings', settingsRoutes);
// app.use('/api', authRoutes);
// app.use('/api/user', userRoutes);

app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);
})