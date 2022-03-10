import * as types from '../constants/actionTypes';
import apiHandler from '../api/apiHandler';

const fetchUserMovieListSuccess = (userObj) => ({
  type: types.FETCH_USER_MOVIE_LIST_SUCCESS,
  payload: userObj,
});
const fetchUserMovieListFailure = (error) => ({
  type: types.FETCH_USER_MOVIE_LIST_FAILURE,
  payload: error,
});

const fetchUserMovieList = (username) => (dispatch) => {
  fetch(`/${username}`)
    .then((data) => data.json())
    .then((userObj) => (
      apiHandler.configureApi()
        .then((configObj) => {
          const result = [];
          for (let i = 0; i < userObj.arrMediaObj.length; i += 1) {
            result.push(
              new Promise((resolve, reject) => {
                apiHandler.locatePoster(userObj.arrMediaObj[i].TMDBid, configObj)
                  .then((obj) => {
                    const joinData = {
                      poster_path: obj.poster_path,
                      original_title: obj.original_title,
                      ...userObj.arrMediaObj[i],
                    };
                    resolve(joinData);
                  })
                  .catch((e) => {
                    const joinData = {
                      poster_path: '',
                      original_title: '',
                      ...userObj.arrMediaObj[i],
                    };
                    reject(joinData);
                  });
              }),
            );
          }
          return Promise.allSettled(result);
        })
    ))
    .then((res) => dispatch(fetchUserMovieListSuccess(res.map((ele) => ele.value))))
    .catch((err) => dispatch(fetchUserMovieListFailure(err)));
};

export default fetchUserMovieList;
