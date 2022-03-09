import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BodyContainer from './BodyContainer';
import fetchUserMovieList from '../actions/actions';

const mapDispatchToProps = (dispatch) => ({
  loadMovies: (username) => dispatch(fetchUserMovieList(username)),
});

function MainContainer(props) {
  useEffect(() => {
    console.log('inside MainContainer useEffect');
    //! no need to hard code argument for loadMovies once username has been saved in state
    //! follwoing authentication stage (to be implemented)
    return props.loadMovies('David');
  });
  return (
    //! HeadContainer component goes here
    <div className="main-container">
      <h1>Movie Fads</h1>
      <BodyContainer />
    </div>
    //! FooterContainer component goes here
  );
}

export default connect(null, mapDispatchToProps)(MainContainer);
