import mongoose from 'mongoose';

const ItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        // data: Buffer,
        // path: String,
        // contentType: String,
        type: String,
        required: true,
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