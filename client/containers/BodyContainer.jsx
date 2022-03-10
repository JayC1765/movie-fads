import React from 'react';
import { useSelector } from 'react-redux';
import CardContainer from './CardContainer';

function BodyContainer() {
  const movieList = useSelector((state) => {
    return state.lists.userMovieArray;
  });
  return (
    <div className="body-container">
      <input className="search-bar" placeholder="Search..." autoFocus />

      <h1>Watchlist</h1>
      <CardContainer
        movieList={movieList.filter((movie) => movie && movie.toWatch === true)}
      />
      <h1>Favorites</h1>
      <CardContainer
        movieList={movieList.filter((movie) => movie && movie.fav === true)}
      />
      <h1>Recently Watched</h1>
      <CardContainer
        movieList={movieList.filter((movie) => movie && movie.haveSeen === true)}
      />
    </div>
  );
}

export default BodyContainer;
