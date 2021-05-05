import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    isGiver: {
        type: Boolean,
        default: true,
        required: true,
    },
    haveUsername: {
        type: Boolean,
        default: false,
        required: true,
    },
    giver: {
        username: {
            type: String,
            unique: true,
        },
        logo: String,
        description: String,
        rating: {
            type: Number,
            default: 0,
            required: true,
        },
        numReviews: {
            type: Number,
            default: 0,
            required: true,
        },
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);
export default User;