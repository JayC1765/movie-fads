// const { template } = require('@babel/core');
const User = require('../model/userModel.js');

// Helper function for creating new users
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

// Helper function for updating status of the current movie for the individual user
const updateStatus = (username, TMDBid, status) => (
  new Promise((resolve, reject) => {
    User.findOne({ username: username }, { arrMediaObj: 1 })
      .then((data) => {
        const arrMediaObj = data.arrMediaObj;
        const type = status[0];
        const currStatus = status[1];

        for (let i = 0; i < arrMediaObj.length; i += 1) {
          if (arrMediaObj[i].TMDBid === TMDBid) {
            const updatedMediaArr = arrMediaObj[i];
            updatedMediaArr[type] = !currStatus;
            resolve(updatedMediaArr);
          }
        }
      })
      .catch((err) => reject(err));
  })
);

const userController = {
  // req body should be the following { username: "David", password: "hashedPassword"}
  createUser(req, res, next) {
    User.find({ username: req.body.username })
      .then((data) => {
        if (!data[0]) {
          User.create({ username: req.body.username, password: req.body.password })
            .then((data) => {
              console.log('username has been successfully created');
              res.locals.createUser = data;
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

  // returns the whole object for the user found in the DB
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

  async verifyUser(req, res, next) {
    try {
      const result = await User.find({ username: req.params.username });
      // ********************************************************************************
      // The code in here is different from getUser. All the other code in this function is the same as getUser.
      // console.log(result);
      const user = result[0];
      // console.log(user);
      const validPassword = await user.comparePassword(req.body.password);
      if (validPassword) console.log('valid password!');
      else console.log('password declined');
      // ********************************************************************************
      res.locals.user = result[0];
      return next();
    } catch (err) {
      return next({
        log: `verifyUser controller had an error. ${err}`,
        status: 401,
        message: { err: 'An error occurred when verifying a user' },
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

  // req body should probably be {username: "David", TMDBid: 70}
  addMedia(req, res, next) {
    const username = req.body.username;
    // make sure how front end is sending the TMDBid as number or string (CURRENTLY a string)
    const template = {
      TMDBid: req.body.TMDBid,
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
          res.locals.addedMedia = data;
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

  // req body should be { username: 'David', TMDBid: '218', fav||watchlist||watch: current status}
  // status should be an array [fav, true] || [haveSeen, true] || [toWatch, true]
  updateMedia(req, res, next) {
    const username = req.body.username;
    const TMDBid = req.body.TMDBid;
    const status = req.body.status;

    updateStatus(username, TMDBid, status)
      .then((data) => {
        console.log(data)
        User.updateOne( {username: username}, { $set: {arrMediaObj: data} })
          .then(() => console.log('Media status has been updated'))
          .catch((err) => console.log(err));
        res.locals.updatedMedia = data;
        return next();
      })
      .catch((err) => next({
        log: 'An error has occured with the update Media middleware',
        status: 401,
        message: { err: `${err} An error has occured with the update Media middleware` },
      }));
  },

};

module.exports = userController;
