import * as types from '../constants/actionTypes';

const fetchUserMovieListStarted = () => ({
  type: types.FETCH_USER_MOVIE_LIST,
});
const fetchUserMovieListSuccess = (userObj) => ({
  type: types.FETCH_USER_MOVIE_LIST_SUCCESS,
  payload: userObj,
});
const fetchUserMovieListFailure = (error) => ({
  type: types.FETCH_USER_MOVIE_LIST_FAILURE,
  payload: error,
});

const fetchUserMovieList = (username) => (dispatch) => {
  dispatch(fetchUserMovieListStarted());
  fetch(`/${username}`)
    .then((data) => data.json())
    .then((res) => dispatch(fetchUserMovieListSuccess(res)))
    .catch((err) => dispatch(fetchUserMovieListFailure(err)));
};

export default fetchUserMovieList;
