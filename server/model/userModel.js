const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://movie:fads@cluster0.h4vty.mongodb.net/movieFadsDB';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Users',
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userID: { type: String, required: false },
  // changed to false bc creating a a new user should not require a list of movies
  arrMediaObj: { type: Array, required: false },
  friendsList: { type: Array, required: false },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
