const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the Schema (the structure of the user)
const userSchema = new Schema({
  id: Number,
  email: String,
  password: String,
  name_user: String,
});

// Create a model based on that schema
const User = mongoose.model('user', userSchema);

// export the model
module.exports = User;
