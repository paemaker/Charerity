import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/UserModel.js';
import { generateToken, isAuth } from '../Utils.js';

const UserRouter = express.Router();

UserRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createUsers = await User.insertMany(Data.users);
    res.send({ createUsers });
}));

UserRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const userbyUsername = await User.findOne({ username: req.body.username });

    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                username: user.username,
                isAdmin: user.isAdmin,
                token: generateToken(user),
            });
            return;
        }
    }

    res.status(401).send({ message: 'อีเมลหรือรหัสผ่านผิด' });
}));

UserRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8),
    });
    const newUser = await user.save();
    res.send({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        username: newUser.username,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser),
    });
}));

UserRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        res.send(user);
    } else {
        res.status(404).send({ message: 'ไม่พบบัญชีผู้ใช้' });
    }
}));

UserRouter.put('/profile', isAuth, expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.fullname = req.body.fullname || user.fullname;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;

        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);
        }
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    };
}));

export default UserRouter;