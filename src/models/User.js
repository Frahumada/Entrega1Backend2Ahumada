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

schema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

schema.methods.isValidPassword = function(pw) {
  return bcrypt.compareSync(pw, this.password);
};

export default mongoose.model('User', schema);
