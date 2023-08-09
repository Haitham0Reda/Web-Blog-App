const multer = require('multer');
const upload = multer({
    dest: './uploads',
    limits: {
        fieldSize: 1024 * 1024 * 20, // 10 MB (adjust the size as needed)
    }
});

module.exports = upload.single('file');