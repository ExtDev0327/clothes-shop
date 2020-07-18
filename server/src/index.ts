require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { connectDb } from './database';
import {
  productRoutes,
  authRoutes,
  cartRoutes,
  bannerRoutes,
  categoryRoutes,
  checkOutRoutes,
} from './routes';
import { PORT } from './config';

// initialize passport
require('./lib/passport');

const app = express();

const start = async () => {
  // connect to db
  await connectDb();

  app.use(cors());
  app.use(express.json());

  // setup routes
  app.use('/api/auth', authRoutes);
  app.use('/api/banners', bannerRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/carts', cartRoutes);
  app.use('/api/checkout', checkOutRoutes);
  app.use('/api/products', productRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

start();
