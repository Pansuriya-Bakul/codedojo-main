import path from 'path'
import express from 'express'
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

function checkFileType(file, cb) {
    const filetypes = /mp4|mkv/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('File type not allowed!');
    }
};

const upload = multer({
    storage
});

router.post('/', upload.single('video'), (req, res) => {
    res.send(
        {
            message: 'upload successful',
            video: `/${req.file.path}`
        }
    );
 });

export default router;