import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Item from '../Models/ItemModel.js';
import { isAuth, isAdmin } from '../Utils.js';

const Data = {
    data: [
        {
            "title": "Nike Shoes",
            "image":"../Images/Nike.jpg",
            "description": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
            "category":["red","black","crimson","teal"],
            "quantity": 1,
            "writer": 'David Moyes'
        },
        {
            "title": "New Balance Shoes",
            "image": "../Images/Adidas.jpg",
            "description": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
            "category":["red","black","crimson","teal"],
            "quantity": 1,
            "writer": 'David Moyes'
        },
        {
            "title": "Adidas Shoes",
            "image": "../Images/New Balance.jpg",
            "description": "Just a test",
            "category": ["red", "yellow"],
            "quantity": 2,
            "writer": 'David Moyes'
        }
    ] 
};

const ItemRouter = express.Router();

ItemRouter.get('/', expressAsyncHandler(async (req, res) => {
    const items = await Item.find({});
    res.send(items);
}));

ItemRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Item.deleteMany({});
    const createdItems = await Item.insertMany(Data.data);
    res.send({ createdItems });
}));

ItemRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if(item) {
        res.send(item);
    } else {
        res.status(404).send({ message: 'ไม่พบสิ่งที่ต้องการ' });
    }
}));

ItemRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const item = new Item({
        title: 'แก้ไข' + Date.now(0),
        image: 'แก้ไข',
        description: 'แก้ไข',
        category: 'แก้ไข',
        writer: 'แก้ไข',
        quantity: '1',
    });

    const createdItem = await item.save();
    res.send({ message: 'เพิ่มหนังสือแล้วเสร็จ', item: createdItem });
}));

ItemRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);

    if(item) {
        item.title = req.body.title;
        item.description = req.body.description;
        item.image = req.body.image;
        item.category = req.body.category;
        item.writer = req.body.writer;
        item.quantity = req.body.quantity;
        const updatedItem = await item.save();
        res.send({ message: 'แก้ไขข้อมูลเสร็จสิ้น', item: updatedItem });
    } else {
        res.status(404).send({ message: 'ไม่พบข้อมูล' });
    }
}));

ItemRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
        const deleteItem = await item.remove();
        res.send({ message: 'ลบหนังสือเรียบร้อย', item: deleteItem });
    } else {
        res.status(404).send({ message: 'ไม่พบข้อมูล' });
    }
    })
);

export default ItemRouter;