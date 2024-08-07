// config/db.js
import mongoose from 'mongoose';
import { serverconfig } from './serverconfig';
const mongodb = async () => {
  try {
    await mongoose.connect(serverconfig.mongo);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
  }
};

export default mongodb;
