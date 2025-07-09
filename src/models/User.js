import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//Schema User
const schema = new mongoose.Schema({
  first_name: String,
  last_name:  String,
  email:      { type: String, unique: true, required: true },
  age:        Number,
  password:   { type: String, required: true },
  cart:       { type: mongoose.Types.ObjectId, ref: 'Cart' },
  role:       { type: String, default: 'user' }
});

export default mongoose.model('User', schema);
