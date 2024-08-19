import * as mongoose from 'mongoose';

export class Db {

  async connect() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatApp';
    await mongoose.connect(uri)
      .then(() => console.log('Connected to MongoDB'))
      .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        this.connect();
      });
  }

  async disconnect() {
    await mongoose.disconnect();
  }
}