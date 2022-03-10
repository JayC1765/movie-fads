const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// const mediaRouter = require('./routes/mediaRouter');
const userController = require('./controllers/userController');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

// why this this file not need .js when our webpack does not include resolve extensions

// ROUTE HANDLERS
// add POST USER endpoint to add new user to database
app.post('/user', userController.createUser, (req, res) => {
  return res.status(200).redirect('/');
});

//add GET USER endpoint
app.get('/:username', userController.getUser, (req, res) => {
  return res.status(200).json(res.locals.user);
});

//remote DELETE USER endpoint
app.delete('/:username', userController.deleteUser, (req, res) => {
  return res.status(200).send(`User Deleted! : ${res.locals.deleteUser}`);
});

//add PUT Media endpoint to update user's media list array
app.put('/addMedia', userController.addMedia, (req, res) => {
  return res.status(200).json(res.locals.addedMedia)
});

app.put('/updateMedia', userController.updateMedia, (req, res) => {
  return res.status(200).json(res.locals.updatedMedia)
});

// Unknown route handler
app.get('*', (req, res) => res.status(404).send('Page not Found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
