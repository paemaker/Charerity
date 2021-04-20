import ItemRouter from './Routers/ItemRouter.js';
import OrderRouter from './Routers/OrderRouter.js';
import UploadRouter from './Routers/UploadRouter.js';
import UserRouter from './Routers/UserRouter.js';
import chalk from 'chalk';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/scharerity', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use('/api/users', UserRouter);
app.use('/api/items', ItemRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/uploads', UploadRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/Uploads')));
app.use(express.static(path.join(__dirname, '/Frontend/Build')));
app.get('*', (req, res) => {
    req.sendFile(path.join(__dirname, '/Frontend/Build/index.html'));
});

// app.get('/', (req, res,) => {
//     res.send('Server is ready');
// });

app.listen(port, () => {
    console.log(chalk.white.bgGreen(`Server is running on http://localhost:${port}`));
}); 

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});