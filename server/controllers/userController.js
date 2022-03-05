const UserDb = require('../model/mediaModel.js');

const userController = {
  // createUser - Add username, Add arrMediaObj as an empty array (POST)
  // UserDb.create()
  async createUser(req, res, next) {
    try {
      //take username from req body, send POST to  mongo with that username and empty arr for mediaObj
      const result = await UserDb.create({ username: req.body.username });
      res.locals.createUser = result;
      return next();
    } catch (err) {
      return next({
        log: `createUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when creating a new user' },
      });
    }
  },

  async getUser(req, res, next) {
    try {
      const result = await UserDb.findOne({ username: req.params.username });
      res.locals.user = result;
      return next();
    } catch (err) {
      return next({
        log: `getUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when finding a user' },
      });
    }
  },

  // removeUser - Delete User; based on username or maybe MongoID; TBD (DELETE)
  // UserDb.deleteOne(username)

  async deleteUser(req, res, next) {
    try {
      const result = await UserDb.findOneAndDelete({
        username: req.params.username,
      });
      res.locals.deleteUser = result;
      return next();
    } catch (err) {
      return next({
        log: `deleteUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when deleting a user' },
      });
    }
  },
  // addMedia - Add an object to User's .arrMediaObj | PUT .findOneAndUpdate()
  // UserDb.findOneAndUpdate(username, access arrMediaObj)
  /*
  DOCUMENT:

  {
    TMDBId: 12
    watchHistory: false
    toWatch: true
    favStatus: true
  }
 
    */
  async addMedia(req, res, next) {
    try {
      const result = await UserDb.updateOne(
        { username: req.params.username },
        { $push: { arrMediaObj: req.body.arrMediaObj } }
      );
      res.locals.addedMedia = result;
      return next();
    } catch (err) {
      next({
        log: `addMedia controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when adding media object' },
      });
    }
  },
  // updateWatchHistory - starts false, updates to true on watch, then must stay true (PATCH)
  // UserDb.findOneAndUpdate(username, arrMediaObj)

  //{
  //username: req.params.username, arrMediaObj: { $elemMatch: { movieId: {strictly equal to the TMBDId we receive}}}
  // }

  /*
  {
    TMDBid: 70,
    fav: true, 

  }
   */

  async updateMedia(req, res, next) {
    try {
      // const placeHolder = req.body.movie;
      // placeHolder.favStatus = !placeHolder.favStatus;

      const result = await UserDb.updateOne(
        {
          username: req.params.username,
          arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
        },

        { $set: { 'arrMediaObj.$.fav': req.body.fav } }
      );
      res.locals.updatedMedia = result;
      return next();
    } catch (err) {
      next({
        log: `updateMedia controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when updating media' },
      });
    }
  },
  //findOneAndUpdate takes (filter object, object of property to update, object indicating if it should return new
  // or old, also if it should upsert)
  // updateToWatchList - What they want to watch, Starts false, updates to true. Can toggle.  (PATCH)
  // UserDb.findOneAndUpdate
  // const newBool = typeof arrMediaObj.toWatch ? false : true
  // updateFavoriteStatus - favorite media items, toggle-able from T to F etc. (PATCH)
  // UserDb.
  // removeMedia - Remove an object from User's .arrMediaObj | (DELETE)
  // UserDb.
};

module.exports = userController;
