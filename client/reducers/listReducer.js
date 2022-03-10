import * as types from '../constants/actionTypes';

const initialState = {
  currentUserID: null,
  userInViewID: null,
  isBrowsing: false,
  userMovieArray: [],
  userFriendsList: [],
};

const listReducer = (state = initialState, action = {}) => {
  let userMovieArray = [...state.userMovieArray];
  let currentUserID;
  switch (action.type) {
    case types.FETCH_USER_MOVIE_LIST_SUCCESS: {
      currentUserID = action.payload.pop();
      userMovieArray = action.payload;
      return {
        ...state,
        userMovieArray,
        currentUserID,
      };
    }
    case types.TOGGLE_FAV: {
      for (let i = 0; i < userMovieArray.length; i += 1) {
        if (userMovieArray[i] && userMovieArray[i].TMDBid === action.payload) {
          userMovieArray[i].fav = !userMovieArray[i].fav;
        }
      }
      return {
        ...state,
        userMovieArray,
      };
    }
    case types.TOGGLE_HAVESEEN: {
      for (let i = 0; i < userMovieArray.length; i += 1) {
        if (userMovieArray[i] && userMovieArray[i].TMDBid === action.payload) {
          userMovieArray[i].haveSeen = !userMovieArray[i].haveSeen;
        }
      }
      return {
        ...state,
        userMovieArray,
      };
    }

    case types.TOGGLE_TOWATCH: {
      for (let i = 0; i < userMovieArray.length; i += 1) {
        if (userMovieArray[i] && userMovieArray[i].TMDBid === action.payload) {
          userMovieArray[i].toWatch = !userMovieArray[i].toWatch;
        }
      }
      return {
        ...state,
        userMovieArray,
      };
    }
    default: {
      return state;
    }
  }
};
export default listReducer;
