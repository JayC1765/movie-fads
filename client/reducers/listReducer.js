import * as types from '../constants/actionTypes';

const initialState = {
  currentUserID: null,
  userInViewID: null,
  isBrowsing: false,
  userMovieArray: [],
  userFriendsList: [],
};

const listReducer = (state = initialState, action = {}) => {
  console.log('reducer fired')
  switch (action.type) {
    case types.FETCH_USER_MOVIE_LIST_SUCCESS: {
      const userMovieArray = action.payload;
      console.log(action.payload);
      console.log('in reducer')
      return {
        ...state,
        userMovieArray,
      };
    }
    case types.FETCH_USER_MOVIE_LIST_FAILURE: {
      console.log('failure');
    }
    default: {
      return state;
    }
  }
};
export default listReducer;
