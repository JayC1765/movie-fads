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

const fetchUserMovieList = (userObj) => (dispatch) => {
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
                reject(e);
              });
          }),
        );
      }
      return Promise.allSettled(result);
    })
    .then((res) => {
      const movieList = (res.map((ele) => ele.value));
      movieList.push(userObj.username);
      dispatch(fetchUserMovieListSuccess(movieList));
    })
    .catch((err) => {
      if (!sessionStorage.getItem('refreshed')) {
        localStorage.clear();
        sessionStorage.setItem('refreshed', 'true');
        return fetchUserMovieList(userObj);
      }
      return dispatch(fetchUserMovieListFailure(err));
    });
};

export const toggleFav = (tmdbid) => ({
  type: types.TOGGLE_FAV,
  payload: tmdbid,
});

export const toggleToWatch = (tmdbid) => ({
  type: types.TOGGLE_TOWATCH,
  payload: tmdbid,
});

export const toggleHaveSeen = (tmdbid) => ({
  type: types.TOGGLE_HAVESEEN,
  payload: tmdbid,
});

export default fetchUserMovieList;
