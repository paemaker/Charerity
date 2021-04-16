import UserRouter from './Routers/UserRouter.js';
import chalk from 'chalk';
import express from 'express';
import mongoose from 'mongoose';

const Data = {
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
}

const app = express();
const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/scharerity', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.get('/api/items', (req, res) => {
    res.send(Data.data);
})

app.get('/', (req, res,) => {
    res.send('Server is ready');
});

app.get('/api/items/:id', (req, res) => {
    const item = Data.data.find(Itemid => Itemid._id === req.params.id);

    if(item) {
        res.send(item);
    } else {
        res.status(400).send({ message: 'No item available!' });
    }
});

app.use('/api/users', UserRouter);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

app.listen(port, () => {
    console.log(chalk.white.bgGreen(`Server is running on http://localhost:${port}`));
}); 