import mongoose from 'mongoose';

mongoose.connect('mongodb://0.0.0.0:27017');

export const db = mongoose.connection;

db.on('error', () => console.error(console, 'Connection error:'));

db.once('open', () => {
  console.log('Mongo connected');
});
