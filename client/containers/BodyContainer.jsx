import React from 'react';
import { connect } from 'react-redux';
import CardContainer from './CardContainer';

const mapStateToProps = (state) => ({
  movieList: state.lists.userMovieArray,
});

function BodyContainer(props) {
  return (
    <div className="body-container">
      <input className="search-bar" placeholder="Search..." autoFocus></input>

      <h1>Watchlist</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.toWatch === true)}
      />
      <h1>Favorites</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.fav === true)}
      />
      <h1>Recently Watched</h1>
      <CardContainer
        movieList={props.movieList.filter((movie) => movie.haveSeen === true)}
      />
    </div>
  );
};

export default connect(mapStateToProps, null)(BodyContainer);
