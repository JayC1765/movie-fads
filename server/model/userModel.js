const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://movie:fads@cluster0.h4vty.mongodb.net/movieFadsDB';

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

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

// When a user signs up, hash their password before storing it in the database.
userSchema.pre('save', function mongoosePreSaveMiddleware(next) {
  const user = this;
  bcrypt.genSalt(SALT_ROUNDS, (saltErr, salt) => {
    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      user.password = hash;
      return next();
    });
  });
});

// When a user logs in: hash the password they logged in with, before comparing it to the password stored in the database.
userSchema.methods.comparePassword = function comparePassword(plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
