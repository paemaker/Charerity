import express from 'express';
import multer from 'multer';
import { isAuth } from '../Utils.js';

const UploadRouter = express.Router();

const Storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'Uploads/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const Upload = multer({ storage: Storage });

UploadRouter.post('/', isAuth, Upload.single('image'), (req, res, next) => {
    res.send(`/${req.file.path}`);
});

export default UploadRouter;