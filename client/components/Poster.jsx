import React from 'react';

function Poster(props) {
  const { originalTitle, posterPath } = props;
  return (
    <div className="pic-title">
      <img
        className="movie-pic"
        src={posterPath}
        alt={originalTitle}
      />
      <h3>{originalTitle}</h3>
    </div>
  );
}
export default Poster;
