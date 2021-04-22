import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    orderItems: [{
        title: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true,
        },
    }],
    shippingAddress: {
        fullname: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        district: {
            type: String,
            required: true,
        },
        province: {
            type: String,
            required: true,
        },
        postal: {
            type: String,
            required: true,
        }
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    giver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;