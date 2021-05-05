import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    giver: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        require: true,
        min: 1
    },
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;