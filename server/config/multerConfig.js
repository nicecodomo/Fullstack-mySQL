const multer = require('multer');
const path = require('path');

// กำหนดตำแหน่งในการเก็บไฟล์รูปภาพ
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // โฟลเดอร์สำหรับเก็บไฟล์
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName); // ตั้งชื่อไฟล์เป็น timestamp
    }
});

// ตรวจสอบไฟล์ที่อัปโหลดเป็นรูปภาพหรือไม่
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
};

const upload = multer({
    storage,
    limits : { fileSize: 1024 * 1024 * 5 }, // กำหนดขนาดไฟล์ไม่เกิน 5MB
    fileFilter
});

// Middleware สำหรับการจัดการข้อผิดพลาด Multer
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    } else if (err) {
        return res.status(500).json({ message: 'An unknown error occurred' });
    }
    next();
};

module.exports = { upload, multerErrorHandler };
