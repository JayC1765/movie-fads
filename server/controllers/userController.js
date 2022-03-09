// const { template } = require('@babel/core');
const User = require('../model/userModel.js');

const checkDuplicate = (username, template) => (
  new Promise((resolve, reject) => {
    User.findOne({ username: username }, { arrMediaObj: 1 })
      .then((data) => {
        const arrMediaObj = data.arrMediaObj;
        const movieId = template.TMDBid;

        if (!arrMediaObj[0]) arrMediaObj.push(template);
        else {
          for (let i = 0; i < arrMediaObj.length; i += 1) {
            if (arrMediaObj[i].TMDBid === movieId) resolve(false);
          }
          arrMediaObj.push(template);
        }
        resolve(arrMediaObj);
      })
      .catch((err) => reject(err));
  })
);

  // User.find({ username })
  //   .then((data) => {
  //     // console.log(data);
  //     res.locals.checkDup = data;
  //     return next();
  //   })
  //   .catch((err) => next({
  //     log: 'An error has occured with the checking duplicate middleware',
  //     status: 401,
  //     message: { err: `${err} An error has occured with the checking duplicate middleware` },
  //   }));

const userController = {

  createUser(req, res, next) {
    User.find({ username: req.body.username })
      .then((data) => {
        if (!data[0]) {
          User.create({ username: req.body.username, password: req.body.password })
            .then((data) => {
              res.locals.createUser = 'username has been successfully created';
              return next();
            })
            .catch((err) => next({
              log: 'An error has occured with the create user middleware',
              status: 401,
              message: { err: `${err} An error has occured with the create user middleware` },
            }));
        } else {
          res.locals.createUser = 'username has already been used';
          return next();
        }
      })
      .catch((err) => next({
        log: 'An error has occured with the find user middleware',
        status: 401,
        message: { err: `${err} An error has occured with the find user middleware` },
      }));
  },

  // async createUser(req, res, next) {
  //   try {
  //     // declare a const to check if username already exist
  //       const result = await User.create({ username: req.body.username });
  //       console.log(result);
  //       res.locals.createUser = result;
  //       return next();
  //     // }
  //   } catch (err) {
  //     return next({
  //       log: `createUser controller had an error. ${err}`,
  //       status: 401,
  //       message: { err: 'An error occurred when creating a new user' },
  //     });
  //   }
  // },

  async getUser(req, res, next) {
    try {
      const result = await User.find({ username: req.params.username });
      res.locals.user = result[0];
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
  async deleteUser(req, res, next) {
    try {
      const result = await User.findOneAndDelete({
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
  /*
  {
    TMDBId: 12
    haveSeen: false
    toWatch: true
    fav: true
  }
    */
  addMedia(req, res, next) {
    // req body should probably be {username: "David", TMDBid: 70}
    const username = req.body.username;
    // const username = 'Jason';
    // make sure how front end is sending the TMDBid as number or string
    const template = {
      TMDBid: req.body.TMDBid,
      // TMDBid: '218',
      haveSeen: false,
      toWatch: false,
      fav: true,
    };

    checkDuplicate(username, template)
      .then((data) => {
        if (data) {
          User.updateOne({ username: username }, { $set: { arrMediaObj: data } })
            .then(() => console.log('Movie has been added'))
            .catch((err) => next(err));
          return next();
        }
        return next({
          log: 'A movie already exist',
          status: 401,
          message: { err: 'Movie already exist' },
        });
      })
      .catch((err) => {
        next({
          log: 'An error has occured with the add Media middleware',
          status: 401,
          message: { err: `${err} An error has occured with the add Media middleware` },
        });
      });
  },

  // async addMedia(req, res, next) {
  //   // req.body is { TMDBid: 70, fav: true }

  //   // req.body should actually probably be {username: "David", TMBid: 70, fav}
  //   try {
  //     const template = {
        // TMDBid: req.body.TMDBid,
        // haveSeen: false,
        // toWatch: false,
        // fav: false,
  //     };
  //     // not sure if this is actually necessary
  //     template[Object.keys(req.body)[1]] = true;

  //     const result = await User.updateOne(
  //       { username: req.params.username },
  //       { $push: { arrMediaObj: template } },
  //     );
  //     res.locals.addedMedia = result;
  //     return next();
  //   } catch (err) {
  //     next({
  //       log: `addMedia controller had an error. ${err}`,
  //       status: 401,
  //       message: { err: 'An error occurred when adding media object' },
  //     });
  //   }
  // },

  // addFavs(req, res, next) {
  //   // req body should be { username: 'David', TMDBid: '218', fav||watchlist||watch: false}
  //   return next();
  // },

  // addWatchList(req, res, next) {
  //   // req body should be { username: 'David', TMDBid: '218', fav||watchlist||watch: false}
  //   return next();
  // },

  // addWatched(req, res, next) {
  //   // req body should be { username: 'David', TMDBid: '218', fav||watchlist||watch: false}
  //   return next();
  // },

  updateMedia(req, res, next) {
    // req body should be { username: 'David', TMDBid: '218', fav||watchlist||watch: current status}
    // status should be an array [fav, true] || [haveSeen, true] || [toWatch, true]
    const status = req.body.status;
    const username = req.body.username;
    const TMDBid = req.body.TMDBid;

    console.log(status);
    console.log(username);
    console.log(TMDBid);

    // updateStatus(username, TMDbid, status)
    return next();
  },

  // UPDATE MEDIA (PUT)
  // async updateMedia(req, res, next) {
  //   // { TMDBid: 70, fav: true }
  //   try {
  //     let result;

  //     if (req.body.hasOwnProperty('fav')) {
  //       result = await User.updateOne(
  //         {
  //           username: req.params.username,
  //           arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
  //         },

  //         { $set: { 'arrMediaObj.$.fav': req.body.fav } },
  //       );
  //     } else if (req.body.hasOwnProperty('toWatch')) {
  //       result = await User.updateOne(
  //         {
  //           username: req.params.username,
  //           arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
  //         },

  //         { $set: { 'arrMediaObj.$.toWatch': req.body.toWatch } },
  //       );
  //     } else if (req.body.hasOwnProperty('haveSeen')) {
  //       result = await User.updateOne(
  //         {
  //           username: req.params.username,
  //           arrMediaObj: { $elemMatch: { TMDBid: { $eq: req.body.TMDBid } } },
  //         },

  //         { $set: { 'arrMediaObj.$.haveSeen': req.body.haveSeen } },
  //       );
  //     }
  //     res.locals.updatedMedia = result;
  //     return next();
  //   } catch (err) {
  //     next({
  //       log: `updateMedia controller had an error. ${err}`,
  //       status: 401,
  //       message: { err: 'An error occurred when updating media' },
  //     });
  //   }
  // },

};

module.exports = userController;
