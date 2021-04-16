import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    img: {
        data: Buffer,
        path: String,
        contentType: String,
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: [String],
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
    }
}, {
    timestamps: true
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;