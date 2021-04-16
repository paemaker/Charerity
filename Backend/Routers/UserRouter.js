import User from '../Models/UserModel.js';
import bcrypt from 'bcryptjs';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const Data = {
    users: [
        {
            name: 'Pae',
            username: 'pmk',
            email: 'admin@admin.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: true,
        },
        {
            name: 'Dave',
            username: 'dave',
            email: 'user@user.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: false,
        }
    ],
    data: [
        {
            "_id": "1",
            "title": "Nike Shoes",
            "src": [
                "https://react-shooping-cart.netlify.app/img/2.jpg?v=2",
                "https://react-shooping-cart.netlify.app/img/3.jpg?v=3",
                "https://react-shooping-cart.netlify.app/img/1.jpg?v=1",
                "https://react-shooping-cart.netlify.app/img/1.jpg?v=1"
                ],
            "description": "UI/UX designing, html css tutorials sfj;asdjkfsj;afljklasdfjlasfjlkasjdfkl;sjkfl;",
            "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
            "price": 23,
            "colors":["red","black","crimson","teal"],
            "count": 1,
            "owner": 'David Moyes'
        },
        {
            "_id": "2",
            "title": "New Balance Shoes",
            "src": [
                "https://react-shooping-cart.netlify.app/img/2.jpg?v=2",
                "https://react-shooping-cart.netlify.app/img/3.jpg?v=3",
                "https://react-shooping-cart.netlify.app/img/1.jpg?v=1",
                "https://react-shooping-cart.netlify.app/img/1.jpg?v=1"
                ],
            "description": "UI/UX designing, html css tutorials sfj;asdjkfsj;afljklasdfjlasfjlkasjdfkl;sjkfl;",
            "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
            "price": 23,
            "colors":["red","black","crimson","teal"],
            "count": 1,
            "owner": 'David Moyes'
        },
        {
            "_id": "3",
            "title": "Adidas Shoes",
            "src": [
                "https://react-shooping-cart.netlify.app/img/2.jpg?v=2",
                "https://react-shooping-cart.netlify.app/img/3.jpg?v=3",
                "https://react-shooping-cart.netlify.app/img/1.jpg?v=1",
                "https://react-shooping-cart.netlify.app/img/1.jpg?v=1"
            ],
            "description": "Nothing else matters",
            "content": "Just a test",
            "price": 25,
            "colors": ["red", "yellow"],
            "count": 2,
            "owner": 'David Moyes'
        }
    ] 
};

const UserRouter = express.Router();

UserRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createUsers = await User.insertMany(Data.users);
    res.send({ createUsers });
}));

export default UserRouter;