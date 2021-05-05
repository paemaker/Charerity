import { isAdmin, isAuth, isGiverOrAdmin } from '../Utils.js';

import Item from '../Models/ItemModel.js';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const ItemRouter = express.Router();

ItemRouter.get('/', expressAsyncHandler(async (req, res) => {
    const title = req.query.title || '';
    const giver = req.query.giver || '';
    const category = req.query.category || '';
    const titleFilter = title ? { title: { $regex: title, $options: 'i' } } : {};
    const giverFilter = giver ? { giver } : {};
    const categoryFilter = category ? { category } : {};
    const items = await Item.find({ ...giverFilter, ...titleFilter, ...categoryFilter }).populate('giver', 'giver.username giver.logo');
    res.send(items);
}));

ItemRouter.get('/categories', expressAsyncHandler(async (req, res) => {
    const categories = await Item.find().distinct('category');
    res.send(categories);
}));

ItemRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Item.deleteMany({});
    const createdItems = await Item.insertMany(Data.users);
    res.send({ createdItems });
}));

ItemRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id).populate('giver', 'giver.username giver.logo giver.rating giver.numReviews');

    if(item) {
        res.send(item);
    } else {
        res.status(404).send({ message: 'ไม่พบสิ่งที่ต้องการ' });
    }
}));

ItemRouter.post('/', isAuth, isGiverOrAdmin, expressAsyncHandler(async (req, res) => {
    const item = new Item({
        title: 'แก้ไข' + Date.now(0),
        giver: req.user._id,
        image: 'แก้ไข',
        description: 'แก้ไข',
        category: 'None',
        writer: 'แก้ไข',
        quantity: '1',
        rating: 0,
        numReviews: 0,
    });

    const createdItem = await item.save();
    res.send({ message: 'เพิ่มหนังสือแล้วเสร็จ', item: createdItem });
}));

ItemRouter.put('/:id', isAuth, isGiverOrAdmin, expressAsyncHandler(async (req, res) => {
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

ItemRouter.delete('/:id', isAuth, isGiverOrAdmin, expressAsyncHandler(async (req, res) => {
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