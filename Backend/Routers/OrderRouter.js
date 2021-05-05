import { isAdmin, isAuth, isGiverOrAdmin } from '../Utils.js';

import Order from '../Models/OrderModel.js';
import express from 'express';
import expressAsyncHandler from 'express-async-handler';

const OrderRouter = express.Router();

OrderRouter.get('/', isAuth, isGiverOrAdmin, expressAsyncHandler(async (req, res) => {
    const giver = req.query.giver || '';
    const giverFilter = giver ? { giver } : {};
    const orders = await Order.find({ ...giverFilter }).populate('user', 'fullname');
    res.send(orders);
}));

OrderRouter.get('/history', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
}));

OrderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    if(req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'ตะกร้าหนังสือว่างเปล่า '});
    } else {
        const order = new Order({
            giver: req.body.orderItems[0].giver,
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            user: req.user._id,
        });
        const createOrder = await order.save();
        res.status(201).send({ message: 'สร้างรายการใหม่แล้วเสร็จ', order: createOrder })
    }
}));

OrderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'ไม่พบรายการ' });
    }
}));

OrderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order) {
        const deleteOrder = await order.remove();
        res.send({ message: 'ลบรายการเสร็จสิ้น', order: deleteOrder });
    } else {
        res.status(404).send({ message: 'ไม่พบรายการ' });
    }
}));

OrderRouter.put('/:id/deliver', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        
        const updateOrder = await order.save();
        res.send({ message: 'นำจ่ายสำเร็จ', order: updateOrder });
    } else {
        res.status(404).send({ message: 'ไม่พบรายการ' });
    }
}));

export default OrderRouter;